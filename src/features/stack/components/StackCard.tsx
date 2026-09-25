import { Card } from '@/components/ui/card'
import type { StackItem } from '@/types/stack'

export function StackCard({ item }: { item: StackItem }) {
  return (
    <Card hoverable accentTop>
      <h3 className="mb-3 font-serif text-3xl">
        <span aria-hidden>{item.emoji}</span> {item.name}
      </h3>
      <p className="text-muted-foreground text-[1.05rem]">{item.description}</p>
    </Card>
  )
}
