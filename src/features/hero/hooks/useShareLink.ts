import { useEffect, useState } from 'react'

const COPIED_MS = 2000

// Web Share quando existe; sem ele (ou se falhar), copia a URL do site.
export function useShareLink(title: string) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const id = window.setTimeout(() => setCopied(false), COPIED_MS)
    return () => window.clearTimeout(id)
  }, [copied])

  async function share() {
    const url = window.location.origin
    try {
      if (navigator.share) return await navigator.share({ title, url })
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return
    }
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
    } catch {
      // Sem permissão de clipboard: nada a fazer, o botão só não confirma.
    }
  }

  return { copied, share }
}
