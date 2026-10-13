#!/usr/bin/env bun
import { loadConfig, type ProviderNames } from './config'
import { createProvider } from './providers'
import type { Provider } from './types'

const providers = new Map<ProviderNames, Provider>()

// Used to make sure we only instantiate each provider once per run, not once per model test.
function getProvider(name: ProviderNames): Provider {
  const cached = providers.get(name)
  if (cached) return cached

  const created = createProvider(name)
  providers.set(name, created)

  return created
}

async function main() {
  const { models, prompts } = await loadConfig()

  // Only get dev models for an initial test
  for (const model of models.filter(m => m.dev)) {
    const provider = getProvider(model.provider)
    const result = await provider.run(model, prompts[0]!, AbortSignal.timeout(60_000)) // 60s timeout

    console.log(result)
  }
}

main().catch(err => {
  console.error(`[main]: Error caught:`, err)
  process.exit(1)
})
