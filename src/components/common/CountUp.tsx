import { useEffect, useRef } from 'react'
import {
  animate,
  useInView,
  useMotionValue,
  useReducedMotion,
} from 'framer-motion'
import { formatNumber } from '@/lib/format'
import { cn } from '@/lib/utils'

interface CountUpProps {
  value: number
  format?: (n: number) => string
  duration?: number
  className?: string
}

const formatInteger = (n: number) => formatNumber(Math.round(n))

export function CountUp({
  value,
  format = formatInteger,
  duration = 1.2,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduced = useReducedMotion()
  const motionValue = useMotionValue(reduced ? value : 0)

  useEffect(
    () =>
      motionValue.on('change', (n) => {
        if (textRef.current) textRef.current.textContent = format(n)
      }),
    [motionValue, format],
  )

  useEffect(() => {
    if (reduced) return motionValue.set(value)
    if (!inView) return
    const controls = animate(motionValue, value, { duration, ease: 'easeOut' })
    return () => controls.stop()
  }, [motionValue, value, duration, inView, reduced])

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      <span ref={textRef} aria-hidden="true">
        {format(motionValue.get())}
      </span>
      <span className="sr-only">{format(value)}</span>
    </span>
  )
}
