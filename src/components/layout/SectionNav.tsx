import { useEffect, useState } from 'react'
import type { MouseEvent } from 'react'
import { useReducedMotion } from 'framer-motion'
import { NAV_SECTIONS } from '@/data/navigation'
import { cn } from '@/lib/utils'

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0])
  const [atEnd, setAtEnd] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((entry) => entry.isIntersecting)
        if (hit) setActive(hit.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [ids])

  // A última seção é curta e nunca cruza o meio da tela: no fim da página, força ela.
  useEffect(() => {
    const onScroll = () =>
      setAtEnd(
        window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 2,
      )
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return atEnd ? ids[ids.length - 1] : active
}

const SECTION_IDS = NAV_SECTIONS.map((section) => section.id)

export function SectionNav() {
  const active = useActiveSection(SECTION_IDS)
  const reduced = useReducedMotion()

  const onClick = (e: MouseEvent, id: string) => {
    e.preventDefault()
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
  }

  return (
    <nav
      aria-label="Seções"
      className="fixed top-1/2 right-6 z-40 hidden -translate-y-1/2 lg:block"
    >
      <span
        aria-hidden="true"
        className="bg-border absolute top-1 right-[5px] bottom-1 w-px"
      />
      <ul className="relative flex flex-col gap-5">
        {NAV_SECTIONS.map(({ id, label }) => {
          const isActive = active === id
          return (
            <li key={id} className="relative flex justify-end">
              <a
                href={`#${id}`}
                aria-current={isActive ? 'location' : undefined}
                onClick={(e) => onClick(e, id)}
                className="group focus-visible:ring-accent flex items-center gap-3 rounded-sm outline-none focus-visible:ring-2"
              >
                <span
                  className={cn(
                    'text-sm whitespace-nowrap transition-opacity duration-200 motion-reduce:transition-none',
                    isActive
                      ? 'text-foreground opacity-100'
                      : 'text-muted-foreground opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100',
                  )}
                >
                  {label}
                </span>
                <span className="flex size-[11px] items-center justify-center">
                  <span
                    className={cn(
                      'rounded-full transition-all duration-200 motion-reduce:transition-none',
                      isActive
                        ? 'bg-accent size-[11px] shadow-[0_0_12px_var(--accent-glow)]'
                        : 'bg-muted-foreground group-hover:bg-foreground size-[7px]',
                    )}
                  />
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
