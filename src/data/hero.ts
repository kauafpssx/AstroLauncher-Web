export interface SubtitlePart {
  text: string
  highlight?: boolean
}

export const hero = {
  title: 'AstroLauncher',
  logo: { src: '/logo.svg', alt: 'Logo do AstroLauncher' },
  subtitle: [
    { text: 'Um launcher de Minecraft ' },
    { text: 'leve, moderno e de código aberto', highlight: true },
    { text: ', feito com ' },
    { text: 'Tauri, React e Rust', highlight: true },
    {
      text: '. Todas as versões, todos os loaders, mods, modpacks e contas offline em um só lugar.',
    },
  ] satisfies SubtitlePart[],
  versionPrefix: 'Última versão',
  updatedPrefix: 'Atualizado',
  primaryCta: {
    label: 'Baixar',
    fallbackHref: 'https://github.com/kauafpssx/AstroLauncher/releases/latest',
    downloadFor: 'Baixar para',
    seeDownloads: 'Ver downloads',
    otherPlatforms: 'Outras plataformas',
    yourSystem: 'Seu sistema',
    downloadStarted: 'Download iniciado',
    osNames: { windows: 'Windows', macos: 'macOS', linux: 'Linux' },
  },
  githubCta: {
    label: 'Ver no GitHub',
    href: 'https://github.com/kauafpssx/AstroLauncher',
  },
}
