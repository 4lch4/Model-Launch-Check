import type { ModelConfig, ProviderNames, ResolvedPrompt } from './config'

export type RunResult = {
  provider: ProviderNames
  model: string // model id
  label: string // model label
  promptId: string
  text: string
  ttftMs: number | null // null if no tokens returned
  totalMs: number
  inputTokens: number | null // null if no tokens returned
  outputTokens: number | null // null if no tokens returned
  costUsd: number | null // null if no tokens returned
  attempts: number // 1 if no retries
  error?: string
}

export type Provider = {
  run(model: ModelConfig, prompt: ResolvedPrompt, signal: AbortSignal): Promise<RunResult>
}

export type RequestErrorKind = 'http' | 'network' | 'timeout' | 'stream'

export class RequestError extends Error {
  constructor(
    message: string,
    readonly kind: RequestErrorKind,
    readonly context: { status?: number; streamed?: boolean; partial: RunResult },
  ) {
    super(message)
    this.name = 'RequestError'
  }
}
