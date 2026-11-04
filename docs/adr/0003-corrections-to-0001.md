# 0003 — Corrections to ADR 0001

- Status: accepted
- Date: 2026-11-03

## Context

ADR 0001 was written before the comparison runs in the README and `docs/sample-report.md`
existed. Four statements in its Context and Consequences are not supported by those runs or by the
code. Accepted ADRs are not edited, so the corrections are recorded here.

1. **"Of the models available through us."** The Context is phrased as if written from inside an
   aggregator. The tool is an outside check: it calls OpenRouter and Anthropic as a customer would.
2. **Aggregator overhead as a per-token cost.** ADR 0001 says the overhead is per-token, so it
   shows up between the first token and the last. The three-run report in
   `docs/sample-report.md` shows the opposite. Prompt by prompt, Sonnet 5.5 through OpenRouter
   had a higher median TTFT than the direct route on four of six prompts (58 to 511 ms), but a
   lower median total on all six. Whatever the extra hop costs is paid before the first token,
   not added per token.
3. **"Moved by up to 3×. The report says so."** The report says nothing about run-to-run noise,
   and it prints only medians, not per-run timings, so the 3× figure cannot be checked from
   anything in the repository.
4. **"The comparison table is explicit about which is which by construction."** The comparison
   table does not label which cost was reported by the provider and which was computed from
   configured prices. The README's "What it measures" section states it.

## Decision

ADR 0001's decisions stand unchanged: stream every request, normalize every provider into one
`RunResult`, and keep SDK retries off. Where ADR 0001 and this record disagree on the four points
above, this record wins:

1. The tool is described as an outside check against an aggregator, not as the aggregator's own.
2. Aggregator overhead is described as first-token overhead, read from TTFT. Streaming matters
   because it separates the delay before the first token from the time to finish.
3. The 3× noise figure is withdrawn. The reason `--runs` exists, that single-run medians are
   noisy, still holds.
4. The README is the record of which cost source each provider uses.

## Consequences

- No code changes. Reports and the README read as they are.
- The README's "Everything streams" note and its per-prompt TTFT finding in "What the runs
  showed" already treat overhead as first-token overhead, so they agree with this record.
- A future claim about run-to-run noise needs per-run timings in the report, or a pointer to the
  JSON output, before it is made.
