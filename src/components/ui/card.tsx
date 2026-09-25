import type * as React from 'react'
import type { VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { cardVariants } from '@/components/ui/card-variants'
type CardProps = VariantProps<typeof cardVariants> & {
  className?: string
  children: React.ReactNode
}
function Card({
  tone = 'surface',
  hoverable = false,
  accentTop = false,
  className,
  children,
}: CardProps) {
  return (
    <div
      data-slot="card"
      data-tone={tone}
      className={cn(cardVariants({ tone, hoverable, accentTop, className }))}
    >
      {children}
    </div>
  )
}
export { Card }
