import type * as React from 'react'
import { ArrowLeft } from 'lucide-react'
import { Container } from '@/components/common/Container'
import { ROUTES } from '@/lib/hash-route'
type PageShellProps = {
  title: string
  description?: string
  children: React.ReactNode
}
// Barra sticky: ocupa espaço no fluxo, então o conteúdo não precisa de padding extra.
function BackBar() {
  return (
    <div className="border-border bg-background/95 sticky top-0 z-20 border-b backdrop-blur-md">
      <Container className="py-4">
        <a
          href={ROUTES.home}
          className="group text-muted-foreground ease-ui hover:text-accent inline-flex items-center gap-2 text-[0.95rem] font-medium transition-colors duration-250"
        >
          <ArrowLeft className="ease-ui size-4 transition-transform duration-250 group-hover:-translate-x-1" />
          Voltar ao início
        </a>
      </Container>
    </div>
  )
}
export function PageShell({ title, description, children }: PageShellProps) {
  return (
    <>
      <BackBar />
      <Container className="pt-12 pb-20 md:pt-16 md:pb-24">
        <h1 className="glow-text font-serif text-[2.75rem] leading-tight font-semibold md:text-[4rem]">
          {title}
        </h1>
        {description && (
          <p className="text-muted-foreground mt-4 max-w-[800px] text-[1.15rem]">
            {description}
          </p>
        )}
        <div className="mt-14 [&_[id]]:scroll-mt-24">{children}</div>
      </Container>
    </>
  )
}
