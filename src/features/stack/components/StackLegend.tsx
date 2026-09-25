import { CountUp } from '@/components/common/CountUp'
import type { LanguageShare } from '@/types/stack'

const formatPercent = (n: number) =>
  `${n.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`

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
          <CountUp
            value={item.percent}
            format={formatPercent}
            className="text-muted-foreground"
          />
        </li>
      ))}
    </ul>
  )
}
