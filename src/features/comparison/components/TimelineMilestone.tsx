import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { formatDate } from '@/lib/format'
import { cn } from '@/lib/utils'
import type { ReleaseMilestone } from '@/types/comparison'

const MILESTONE_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
}

// Pulso único do dot da release atual, depois que o marco aparece
const LATEST_DOT_VARIANTS: Variants = {
  show: {
    scale: [1, 1.5, 1],
    transition: { delay: 0.5, duration: 0.8, ease: 'easeInOut' },
  },
}

// Tag em cima, dot no trilho, data embaixo: as 3 faixas têm altura fixa para o dot cair no meio
export function TimelineMilestone({ release }: { release: ReleaseMilestone }) {
  return (
    <motion.li
      variants={MILESTONE_VARIANTS}
      className="grid w-32 shrink-0 grid-rows-[1.5rem_1rem_1.5rem] justify-items-center text-center"
    >
      <span
        className={cn(
          'text-sm tabular-nums',
          release.latest
            ? 'text-accent glow-text font-semibold'
            : 'text-foreground font-medium',
        )}
      >
        {release.tag}
      </span>
      <span className="flex items-center" aria-hidden>
        <motion.span
          variants={release.latest ? LATEST_DOT_VARIANTS : undefined}
          className={cn(
            'rounded-full',
            release.latest
              ? 'bg-accent size-3.5 shadow-[0_0_12px_var(--accent)]'
              : 'bg-muted-foreground size-2',
          )}
        />
      </span>
      <time
        dateTime={release.date}
        className="text-muted-foreground text-xs whitespace-nowrap"
      >
        {formatDate(release.date)}
      </time>
    </motion.li>
  )
}
