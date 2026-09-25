import { useCallback, useRef, useState } from 'react'
import type { MouseEvent, PointerEvent } from 'react'

// Abaixo disso é clique, não arrasto (não muda o cursor)
const DRAG_THRESHOLD = 4

// Arrastar com o mouse altera scrollLeft; touch e teclado ficam com o scroll nativo.
// O flag vive num ref: state só atualiza no próximo render e perderia os primeiros moves.
export function useDragScroll({ startAtEnd = false } = {}) {
  const drag = useRef({
    active: false,
    moved: false,
    startX: 0,
    startScroll: 0,
  })
  const [isDragging, setIsDragging] = useState(false)

  const scrollerRef = useRef<HTMLDivElement | null>(null)

  // Callback ref estável: roda só na montagem; startAtEnd começa rolado até o fim
  const ref = useCallback(
    (el: HTMLDivElement | null) => {
      scrollerRef.current = el
      if (el && startAtEnd) el.scrollLeft = el.scrollWidth
    },
    [startAtEnd],
  )

  const onPointerDown = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return
    drag.current = {
      active: true,
      moved: false,
      startX: e.clientX,
      startScroll: e.currentTarget.scrollLeft,
    }
  }

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    const state = drag.current
    if (!state.active) return
    // Botão solto fora do elemento antes da captura: encerra aqui
    if (e.buttons === 0) return stop()
    const dx = e.clientX - state.startX
    if (!state.moved) {
      if (Math.abs(dx) < DRAG_THRESHOLD) return
      state.moved = true
      setIsDragging(true)
      try {
        e.currentTarget.setPointerCapture(e.pointerId)
      } catch {
        // Ponteiro já liberado: o arrasto segue enquanto os moves chegarem aqui
      }
    }
    e.currentTarget.scrollLeft = state.startScroll - dx
  }

  const stop = () => {
    drag.current.active = false
    setIsDragging(false)
  }

  // Soltar o mouse depois de arrastar não pode virar clique num item da faixa
  const onClickCapture = (e: MouseEvent<HTMLElement>) => {
    if (!drag.current.moved) return
    drag.current.moved = false
    e.preventDefault()
    e.stopPropagation()
  }

  return {
    ref,
    scrollerRef,
    isDragging,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: stop,
      onPointerCancel: stop,
      onClickCapture,
    },
  }
}
