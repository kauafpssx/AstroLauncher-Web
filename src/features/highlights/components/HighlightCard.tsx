import { Card } from '@/components/ui/card'
import type { Highlight } from '@/types/highlights'

export function HighlightCard({ icon: Icon, title, description }: Highlight) {
  return (
    <Card hoverable className="h-full">
      <Icon
        className="text-accent mb-5 size-7"
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
