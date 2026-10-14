import type { ModelConfig, ProviderNames, ResolvedPrompt } from './config'
import { groupBy, metrics, summarizeByModel, totalCostUsd } from './stats'
import type { RunResult } from './types'

const REPORTS_DIR = `${import.meta.dir}/../reports`

export async function writeReports(input: ReportInput) {
  const now = new Date().toISOString()
  const stamp = now.replace(/[:.]/g, '-')
  const base = `${REPORTS_DIR}/${stamp}`

  const json = {
    generatedAt: now,
    runs: input.runs,
    models: input.models.map(m => ({ provider: m.provider, id: m.id, label: m.label })),
    promptIds: input.prompts.map(p => p.id),
    results: input.results,
  }

  await Bun.write(`${base}.json`, JSON.stringify(json, null, 2))
  await Bun.write(`${base}.md`, renderMarkdown(input))

  return { md: `${base}.md`, json: `${base}.json` }
}

export type ReportInput = {
  results: RunResult[]
  prompts: ResolvedPrompt[]
  models: ModelConfig[]
  runs: number
}

export function renderMarkdown(input: ReportInput): string {
  const byPrompt = groupBy(input.results, r => r.promptId)

  const sections = [
    renderHeader(input),
    ['## Summary', '', renderSummaryTable(input.results)].join('\n'),
    '## Prompts',
    ...input.prompts.map(p => renderPromptSection(p, byPrompt.get(p.id) ?? [])),
    renderComparisonSection(input),
  ]

  return `${sections
    .filter(Boolean)
    .map(s => s.trim())
    .join('\n\n')}\n`
}

function renderHeader(input: ReportInput): string {
  const { models, prompts, results, runs } = input

  return [
    '# model-launch-check report',
    '',
    `_${new Date().toISOString()}_ - ${models.length} models - ${prompts.length} prompts - ` +
      `${runs} run(s) - **${usd(totalCostUsd(results))}** total`,
  ].join('\n')
}

function renderSummaryTable(results: RunResult[]): string {
  const summaries = summarizeByModel(results)
  if (summaries.length === 0) return '_No results._'

  return table([
    [
      'Model',
      'Provider',
      'Median TTFT',
      'Median total',
      'Input tok',
      'Output tok',
      'Cost',
      'Errors',
    ],
    ...summaries.map(s => [
      s.label,
      s.provider,
      ms(s.medianTtftMs),
      ms(s.medianTotalMs),
      num(s.totalInputTokens),
      num(s.totalOutputTokens),
      usd(s.totalCostUsd),
      `${s.errors}/${s.runs}`,
    ]),
  ])
}

function renderPromptSection(prompt: ResolvedPrompt, results: RunResult[]): string {
  const sectionHeader = `### ${prompt.id} - ${prompt.kind}`
  const body = prompt.text
    .split('\n')
    .map(line => `> ${line}`)
    .join('\n')

  // An interrupted run leaves some prompts with no results at all.
  if (results.length === 0) return [sectionHeader, '', body, '', '_No results._'].join('\n')

  const byModel = groupBy(results, r => `${r.provider}/${r.model}`)

  const blocks = [...byModel.values()].map(group => {
    const first = group[0]!
    const m = metrics(group)
    const runsNote = group.length > 1 ? ` - ${group.length} runs` : ''

    // The collapsed view stays one line; the full metrics sit under the output.
    const summary = `<summary>${first.label}${runsNote} - median ttft ${ms(m.medianTtftMs)}</summary>`
    const statLine =
      `ttft ${ms(m.medianTtftMs)} - total ${ms(m.medianTotalMs)} - ` +
      `${num(m.totalInputTokens)} in - ${num(m.totalOutputTokens)} out - ` +
      `${usd(m.totalCostUsd)} total`

    const outputs = group.map((r, i) => {
      const runHead = group.length > 1 ? `**Run ${i + 1}**\n\n` : ''

      return runHead + (r.error ? `**Error:** ${r.error}` : r.text)
    })

    return `<details>\n${summary}\n\n${statLine}\n\n${outputs.join('\n\n---\n\n')}\n\n</details>`
  })

  return [sectionHeader, '', body, '', blocks.join('\n\n')].join('\n')
}

function renderComparisonSection(input: ReportInput): string {
  const families = groupBy(input.results, familyLookup(input.models))

  const blocks = [...families.entries()]
    // Only a family seen through more than one provider is comparable.
    .filter(([, results]) => new Set(results.map(r => r.provider)).size > 1)
    .map(([family, results]) => renderFamilyComparison(family, results))

  return blocks.length > 0 ? ['## OpenRouter vs direct', '', ...blocks].join('\n') : ''
}

function renderFamilyComparison(family: string, results: RunResult[]): string {
  const columns = [...groupBy(results, r => r.provider).entries()].map(([provider, rs]) => ({
    label: PROVIDER_LABELS[provider],
    m: metrics(rs),
  }))

  if (columns.length < 2) return ''

  const left = columns[0]!
  const right = columns[1]!

  // Left relative to right: aggregator overhead measured against the provider.
  const delta = (a: number | null, b: number | null) =>
    a === null || b === null || b === 0 ? '-' : pct(((a - b) / b) * 100)

  const rows: string[][] = [
    [
      'Median TTFT',
      ms(left.m.medianTtftMs),
      ms(right.m.medianTtftMs),
      delta(left.m.medianTtftMs, right.m.medianTtftMs),
    ],
    [
      'Median total',
      ms(left.m.medianTotalMs),
      ms(right.m.medianTotalMs),
      delta(left.m.medianTotalMs, right.m.medianTotalMs),
    ],
    [
      'Total input tokens',
      num(left.m.totalInputTokens),
      num(right.m.totalInputTokens),
      delta(left.m.totalInputTokens, right.m.totalInputTokens),
    ],
    [
      'Total output tokens',
      num(left.m.totalOutputTokens),
      num(right.m.totalOutputTokens),
      delta(left.m.totalOutputTokens, right.m.totalOutputTokens),
    ],
    [
      'Total cost',
      usd(left.m.totalCostUsd),
      usd(right.m.totalCostUsd),
      delta(left.m.totalCostUsd, right.m.totalCostUsd),
    ],
  ]

  return [`### ${family}`, '', table([['Metric', left.label, right.label, 'Delta'], ...rows])].join(
    '\n',
  )
}

// Models sharing a family are the same model reached through different providers.
function familyLookup(models: ModelConfig[]): (r: RunResult) => string {
  const byKey = new Map(models.map(m => [`${m.provider}/${m.id}`, m.family ?? m.label]))

  return r => byKey.get(`${r.provider}/${r.model}`) ?? r.label
}

//#region Formatting Helpers
const PROVIDER_LABELS: Record<ProviderNames, string> = {
  openrouter: 'OpenRouter',
  anthropic: 'Anthropic direct',
}

const row = (cells: string[]) => `| ${cells.join(' | ')} |`
function table(rows: string[][]): string {
  const [head, ...body] = rows

  return [row(head!), row(head!.map(() => '---')), ...body.map(row)].join('\n')
}

const ms = (n: number | null) => (n === null ? '-' : `${Math.round(n).toLocaleString()} ms`)
const usd = (n: number | null) => (n === null ? '-' : `$${n.toFixed(5)}`)
const pct = (n: number) => `${n >= 0 ? '+' : ''}${n.toFixed(0)}%`
const num = (n: number | null) => (n === null ? '-' : n.toLocaleString())
//#endregion Formatting Helpers
