import type * as React from 'react'
type FootnoteProps = { children: React.ReactNode }
export function Footnote({ children }: FootnoteProps) {
  return (
    <p className="border-border text-muted-foreground mt-6 border-t border-dashed pt-4 text-[0.8rem]">
      {children}
    </p>
  )
}
