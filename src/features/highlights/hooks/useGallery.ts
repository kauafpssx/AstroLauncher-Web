import { useCallback, useState } from 'react'

// Índice atual com volta circular; o tempo do autoplay vem do GalleryProgress.
export function useGallery(count: number) {
  const [index, setIndex] = useState(0)
  const step = useCallback(
    (delta: number) => setIndex((i) => (i + delta + count) % count),
    [count],
  )
  const next = useCallback(() => step(1), [step])

  return { index, setIndex, step, next }
}
