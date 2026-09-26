import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/use-reduced-motion'

import { Check, Download } from 'lucide-react'
import { hero } from '@/data/hero'
import { EASE_UI } from '@/features/hero/lib/motion'
import type { DownloadPhase } from '@/features/hero/hooks/useDownloadFeedback'

interface DownloadLabelProps {
  phase: DownloadPhase
  showIcon?: boolean
  children: ReactNode
}

// O hover (seta desce 2px) depende de `group` no botão pai.
function BouncingIcon({ bouncing }: { bouncing: boolean }) {
  return (
    <motion.span
      className="inline-flex"
      animate={bouncing ? { y: [0, 4, 0] } : { y: 0 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      <Download
        className="size-4 transition-transform duration-200 group-hover:translate-y-0.5 motion-reduce:transition-none"
        aria-hidden
      />
    </motion.span>
  )
}

export function DownloadLabel({
  phase,
  showIcon = true,
  children,
}: DownloadLabelProps) {
  const reduce = useReducedMotion() ?? false
  const started = phase === 'started'
  const offset = reduce ? 0 : 6
  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.span
        key={started ? 'started' : 'idle'}
        className="inline-flex items-center gap-2"
        initial={{ opacity: 0, y: offset }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -offset }}
        transition={
          reduce ? { duration: 0 } : { duration: 0.15, ease: EASE_UI }
        }
      >
        {started ? (
          <>
            <Check className="size-4" aria-hidden />
            {hero.primaryCta.downloadStarted}
          </>
        ) : (
          <>
            {showIcon && <BouncingIcon bouncing={phase === 'bouncing'} />}
            {children}
          </>
        )}
      </motion.span>
    </AnimatePresence>
  )
}
