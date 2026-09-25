import { Card } from '@/components/ui/card'
import type { StackItem } from '@/types/stack'

// No celular vira linha compacta (emoji ao lado do texto); do md pra cima, card cheio
export function StackCard({ item }: { item: StackItem }) {
  return (
    <Card hoverable accentTop className="flex gap-4 p-5 md:block md:p-10">
      <span aria-hidden className="text-2xl md:hidden">
        {item.emoji}
      </span>
      <div>
        <h3 className="mb-1 font-serif text-2xl md:mb-3 md:text-3xl">
          <span aria-hidden className="max-md:hidden">
            {item.emoji}{' '}
          </span>
          {item.name}
        </h3>
        <p className="text-muted-foreground text-sm md:text-[1.05rem]">
          {item.description}
        </p>
      </div>
    </Card>
  )
}
