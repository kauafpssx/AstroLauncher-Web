import { Download } from 'lucide-react'
import { formatMegabytes } from '@/lib/format'
import type { ReleaseDownload } from '@/types/release'

interface DownloadRowProps {
  download: ReleaseDownload
  onSelect: () => void
}

export function DownloadRow({ download, onSelect }: DownloadRowProps) {
  const details = [download.hint, download.arch].filter(Boolean).join(', ')
  return (
    <li>
      <a
        href={download.url}
        onClick={onSelect}
        className="group/row hover:bg-surface-hover focus-visible:ring-accent/50 ease-ui flex h-15 items-center gap-3 rounded-md px-3 transition-colors duration-200 outline-none focus-visible:ring-2"
      >
        <span className="min-w-0">
          <span className="text-foreground block font-medium">
            {download.format}
          </span>
          {details && (
            <span className="text-muted-foreground block truncate text-sm">
              {details}
            </span>
          )}
        </span>
        <span className="text-muted-foreground ml-auto shrink-0 text-sm tabular-nums">
          {formatMegabytes(download.sizeBytes)}
        </span>
        <Download
          className="text-foreground size-3.5 shrink-0 -translate-y-1 opacity-0 transition-[opacity,translate] duration-200 group-hover/row:translate-y-0 group-hover/row:opacity-100 group-focus-visible/row:translate-y-0 group-focus-visible/row:opacity-100 motion-reduce:transition-none"
          aria-hidden
        />
      </a>
    </li>
  )
}
