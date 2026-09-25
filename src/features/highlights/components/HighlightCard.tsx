import { Card } from '@/components/ui/card'
import type { Highlight } from '@/types/highlights'

export function HighlightCard({ icon: Icon, title, description }: Highlight) {
  return (
    <Card hoverable className="group hover:border-accent/60 h-full">
      <Icon
        className="text-accent ease-ui mb-5 size-7 transition-[translate,rotate,filter] duration-300 group-hover:-translate-y-0.5 group-hover:-rotate-6 group-hover:drop-shadow-[0_0_8px_var(--accent-glow)] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 motion-reduce:group-hover:rotate-0"
        strokeWidth={1.75}
        aria-hidden
      />
      <h3 className="text-foreground mb-3 font-serif text-[30.4px] leading-tight">
        {title}
      </h3>
      <p className="text-muted-foreground text-[16.8px] leading-[1.7]">
        {description}
      </p>
    </Card>
  )
}
