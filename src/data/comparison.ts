import type { RamBarItem } from '@/types/comparison'

export const COMPARISON_HEADING = {
  title: 'Leve, completo e rápido de nascer',
  description:
    'Menos memória, mais recursos e uma trajetória que launchers veteranos levaram anos para percorrer.',
}

export const RAM_TITLE = 'Memória RAM com o launcher parado'

export const RAM_BARS: RamBarItem[] = [
  {
    name: 'AstroLauncher',
    label: '30 MB',
    megabytes: 30,
    highlight: true,
    logo: '/logo.svg',
  },
  {
    name: 'Prism Launcher',
    label: '~50–100 MB',
    megabytes: 75,
    logo: '/prism.svg',
  },
  {
    name: 'Modrinth App',
    label: '~50–150 MB',
    megabytes: 100,
    logo: '/modrinth.svg',
  },
  {
    name: 'ATLauncher',
    label: '~80–120 MB',
    megabytes: 100,
    logo: '/atlauncher.svg',
  },
  {
    name: 'CurseForge App',
    label: '~200–300 MB',
    megabytes: 250,
    logo: '/curseforge.svg',
  },
  {
    name: 'TLauncher',
    label: '~250–450 MB',
    megabytes: 350,
    logo: '/tlauncher.png',
  },
]

export const RAM_FOOTNOTE =
  'AstroLauncher e TLauncher medidos pelo autor no Windows (Gerenciador de Tarefas, launcher parado). Demais: estimativas públicas de terceiros.'

export const MATRIX_TITLE = 'Recursos lado a lado'

export const MANIFESTO = {
  lead: '~40 dias',
  versus: '13 anos',
  body: 'Em 40 dias, o AstroLauncher chegou onde launchers de mais de uma década chegaram, e foi além: Mapa da Seed, ZeroTier, waypoints, contas offline sem burocracia.',
  footnote:
    'v0.1.0 em 28/07/2026 → v1.0.0 em 05/09/2026 (39 dias). MultiMC, base do Prism, e ATLauncher existem desde setembro de 2013.',
}

export const TIMELINE_TITLE = 'Linha do tempo das releases'

export const OPEN_SOURCE = {
  title: 'Por que código aberto importa',
  paragraphs: [
    'Com código fechado, ninguém de fora consegue auditar o que roda no seu PC: resta confiar na palavra de quem distribui.',
    'A TLauncher, por exemplo, já teve componentes sinalizados por antivírus como spyware. A empresa nega, e não há perícia independente conclusiva sobre o caso. Sem o código, também não há como conferir.',
    'O AstroLauncher é GPL-3.0: qualquer pessoa pode ler, compilar e verificar cada linha.',
  ],
  sources: [
    {
      label: 'posição da TLauncher',
      href: 'https://tlauncher.org/en/news_26/no-spyware-tl_18725.html',
    },
    {
      label: 'checagem do Factually',
      href: 'https://factually.co/fact-checks/technology/is-tlauncher-harmful-does-it-sell-data-or-spy-680e56',
    },
  ],
}
