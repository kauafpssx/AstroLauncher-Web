import { Children, cloneElement, isValidElement } from 'react'
import type * as React from 'react'
import {
  Info,
  Lightbulb,
  MessageSquareWarning,
  OctagonAlert,
  TriangleAlert,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
type AlertKind = 'NOTE' | 'TIP' | 'IMPORTANT' | 'WARNING' | 'CAUTION'
type AlertStyle = { label: string; icon: LucideIcon; tone: string }
const ALERTS: Record<AlertKind, AlertStyle> = {
  NOTE: { label: 'Nota', icon: Info, tone: 'border-accent/60' },
  TIP: { label: 'Dica', icon: Lightbulb, tone: 'border-accent/60' },
  IMPORTANT: {
    label: 'Importante',
    icon: MessageSquareWarning,
    tone: 'border-accent/60',
  },
  WARNING: {
    label: 'Atenção',
    icon: TriangleAlert,
    tone: 'border-warning/70 [&>header]:text-warning',
  },
  CAUTION: {
    label: 'Cuidado',
    icon: OctagonAlert,
    tone: 'border-red-400/60 [&>header]:text-red-400',
  },
}
// "> [!TIP]\n> texto" vira um <p> cujo primeiro texto começa com o marcador.
const MARKER = /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\][ \t]*\n?/
type Parsed = { kind: AlertKind; body: React.ReactNode[] }
function parseAlert(children: React.ReactNode): Parsed | null {
  const nodes = Children.toArray(children)
  const index = nodes.findIndex(isValidElement)
  const first = nodes[index]
  if (!isValidElement<{ children?: React.ReactNode }>(first)) return null
  const [head, ...rest] = Children.toArray(first.props.children)
  const match = typeof head === 'string' ? MARKER.exec(head) : null
  if (!match || typeof head !== 'string') return null
  const text = head.slice(match[0].length)
  const inner = text ? [text, ...rest] : rest
  const paragraph = inner.length ? [cloneElement(first, {}, ...inner)] : []
  const body = [...paragraph, ...nodes.slice(index + 1)]
  return { kind: match[1] as AlertKind, body }
}
// Alertas do GitHub (> [!NOTE] etc.); sem marcador fica o blockquote comum.
export function MarkdownBlockquote({
  children,
}: React.ComponentProps<'blockquote'>) {
  const alert = parseAlert(children)
  if (!alert) return <blockquote>{children}</blockquote>
  const { label, icon: Icon, tone } = ALERTS[alert.kind]
  return (
    <div
      role="note"
      className={cn(
        'bg-surface my-6 rounded-md border-l-[3px] px-5 py-4 [&>p]:my-0 [&>p]:mt-2',
        tone,
      )}
    >
      <header className="text-foreground flex items-center gap-2 font-medium">
        <Icon className="size-4" aria-hidden="true" />
        {label}
      </header>
      {alert.body}
    </div>
  )
}
