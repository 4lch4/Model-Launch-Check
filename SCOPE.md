# model-launch-check: scope

A small TypeScript CLI that runs the same prompts across several models and reports quality,
latency and cost side by side. It is a mini version of the check a model aggregator runs when a
new model or provider goes live.

Built as a one-evening project (about 3.5 hours) to back an application to OpenRouter's AI
Provider Operations & Support Engineer role.

## The four boxes

Each box is one resume claim. A claim goes on the resume only once its box is done.

| #   | Box             | Done when                                                                |
| --- | --------------- | ------------------------------------------------------------------------ |
| 1   | OpenRouter runs | Prompt set runs across 3-4 models via OpenRouter, streamed, with TTFT,   |
|     |                 | total latency, tokens and cost recorded per response                     |
| 2   | Messages API    | Same prompts run through one Claude model via Anthropic's Messages API   |
|     |                 | directly, in the same result shape                                       |
| 3   | Report          | Markdown + JSON report: outputs side by side per prompt, then a summary  |
|     |                 | table per model (median TTFT, median total, total cost, errors)          |
| 4   | Public repo     | README with a sample report, one ADR, CI running typecheck, lint, format |

**The twist:** Sonnet 5.5 runs both through OpenRouter and directly from Anthropic, so the
report compares the same model through the aggregator against the provider itself.

## Setup (20 min)

1. Install Bun in WSL: `curl -fsSL https://bun.sh/install | bash`, then restart the shell
   (the skeleton was built with Bun 1.4.3).
2. `bun install`
3. Copy `.env.example` to `.env` and fill in both keys. Bun loads `.env` automatically.
   - **OpenRouter:** load $5 of credit, create a key at openrouter.ai/settings/keys and set a
     credit limit on it (a few dollars) so a bug can't run up a bill.
   - **Anthropic:** create a key in the Claude Console (platform.claude.com). It needs prepaid
     credits; check the minimum top-up there.
4. `bun run check` should pass before you write any code.
5. `git init`, create `4lch4/model-launch-check` on GitHub (public), push.

## What's already here

| Path                       | What it is                                                |
| -------------------------- | --------------------------------------------------------- |
| `config/models.yaml`       | 4 OpenRouter models + Sonnet direct, with direct pricing  |
| `config/prompts.yaml`      | 6 prompts (short, code, summary, JSON, reasoning, safety) |
|                            | and a commented-out long-context prompt                   |
| `src/index.ts`             | Placeholder entry point                                   |
| `.github/workflows/ci.yml` | Typecheck, lint, format check. No model calls in CI       |
| `eslint.config.js`         | typescript-eslint recommended                             |
| `.prettierrc`              | `semi: false`                                             |

Dependencies are installed: `openai` (pointed at OpenRouter), `@anthropic-ai/sdk`, `zod`,
`yaml`. TypeScript is pinned to 6.0.x because typescript-eslint doesn't support TS 7 yet.

## Suggested layout

```
src/
  index.ts              CLI: parse flags, load config, run, write report
  config.ts             zod schemas for models.yaml / prompts.yaml; load + validate
  types.ts              RunResult and Provider types
  providers/
    openrouter.ts       box 1
    anthropic.ts        box 2
  runner.ts             concurrency limit, timeout, retries
  report.ts             Markdown + JSON writers (box 3)
  stats.ts              median, sums
```

## Design

### One result shape for every provider

```ts
type RunResult = {
  provider: 'openrouter' | 'anthropic'
  model: string // model id as configured
  label: string // display name from models.yaml
  promptId: string
  text: string
  ttftMs: number | null // null if no token arrived
  totalMs: number
  inputTokens: number | null
  outputTokens: number | null
  costUsd: number | null
  attempts: number // 1 = no retries
  error?: string
}

type Provider = {
  run(model: ModelConfig, prompt: PromptConfig, signal: AbortSignal): Promise<RunResult>
}
```

Same idea as AI-Usage: normalize every provider into one format, and everything downstream
(stats, report) only knows `RunResult`.

