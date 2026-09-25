import { LAUNCHER_COLUMNS } from '@/data/feature-matrix'
import { cn } from '@/lib/utils'

export function MatrixHeader() {
  return (
    <thead>
      <tr className="border-border border-b">
        <th
          scope="col"
          className="bg-surface sticky left-0 z-10 py-3 pr-4 text-left"
        >
          <span className="sr-only">Recurso</span>
        </th>
        {LAUNCHER_COLUMNS.map((col) => (
          <th
            key={col.id}
            scope="col"
            className={cn(
              'px-2 py-3 text-center font-semibold',
              col.id === 'astro' ? 'text-accent' : 'text-muted-foreground',
            )}
          >
            <span className="flex flex-col items-center gap-1.5">
              {col.logo ? (
                <img
                  src={col.logo}
                  alt=""
                  width={22}
                  height={22}
                  className="size-[22px] object-contain"
                />
              ) : (
                <span aria-hidden className="size-[22px]" />
              )}
              {col.name}
            </span>
          </th>
        ))}
      </tr>
    </thead>
  )
}
