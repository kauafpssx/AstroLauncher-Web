import { CountUp } from '@/components/common/CountUp'
import { useProjectStats } from '@/features/stats/hooks/useProjectStats'
import { statsCopy } from '@/data/stats'

// Faixa compacta: sem cards, só número serif + rótulo, divisores finos entre eles.
export function HeroStats() {
  const { data } = useProjectStats()
  const { labels } = statsCopy
  const stats = [
    { value: data?.commits ?? null, label: labels.commits },
    { value: data?.releases ?? null, label: labels.releases },
    { value: data?.downloads ?? null, label: labels.downloads },
    { value: data?.contributors ?? null, label: labels.contributors },
  ]

  return (
    <dl className="divide-border mt-14 grid grid-cols-2 gap-y-6 min-[769px]:flex min-[769px]:divide-x">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col-reverse px-0 min-[769px]:px-8 min-[769px]:first:pl-0"
        >
          <dt className="text-muted-foreground mt-1 text-[12.8px] font-semibold tracking-[0.12em] uppercase">
            {stat.label}
          </dt>
          <dd className="text-foreground font-serif text-[44px] leading-none tabular-nums">
            {stat.value === null ? '-' : <CountUp value={stat.value} />}
          </dd>
        </div>
      ))}
    </dl>
  )
}
