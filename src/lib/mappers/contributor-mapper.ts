import type { GithubContributorDTO } from '@/types/github-contributor'

export interface Contributor {
  login: string
  avatarUrl: string
  profileUrl: string
  contributions: number
}

function toContributor(dto: GithubContributorDTO): Contributor {
  return {
    login: dto.login,
    avatarUrl: dto.avatar_url,
    profileUrl: dto.html_url,
    contributions: dto.contributions,
  }
}

// Bots (ex.: dependabot[bot]) ficam de fora, igual ao Stats do Comet
function isBot(dto: GithubContributorDTO): boolean {
  return dto.login.endsWith('[bot]')
}

// Mais ativos primeiro; nunca altera o array de entrada
export function toContributors(dtos: GithubContributorDTO[]): Contributor[] {
  return [...dtos]
    .filter((dto) => !isBot(dto))
    .sort((a, b) => b.contributions - a.contributions)
    .map(toContributor)
}
