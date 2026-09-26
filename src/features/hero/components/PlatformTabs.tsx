import type { KeyboardEvent } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/use-reduced-motion'

import type { ComponentType } from 'react'
import { hero } from '@/data/hero'
import {
  AppleIcon,
  LinuxIcon,
  WindowsIcon,
} from '@/features/hero/components/PlatformIcons'
import { EASE_UI } from '@/features/hero/lib/motion'
import { panelId, tabId } from '@/features/hero/lib/tabs'
import { cn } from '@/lib/utils'
import type { DownloadOs } from '@/types/release'

const OS_ICONS: Record<DownloadOs, ComponentType<{ className?: string }>> = {
  windows: WindowsIcon,
  macos: AppleIcon,
  linux: LinuxIcon,
}

interface PlatformTabsProps {
  idBase: string
  tabs: DownloadOs[]
  active: DownloadOs
  currentOs: DownloadOs | null
  onChange: (os: DownloadOs) => void
}

// Roving tabindex: só a aba ativa entra no Tab; setas/Home/End trocam e focam.
function nextIndex(key: string, index: number, count: number): number | null {
  if (key === 'ArrowRight') return (index + 1) % count
  if (key === 'ArrowLeft') return (index - 1 + count) % count
  if (key === 'Home') return 0
  if (key === 'End') return count - 1
  return null
}

export function PlatformTabs({
  idBase,
  tabs,
  active,
  currentOs,
  onChange,
}: PlatformTabsProps) {
  const reduce = useReducedMotion() ?? false
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const next = nextIndex(event.key, tabs.indexOf(active), tabs.length)
    if (next === null) return
    event.preventDefault()
    onChange(tabs[next])
    event.currentTarget
      .querySelectorAll<HTMLElement>('[role="tab"]')
      [next]?.focus()
  }

  return (
    <div
      role="tablist"
      onKeyDown={onKeyDown}
      className="bg-background grid gap-1 rounded-md p-1.5"
      style={{ gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))` }}
    >
      {tabs.map((os) => {
        const Icon = OS_ICONS[os]
        const selected = os === active
        const isCurrent = os === currentOs
        return (
          <button
            key={os}
            id={tabId(idBase, os)}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-controls={panelId(idBase)}
            tabIndex={selected ? 0 : -1}
            title={isCurrent ? hero.primaryCta.yourSystem : undefined}
            onClick={() => onChange(os)}
            className={cn(
              'focus-visible:ring-accent/50 relative cursor-pointer rounded-[5px] px-2 py-1.5 text-sm font-medium transition-colors duration-200 outline-none focus-visible:ring-2',
              selected
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {selected && (
              <motion.span
                layoutId="platform-tab-indicator"
                className="bg-surface-hover absolute inset-0 rounded-[5px]"
                transition={
                  reduce ? { duration: 0 } : { duration: 0.2, ease: EASE_UI }
                }
              />
            )}
            <span className="relative flex items-center justify-center gap-1.5">
              <Icon className="size-3.5 shrink-0" />
              {hero.primaryCta.osNames[os]}
              {isCurrent && (
                <>
                  <span
                    className="bg-accent size-1.5 shrink-0 rounded-full"
                    aria-hidden
                  />
                  <span className="sr-only">
                    ({hero.primaryCta.yourSystem})
                  </span>
                </>
              )}
            </span>
          </button>
        )
      })}
    </div>
  )
}
