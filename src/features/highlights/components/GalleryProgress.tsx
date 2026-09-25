import { useEffect } from 'react'
import { animate, motion, useMotionValue } from 'framer-motion'

const AUTOPLAY_S = 6

interface GalleryProgressProps {
  paused: boolean
  onComplete: () => void
}

// A barra é o relógio do autoplay: ao encher, troca o print. Pausa e retoma
// de onde parou; remonta (zera) quando a miniatura ativa muda.
export function GalleryProgress({ paused, onComplete }: GalleryProgressProps) {
  const progress = useMotionValue(0)

  useEffect(() => {
    if (paused) return
    const controls = animate(progress, 1, {
      duration: AUTOPLAY_S * (1 - progress.get()),
      ease: 'linear',
      onComplete,
    })
    return () => controls.stop()
  }, [paused, progress, onComplete])

  return (
    <div className="bg-foreground/10 h-full overflow-hidden rounded-full">
      <motion.div
        style={{ scaleX: progress }}
        className="bg-accent h-full origin-left rounded-full"
      />
    </div>
  )
}
