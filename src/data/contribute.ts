import type { ContributorKind } from '@/lib/mappers/contributor-mapper'

export const CONTRIBUTE_HEADING = {
  title: 'Comunidade',
  description:
    'O AstroLauncher é aberto e feito pela comunidade: reporte um bug, sugira um recurso ou mande um pull request.',
}

export const CONTRIBUTORS_LABEL = 'Contribuidores'

// Badge ao lado do nome no card; humano não tem badge.
export const CONTRIBUTOR_BADGES = {
  human: null,
  bot: 'bot',
  ai: 'IA',
} satisfies Record<ContributorKind, string | null>
