import type { LanguageShare } from '@/types/stack'

export function StackLegend({ items }: { items: LanguageShare[] }) {
  return (
    <ul className="mt-5 flex flex-wrap gap-4 text-sm">
      {items.map((item) => (
        <li key={item.label} className="flex items-center gap-2">
          <span
            className="border-border size-2.5 rounded-full border"
            style={{ backgroundColor: item.color }}
            aria-hidden
          />
          <span className="text-foreground font-medium">{item.label}</span>
          <span className="text-muted-foreground tabular-nums">
            {item.percent.toLocaleString('pt-BR')}%
          </span>
        </li>
      ))}
    </ul>
  )
}
