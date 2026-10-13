# model-launch-check

This repo is home to my small CLI app built to compare the quality, latency, and cost of different LLMs using OpenRouter and Anthropic's Messages API. It's built as a way to familiarize myself with OpenRouter and what their launch playbook calls for.

I had Claude build out a scaffold for me and then I do the rest manually so I'm able to absorb as much as possible.

> Work in progress. See [SCOPE.md](SCOPE.md).

## Quick start

```sh
bun install
cp .env.example .env   # add OPENROUTER_API_KEY and ANTHROPIC_API_KEY
bun run start -- --dev
```
