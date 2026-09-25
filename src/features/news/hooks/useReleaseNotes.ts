import { useEffect, useState } from 'react'
import { NewsAPI } from '@/features/news/services/news.api'
import { toReleaseNotes } from '@/lib/mappers/release-notes-mapper'
import type { ReleaseNote } from '@/types/news'

export function useReleaseNotes() {
  const [data, setData] = useState<ReleaseNote[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let cancelled = false
    NewsAPI.releases()
      .then((dtos) => {
        if (!cancelled) setData(toReleaseNotes(dtos))
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
