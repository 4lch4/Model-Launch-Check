# model-launch-check

A small version of the check a model aggregator runs when a new model or provider goes
live: a TypeScript (Bun) CLI that sends the same prompt set to several models and reports
time-to-first-token, total latency, token usage and cost side by side.

Models run through OpenRouter, and one (Claude Sonnet 5.5) also runs through Anthropic's
Messages API directly, so the report compares the aggregator against the provider for the
same model.

## Quick start

```sh
bun install
cp .env.example .env   # add OPENROUTER_API_KEY and ANTHROPIC_API_KEY
bun run start -- --dev # cheap run: only models marked dev: true
```

| Flag                     | Effect                                          |
| ------------------------ | ----------------------------------------------- |
| `--dev`                  | Only models marked `dev: true` (the cheap ones) |
| `--models a,b`           | Only these model ids                            |
| `--prompts short-fact,x` | Only these prompt ids                           |
| `--runs N`               | Repeat each model × prompt N times              |
| `--concurrency N`        | In-flight request limit (default 2)             |

A full run across all five models costs roughly **$0.04**. Reports are written to
`reports/<timestamp>.md` and `.json`.

## What it measures

- **TTFT** is the delay until the first chunk carrying _visible_ text. Role-only chunks are
  skipped, and so is model reasoning, since a reasoning trace nobody sees is not yet a
  response. For a reasoning model this makes TTFT look worse than the API's own numbers,
  which is the honest answer for a chat UI.
- **Total** is when the stream ends.
- **Stop reason** is why the stream ended, normalized to one vocabulary across providers
  (`complete`, `length`, `tool_use`, `refusal`, `error`, `other`), with the provider's own raw
  value kept alongside it for debugging. A `length` stop means the token limit cut the answer
  short: it is counted per model in the summary table as `Truncated`, and the report calls out
  separately the cases where truncation left no visible text at all.
- **Cost** is taken from the provider wherever the provider reports it. OpenRouter returns a
  `cost` figure on its final stream chunk. The Messages API returns no cost, so it is computed
  from the per-model prices in `config/models.yaml`.

## Sample run

A full report from this latest three-run pass is in [docs/sample-report.md](docs/sample-report.md).

5 models, 6 prompts, 3 runs each, `$0.13053` total, no errors.

| Model                            | Median TTFT | Median total | Input tok | Output tok | Cost     | Errors | Truncated |
| -------------------------------- | ----------- | ------------ | --------- | ---------- | -------- | ------ | --------- |
| DeepSeek V4.1 Flash (OpenRouter) | 750 ms      | 2,519 ms     | 1,623     | 9,861      | $0.00577 | 0/18   | 7/18      |
| GPT-6 Luna (OpenRouter)          | 3,626 ms    | 3,915 ms     | 1,167     | 4,699      | $0.00247 | 0/18   | 0/18      |
| Haiku 5.5 (OpenRouter)           | 894 ms      | 1,640 ms     | 1,659     | 5,768      | $0.00305 | 0/18   | 3/18      |
| Sonnet 5.5 (Anthropic direct)    | 762 ms      | 3,202 ms     | 1,659     | 5,757      | $0.06089 | 0/18   | 0/18      |
| Sonnet 5.5 (OpenRouter)          | 789 ms      | 2,411 ms     | 1,659     | 5,504      | $0.05836 | 0/18   | 0/18      |

Sonnet 5.5 through both routes:

| Metric              | OpenRouter | Anthropic direct | Delta vs Anthropic direct |
| ------------------- | ---------- | ---------------- | ------------------------- |
| Median TTFT         | 789 ms     | 762 ms           | +4%                       |
| Median total        | 2,411 ms   | 3,202 ms         | -25%                      |
| Total input tokens  | 1,659      | 1,659            | +0%                       |
| Total output tokens | 5,504      | 5,757            | -4%                       |
| Total cost          | $0.05836   | $0.06089         | -4%                       |

## What the runs showed

**Per-token pricing matches; the gap is output length.** Both routes report identical input
token totals (1,659 each), so OpenRouter is injecting no hidden context. OpenRouter returned 253
fewer output tokens and cost `$0.00253` less: 253 tokens at $10 per million, which accounts for
the entire gap. Which route writes more varies from run to run. In an earlier one-run pass the
sign flipped: OpenRouter returned 66 more output tokens and cost `$0.00066` more.

