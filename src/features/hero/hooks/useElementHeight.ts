import { useEffect, useState } from 'react'

// Altura real de um elemento via ResizeObserver. Ref por callback (setState)
// para o effect reagir quando o nó monta. Ignora 0: no instante em que o
// AnimatePresence troca o filho, o conteúdo pode sumir por um frame e a
// altura "piscaria" até 0.
export function useElementHeight<T extends HTMLElement>() {
  const [node, setNode] = useState<T | null>(null)
  const [height, setHeight] = useState<number | null>(null)

  useEffect(() => {
    if (!node) return
    const observer = new ResizeObserver(([entry]) => {
      const next = entry.borderBoxSize?.[0]?.blockSize ?? node.offsetHeight
      if (next > 0) setHeight(next)
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [node])

  return { ref: setNode, height }
}
