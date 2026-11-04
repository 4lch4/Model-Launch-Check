# 0001 — Streaming, one result shape, and retries off

- Status: accepted
- Date: 2026-10-14

## Context

This tool answers two questions. The first being when a new model goes live at an aggregator: of the
models available through us, which one feels fastest and costs least for a given prompt? The second
is that for the same model, what does routing through the aggregator cost in latency and in price
compared to going to the provider directly?

Both are answered in a single run. Claude Sonnet 5.5 is deliberately configured twice — once through
OpenRouter, once against Anthropic's Messages API — so the report can place the two routes side by
side. Answering either question means measuring time to first token, total latency and cost across
providers that have nothing in common in how they report any of them.

Three problems follow from that.

**Two providers, incompatible shapes.** A difference between two numbers only means something if the
numbers were produced the same way, and these two do not produce them the same way. OpenRouter
speaks the OpenAI chat-completions protocol and reports tokens and cost on the final stream chunk.
Anthropic's Messages API streams typed events, reports input tokens in `message_start` and
cumulative output tokens in `message_delta`, and reports no cost at all. Left alone, every
downstream stage — stats, the report, the comparison table — would end up branching on which
provider produced a result, and a table with one provider per column could not be produced at all.

**Latency without streaming is not measurable.** A non-streaming request returns one blob. You can
time when it arrives, but not when the model started talking. Time to first token, which is the
number that actually determines whether a chat UI feels responsive, simply does not exist without a
stream. Streaming is also the only reason aggregator overhead is visible at all: it is a per-token
cost, so it shows up in the gap between the first token and the last rather than being averaged into
a single round trip.

**Retries are a correctness question here, not a nicety.** The report has to state what a run cost
and how many attempts it took. If the HTTP client retries silently underneath, `attempts` becomes
fiction and a request that failed four times looks identical to one that succeeded first time.

## Decision

**Stream every request.** TTFT is recorded at the first chunk carrying visible text. Role-only
chunks are skipped. Model reasoning is also skipped for TTFT purposes, because a reasoning trace the
user cannot see is not yet a response — this deliberately makes reasoning models look slower than
their own provider dashboards report, which is the honest number for a chat UI.

**Normalize every provider into one `RunResult`** before anything else consumes it:

```ts
type StopReason = 'complete' | 'length' | 'tool_use' | 'refusal' | 'error' | 'other'

type RunResult = {
  provider: ProviderNames
  model: string
  label: string
  promptId: string
  text: string
  ttftMs: number | null
  totalMs: number
  inputTokens: number | null
  outputTokens: number | null
  costUsd: number | null
  attempts: number
  stopReason: StopReason | null
  rawStopReason: string | null // the provider's own value, for debugging
  error?: string
}
```

Every field is nullable where the underlying quantity can be absent, because the alternative —
inventing a zero — quietly corrupts the median. `metrics()` in `src/stats.ts` computes over
non-error results only, so a failed request is excluded from latency and cost but still counted in
`errors` and `runs`.

Where a provider's own types are wrong, parse rather than cast. The OpenAI SDK does not know that
`usage.cost` exists, so stream chunks are validated with a small zod schema. The Anthropic SDK's
types are accurate and that provider parses none.

Normalize errors the same way. Both SDKs raise their own error classes; both are translated into one
`RequestError` carrying a `kind` (`http`, `network`, `timeout`, `stream`) and an HTTP `status` where
one exists. Retry policy reads only those fields and never learns which SDK failed.

**Set `maxRetries: 0` on both clients** and keep every retry in `src/runner.ts`. A request is
retried only on 429, 5xx, network errors or timeouts, and only when no tokens have been received yet
— once text has streamed, retrying would double-charge and splice two answers together, so it is
recorded as an error instead. `attempts` is written by the runner and means what it says.

## Consequences

- Adding a provider means writing one file and one `switch` case. Nothing downstream changes.
- The runner, stats and report have no provider-specific branches. The only provider knowledge
  outside `providers/` is a display map of provider names to column headings.
- The comparison between an aggregator and a direct provider is only meaningful if both routes run
  the same model under the same settings. This surfaced as a real bug: Sonnet 5.5 rejects
  `temperature` outright while OpenRouter accepts and silently drops it, so the flag that
  suppresses the parameter lives in `models.yaml` and is set on **both** routes. Had it been
  fixed only on the direct side, the tool would have reported a comparison between two different
  configurations while labelling them the same model.
- Single-run medians are noisy. Across runs the same model and prompt moved by up to 3×. The
  report says so, and `--runs` exists to take medians over repeats.
- Reasoning models are recorded with `ttftMs: null` when they spend their whole token budget on
  reasoning and return no visible text. That is a real and expensive outcome, not a measurement
  failure, and it is worth surfacing rather than normalizing away. The stop reason records the
  truncation directly, and the report flags truncations that produced no visible output at all,
  together with what they cost.
- Cost is trustworthy across providers only because the source is recorded per provider: a
  reported figure for OpenRouter, a computed figure from configured prices for Anthropic. The
  comparison table is explicit about which is which by construction — it only ever compares
  families that appear under more than one provider.
