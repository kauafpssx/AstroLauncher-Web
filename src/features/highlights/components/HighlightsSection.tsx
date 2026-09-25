import { Section } from '@/components/common/Section'
import { HighlightCard } from '@/features/highlights/components/HighlightCard'
import { highlights, highlightsSection } from '@/data/highlights'

export function HighlightsSection() {
  return (
    <Section
      id={highlightsSection.id}
      title={highlightsSection.title}
      description={highlightsSection.description}
    >
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-10">
        {highlights.map((item) => (
          <HighlightCard key={item.title} {...item} />
        ))}
      </div>
    </Section>
  )
}
