import { isValidElement } from 'react'
import type * as React from 'react'
import Markdown, { defaultUrlTransform } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { MarkdownBlockquote } from '@/components/common/MarkdownAlert'
type MarkdownBodyProps = {
  children: string
  resolveUrl?: (url: string) => string
}
type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4'
function textOf(node: React.ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(textOf).join('')
  if (isValidElement<{ children?: React.ReactNode }>(node))
    return textOf(node.props.children)
  return ''
}
// Slug no estilo do GitHub: minúsculas, some pontuação/emoji, espaço vira '-'.
// ponytail: títulos repetidos geram id duplicado (GitHub sufixa -1); tratar se o guia repetir título.
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[\uFE0E\uFE0F\u20E3]/g, '') // seletores de emoji contam como \p{M}
    .replace(/[^\p{L}\p{M}\p{N} _-]/gu, '')
    .replace(/ /g, '-')
}
function heading(Tag: HeadingTag) {
  return function Heading({ children }: React.ComponentProps<HeadingTag>) {
    return <Tag id={slugify(textOf(children))}>{children}</Tag>
  }
}
// Âncoras rolam na própria página: o location.hash é da rota, não pode mudar.
function scrollToAnchor(event: React.MouseEvent, href: string) {
  const target = document.getElementById(decodeURIComponent(href.slice(1)))
  if (!target) return
  event.preventDefault()
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
}
function MarkdownLink({ href = '', children }: React.ComponentProps<'a'>) {
  if (href.startsWith('#')) {
    return (
      <a href={href} onClick={(event) => scrollToAnchor(event, href)}>
        {children}
      </a>
    )
  }
  const external = href.startsWith('http')
  return (
    <a
      href={href}
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
    >
      {children}
    </a>
  )
}
const components = {
  a: MarkdownLink,
  blockquote: MarkdownBlockquote,
  h1: heading('h1'),
  h2: heading('h2'),
  h3: heading('h3'),
  h4: heading('h4'),
}
function transformUrl(url: string, resolveUrl?: (url: string) => string) {
  if (url.startsWith('#') || !resolveUrl) return defaultUrlTransform(url)
  return defaultUrlTransform(resolveUrl(url))
}
// Sem rehype-raw: HTML cru do markdown é escapado. defaultUrlTransform segue
// barrando javascript: e afins mesmo depois do resolveUrl.
export function MarkdownBody({ children, resolveUrl }: MarkdownBodyProps) {
  return (
    <div className="prose prose-invert prose-headings:font-serif prose-headings:font-semibold prose-headings:text-foreground prose-h2:glow-text prose-p:text-muted-foreground prose-a:text-accent prose-a:underline-offset-3 hover:prose-a:text-accent-hover prose-strong:text-foreground prose-code:rounded-sm prose-code:bg-surface prose-code:px-1.5 prose-code:py-0.5 prose-code:font-normal prose-code:before:content-none prose-code:after:content-none prose-pre:border prose-pre:border-border prose-pre:bg-surface prose-li:text-muted-foreground prose-li:marker:text-muted-foreground prose-table:border prose-table:border-border prose-th:border prose-th:border-border prose-th:px-3 prose-td:border prose-td:border-border prose-td:px-3 prose-hr:border-border prose-blockquote:border-border prose-blockquote:font-normal prose-blockquote:not-italic max-w-[800px] [&_blockquote_p]:before:content-none [&_blockquote_p]:after:content-none">
      <Markdown
        remarkPlugins={[remarkGfm]}
        urlTransform={(url) => transformUrl(url, resolveUrl)}
        components={components}
      >
        {children}
      </Markdown>
    </div>
  )
}
