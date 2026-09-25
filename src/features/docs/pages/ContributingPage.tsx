import { MarkdownBody } from '@/components/common/MarkdownBody'
import { PageShell } from '@/components/layout/PageShell'
import { DocumentStatus } from '@/features/docs/components/DocumentStatus'
import { resolveDocUrl } from '@/features/docs/lib/doc-url'
import { useRepoDocument } from '@/features/docs/hooks/useRepoDocument'
import { DocsAPI } from '@/features/docs/services/docs.api'
import { docsPages } from '@/data/docs'

const page = docsPages.contributing

export function ContributingPage() {
  const { data, isLoading, error } = useRepoDocument(DocsAPI.contributing)
  return (
    <PageShell title={page.title} description={page.description}>
      {data === null ? (
        <DocumentStatus
          isLoading={isLoading}
          error={error}
          filePath={page.file}
        />
      ) : (
        <MarkdownBody resolveUrl={resolveDocUrl}>{data}</MarkdownBody>
      )}
    </PageShell>
  )
}
