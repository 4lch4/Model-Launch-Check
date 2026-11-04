# 0002 — Temperature is opt-in per model

- Status: accepted
- Date: 2026-11-03

## Context

ADR 0001 records a bug that shaped the sampling settings: Sonnet 5.5 rejects `temperature` while
OpenRouter accepts and silently drops it, so a per-model flag was added to suppress the parameter
on both Sonnet routes. That flag defaulted to sending temperature, with models opting out.

The default is now backwards. Anthropic has deprecated `temperature`, `top_p` and `top_k` on
Claude 4.7 and later models: a non-default value returns a 400, and the recommended replacement is
to omit the parameter and guide behavior through the prompt. Anthropic documents this under API
parameter deprecations:
<https://platform.claude.com/docs/en/about-claude/model-deprecations#api-parameter-deprecations>.
Every current Claude model is 4.7 or later, so any new direct Claude entry without the flag would
fail on every prompt.

OpenRouter has the same problem in a quieter form. It accepts `temperature` for every slug and
drops it for models that do not list it in `supported_parameters`, so the old default made the
"temperature 0" setting in `config/prompts.yaml` misleading: the benchmark reported a sampling
setting that some models never received.

## Decision

Temperature is opt-in per model. The flag keeps its name, `supportsTemperature`, but its meaning
flips: `temperature` is sent only when a model entry sets `supportsTemperature: true`. Unset or
`false` means the parameter is omitted from the request.

`config/prompts.yaml` keeps `defaults.temperature: 0` as the value used by opted-in models. The
value is not sent to a model that did not ask for it.

This supersedes the temperature point in ADR 0001's Consequences. That ADR's reasoning still
holds — a cross-route comparison is only meaningful when both routes run the same settings — but
the mechanism is now opt-in rather than opt-out, and the flag is no longer set on the Sonnet
entries.

## Consequences

- Both Sonnet routes are still measured under identical settings: neither sends `temperature`, so
  the comparison in the report remains honest.
- New Claude models no longer fail with a 400 by default. A model that rejects the parameter is
  now the default case rather than an entry someone has to remember to annotate.
- Adding a model that honors temperature takes one extra check: confirm `temperature` appears in
  that slug's OpenRouter `supported_parameters` (or the direct provider's docs) before setting
  `supportsTemperature: true`. As of 2026-11-03 only `deepseek/deepseek-v4.1-flash` of the
  configured OpenRouter models lists it.
- What each configured model actually receives does not change. OpenRouter already dropped the
  value for Haiku 5.5 and GPT-6 Luna, both Sonnet routes already omitted it, and DeepSeek V4.1
  Flash still gets 0. Earlier reports stay comparable; the config now says what each model gets.
