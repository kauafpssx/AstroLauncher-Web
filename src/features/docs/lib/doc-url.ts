import { repoBlobUrl } from '@/lib/api/github-client'

const ABSOLUTE = /^[a-z][a-z\d+.-]*:/i

// Links do markdown: absolutos passam direto; relativos viram URL do repo, a
// partir da raiz, como os docs do launcher escrevem. Âncoras '#x' nem chegam
// aqui: o MarkdownBody rola até elas na própria página.
export function resolveDocUrl(url: string): string {
  if (ABSOLUTE.test(url)) return url
  return repoBlobUrl(url.replace(/^\.?\//, ''))
}
