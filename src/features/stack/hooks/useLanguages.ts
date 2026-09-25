import { useEffect, useState } from 'react'
import { LANGUAGE_COLORS } from '@/data/stack'
import { LanguagesAPI } from '@/features/stack/services/languages.api'
import { toLanguageShares } from '@/lib/mappers/languages-mapper'
import type { LanguageShare } from '@/types/stack'

export function useLanguages() {
  const [data, setData] = useState<LanguageShare[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let cancelled = false
    LanguagesAPI.get()
      .then((dto) => {
        if (!cancelled) setData(toLanguageShares(dto, LANGUAGE_COLORS))
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
