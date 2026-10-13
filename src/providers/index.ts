import { OpenAI } from 'openai'

import type { ProviderNames } from '../config'
import type { Provider} from '../types'
import { OpenRouterProvider } from './openrouter'

export function createProvider(name: ProviderNames): Provider {
  switch (name) {
    case 'openrouter':
      return new OpenRouterProvider(new OpenAI({
        apiKey: requireEnv('OPENROUTER_API_KEY'),
        baseURL: 'https://openrouter.ai/api/v1',
        maxRetries: 0,
        defaultHeaders: {
          'HTTP-Referer': 'https://github.com/4lch4/model-launch-check',
          'X-Title': 'model-launch-check'
        }
      }))
    case 'anthropic':
      throw new Error('Anthropic provider not yet implemented.')
  }
}

function requireEnv(key: string): string {
  const value = process.env[key]
  if (!value) throw new Error(`Missing ${key}. Check your .env file.`)

  return value
}