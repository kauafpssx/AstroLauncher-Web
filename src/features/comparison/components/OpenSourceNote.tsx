import { ShieldCheck } from 'lucide-react'
import { AnimatedLink } from '@/components/common/AnimatedLink'
import { Footnote } from '@/components/common/Footnote'
import { Card } from '@/components/ui/card'
import { OPEN_SOURCE } from '@/data/comparison'

export function OpenSourceNote() {
  return (
    <Card hoverable accentTop>
      <h3 className="mb-6 flex items-center gap-3 font-serif text-2xl">
        <ShieldCheck className="size-5" aria-hidden />
        {OPEN_SOURCE.title}
      </h3>
      <div className="text-muted-foreground flex max-w-[800px] flex-col gap-4">
        {OPEN_SOURCE.paragraphs.map((text) => (
          <p key={text}>{text}</p>
        ))}
      </div>
      <Footnote>
        Fontes:{' '}
        {OPEN_SOURCE.sources.map((source, i) => (
          <span key={source.href}>
            {i > 0 && ' · '}
            <AnimatedLink href={source.href} external>
              {source.label}
            </AnimatedLink>
          </span>
        ))}
      </Footnote>
    </Card>
  )
}
