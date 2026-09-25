import { PageShell } from '@/components/layout/PageShell'
import { newsPage as copy } from '@/data/news'
import { ReleaseNotes } from '@/features/news/components/ReleaseNotes'
import { ReleaseNotesStatus } from '@/features/news/components/ReleaseNotesStatus'
import { useReleaseNotes } from '@/features/news/hooks/useReleaseNotes'
import { CommitActivityCard } from '@/features/stats/components/CommitActivityCard'

export function NewsPage() {
  const { data, isLoading } = useReleaseNotes()
  return (
    <PageShell title={copy.title} description={copy.description}>
      <h2 className="glow-text mb-8 font-serif text-4xl">
        {copy.releasesTitle}
      </h2>
      {data.length > 0 ? (
        <ReleaseNotes releases={data} />
      ) : (
        <ReleaseNotesStatus isLoading={isLoading} />
      )}
      <div className="mt-16">
        <CommitActivityCard />
      </div>
    </PageShell>
  )
}
