import { Cpu } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Footnote } from '@/components/common/Footnote'
import { RAM_BARS, RAM_FOOTNOTE, RAM_TITLE } from '@/data/comparison'
import { RamBarRow } from '@/features/comparison/components/RamBarRow'

const MAX_MEGABYTES = Math.max(...RAM_BARS.map((bar) => bar.megabytes))

export function RamBars() {
  return (
    <Card hoverable accentTop>
      <h3 className="mb-8 flex items-center gap-3 font-serif text-2xl">
        <Cpu className="size-5" aria-hidden />
        {RAM_TITLE}
      </h3>
      <ul className="flex flex-col gap-6">
        {RAM_BARS.map((bar) => (
          <RamBarRow
            key={bar.name}
            item={bar}
            percent={(bar.megabytes / MAX_MEGABYTES) * 100}
          />
        ))}
      </ul>
      <Footnote>{RAM_FOOTNOTE}</Footnote>
    </Card>
  )
}
