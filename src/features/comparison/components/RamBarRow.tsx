import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/use-reduced-motion'

import { CountUp } from '@/components/common/CountUp'
import { cn } from '@/lib/utils'
import type { RamBarItem } from '@/types/comparison'

const formatMegabytes = (n: number) => `${Math.round(n)} MB`

interface RamBarRowProps {
  item: RamBarItem
  percent: number
}

export function RamBarRow({ item, percent }: RamBarRowProps) {
  const reduceMotion = useReducedMotion()
  const width = `${percent}%`
  return (
    <li className="flex flex-col gap-2">
      <div
        className={cn(
          'flex items-center justify-between gap-4 text-sm tabular-nums',
          item.highlight
            ? 'text-accent font-semibold'
            : 'text-muted-foreground',
        )}
      >
        <span className="flex items-center gap-2">
          {item.logo && (
            <img
              src={item.logo}
              alt=""
              width={18}
              height={18}
              className="size-[18px] shrink-0 object-contain"
            />
          )}
          {item.name}
        </span>
        {item.highlight ? (
          <CountUp
            value={item.megabytes}
            format={formatMegabytes}
            duration={1}
          />
        ) : (
          <span>{item.label}</span>
        )}
      </div>
      <div className="bg-surface-hover border-border h-2 overflow-hidden rounded-[4px] border">
        <motion.div
          className={cn(
            'h-full min-w-2 rounded-[4px]',
            item.highlight
              ? 'bg-accent shadow-[0_0_12px_var(--accent)]'
              : 'bg-muted-foreground',
          )}
          initial={reduceMotion ? false : { width: 0 }}
          whileInView={{ width }}
          style={reduceMotion ? { width } : undefined}
          viewport={{ once: true, margin: '0px 0px -60px 0px' }}
          transition={{ duration: 1, ease: [0.1, 0.9, 0.2, 1] }}
        />
      </div>
    </li>
  )
}