### Timing

- Start the clock with `performance.now()` right before the request call.
- **TTFT** = first chunk that carries visible text. Ignore role-only or empty chunks.
- **Total** = when the stream ends.
- Reasoning models may stream reasoning before any visible text, so their TTFT will look slow.
  That's real user-facing latency, so keep it, and note it in the report.

### OpenRouter provider (box 1)

- `new OpenAI({ baseURL: "https://openrouter.ai/api/v1", apiKey, maxRetries: 0 })`
- Optional attribution headers: `HTTP-Referer` (repo URL) and `X-Title` (`model-launch-check`).
- `chat.completions.create({ model, messages, max_tokens, temperature, stream: true })`
- Text: `chunk.choices[0]?.delta?.content`.
- **Usage and cost come automatically in the last SSE chunk** as `chunk.usage`: `prompt_tokens`,
  `completion_tokens`, `cost`, plus `prompt_tokens_details.cached_tokens` and
  `completion_tokens_details.reasoning_tokens`. No request flag needed; the old
  `usage: { include: true }` is deprecated and ignored.
- The OpenAI SDK's types don't know about `cost`. Parse `chunk.usage` with a small zod schema
  instead of casting.
- Check whether that last chunk has an empty `choices` array; handle both cases.
- Watch for errors arriving mid-stream (an error chunk or `finish_reason: "error"`) and record
  them as errors rather than returning partial text as a success.

### Anthropic provider (box 2)

- `new Anthropic({ apiKey, maxRetries: 0 })`
- `messages.create({ model, max_tokens, temperature, messages, stream: true })` and iterate the
  events (or `messages.stream()` and listen to events).
- First `content_block_delta` whose `delta.type === "text_delta"` marks TTFT.
- `message_start` → `message.usage.input_tokens`.
  `message_delta` → `usage.output_tokens` (cumulative; take the last one).
- No cost in the response: `costUsd = in / 1e6 * inputPerM + out / 1e6 * outputPerM` using
  `pricing` from models.yaml.
- Model id `claude-sonnet-5-5`. Prices (2026-10-13): Sonnet 5.5 $2 in / $10 out per 1M.

### Reliability (runner.ts)

- **SDK retries off** (`maxRetries: 0` on both clients) so your own retry layer is the only one,
  and `attempts` in the report is honest. Good ADR material.
- **Per-attempt timeout:** `AbortSignal.timeout(ms)` created fresh for each attempt (60s
  default, configurable).
- **Retry only** on 429, 5xx and network errors, and only if no tokens were received yet. Once
  text has streamed, record the error instead of retrying.
- **Backoff:** exponential with jitter (e.g. 1s, 2s, 4s ± 25%), max 3 attempts. Respect a
  `retry-after` header when present.
- **Concurrency:** limit to 2-3 requests in flight. A 15-line limiter is fine; no dependency
  needed.
- Never let one failed request kill the run. Errors become `RunResult.error` and show up in
  the report.
- README sentence: same lessons as the TargetProcess to Azure DevOps migration (retries, rate
  limits, resumable runs).

### Config (config.ts)

- Validate both YAML files with zod at startup and fail with a clear message on bad config.
- Rule: `provider: anthropic` (any direct provider) **must** have `pricing`.
- Prompts: either `text`, or `file` + `instruction`. Load `file` from `fixtures/`.
- Prompt-level `maxTokens` / `temperature` override `defaults`.

### CLI (index.ts)

| Flag                     | Effect                                         |
| ------------------------ | ---------------------------------------------- |
| `--dev`                  | Only models with `dev: true` (the cheap ones)  |
| `--models a,b`           | Only these model ids                           |
| `--prompts short-fact,x` | Only these prompt ids                          |
| `--runs N`               | Repeat each model × prompt N times (default 1) |
| `--concurrency N`        | In-flight limit (default 2)                    |

`util.parseArgs` from `node:util` works in Bun and avoids a dependency.

### Report (box 3)

Write `reports/<timestamp>.json` (all `RunResult`s plus run metadata) and
`reports/<timestamp>.md`:

