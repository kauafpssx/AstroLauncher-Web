import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/use-reduced-motion'

import type { LanguageShare } from '@/types/stack'

// Os segmentos crescem juntos a partir de 0, então a barra enche da esquerda
export function StackedBar({ segments }: { segments: LanguageShare[] }) {
  const reduceMotion = useReducedMotion()
  return (
    <div
      className="bg-surface-hover flex h-3 overflow-hidden rounded-sm"
      aria-hidden
    >
      {segments.map((segment) => {
        const width = `${segment.percent}%`
        return (
          <motion.div
            key={segment.label}
            className="h-full"
            style={{
              backgroundColor: segment.color,
              width: reduceMotion ? width : undefined,
            }}
            initial={reduceMotion ? false : { width: 0 }}
            whileInView={{ width }}
            viewport={{ once: true, margin: '0px 0px -60px 0px' }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        )
      })}
    </div>
  )
}
