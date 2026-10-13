# model-launch-check

TypeScript (Bun) CLI that runs the same prompts across models via OpenRouter and Anthropic's
Messages API and reports quality, latency and cost side by side.

**Read `SCOPE.md` first.** It defines the four boxes, the design and the cut list.

## Commands

- `bun install`: install dependencies
- `bun run start -- --dev`: cheap run (models marked `dev: true` only)
- `bun run typecheck`: `tsc --noEmit`
- `bun run lint`: ESLint (typescript-eslint recommended)
- `bun run format`: Prettier write
- `bun run format:check`: Prettier check (CI runs this)
- `bun run check`: typecheck + lint + format check

## Rules

- Prettier with no semicolons (`.prettierrc`). Run `bun run format` before committing.
- Markdown lines at most 100 characters.
- Every provider returns the `RunResult` shape from `src/types.ts`. Nothing downstream of the
  providers may know which provider produced a result.
- SDK retries stay off (`maxRetries: 0`). Retries live in `src/runner.ts` only.
- Never make model calls in CI or tests. They cost money and need secrets.
- Never commit `.env` or anything under `reports/`.
