import { useRef } from 'react'
import type { MouseEvent } from 'react'
import { MarkdownBody } from '@/components/common/MarkdownBody'
import { PageShell } from '@/components/layout/PageShell'
import { DocumentStatus } from '@/features/docs/components/DocumentStatus'
import { resolveDocUrl } from '@/features/docs/lib/doc-url'
import { useRepoDocument } from '@/features/docs/hooks/useRepoDocument'
import { DocsAPI } from '@/features/docs/services/docs.api'
import { docsPages } from '@/data/docs'

const { license: page, licenseText } = docsPages
const licenseHref = resolveDocUrl(licenseText.file)

export function LicensePage() {
  const copying = useRepoDocument(DocsAPI.copying)
  const license = useRepoDocument(DocsAPI.license)
  const fullTextRef = useRef<HTMLElement>(null)

  // O link 'LICENSE' do COPYING rola até o texto abaixo; sem JS, cai no GitHub.
  function handleClick(event: MouseEvent<HTMLDivElement>) {
    const link = (event.target as HTMLElement).closest('a')
    if (link?.href !== licenseHref || !fullTextRef.current) return
    event.preventDefault()
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    fullTextRef.current.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <PageShell title={page.title} description={page.description}>
      <div onClickCapture={handleClick}>
        {copying.data === null ? (
          <DocumentStatus {...copying} filePath={page.file} />
        ) : (
          <MarkdownBody resolveUrl={resolveDocUrl}>{copying.data}</MarkdownBody>
        )}
      </div>
      <section
        id={licenseText.id}
        ref={fullTextRef}
        className="mt-16 scroll-mt-8"
      >
        <h2 className="text-foreground glow-text mb-6 font-serif text-4xl">
          {licenseText.title}
        </h2>
        {license.data === null ? (
          <DocumentStatus {...license} filePath={licenseText.file} />
        ) : (
          <pre className="bg-surface overflow-x-auto rounded-lg p-6 font-mono text-sm whitespace-pre-wrap">
            {license.data}
          </pre>
        )}
      </section>
    </PageShell>
  )
}
