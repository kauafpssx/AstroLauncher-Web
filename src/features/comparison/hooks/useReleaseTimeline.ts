import { useEffect, useState } from 'react'
import { ReleasesAPI } from '@/features/comparison/services/releases.api'
import { toReleaseMilestones } from '@/lib/mappers/release-timeline-mapper'
import type { ReleaseMilestone } from '@/types/comparison'

export function useReleaseTimeline() {
  const [data, setData] = useState<ReleaseMilestone[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let cancelled = false
    ReleasesAPI.list()
      .then((dtos) => {
        if (!cancelled) setData(toReleaseMilestones(dtos))
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
