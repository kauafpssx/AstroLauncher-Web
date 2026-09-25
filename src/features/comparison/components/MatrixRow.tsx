import { LAUNCHER_COLUMNS } from '@/data/feature-matrix'
import { SupportIcon } from '@/features/comparison/components/SupportIcon'
import { cn } from '@/lib/utils'
import type { FeatureMatrixRow } from '@/types/feature-matrix'

export function MatrixRow({ row }: { row: FeatureMatrixRow }) {
  return (
    <tr className="border-border border-b last:border-0">
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
          <SupportIcon value={row.values[col.id]} />
        </td>
      ))}
    </tr>
  )
}
