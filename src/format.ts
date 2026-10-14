// Value formatters shared by the runner's log output and the Markdown report, so a
// missing metric reads the same wherever it shows up. Each takes an override for
// what to print when a value is null, because the report wants a dash and a
// terminal log reads better with an explicit "n/a".
export const ms = (n: number | null, nullPlaceholder = '-') =>
  n === null ? nullPlaceholder : `${Math.round(n).toLocaleString()} ms`

export const usd = (n: number | null, nullPlaceholder = '-') =>
  n === null ? nullPlaceholder : `$${n.toFixed(5)}`

export const num = (n: number | null, nullPlaceholder = '-') =>
  n === null ? nullPlaceholder : n.toLocaleString()

export const pct = (n: number) => `${n >= 0 ? '+' : ''}${n.toFixed(0)}%`
