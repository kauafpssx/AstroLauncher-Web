import type * as React from 'react'
import type { VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { badgeVariants } from '@/components/ui/badge-variants'
type BadgeProps = VariantProps<typeof badgeVariants> & {
  icon?: React.ReactNode
  className?: string
  children: React.ReactNode
}
function Badge({ tone = 'neutral', icon, className, children }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      data-tone={tone}
      className={cn(badgeVariants({ tone, className }))}
    >
      {icon}
      {children}
    </span>
  )
}
export { Badge }
