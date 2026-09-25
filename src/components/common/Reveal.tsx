import { useEffect, useRef, useState } from 'react'
import type * as React from 'react'
import { cn } from '@/lib/utils'
type RevealProps = {
  delay?: number
  className?: string
  children: React.ReactNode
}
// Bidirecional: some de novo ao sair da viewport, como na referência.
export function Reveal({ delay = 0, className, children }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: '0px 0px -60px 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        'ease-ui transition-[opacity,translate] duration-800 motion-reduce:translate-y-0 motion-reduce:opacity-100',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-[30px] opacity-0',
        className,
      )}
    >
      {children}
    </div>
  )
}
