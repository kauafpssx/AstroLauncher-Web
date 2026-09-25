import { useRef, useState } from 'react'
import type * as React from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { GalleryThumbs } from '@/features/highlights/components/GalleryThumbs'
import { useGallery } from '@/features/highlights/hooks/useGallery'
import { gallery, galleryCopy } from '@/data/gallery'

const KEY_STEP: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1 }

// Print grande em moldura de janela + abas; setas do teclado trocam o print.
export function Gallery() {
  const reduce = useReducedMotion() ?? false
  const [hovered, setHovered] = useState(false)
  const { index, setIndex, step } = useGallery(
    gallery.length,
    hovered || reduce,
  )
  const tabs = useRef<HTMLDivElement>(null)
  const shot = gallery[index]

  function onKeyDown(event: React.KeyboardEvent) {
    const delta = KEY_STEP[event.key]
    if (!delta) return
    event.preventDefault()
    const next = (index + delta + gallery.length) % gallery.length
    step(delta)
    tabs.current?.querySelectorAll('button')[next]?.focus()
  }

  return (
    <div
      role="region"
      aria-label={galleryCopy.ariaLabel}
      aria-roledescription="carrossel"
      className="mb-16"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onKeyDown={onKeyDown}
    >
      <div className="border-border bg-surface overflow-hidden rounded-xl border shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
        <div className="border-border flex items-center gap-2 border-b px-4 py-3">
          {[0, 1, 2].map((dot) => (
            <span key={dot} className="bg-foreground/15 size-3 rounded-full" />
          ))}
          <span className="text-muted-foreground ml-3 text-[13px]">
            {galleryCopy.windowTitle} · {shot?.label}
          </span>
        </div>
        <div className="relative aspect-[1920/1042]">
          <AnimatePresence initial={false}>
            <motion.img
              key={shot?.src}
              src={shot?.src}
              alt={shot?.alt}
              width={1920}
              height={1042}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.6 }}
              className="absolute inset-0 size-full object-cover object-top"
            />
          </AnimatePresence>
        </div>
      </div>
      <div ref={tabs}>
        <GalleryThumbs shots={gallery} active={index} onSelect={setIndex} />
      </div>
    </div>
  )
}
