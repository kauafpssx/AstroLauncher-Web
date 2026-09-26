import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/use-reduced-motion'

import { Section } from '@/components/common/Section'
import { Gallery } from '@/features/highlights/components/Gallery'
import { HighlightCard } from '@/features/highlights/components/HighlightCard'
import { highlights, highlightsSection } from '@/data/highlights'

const COLUMNS = 3

export function HighlightsSection() {
  const reduce = useReducedMotion()

  return (
    <Section
      id={highlightsSection.id}
      title={highlightsSection.title}
      description={highlightsSection.description}
    >
      <Gallery />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-4 md:gap-10">
        {highlights.map((item, i) => (
          <motion.div
            key={item.title}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -60px 0px' }}
            transition={{ delay: (i % COLUMNS) * 0.08, duration: 0.5 }}
          >
            <HighlightCard {...item} />
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
