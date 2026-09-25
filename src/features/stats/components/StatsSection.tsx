import { Card } from '@/components/ui/card'
import { Footnote } from '@/components/common/Footnote'
import { Section } from '@/components/common/Section'
import { BarChart } from '@/features/stats/components/BarChart'
import { StatBox } from '@/features/stats/components/StatBox'
import { useProjectStats } from '@/features/stats/hooks/useProjectStats'
import { statsSection as copy } from '@/data/stats'

const DESKTOP_WEEKS = 12
const MOBILE_WEEKS = 6

export function StatsSection() {
  const { data } = useProjectStats()
  const weekly = data?.weekly ?? []
  const stats = [
    { value: data?.commits ?? null, label: copy.labels.commits },
    { value: data?.releases ?? null, label: copy.labels.releases },
    { value: data?.downloads ?? null, label: copy.labels.downloads },
    { value: data?.contributors ?? null, label: copy.labels.contributors },
  ]

  return (
    <Section id={copy.id} title={copy.title} description={copy.description}>
      <div className="grid grid-cols-1 gap-12 min-[501px]:grid-cols-2 min-[1001px]:grid-cols-4">
        {stats.map((stat) => (
          <StatBox key={stat.label} {...stat} />
        ))}
      </div>
      <Card className="mt-12">
        <h3 className="text-foreground mb-8 font-serif text-2xl">
          {copy.chartTitle}
          <span className="text-muted-foreground font-sans text-base">
            <span className="hidden md:inline">
              : {copy.chartPeriod.desktop}
            </span>
            <span className="md:hidden">: {copy.chartPeriod.mobile}</span>
          </span>
        </h3>
        {weekly.length === 0 ? (
          <p className="text-muted-foreground">{copy.chartEmpty}</p>
        ) : (
          <>
            <BarChart
              data={weekly.slice(-DESKTOP_WEEKS)}
              unit={copy.chartUnit}
              className="hidden md:block"
            />
            <BarChart
              data={weekly.slice(-MOBILE_WEEKS)}
              unit={copy.chartUnit}
              className="md:hidden"
            />
          </>
        )}
        <Footnote>{copy.footnote}</Footnote>
      </Card>
    </Section>
  )
}
