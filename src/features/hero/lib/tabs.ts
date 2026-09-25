import type { DownloadOs } from '@/types/release'

// Ids que ligam aba ↔ painel (aria-controls / aria-labelledby).
export const tabId = (base: string, os: DownloadOs) => `${base}-tab-${os}`
export const panelId = (base: string) => `${base}-panel`
