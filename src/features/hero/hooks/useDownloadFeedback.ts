import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

export type DownloadPhase = 'idle' | 'bouncing' | 'started'

const BOUNCE_MS = 400
const STARTED_MS = 2500

// Feedback visual do clique em Baixar; o download em si segue o <a href>.
export function useDownloadFeedback() {
  const reduce = useReducedMotion() ?? false
  const [phase, setPhase] = useState<DownloadPhase>('idle')

  useEffect(() => {
    if (phase === 'idle') return
    const bouncing = phase === 'bouncing'
    const id = window.setTimeout(
      () => setPhase(bouncing ? 'started' : 'idle'),
      bouncing ? BOUNCE_MS : STARTED_MS,
    )
    return () => window.clearTimeout(id)
  }, [phase])

  const start = () => setPhase(reduce ? 'started' : 'bouncing')
  return { phase, start }
}
