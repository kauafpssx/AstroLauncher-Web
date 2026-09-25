import { useCallback, useEffect, useState } from 'react'

const AUTOPLAY_MS = 6000

// Índice atual + autoplay lento; o timer reinicia a cada troca manual.
export function useGallery(count: number, paused: boolean) {
  const [index, setIndex] = useState(0)
  const step = useCallback(
    (delta: number) => setIndex((i) => (i + delta + count) % count),
    [count],
  )

  useEffect(() => {
    if (paused) return
    const id = window.setTimeout(() => step(1), AUTOPLAY_MS)
    return () => window.clearTimeout(id)
  }, [paused, index, step])

  return { index, setIndex, step }
}
