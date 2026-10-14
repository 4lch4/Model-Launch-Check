import type { ModelConfig, ProviderNames, ResolvedPrompt } from './config'
import { ms, usd } from './format'
import { type Provider, RequestError, type RunResult } from './types'

export type Job = { model: ModelConfig; prompt: ResolvedPrompt }
export type GetProvider = (name: ProviderNames) => Provider

export type RunnerOptions = { concurrency: number; timeoutMs: number }

export async function runAll(
  jobs: Job[],
  getProvider: GetProvider,
  opts: RunnerOptions,
): Promise<RunResult[]> {
  const queue = [...jobs]
  const results: RunResult[] = []

  const worker = async () => {
    for (let job = queue.shift(); job; job = queue.shift()) {
      const result = await runJob(job, getProvider, opts)
      results.push(result)
      logResult(result)
    }
  }

  const workers = Array.from({ length: Math.min(opts.concurrency, queue.length) }, worker)
  await Promise.all(workers)

  return results.sort(
    (a, b) => a.label.localeCompare(b.label) || a.promptId.localeCompare(b.promptId),
  )
}

const MAX_RETRY_ATTEMPTS = 3

async function runJob(job: Job, getProvider: GetProvider, opts: RunnerOptions): Promise<RunResult> {
  const started = performance.now()

  for (let attempt = 1; attempt <= MAX_RETRY_ATTEMPTS ; attempt++) {
    try {
      const provider = getProvider(job.model.provider)
      const result = await provider.run(job.model, job.prompt, AbortSignal.timeout(opts.timeoutMs))

      return { ...result, attempts: attempt }
    } catch (error) {
      if (attempt === MAX_RETRY_ATTEMPTS || !isRetryable(error)) {
        return toFailedResult(error, job, Math.round(performance.now() - started), attempt)
      }

      await Bun.sleep(backoffMs(attempt))
    }
  }

  throw new Error('[runner][runJob]: retry loop exited without a result')
}

// ADR 0001: retry 429, 5xx, network errors and timeouts, and only while nothing has streamed.
// Once text has arrived, a retry would double-charge and splice two answers together.
function isRetryable(error: unknown): boolean {
  if (!(error instanceof RequestError) || error.context.streamed) return false
  if (error.kind === 'network' || error.kind === 'timeout') return true

  const status = error.context.status

  return error.kind === 'http' && status !== undefined && (status === 429 || status >= 500)
}

// 0.5 s, then 1 s, plus up to 250 ms of jitter so concurrent workers don't retry in lockstep.
function backoffMs(attempt: number): number {
  return 500 * 2 ** (attempt - 1) + Math.random() * 250
}

function toFailedResult(error: unknown, job: Job, elapsedMs: number, attempts: number): RunResult {
  if (error instanceof RequestError) {
    return { ...error.context.partial, attempts, error: error.message }
  }

  // For any failed results I haven't anticipated.
  return {
    attempts,
    costUsd: null,
    error: error instanceof Error ? error.message : String(error),
    inputTokens: null,
    label: job.model.label,
    model: job.model.id,
    outputTokens: null,
    promptId: job.prompt.id,
    provider: job.model.provider,
    text: '',
    totalMs: elapsedMs,
    ttftMs: null,
  }
}

function logResult(result: RunResult) {
  if (result.error) {
    console.log(`[runner][ERR]: ${result.label} / ${result.promptId}: ${result.error}`)
    return
  }

  console.log(
    `[runner][info]: ${result.label} / ${result.promptId}: ` +
      `ttft ${ms(result.ttftMs, 'n/a')}, total ${ms(result.totalMs, 'n/a')}, ` +
      `${usd(result.costUsd, 'n/a')}`,
  )
}
