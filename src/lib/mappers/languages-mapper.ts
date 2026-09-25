import type { GithubLanguagesDTO } from '@/types/github-languages'
import type { LanguageShare } from '@/types/stack'

const MAX_SEGMENTS = 5

// Top N linguagens por bytes; o resto vira "Outras" no último segmento
export function toLanguageShares(
  dto: GithubLanguagesDTO,
  colors: string[],
): LanguageShare[] {
  const entries = Object.entries(dto).sort(([, a], [, b]) => b - a)
  const total = entries.reduce((sum, [, bytes]) => sum + bytes, 0)
  if (total === 0) return []
  const head = entries.slice(0, MAX_SEGMENTS - 1)
  const rest = entries.slice(MAX_SEGMENTS - 1)
  const restBytes = rest.reduce((sum, [, bytes]) => sum + bytes, 0)
  const grouped: [string, number][] =
    rest.length === 1
      ? entries.slice(0, MAX_SEGMENTS)
      : [...head, ['Outras', restBytes]]
  return grouped
    .filter(([, bytes]) => bytes > 0)
    .map(([label, bytes], i) => ({
      label,
      percent: Math.round((bytes / total) * 1000) / 10,
      color: colors[i % colors.length],
    }))
}
