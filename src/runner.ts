import type { ModelConfig, ProviderNames, ResolvedPrompt } from './config'
import { RequestError, type Provider, type RunResult } from './types'

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

async function runJob(job: Job, getProvider: GetProvider, opts: RunnerOptions): Promise<RunResult> {
  const started = performance.now()

  try {
    const provider = getProvider(job.model.provider)

    return await provider.run(job.model, job.prompt, AbortSignal.timeout(opts.timeoutMs))
  } catch (error) {
    return toFailedResult(error, job, Math.round(performance.now() - started))
  }
}

function toFailedResult(error: unknown, job: Job, elapsedMs: number): RunResult {
  if (error instanceof RequestError) {
    return { ...error.context.partial, attempts: 1, error: error.message }
  }

  // For any failed results I haven't anticipated.
  return {
    attempts: 1,
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
      `ttft ${result.ttftMs}ms, total ${result.totalMs}ms, $${result.costUsd?.toFixed(5)}`,
  )
}
