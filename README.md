# model-launch-check

A small TypeScript (Bun) CLI that runs the same prompt set across several models through
OpenRouter and through Anthropic's Messages API directly, then reports time-to-first-token,
total latency, token usage and cost side by side.

One model (Claude Sonnet 5.5) is deliberately run through both routes, so the report compares the
aggregator against the provider for the same underlying model and to get experience with the Anthropic Messages API.

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
- **Cost** is taken from the provider wherever the provider reports it. OpenRouter returns a
  `cost` figure on its final stream chunk. The Messages API returns no cost, so it is computed
  from the per-model prices in `config/models.yaml`.

A full sample output is in [docs/sample-report.md](docs/sample-report.md).

## Sample run

Five models, six prompts, one run each, `$0.0431` total, no errors.

| Model                            | Median TTFT | Median total | Input tok | Output tok | Cost     | Errors |
| -------------------------------- | ----------- | ------------ | --------- | ---------- | -------- | ------ |
| DeepSeek V4.1 Flash (OpenRouter) | 3,108 ms    | 3,153 ms     | 541       | 3,148      | $0.00258 | 0/6    |
| GPT-6 Luna (OpenRouter)          | 2,220 ms    | 2,904 ms     | 389       | 1,751      | $0.00091 | 0/6    |
| Haiku 5.5 (OpenRouter)           | 1,123 ms    | 1,982 ms     | 553       | 1,741      | $0.00093 | 0/6    |
| Sonnet 5.5 (Anthropic direct)    | 828 ms      | 2,575 ms     | 553       | 1,792      | $0.01903 | 0/6    |
| Sonnet 5.5 (OpenRouter)          | 1,041 ms    | 2,732 ms     | 553       | 1,858      | $0.01969 | 0/6    |

The same model through both routes:

| Metric              | OpenRouter | Anthropic direct | Delta vs Anthropic direct |
| ------------------- | ---------- | ---------------- | ------------------------- |
| Median TTFT         | 1,041 ms   | 828 ms           | +26%                      |
| Median total        | 2,732 ms   | 2,575 ms         | +6%                       |
| Total input tokens  | 553        | 553              | +0%                       |
| Total output tokens | 1,858      | 1,792            | +4%                       |
| Total cost          | $0.01969   | $0.01903         | +3%                       |

## What the runs showed

**Cost parity is exact; the gap is token count, not margin.** Both routes report identical input
token totals (553 each), so OpenRouter is injecting no hidden context. The `$0.00066` cost
difference is 66 extra output tokens at $10 per million, which is $0.00001 a token, and accounts for
the entire gap.

**Aggregation overhead shows up in TTFT, not in total latency.** +26% on first token against +6% on
total.

**Reasoning models can spend an entire budget and return nothing.** On some prompts, DeepSeek V4.1
Flash hit the 800-token cap on reasoning and emitted zero visible characters. That is recorded as
`ttftMs: null` with a non-zero cost, which is the signal worth watching: you were billed for output
nobody received. It did not occur in the sample run above, but showed up repeatedly in earlier ones.

## Adding a model

Add an entry to `config/models.yaml`. Direct providers must list `pricing`, enforced at startup by
the schema in `src/config.ts`:

```yaml
- provider: openrouter
  id: anthropic/claude-sonnet-5.5
  label: Sonnet 5.5 (OpenRouter)
  family: sonnet-5.5 # models sharing a family get compared in the report
  supportsTemperature: false # this model rejects the parameter
```

`supportsTemperature` exists because Sonnet 5.5 deprecated `temperature` and rejects it with a 400,
while OpenRouter silently drops it. It is set on **both** Sonnet entries so the two routes are
measured under identical settings rather than quietly differing.

## Design notes

**One result shape.** Every provider returns the same `RunResult`, so stats and reporting know
nothing about which provider produced a result. The one piece of provider-specific plumbing is error
classification: SDK errors are normalized into `RequestError` with a `kind` and an HTTP `status`, so
retry policy lives in the runner alone.

**Everything streams.** TTFT is unmeasurable without streaming, and streaming is what makes the
aggregator's per-token overhead visible in the first place.

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
and Space Bunny to try and iron out anything I had missed.

## Further reading

- [SCOPE.md](SCOPE.md) — what the project set out to build
- [ADR 0001](docs/adr/0001-streaming-and-one-result-shape.md) — why stream, why one shape, why
  retries off
