import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/use-reduced-motion'

import type { Variants } from 'framer-motion'
import { LAUNCHER_COLUMNS } from '@/data/feature-matrix'
import { SupportIcon } from '@/features/comparison/components/SupportIcon'
import { cn } from '@/lib/utils'
import type { FeatureMatrixRow } from '@/types/feature-matrix'

const ROW_VARIANTS: Variants = {
  show: { transition: { staggerChildren: 0.02 } },
}

const CELL_VARIANTS: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  show: { opacity: 1, scale: 1 },
}

// Coluna do AstroLauncher passa um pouco do tamanho final antes de assentar
const ASTRO_CELL_VARIANTS: Variants = {
  hidden: CELL_VARIANTS.hidden,
  show: { opacity: 1, scale: [0.6, 1.25, 1] },
}

export function MatrixRow({ row }: { row: FeatureMatrixRow }) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.tr
      className="border-border border-b last:border-0"
      variants={ROW_VARIANTS}
      initial={reduceMotion ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -40px 0px' }}
    >
      <th
        scope="row"
        className="text-muted-foreground bg-surface sticky left-0 z-10 max-w-[160px] min-w-[140px] py-3 pr-4 text-left font-normal sm:max-w-none"
      >
        {row.label}
        {row.note && (
          <span className="block text-xs opacity-70">{row.note}</span>
        )}
      </th>
      {LAUNCHER_COLUMNS.map((col) => (
        <td
          key={col.id}
          className={cn('px-2 py-3', col.id === 'astro' && 'bg-accent/[0.03]')}
        >
          <motion.span
            className="block"
            variants={col.id === 'astro' ? ASTRO_CELL_VARIANTS : CELL_VARIANTS}
          >
            <SupportIcon value={row.values[col.id]} />
          </motion.span>
        </td>
      ))}
    </motion.tr>
  )
}
