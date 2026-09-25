import { Badge } from '@/components/ui/badge'
import { LiveDot } from '@/components/common/LiveDot'
import { hero } from '@/data/hero'
import { formatRelativeTime } from '@/lib/format'
import type { LatestRelease } from '@/types/release'

interface HeroBadgesProps {
  release: LatestRelease | null
}

// Sem release (API falhou/rate limit), os badges somem sem quebrar o hero.
export function HeroBadges({ release }: HeroBadgesProps) {
  if (!release) return null
  return (
    <div className="mb-6 flex flex-wrap gap-3">
      <Badge tone="neutral" icon={<LiveDot />}>
        {hero.versionPrefix} {release.version}
      </Badge>
      <Badge tone="neutral">
        {hero.updatedPrefix} {formatRelativeTime(release.publishedAt)}
      </Badge>
    </div>
  )
}