1. Header: date, models, prompt count, runs, total cost.
2. **Summary table** per model: median TTFT, median total, total input/output tokens, total
   cost, error count. With `--runs > 1`, medians are across runs.
3. **Per prompt:** the prompt, then each model's output (collapsible `<details>` blocks keep it
   readable on GitHub), with its TTFT / total / cost under it.
4. **OpenRouter vs direct** section: Sonnet via OpenRouter next to Sonnet direct, comparing
   latency and cost.

Keep the Markdown report even if you cut the JSON.

### Repo (box 4)

- **README:** what it is, why (one paragraph), quick start, sample summary table copied from a
  real run, how to add a model, design notes (one result shape, streaming, retries).
- **ADR:** `docs/adr/0001-streaming-and-one-result-shape.md`. Context, decision, consequences.
  Cover: why stream (TTFT is unmeasurable otherwise), why one `RunResult`, why SDK retries off.
- **CI:** already set up. Keep it green.
- Commit a sample report under `docs/sample-report.md` (reports/ is gitignored).

## Timeline

| Time      | Work                                                                 |
| --------- | -------------------------------------------------------------------- |
| 0:00-0:20 | Setup above                                                          |
| 0:20-1:15 | `config.ts`, `types.ts`, OpenRouter provider, first real `--dev` run |
| 1:15-1:50 | Anthropic provider (box 2)                                           |
| 1:50-2:30 | Report generator (box 3)                                             |
| 2:30-3:15 | Timeouts, retries, concurrency; CI green                             |
| 3:15-3:45 | README, ADR, sample report, publish (box 4)                          |

**Cut list (in order) if short on time:** the Anthropic provider (then no Messages API claim),
then retries, then the JSON output.

**Stretch, only after all four boxes:** a pairwise LLM-as-judge pass. For each prompt, a cheap
model picks the better of two answers with a one-line reason. It's an automated version of the
side-by-side comparisons from the Meta contract work.

## Sanity checks for the first real runs

- `ttftMs < totalMs` for every successful result.
- OpenRouter results have a non-null `costUsd`; Anthropic cost is computed and plausible.
- OpenRouter Sonnet cost ≈ direct Sonnet cost for the same prompt (same list price).
- `json-extract` output parses with `JSON.parse` for most models. (Easy extra column:
  "valid JSON: yes/no".)
- Kill your network mid-run once: the run should finish with errors recorded, not crash.

## Cost

About 15K input + 5K output tokens per model per full run (8 prompts, one long).

| Model (per 1M in / out, OpenRouter, 2026-10-13) | Per full run |
| ----------------------------------------------- | ------------ |
| Claude Haiku 5.5 ($0.10 / $0.50)                | ~$0.004      |
| GPT-6 Luna ($0.10 / $0.50)                      | ~$0.004      |
| DeepSeek V4.1 Flash ($0.15 / $0.60)             | ~$0.005      |
| Claude Sonnet 5.5 ($2 / $10)                    | ~$0.08       |
| Sonnet 5.5 direct (same price)                  | ~$0.08       |

About $0.17 per full run with all five. Develop with `--dev` (Haiku + Luna). Expect $1-2 total
for the evening. DeepSeek's price varies by time of day on weekdays.

## Resume claim (once boxes are done)

> Built model-launch-check, a TypeScript (Bun) CLI that runs prompt sets across models through
> OpenRouter and Anthropic's Messages API and reports time-to-first-token, latency, token usage,
> and cost side by side (github.com/4lch4/model-launch-check).

Only claim what's built: drop "Anthropic's Messages API" if box 2 was cut.

## Be ready to explain in an interview

- How TTFT is measured for each provider, and why reasoning models skew it.
- Where OpenRouter's cost number comes from vs. computing it yourself.
- Why SDK retries are off, and when a request is retried vs. recorded as an error.
- What the OpenRouter vs. direct comparison showed (latency overhead, cost parity).
- What you'd add next: provider routing options, more runs for stable medians, the judge.
