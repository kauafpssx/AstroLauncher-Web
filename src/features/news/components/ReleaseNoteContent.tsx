import { ArrowUpRight } from 'lucide-react'
import { AnimatedLink } from '@/components/common/AnimatedLink'
import { MarkdownBody } from '@/components/common/MarkdownBody'
import { Badge } from '@/components/ui/badge'
import { newsPage as copy } from '@/data/news'
import { resolveDocUrl } from '@/features/docs/lib/doc-url'
import { formatDate } from '@/lib/format'
import type { ReleaseNote } from '@/types/news'

export function ReleaseNoteContent({ release }: { release: ReleaseNote }) {
  return (
    <article>
      <header className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2">
        <h3 className="font-serif text-3xl tabular-nums">{release.tag}</h3>
        <time dateTime={release.date} className="text-muted-foreground text-sm">
          {formatDate(release.date)}
        </time>
        {release.latest && <Badge tone="neutral">{copy.latestBadge}</Badge>}
        <span className="ml-auto inline-flex items-center gap-1 text-sm">
          <AnimatedLink href={release.url} external>
            {copy.viewOnGithub}
          </AnimatedLink>
          <ArrowUpRight className="size-3.5" aria-hidden />
        </span>
      </header>
      {release.body ? (
        <MarkdownBody resolveUrl={resolveDocUrl}>{release.body}</MarkdownBody>
      ) : (
        <p className="text-muted-foreground">{copy.emptyBody}</p>
      )}
    </article>
  )
}
