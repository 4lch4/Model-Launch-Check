#!/usr/bin/env bun
import { parseArgs } from 'node:util'
import { loadConfig, type ProviderNames } from './config'
import { createProvider } from './providers'
import { runAll } from './runner'
import type { Provider } from './types'

const providers = new Map<ProviderNames, Provider>()

const { values } = parseArgs({
  args: Bun.argv.slice(2),
  options: {
    dev: { type: 'boolean' },
    models: { type: 'string' },
    prompts: { type: 'string' },
    runs: { type: 'string' },
    concurrency: { type: 'string' },
  },
})

// Used to make sure we only instantiate each provider once per run, not once per model test.
function getProvider(name: ProviderNames): Provider {
  const cached = providers.get(name)
  if (cached) return cached

  const created = createProvider(name)
  providers.set(name, created)

  return created
}

async function main() {
  const { models: allModels, prompts: allPrompts } = await loadConfig()

  const runs = Number(values.runs ?? 1)
  const modelIds = values.models?.split(',') ?? []
  const promptIds = values.prompts?.split(',') ?? []

  let models = values.dev ? allModels.filter(m => m.dev) : allModels
  if (modelIds.length) models = models.filter(m => modelIds.includes(m.id))

  let prompts = allPrompts
  if (promptIds.length) prompts = prompts.filter(p => promptIds.includes(p.id))

  const jobs = models.flatMap(model =>
    prompts.flatMap(prompt => Array.from({ length: runs }, () => ({ model, prompt }))),
  )

  console.log(`${models.length} models x ${prompts.length} prompts x ${runs} run(s)`)

  const results = await runAll(jobs, getProvider, {
    concurrency: Number(values.concurrency ?? 2),
    timeoutMs: 60_000,
  })

  console.table(
    results.map(({ label, promptId, ttftMs, totalMs, costUsd, attempts, error }) => ({
      label,
      promptId,
      ttftMs,
      totalMs,
      costUsd,
      attempts,
      error: error ?? '',
    })),
  )
}

main().catch(err => {
  console.error(`[main]: Error caught:`, err)
  process.exit(1)
})
