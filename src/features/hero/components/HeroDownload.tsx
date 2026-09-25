import { useId } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DownloadLabel } from '@/features/hero/components/DownloadLabel'
import { DownloadList } from '@/features/hero/components/DownloadList'
import { MenuTrigger } from '@/features/hero/components/MenuTrigger'
import { useDownloadFeedback } from '@/features/hero/hooks/useDownloadFeedback'
import { useDropdown } from '@/features/hero/hooks/useDropdown'
import { hero } from '@/data/hero'
import { pickDownload } from '@/lib/mappers/release-mapper'
import { detectOs } from '@/lib/platform'
import { cn } from '@/lib/utils'
import type { LatestRelease } from '@/types/release'

interface HeroDownloadProps {
  release: LatestRelease | null
}

const cta = hero.primaryCta
// Split button: o grupo sobe inteiro no hover, não cada segmento.
// h-12 + py-0 = mesma altura dos outros botões do hero.
const SEGMENT = 'h-12 py-0 hover:translate-y-0'

// Sem release (carregando/API falhou) ou sem instalador: página de releases.
export function HeroDownload({ release }: HeroDownloadProps) {
  const { open, toggle, close, rootRef, triggerRef } = useDropdown()
  const listId = useId()
  const { phase, start } = useDownloadFeedback()
  const downloads = release?.downloads ?? []
  if (downloads.length === 0) {
    return (
      <Button
        variant="primary"
        href={cta.fallbackHref}
        external
        className="h-12 py-0"
      >
        <Download className="size-4" aria-hidden />
        {cta.label}
      </Button>
    )
  }

  const current = pickDownload(downloads, detectOs())
  return (
    <div ref={rootRef} className="relative">
      <div className="ease-ui inline-flex transition-transform duration-250 hover:-translate-y-[3px]">
        {current && (
          // Button (Forge) não repassa onClick no <a>: o clique chega por bubbling.
          <span className="contents" onClick={start}>
            <Button
              variant="primary"
              href={current.url}
              className={cn(SEGMENT, 'group rounded-r-none')}
            >
              <DownloadLabel phase={phase}>
                {cta.downloadFor} {cta.osNames[current.os]}
              </DownloadLabel>
            </Button>
          </span>
        )}
        <MenuTrigger
          ref={triggerRef}
          open={open}
          controls={listId}
          onToggle={toggle}
          segment={current !== null}
          label={current ? cta.otherPlatforms : cta.seeDownloads}
        >
          <DownloadLabel phase={phase} showIcon={false}>
            {cta.seeDownloads}
          </DownloadLabel>
        </MenuTrigger>
      </div>
      <AnimatePresence>
        {open && (
          <DownloadList
            id={listId}
            downloads={downloads}
            currentOs={current?.os ?? null}
            onSelect={() => {
              close()
              start()
            }}
          />
        )}
      </AnimatePresence>
      <span className="sr-only" aria-live="polite">
        {phase === 'started' ? cta.downloadStarted : ''}
      </span>
    </div>
  )
}
