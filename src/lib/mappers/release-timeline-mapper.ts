import type { GithubReleaseDTO } from '@/types/github-release'
import type { ReleaseMilestone } from '@/types/comparison'

// Releases publicadas em ordem cronológica (mais antiga primeiro); a última é a atual
export function toReleaseMilestones(
  dtos: GithubReleaseDTO[],
): ReleaseMilestone[] {
  const sorted = dtos
    .filter((dto) => dto.published_at)
    .map((dto) => ({ tag: dto.tag_name, date: dto.published_at }))
    .sort((a, b) => a.date.localeCompare(b.date))
  return sorted.map((m, i) => ({ ...m, latest: i === sorted.length - 1 }))
}
