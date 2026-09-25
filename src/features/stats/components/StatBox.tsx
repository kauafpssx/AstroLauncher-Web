import { formatNumber } from '@/lib/format'

interface StatBoxProps {
  value: number | null
  label: string
}

export function StatBox({ value, label }: StatBoxProps) {
  return (
    <div className="bg-surface border-border hover:border-accent/40 ease-ui rounded-lg border px-8 py-10 transition-[transform,border-color] duration-300 hover:-translate-y-1">
      <div className="text-accent mb-2 font-serif text-[72px] leading-none font-bold tabular-nums [text-shadow:0_0_35px_var(--accent-glow)]">
        {value === null ? '-' : formatNumber(value)}
      </div>
      <div className="text-muted-foreground text-[15.2px] font-semibold tracking-[0.12em] uppercase">
        {label}
      </div>
    </div>
  )
}
