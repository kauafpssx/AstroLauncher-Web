import { Card } from '@/components/ui/card'
import { LANGUAGES_TITLE } from '@/data/stack'
import { StackedBar } from '@/features/stack/components/StackedBar'
import { StackLegend } from '@/features/stack/components/StackLegend'
import type { LanguageShare } from '@/types/stack'

export function LanguagesCard({ languages }: { languages: LanguageShare[] }) {
  return (
    <Card tone="accent" accentTop className="col-span-full">
      <h3 className="mb-6 font-serif text-3xl">{LANGUAGES_TITLE}</h3>
      <StackedBar segments={languages} />
      <StackLegend items={languages} />
    </Card>
  )
}
