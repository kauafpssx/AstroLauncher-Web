import { ROUTES } from '@/lib/hash-route'
import type { FooterColumn, SocialLink } from '@/types/footer'

const REPO_URL = 'https://github.com/kauafpssx/AstroLauncher'

export const site = {
  year: 2026,
  project: 'AstroLauncher',
  author: 'kauafpssx',
  authorUrl: 'https://github.com/kauafpssx',
  license: 'GPL-3.0',
  tagline:
    'Launcher de Minecraft leve, moderno e de código aberto, feito com Rust e React.',
  disclaimer: 'Não afiliado à Mojang Studios ou à Microsoft.',
}

// Contatos do README de perfil do autor (github.com/kauafpssx)
export const socialLinks: SocialLink[] = [
  { kind: 'github', label: 'GitHub', href: 'https://github.com/kauafpssx' },
  {
    kind: 'instagram',
    label: 'Instagram',
    href: 'https://instagram.com/kauafpss_',
  },
  { kind: 'email', label: 'E-mail', href: 'mailto:kauaff3@gmail.com' },
]

export const footerColumns: FooterColumn[] = [
  {
    title: 'Site',
    links: [
      // '#' rola ao topo mesmo já estando na home ('#/' não tem alvo)
      { label: 'Início', href: '#' },
      { label: 'Recursos', href: '#recursos' },
      { label: 'Comparativo', href: '#comparativo' },
      { label: 'Stack', href: '#stack' },
      { label: 'Números', href: '#numeros' },
      { label: 'Contribua', href: '#contribute' },
    ],
  },
  {
    title: 'Projeto',
    links: [
      { label: 'Repositório', href: REPO_URL, external: true },
      { label: 'Novidades', href: ROUTES.news },
      { label: 'Releases', href: `${REPO_URL}/releases`, external: true },
      { label: 'Reportar bug', href: `${REPO_URL}/issues`, external: true },
      { label: 'Guia de contribuição', href: ROUTES.contributing },
      { label: 'Licença', href: ROUTES.license },
    ],
  },
]
