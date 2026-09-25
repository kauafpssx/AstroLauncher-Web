const numberFormat = new Intl.NumberFormat('pt-BR')
const dateFormat = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
})

export function formatNumber(value: number): string {
  return numberFormat.format(value)
}

export function formatDate(iso: string): string {
  return dateFormat.format(new Date(iso))
}

export function formatRelativeTime(iso: string, now = Date.now()): string {
  const minutes = Math.max(
    1,
    Math.floor((now - new Date(iso).getTime()) / 60_000),
  )
  if (minutes < 60) return `há ${minutes} min`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `há ${hours} h`
  const days = Math.floor(hours / 24)
  return `há ${days} ${days === 1 ? 'dia' : 'dias'}`
}

export function formatMegabytes(bytes: number): string {
  return `${(bytes / 1_048_576).toFixed(1).replace('.', ',')} MB`
}
