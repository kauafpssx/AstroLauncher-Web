import type * as React from 'react'
type AnimatedLinkProps = {
  href: string
  external?: boolean
  children: React.ReactNode
}
// Sublinhado cresce da esquerda no hover e recolhe pela direita ao sair.
export function AnimatedLink({
  href,
  external = false,
  children,
}: AnimatedLinkProps) {
  return (
    <a
      href={href}
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
      className="text-foreground after:bg-accent after:ease-ui relative inline-block font-medium after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-right after:scale-x-0 after:transition-transform after:duration-250 hover:after:origin-left hover:after:scale-x-100 focus-visible:after:scale-x-100"
    >
      {children}
    </a>
  )
}
