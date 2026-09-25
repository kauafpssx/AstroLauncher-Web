import { Footnote } from '@/components/common/Footnote'
import { MANIFESTO } from '@/data/comparison'

export function Manifesto() {
  return (
    <div className="max-w-[900px]">
      <p className="font-serif text-5xl leading-tight md:text-7xl">
        <span className="text-accent glow-text">{MANIFESTO.lead}</span>{' '}
        <span className="text-muted-foreground">vs</span> {MANIFESTO.versus}
      </p>
      <p className="text-muted-foreground mt-6 text-lg leading-[1.7]">
        {MANIFESTO.body}
      </p>
      <Footnote>{MANIFESTO.footnote}</Footnote>
    </div>
  )
}
