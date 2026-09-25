import { useEffect, useState } from 'react'
import { ContributorsAPI } from '@/features/contribute/services/contributors.api'
import {
  toContributors,
  type Contributor,
} from '@/lib/mappers/contributor-mapper'

export function useContributors() {
  const [data, setData] = useState<Contributor[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let cancelled = false
    ContributorsAPI.list()
      .then((dtos) => {
        if (!cancelled) setData(toContributors(dtos))
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
