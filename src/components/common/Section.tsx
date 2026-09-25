import type * as React from 'react'
import { cn } from '@/lib/utils'
import { Container } from '@/components/common/Container'
import { Reveal } from '@/components/common/Reveal'
import { SectionHeading } from '@/components/common/SectionHeading'
type SectionProps = {
  id: string
  title?: string
  description?: string
  className?: string
  children: React.ReactNode
}
export function Section({
  id,
  title,
  description,
  className,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn('border-border border-b py-20 md:py-24', className)}
    >
      <Container>
        <Reveal>
          {title && <SectionHeading title={title} description={description} />}
          {children}
        </Reveal>
      </Container>
    </section>
  )
}
