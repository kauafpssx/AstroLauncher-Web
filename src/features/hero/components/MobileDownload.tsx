import { useId } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Check, Monitor, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DownloadList } from '@/features/hero/components/DownloadList'
import { MenuTrigger } from '@/features/hero/components/MenuTrigger'
import { useDropdown } from '@/features/hero/hooks/useDropdown'
import { useShareLink } from '@/features/hero/hooks/useShareLink'
import { hero } from '@/data/hero'
import { cn } from '@/lib/utils'
import type { ReleaseDownload } from '@/types/release'

interface MobileDownloadProps {
  downloads: ReleaseDownload[]
}

const cta = hero.primaryCta
const copy = cta.mobile

// Fragmento: os itens entram direto no flex do hero, e a linha de
// plataformas vai pro fim (order-last) sem desalinhar os botões de 48px.
export function MobileDownload({ downloads }: MobileDownloadProps) {
  const { open, toggle, close, rootRef, triggerRef } = useDropdown()
  const listId = useId()
  const { copied, share } = useShareLink(copy.shareTitle)
  const hasMenu = downloads.length > 0

  return (
    <>
      <div ref={rootRef} className="relative inline-flex">
        <span
          className={cn(
            'border-border bg-surface text-muted-foreground inline-flex h-12 cursor-default items-center gap-2 rounded-md border px-[1.8rem] leading-none font-medium',
            hasMenu && 'rounded-r-none',
          )}
        >
          <Monitor className="size-4" aria-hidden />
          {copy.unavailable}
        </span>
        {hasMenu && (
          <MenuTrigger
            ref={triggerRef}
            open={open}
            controls={listId}
            onToggle={toggle}
            segment
            subtle
            label={cta.seeDownloads}
          />
        )}
        <AnimatePresence>
          {open && (
            <DownloadList
              id={listId}
              downloads={downloads}
              currentOs={null}
              onSelect={close}
            />
          )}
        </AnimatePresence>
      </div>
      <Button variant="secondary" onClick={share} className="h-12 py-0">
        {copied ? (
          <Check className="size-4" aria-hidden />
        ) : (
          <Send className="size-4" aria-hidden />
        )}
        {copied ? copy.copied : copy.share}
      </Button>
      <span className="sr-only" aria-live="polite">
        {copied ? copy.copied : ''}
      </span>
      <p className="text-muted-foreground order-last basis-full text-sm">
        {copy.platforms}
      </p>
    </>
  )
}
