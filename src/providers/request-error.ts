import {
  APIError as AnthropicAPIError,
  APIUserAbortError as AnthropicAbortError,
  APIConnectionError as AnthropicConnectionError,
} from '@anthropic-ai/sdk'
import {
  APIError as OpenAIAPIError,
  APIUserAbortError as OpenAIAbortError,
  APIConnectionError as OpenAIConnectionError,
} from 'openai'

import { RequestError, type RunResult } from '../types'

// Both SDKs raise the same error class names, so one mapper covers every provider.
// runner.ts decides retries from `kind` and `status` alone and never asks which SDK failed.
export function toRequestError(error: unknown, partial: RunResult): RequestError {
  if (error instanceof RequestError) return error

  const context = { partial, streamed: partial.text.length > 0 }

  // Order matters: the abort and connection classes extend the base APIError.
  if (error instanceof AnthropicAbortError || error instanceof OpenAIAbortError) {
    return new RequestError(error.message, 'timeout', context)
  }

  if (error instanceof AnthropicConnectionError || error instanceof OpenAIConnectionError) {
    return new RequestError(error.message, 'network', context)
  }

  if (error instanceof AnthropicAPIError || error instanceof OpenAIAPIError) {
    return new RequestError(error.message, 'http', { ...context, status: error.status })
  }

  return new RequestError(error instanceof Error ? error.message : String(error), 'stream', context)
}
