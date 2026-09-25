import { Card } from '@/components/ui/card'
import { Footnote } from '@/components/common/Footnote'
import { BarChart } from '@/features/stats/components/BarChart'
import { useProjectStats } from '@/features/stats/hooks/useProjectStats'
import { statsCopy as copy } from '@/data/stats'

const DESKTOP_WEEKS = 12
const MOBILE_WEEKS = 6

// Autossuficiente: busca os dados sozinho, pronto pra qualquer página.
export function CommitActivityCard() {
  const { data } = useProjectStats()
  const weekly = data?.weekly ?? []

  return (
    <Card>
      <h3 className="text-foreground mb-8 font-serif text-2xl">
        {copy.chartTitle}
        <span className="text-muted-foreground font-sans text-base">
          <span className="hidden md:inline">: {copy.chartPeriod.desktop}</span>
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
  )
}
