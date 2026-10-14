import { Anthropic } from '@anthropic-ai/sdk'
import { OpenAI } from 'openai'

import type { ProviderNames } from '../config'
import type { Provider } from '../types'
import { AnthropicProvider } from './anthropic'
import { OpenRouterProvider } from './openrouter'

export function createProvider(name: ProviderNames): Provider {
  switch (name) {
    case 'openrouter':
      return new OpenRouterProvider(
        new OpenAI({
          apiKey: requireEnv('OPENROUTER_API_KEY'),
          baseURL: 'https://openrouter.ai/api/v1',
          maxRetries: 0,
          defaultHeaders: {
            'HTTP-Referer': 'https://github.com/4lch4/model-launch-check',
            'X-Title': 'model-launch-check',
          },
        }),
      )
    case 'anthropic':
      return new AnthropicProvider(
        new Anthropic({
          apiKey: requireEnv('ANTHROPIC_API_KEY'),
          // No baseURL: this talks to Anthropic directly, not through an aggregator.
          maxRetries: 0,
        }),
      )
  }
}

function requireEnv(key: string): string {
  const value = process.env[key]
  if (!value) throw new Error(`Missing ${key}. Check your .env file.`)

  return value
}
