import { AnimatedLink } from '@/components/common/AnimatedLink'
import { newsPage as copy } from '@/data/news'

// Skeleton enquanto carrega; em erro, manda pra página de releases no GitHub
export function ReleaseNotesStatus({ isLoading }: { isLoading: boolean }) {
  if (isLoading) {
    return (
      <div role="status" aria-label={copy.loading} className="space-y-8">
        {[0, 1].map((i) => (
          <div key={i} className="bg-surface h-48 animate-pulse rounded-lg" />
        ))}
      </div>
    )
  }
  return (
    <p className="text-muted-foreground">
      {copy.error}{' '}
      <AnimatedLink href={copy.releasesUrl} external>
        {copy.viewOnGithub}
      </AnimatedLink>
    </p>
  )
}
