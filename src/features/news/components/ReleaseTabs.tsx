import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/use-reduced-motion'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { newsPage as copy } from '@/data/news'
import { useDragScroll } from '@/hooks/useDragScroll'
import { releasePanelId, releaseTabId } from '@/features/news/lib/tabs'
import { cn } from '@/lib/utils'
import type { ReleaseNote } from '@/types/news'

interface ReleaseTabsProps {
  releases: ReleaseNote[]
  active: number
  onSelect: (index: number) => void
}

const EDGE_FADE =
  '[mask-image:linear-gradient(to_right,transparent,black_3rem,black_calc(100%-3rem),transparent)]'
// Folga pra aba ativa não ficar embaixo do fade das bordas
const EDGE = 48
const KEY_STEP: Record<string, (i: number, last: number) => number> = {
  ArrowLeft: (i) => Math.max(0, i - 1),
  ArrowRight: (i, last) => Math.min(last, i + 1),
  Home: () => 0,
  End: (_, last) => last,
}

// Quais setas fazem sentido: nada a rolar pra aquele lado = seta apagada
function readEdges(el: HTMLElement) {
  const max = el.scrollWidth - el.clientWidth - 1
  return { start: el.scrollLeft <= 0, end: el.scrollLeft >= max }
}

// Faixa arrastável de abas (mais nova à esquerda), roving tabindex e setas nas pontas
export function ReleaseTabs({ releases, active, onSelect }: ReleaseTabsProps) {
  const reduce = useReducedMotion()
  const { ref, scrollerRef, isDragging, handlers } = useDragScroll()
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [edges, setEdges] = useState({ start: true, end: false })

  // Mantém a aba ativa visível só no eixo X (scrollIntoView também rolaria a página)
  useEffect(() => {
    const el = scrollerRef.current
    const tab = tabRefs.current[active]
    if (!el || !tab) return
    setEdges(readEdges(el))
    const left = tab.offsetLeft - EDGE
    const right = tab.offsetLeft + tab.offsetWidth + EDGE - el.clientWidth
    const target = Math.min(Math.max(el.scrollLeft, right), left)
    el.scrollTo({ left: target, behavior: reduce ? 'auto' : 'smooth' })
  }, [active, reduce, scrollerRef])

  const scrollBy = (direction: number) =>
    scrollerRef.current?.scrollBy({
      left: direction * scrollerRef.current.clientWidth * 0.7,
      behavior: reduce ? 'auto' : 'smooth',
    })

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = KEY_STEP[e.key]
    if (!step) return
    e.preventDefault()
    const next = step(active, releases.length - 1)
    onSelect(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <div className="flex items-center gap-2">
      <ArrowButton
        label={copy.scrollLeft}
        disabled={edges.start}
        onClick={() => scrollBy(-1)}
      >
        <ChevronLeft className="size-4" />
      </ArrowButton>
      <div
        ref={ref}
        {...handlers}
        onScroll={(e) => setEdges(readEdges(e.currentTarget))}
        role="tablist"
        aria-label={copy.tabsLabel}
        onKeyDown={handleKeyDown}
        className={cn(
          'relative flex min-w-0 flex-1 [scrollbar-width:none] gap-1 overflow-x-auto px-12 py-1 select-none [&::-webkit-scrollbar]:hidden',
          EDGE_FADE,
          isDragging ? 'cursor-grabbing' : 'cursor-grab',
        )}
      >
        {releases.map((release, i) => (
          <button
            key={release.tag}
            ref={(el) => {
              tabRefs.current[i] = el
            }}
            id={releaseTabId(release.tag)}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-controls={releasePanelId}
            tabIndex={i === active ? 0 : -1}
            onClick={() => onSelect(i)}
            className={cn(
              'focus-visible:ring-accent/50 relative shrink-0 cursor-pointer rounded-md px-4 py-2 text-sm font-medium tabular-nums transition-colors duration-200 outline-none focus-visible:ring-2',
              i === active
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {i === active && (
              <motion.span
                layoutId="release-tab-indicator"
                className="bg-surface-hover border-border absolute inset-0 rounded-md border"
                transition={reduce ? { duration: 0 } : { duration: 0.2 }}
              />
            )}
            <span className="relative flex items-center gap-1.5">
              {release.tag}
              {release.latest && (
                <>
                  <span
                    className="bg-accent size-1.5 rounded-full"
                    aria-hidden
                  />
                  <span className="sr-only">({copy.latestBadge})</span>
                </>
              )}
            </span>
          </button>
        ))}
      </div>
      <ArrowButton
        label={copy.scrollRight}
        disabled={edges.end}
        onClick={() => scrollBy(1)}
      >
        <ChevronRight className="size-4" />
      </ArrowButton>
    </div>
  )
}

interface ArrowButtonProps {
  label: string
  disabled: boolean
  onClick: () => void
  children: ReactNode
}

// Fora do Tab: teclado já navega pelas setas dentro do tablist
function ArrowButton({ label, disabled, onClick, children }: ArrowButtonProps) {
  return (
    <button
      type="button"
      tabIndex={-1}
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="text-muted-foreground hover:text-foreground hover:bg-surface-hover grid size-8 shrink-0 cursor-pointer place-items-center rounded-md transition-colors duration-200 disabled:cursor-default disabled:opacity-30 disabled:hover:bg-transparent"
    >
      {children}
    </button>
  )
}
