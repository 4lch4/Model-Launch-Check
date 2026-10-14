import type { ProviderNames } from './config'
import type { RunResult } from './types'

export type Metrics = {
  runs: number
  errors: number
  medianTtftMs: number | null
  medianTotalMs: number | null
  totalInputTokens: number | null
  totalOutputTokens: number | null
  totalCostUsd: number | null
}

export function median(values: number[]): number | null {
  if (values.length === 0) return null
  const sorted = [...values].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)

  return sorted.length % 2 === 0 ? (sorted[mid - 1]! + sorted[mid]!) / 2 : sorted[mid]!
}

export function sum(values: Array<number | null>): number | null {
  const nums = values.filter((v): v is number => v !== null)

  return nums.length > 0 ? nums.reduce((a, b) => a + b, 0) : null
}

export function metrics(results: RunResult[]): Metrics {
  const ok = results.filter(r => !r.error)

  return {
    runs: results.length,
    errors: results.length - ok.length,
    medianTtftMs: median(ok.flatMap(r => (r.ttftMs === null ? [] : [r.ttftMs]))),
    medianTotalMs: median(ok.map(r => r.totalMs)),
    totalInputTokens: sum(ok.map(r => r.inputTokens)),
    totalOutputTokens: sum(ok.map(r => r.outputTokens)),
    totalCostUsd: sum(ok.map(r => r.costUsd)),
  }
}

export function groupBy<K>(results: RunResult[], key: (r: RunResult) => K): Map<K, RunResult[]> {
  const groups = new Map<K, RunResult[]>()

  for (const r of results) {
    const k = key(r)
    const list = groups.get(k)
    if (list) list.push(r)
    else groups.set(k, [r])
  }

  return groups
}

export function summarizeByModel(results: RunResult[]): Array<
  Metrics & {
    key: string
    label: string
    provider: ProviderNames
    model: string
  }
> {
  const groups = groupBy(results, r => `${r.provider}/${r.model}`)

  return [...groups.entries()].map(([key, group]) => {
    const first = group[0]!

    return {
      key,
      label: first.label,
      provider: first.provider,
      model: first.model,
      ...metrics(group),
    }
  })
}

export function totalCostUsd(results: RunResult[]): number | null {
  return sum(results.map(r => r.costUsd))
}
