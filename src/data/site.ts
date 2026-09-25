// Formato combinado com o Forge: o Footer faz `import { site } from '@/data/site'`
// e usa os 7 primeiros campos. Os demais links servem às seções (hero, contribua).
export interface SiteInfo {
  year: number
  project: string
  author: string
  authorUrl: string
  license: string
}

export const site: SiteInfo = {
  year: 2026,
  project: 'AstroLauncher',
  author: 'kauafpssx',
  authorUrl: 'https://github.com/kauafpssx',
  license: 'GPL-3.0',
}
