import { Card } from '@/components/ui/card'
import type { Highlight } from '@/types/highlights'

export function HighlightCard({ icon: Icon, title, description }: Highlight) {
  return (
    <Card hoverable className="group hover:border-accent/60 h-full max-md:p-5">
      <div className="mb-2 flex items-center gap-3 md:mb-3 md:block">
        <Icon
          className="text-accent ease-ui size-6 shrink-0 transition-[translate,rotate,filter] duration-300 group-hover:-translate-y-0.5 group-hover:-rotate-6 group-hover:drop-shadow-[0_0_8px_var(--accent-glow)] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 motion-reduce:group-hover:rotate-0 md:mb-5 md:size-7"
          strokeWidth={1.75}
          aria-hidden
        />
        <h3 className="text-foreground font-serif text-[22px] leading-tight md:text-[30.4px]">
          {title}
        </h3>
      </div>
      <p className="text-muted-foreground text-sm leading-relaxed md:text-[16.8px] md:leading-[1.7]">
        {description}
      </p>
    </Card>
  )
}
