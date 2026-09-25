import { useEffect, useState } from 'react'

// `load` precisa ser estável (use um método do DocsAPI, não uma arrow inline).
export function useRepoDocument(load: () => Promise<string>) {
  const [data, setData] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let cancelled = false
    load()
      .then((text) => {
        if (!cancelled) setData(text)
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error(String(err)))
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [load])

  return { data, isLoading, error }
}
