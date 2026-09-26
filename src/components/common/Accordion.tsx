import { useId, useRef, useState } from 'react'
import type { KeyboardEvent, ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/use-reduced-motion'

import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AccordionItem {
  question: string
  answer: ReactNode
}

interface AccordionProps {
  items: AccordionItem[]
  className?: string
}

const NAV_KEYS: Record<string, (i: number, n: number) => number> = {
  ArrowDown: (i, n) => (i + 1) % n,
  ArrowUp: (i, n) => (i - 1 + n) % n,
  Home: () => 0,
  End: (_, n) => n - 1,
}

export function Accordion({ items, className }: AccordionProps) {
  const [open, setOpen] = useState<number | null>(null)
  const buttons = useRef<(HTMLButtonElement | null)[]>([])
  const baseId = useId()
  const reduced = useReducedMotion()

  const onKeyDown = (e: KeyboardEvent, i: number) => {
    const next = NAV_KEYS[e.key]
    if (!next) return
    e.preventDefault()
    buttons.current[next(i, items.length)]?.focus()
  }

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {items.map((item, i) => {
        const isOpen = open === i
        const buttonId = `${baseId}-q${i}`
        const panelId = `${baseId}-a${i}`
        return (
          <div
            key={item.question}
            className="border-border bg-surface rounded-lg border"
          >
            <h3>
              <button
                ref={(el) => {
                  buttons.current[i] = el
                }}
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className="text-foreground hover:bg-surface-hover focus-visible:ring-accent flex w-full cursor-pointer items-center justify-between gap-4 rounded-lg px-5 py-4 text-left font-medium transition-colors outline-none focus-visible:ring-2"
              >
                {item.question}
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    'text-muted-foreground size-5 shrink-0 transition-transform duration-300 motion-reduce:transition-none',
                    isOpen && 'rotate-180',
                  )}
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: reduced ? 0 : 0.25, ease: 'easeOut' }}
                  className="overflow-hidden"
                >
                  <div className="text-muted-foreground px-5 pb-5 leading-relaxed">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