**Pooled medians hide the aggregation overhead.** Median TTFT is 4% higher through OpenRouter and
median total is 25% lower, but both medians pool six prompts of very different lengths. Prompt by
prompt, OpenRouter's median TTFT was 58 to 511 ms higher on four of the six, which is the cost of
the extra hop. The pooled figures flip because Anthropic direct was slow to start on
`summarize-incident` in this run (2.2 to 3.3 s TTFT), and those runs land right where the median
falls.

**Reasoning models can spend an entire budget and return nothing.** DeepSeek V4.1 Flash sometimes
spends its whole token cap on reasoning and emits zero visible characters. That is recorded
directly as a `length` stop reason with `ttftMs: null` and a non-zero cost, which is the signal
worth watching: you were billed for output nobody received. The summary counts it as truncated and
the report flags it by name. In the sample run above it happened on 7 of DeepSeek's 18 runs,
including all three `refusal-boundary` runs, for 5,800 output tokens and `$0.00344` billed with
nothing to show. Haiku 5.5 also hit the cap on all three `refusal-boundary` runs, but each had
already written visible text, so they count as truncated without being flagged.

## Adding a model

Add an entry to `config/models.yaml`. Direct providers must list `pricing`, enforced at startup by
the schema in `src/config.ts`:

```yaml
- provider: openrouter
  id: anthropic/claude-sonnet-5.5
  label: Sonnet 5.5 (OpenRouter)
  family: sonnet-5.5 # models sharing a family get compared in the report
```

`supportsTemperature` is opt-in: temperature is sent only when an entry sets it to `true`, and
omitted otherwise. Anthropic deprecated `temperature` on Claude 4.7 and later, where any
non-default value is a 400, and OpenRouter silently drops the parameter for models that don't
list it in `supported_parameters` - so sending it by default made the "temperature 0" setting
misleading. Set `supportsTemperature: true` only for models whose OpenRouter
`supported_parameters` include `temperature` (as `deepseek/deepseek-v4.1-flash` does). The two
Sonnet entries leave it unset, so both routes are measured under identical settings.

## Design notes

**One result shape.** Every provider returns the same `RunResult`, so stats and reporting know
nothing about which provider produced a result. The one piece of provider-specific plumbing is error
classification: SDK errors are normalized into `RequestError` with a `kind` and an HTTP `status`, so
retry policy lives in the runner alone.

**Everything streams.** TTFT is unmeasurable without streaming, and streaming is what separates the
aggregator's first-token overhead from total latency.

**SDK retries are off** (`maxRetries: 0` on both clients) so the tool's own retry layer is the only
one, and the `attempts` field in the report stays honest.

**The report is generated, not prettified.** Markdown tables are column-aligned in code. Running
Prettier over a finished report would rewrite the models' code samples using this repository's
settings, so the report would no longer show what the models actually returned.

## Layout

```
src/
  index.ts       CLI: parse flags, load config, run, write report
  config.ts      zod schemas for models.yaml / prompts.yaml
  types.ts       RunResult, Provider, RequestError
  format.ts      shared value formatters (ms, usd, num, pct)
  runner.ts      concurrency, per-attempt timeout, error conversion
  stats.ts       median, sums, per-model rollups
  report.ts      Markdown and JSON writers
  providers/     openrouter.ts, anthropic.ts, request-error.ts
config/          models.yaml, prompts.yaml
docs/adr/        architecture decision records
```

## Model Usage

This project started with a plan from Claude on how to implement it and then I wrote the code for
the OpenRouter provider, runner, types, config logic, and initial `runner.ts`. After that I used
Claude and Space Bunny (a stealth model) from OpenCode to analyze what I'd done, create the
Anthropic provider and finish the `report.ts` file. After that it's been back and forth with Claude
and Space Bunny to try and iron out anything I had missed. Running Sonnet directly was also a way
to get hands-on with the Messages API.

## Further reading

- [SCOPE.md](SCOPE.md) - what the project set out to build
- [ADR 0001](docs/adr/0001-streaming-and-one-result-shape.md) - why stream, why one shape, why
  retries off
- [ADR 0002](docs/adr/0002-temperature-opt-in.md) - why temperature is opt-in per model
