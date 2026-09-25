import type { GithubCommitActivityDTO } from '@/types/github-commit'
import type { GithubContributorDTO } from '@/types/github-contributor'
import type { GithubReleaseDTO } from '@/types/github-release'
import type { ChartPoint } from '@/types/stats'

// Arquivos do updater (latest.json, .sig) são baixados pelo app, não por gente.
const UPDATER_ASSET = /\.(json|sig)$/i
const WEEK_LABEL = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: '2-digit',
})

// /stats/commit_activity responde 202 com corpo {} enquanto o GitHub calcula.
export function toActivity(dto: unknown): GithubCommitActivityDTO[] {
  return Array.isArray(dto) ? (dto as GithubCommitActivityDTO[]) : []
}

export function countDownloads(releases: GithubReleaseDTO[]): number {
  return releases
    .flatMap((release) => release.assets)
    .filter((asset) => !UPDATER_ASSET.test(asset.name))
    .reduce((total, asset) => total + asset.download_count, 0)
}

export function countHumans(contributors: GithubContributorDTO[]): number {
  return contributors.filter((c) => !c.login.endsWith('[bot]')).length
}

// Soma do último ano (o repo é mais novo que isso); sem estatística, usa contribuições.
export function countCommits(
  activity: GithubCommitActivityDTO[],
  contributors: GithubContributorDTO[],
): number | null {
  if (activity.length > 0) return activity.reduce((t, w) => t + w.total, 0)
  if (contributors.length > 0) {
    return contributors.reduce((t, c) => t + c.contributions, 0)
  }
  return null
}

export function toWeeklyCommits(
  activity: GithubCommitActivityDTO[],
): ChartPoint[] {
  return activity.map((w) => ({
    label: WEEK_LABEL.format(new Date(w.week * 1000)),
    value: w.total,
  }))
}
