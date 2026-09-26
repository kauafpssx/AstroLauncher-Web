import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/use-reduced-motion'

import { DownloadRow } from '@/features/hero/components/DownloadRow'
import { useElementHeight } from '@/features/hero/hooks/useElementHeight'
import { PlatformTabs } from '@/features/hero/components/PlatformTabs'
import { panelId, tabId } from '@/features/hero/lib/tabs'
import {
  EASE_UI,
  itemVariants,
  panelVariants,
} from '@/features/hero/lib/motion'
import { groupDownloads } from '@/lib/mappers/release-mapper'
import type { DownloadOs, ReleaseDownload } from '@/types/release'

interface DownloadListProps {
  id: string
  downloads: ReleaseDownload[]
  currentOs: DownloadOs | null
  onSelect: () => void
}

// Aba inicial: SO detectado; sem ele (mobile/unknown), Windows, a mais comum.
function initialTab(
  tabs: DownloadOs[],
  currentOs: DownloadOs | null,
): DownloadOs {
  return (
    [currentOs, 'windows' as const].find((os) => os && tabs.includes(os)) ??
    tabs[0]
  )
}

// Painel flutuante ancorado embaixo do botão. 90vw = largura útil do
// Container (padding de 5% de cada lado), então nunca sai da tela.
export function DownloadList({
  id,
  downloads,
  currentOs,
  onSelect,
}: DownloadListProps) {
  const reduce = useReducedMotion() ?? false
  const groups = groupDownloads(downloads, currentOs)
  const tabs = groups.map((group) => group.os)
  const [active, setActive] = useState(() => initialTab(tabs, currentOs))
  const rows = groups.find((group) => group.os === active)?.downloads ?? []
  const { ref: contentRef, height: contentHeight } =
    useElementHeight<HTMLDivElement>()
  const shift = reduce ? 0 : 4

  return (
    <motion.div
      id={id}
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={panelVariants(reduce)}
      style={{ transformOrigin: 'top left' }}
      className="bg-surface border-border absolute top-full left-0 z-30 mt-2 w-[min(380px,90vw)] rounded-lg border p-2 shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
    >
      <motion.div variants={itemVariants(reduce)}>
        <PlatformTabs
          idBase={id}
          tabs={tabs}
          active={active}
          currentOs={currentOs}
          onChange={setActive}
        />
      </motion.div>
      <motion.div
        variants={itemVariants(reduce)}
        id={panelId(id)}
        role="tabpanel"
        aria-labelledby={tabId(id, active)}
        className="border-border mt-2 border-t pt-2"
      >
        {/* Altura anima até a real do conteúdo (1 linha no macOS, 3 no Linux). */}
        <motion.div
          className="overflow-hidden"
          initial={false}
          animate={{ height: contentHeight ?? 'auto' }}
          transition={
            reduce ? { duration: 0 } : { duration: 0.2, ease: EASE_UI }
          }
        >
          <div ref={contentRef}>
            <AnimatePresence initial={false} mode="wait">
              <motion.ul
                key={active}
                initial={{ opacity: 0, x: shift }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -shift }}
                transition={
                  reduce ? { duration: 0 } : { duration: 0.15, ease: EASE_UI }
                }
              >
                {rows.map((download) => (
                  <DownloadRow
                    key={download.url}
                    download={download}
                    onSelect={onSelect}
                  />
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
