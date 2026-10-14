import type { ModelConfig, ResolvedPrompt } from './config'
import { groupBy, summarizeByModel, totalCostUsd } from './stats'
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

  await Bun.write(`${base}.json`, JSON.stringify(json))
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
    // renderHead
  ]

  return ''
}

function renderHeader(input: ReportInput): string {
  const { models, prompts, results, runs } = input

  return [
    `# model-launch-check report`,
    '',
    `_${new Date().toISOString()}_ - ${models.length} models - ${prompts.length} prompts` +
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
  const header = `### ${prompt.id} - ${prompt.kind}\n`

  const body = prompt.text
    .split('\n')
    .map(line => `> ${line}`)
    .join('\n')

  const outputs = results.map(r => {
    const metrics = r.error
      ? `<summary>${r.label} - **error** - ${r.error}</summary>`
      : `<summary>${r.label} - ttft ${ms(r.ttftMs)} - total ${ms(r.totalMs)} - ${usd(r.costUsd)}</summary>`

    return `<details>\n${metrics}\n\n${r.text}\n\n</details>`
  })

  return `${header}\n${body}\n\n${outputs.join('\n\n')}\n`
}

const row = (cells: string[]) => `| ${cells.join(' | ')} |`
function table(rows: string[][]): string {
  const [head, ...body] = rows

  return [row(head!), row(head!.map(() => '---')), ...body.map(row)].join('\n')
}

//#region Formatting Helpers
const ms = (n: number | null) => (n === null ? '-' : `${Math.round(n).toLocaleString()} ms`)
const usd = (n: number | null) => (n === null ? '-' : `$${n.toFixed(5)}`)
const pct = (n: number) => `${n >= 0 ? '+' : ''}${n.toFixed(0)}%`
const num = (n: number | null) => (n === null ? '-' : n.toLocaleString())
//#endregion Formatting Helpers
