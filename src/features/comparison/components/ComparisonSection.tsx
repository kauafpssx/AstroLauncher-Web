import { Section } from '@/components/common/Section'
import { COMPARISON_HEADING } from '@/data/comparison'
import { FeatureMatrix } from '@/features/comparison/components/FeatureMatrix'
import { Manifesto } from '@/features/comparison/components/Manifesto'
import { OpenSourceNote } from '@/features/comparison/components/OpenSourceNote'
import { RamBars } from '@/features/comparison/components/RamBars'
import { ReleaseTimeline } from '@/features/comparison/components/ReleaseTimeline'
import { useReleaseTimeline } from '@/features/comparison/hooks/useReleaseTimeline'

export function ComparisonSection() {
  const { data: releases } = useReleaseTimeline()
  return (
    <Section
      id="comparativo"
      title={COMPARISON_HEADING.title}
      description={COMPARISON_HEADING.description}
    >
      <div className="flex flex-col gap-10">
        <RamBars />
        <FeatureMatrix />
        <OpenSourceNote />
        <div className="flex flex-col gap-10">
          <Manifesto />
          <ReleaseTimeline releases={releases} />
        </div>
      </div>
    </Section>
  )
}
