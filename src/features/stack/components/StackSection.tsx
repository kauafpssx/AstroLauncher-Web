import { Section } from '@/components/common/Section'
import { STACK_HEADING, STACK_ITEMS } from '@/data/stack'
import { LanguagesCard } from '@/features/stack/components/LanguagesCard'
import { StackCard } from '@/features/stack/components/StackCard'
import { useLanguages } from '@/features/stack/hooks/useLanguages'

export function StackSection() {
  const { data: languages } = useLanguages()
  return (
    <Section
      id="stack"
      title={STACK_HEADING.title}
      description={STACK_HEADING.description}
    >
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {STACK_ITEMS.map((item) => (
          <StackCard key={item.name} item={item} />
        ))}
        {languages.length > 0 && <LanguagesCard languages={languages} />}
      </div>
    </Section>
  )
}
