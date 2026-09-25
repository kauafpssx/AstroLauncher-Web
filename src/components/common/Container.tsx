import type * as React from 'react'
import { cn } from '@/lib/utils'
type ContainerProps = {
  as?: React.ElementType
  className?: string
  children: React.ReactNode
}
export function Container({
  as: Tag = 'div',
  className,
  children,
}: ContainerProps) {
  return (
    <Tag
      className={cn('mx-auto w-full max-w-[1200px] px-6 md:px-[5%]', className)}
    >
      {children}
    </Tag>
  )
}
