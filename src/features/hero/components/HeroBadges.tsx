import { Badge } from '@/components/ui/badge'
import { LiveDot } from '@/components/common/LiveDot'
import { ROUTES } from '@/lib/hash-route'
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
      <a
        href={ROUTES.news}
        className="ease-ui rounded-full transition-opacity duration-200 hover:opacity-80"
      >
        <Badge tone="neutral" icon={<LiveDot />}>
          {hero.versionPrefix} {release.version}
        </Badge>
      </a>
      <Badge tone="neutral">
        {hero.updatedPrefix} {formatRelativeTime(release.publishedAt)}
      </Badge>
    </div>
  )
}
