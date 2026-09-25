import { useEffect, useState } from 'react'
import { ReleaseAPI } from '@/features/hero/services/release.api'
import { toLatestRelease } from '@/lib/mappers/release-mapper'
import type { LatestRelease } from '@/types/release'

export function useLatestRelease() {
  const [data, setData] = useState<LatestRelease | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let cancelled = false
    ReleaseAPI.latest()
      .then((dto) => {
        if (!cancelled) setData(toLatestRelease(dto))
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
