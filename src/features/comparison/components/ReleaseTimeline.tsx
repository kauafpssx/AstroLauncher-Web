import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/use-reduced-motion'

import { TIMELINE_TITLE } from '@/data/comparison'
import { TimelineMilestone } from '@/features/comparison/components/TimelineMilestone'
import { useDragScroll } from '@/hooks/useDragScroll'
import { cn } from '@/lib/utils'
import type { ReleaseMilestone } from '@/types/comparison'

interface ReleaseTimelineProps {
  releases: ReleaseMilestone[]
}

const EDGE_FADE =
  '[mask-image:linear-gradient(to_right,transparent,black_3rem,black_calc(100%-3rem),transparent)]'

// A lista abre rolada no fim: o stagger vai do último pro primeiro, então os
// marcos visíveis aparecem na hora e os escondidos à esquerda vêm depois.
const LIST_VARIANTS = {
  show: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
}

export function ReleaseTimeline({ releases }: ReleaseTimelineProps) {
  const { ref, isDragging, handlers } = useDragScroll({ startAtEnd: true })
  const reduceMotion = useReducedMotion()
  if (releases.length === 0) return null
  return (
    <div>
      <p className="text-muted-foreground mb-4 text-sm font-semibold tracking-[0.05em] uppercase">
        {TIMELINE_TITLE}
      </p>
      <div
        ref={ref}
        {...handlers}
        tabIndex={0}
        role="region"
        aria-label={`${TIMELINE_TITLE}: use as setas para navegar`}
        className={cn(
          'focus-visible:outline-accent [scrollbar-width:none] overflow-x-auto py-2 select-none focus-visible:outline-1 [&::-webkit-scrollbar]:hidden',
          EDGE_FADE,
          isDragging ? 'cursor-grabbing' : 'cursor-grab',
        )}
      >
        <motion.ol
          variants={LIST_VARIANTS}
          initial={reduceMotion ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px 120px 0px' }}
          className="before:bg-foreground/15 relative flex w-max px-12 before:absolute before:inset-x-0 before:top-1/2 before:h-0.5 before:-translate-y-1/2"
        >
          {releases.map((release) => (
            <TimelineMilestone key={release.tag} release={release} />
          ))}
        </motion.ol>
      </div>
    </div>
  )
}
