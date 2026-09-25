import { useEffect, useState } from 'react'
import { StatsAPI } from '@/features/stats/services/stats.api'
import {
  countCommits,
  countDownloads,
  countHumans,
  toActivity,
  toWeeklyCommits,
} from '@/lib/mappers/stats-mapper'
import type { ProjectStats } from '@/types/stats'

function valueOr<T>(result: PromiseSettledResult<T>, fallback: T): T {
  return result.status === 'fulfilled' ? result.value : fallback
}

// allSettled: cada número falha sozinho (rate limit/202) sem derrubar os outros.
async function loadStats(): Promise<ProjectStats> {
  const [releasesRes, contributorsRes, activityRes] = await Promise.allSettled([
    StatsAPI.releases(),
    StatsAPI.contributors(),
    StatsAPI.commitActivity(),
  ])
  const releases = valueOr(releasesRes, null)
  const contributors = valueOr(contributorsRes, null)
  const activity = toActivity(valueOr(activityRes, null))
  return {
    commits: countCommits(activity, contributors ?? []),
    releases: releases?.length ?? null,
    downloads: releases ? countDownloads(releases) : null,
    contributors: contributors ? countHumans(contributors) : null,
    weekly: toWeeklyCommits(activity),
  }
}

export function useProjectStats() {
  const [data, setData] = useState<ProjectStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let cancelled = false
    loadStats()
      .then((stats) => {
        if (!cancelled) setData(stats)
      })
      .catch((err: unknown) => {
        if (!cancelled)
          setError(err instanceof Error ? err : new Error(String(err)))
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return { data, isLoading, error }
}
