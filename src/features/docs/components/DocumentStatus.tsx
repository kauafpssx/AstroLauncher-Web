import { AnimatedLink } from '@/components/common/AnimatedLink'
import { docsPages } from '@/data/docs'
import { repoBlobUrl } from '@/lib/api/github-client'

interface DocumentStatusProps {
  isLoading: boolean
  error: Error | null
  filePath: string
}

const SKELETON_WIDTHS = [
  'w-2/3',
  'w-full',
  'w-11/12',
  'w-full',
  'w-4/5',
  'w-1/2',
]

// Placeholder enquanto carrega; em erro, manda pro arquivo no GitHub.
export function DocumentStatus({
  isLoading,
  error,
  filePath,
}: DocumentStatusProps) {
  if (isLoading) {
    return (
      <div
        role="status"
        aria-label={docsPages.status.loading}
        className="space-y-4"
      >
        {SKELETON_WIDTHS.map((width, i) => (
          <div
            key={i}
            className={`bg-surface h-4 animate-pulse rounded-sm ${width}`}
          />
        ))}
      </div>
    )
  }
  if (!error) return null
  return (
    <p className="text-muted-foreground">
      {docsPages.status.error}{' '}
      <AnimatedLink href={repoBlobUrl(filePath)} external>
        {docsPages.status.viewOnGithub}
      </AnimatedLink>
    </p>
  )
}
