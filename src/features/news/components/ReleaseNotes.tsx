import { useState } from 'react'
import { AnimatePresence, motion, useDragControls } from 'framer-motion'
import { useReducedMotion } from '@/lib/use-reduced-motion'

import type { PanInfo, Variants } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { ReleaseNav } from '@/features/news/components/ReleaseNav'
import { ReleaseNoteContent } from '@/features/news/components/ReleaseNoteContent'
import { ReleaseTabs } from '@/features/news/components/ReleaseTabs'
import { releasePanelId, releaseTabId } from '@/features/news/lib/tabs'
import type { ReleaseNote } from '@/types/news'

// Swipe: distância ou velocidade mínimas pra contar como troca de versão
const SWIPE_OFFSET = 80
const SWIPE_VELOCITY = 500
const SLIDE = 24

// direction 1 = indo pra mais antiga (entra pela direita, igual à ordem das abas)
const PANEL_VARIANTS: Variants = {
  enter: (d: number) => ({ opacity: 0, x: d * SLIDE }),
  center: { opacity: 1, x: 0 },
  exit: (d: number) => ({ opacity: 0, x: d * -SLIDE }),
}

export function ReleaseNotes({ releases }: { releases: ReleaseNote[] }) {
  const [[index, direction], setState] = useState([0, 0])
  const reduce = useReducedMotion()
  const dragControls = useDragControls()
  const release = releases[index]
  const last = releases.length - 1

  const select = (next: number) => {
    if (next === index || next < 0 || next > last) return
    setState([next, Math.sign(next - index)])
  }

  const handleDragEnd = (_: unknown, { offset, velocity }: PanInfo) => {
    if (offset.x < -SWIPE_OFFSET || velocity.x < -SWIPE_VELOCITY)
      select(index + 1)
    else if (offset.x > SWIPE_OFFSET || velocity.x > SWIPE_VELOCITY)
      select(index - 1)
  }

  return (
    <div className="flex flex-col gap-4">
      <ReleaseTabs releases={releases} active={index} onSelect={select} />
      <Card accentTop className="overflow-hidden">
        <div
          id={releasePanelId}
          role="tabpanel"
          aria-labelledby={releaseTabId(release.tag)}
          className="relative"
        >
          <AnimatePresence mode="popLayout" initial={false} custom={direction}>
            <motion.div
              key={release.tag}
              custom={direction}
              variants={reduce ? undefined : PANEL_VARIANTS}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.22, ease: 'easeOut' }}
              drag="x"
              dragListener={false}
              dragControls={dragControls}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              onPointerDown={(e) =>
                e.pointerType !== 'mouse' && dragControls.start(e)
              }
              style={{ touchAction: 'pan-y' }}
            >
              <ReleaseNoteContent release={release} />
            </motion.div>
          </AnimatePresence>
        </div>
        <ReleaseNav
          onOlder={index < last ? () => select(index + 1) : undefined}
          onNewer={index > 0 ? () => select(index - 1) : undefined}
        />
      </Card>
    </div>
  )
}
