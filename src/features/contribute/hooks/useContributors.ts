import { useEffect, useState } from 'react'
import { loadContributors } from '@/features/contribute/lib/load-contributors'
import type { Contributor } from '@/lib/mappers/contributor-mapper'

export function useContributors() {
  const [data, setData] = useState<Contributor[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let cancelled = false
    loadContributors()
      .then((list) => {
        if (!cancelled) setData(list)
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
