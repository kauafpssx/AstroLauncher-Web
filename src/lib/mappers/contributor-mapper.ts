import type { GithubContributorDTO } from '@/types/github-contributor'

export type ContributorKind = 'human' | 'bot' | 'ai'

export interface Contributor {
  login: string
  // Nome do card: sem o sufixo [bot], que o badge já indica.
  name: string
  avatarUrl: string
  profileUrl: string
  contributions: number
  kind: ContributorKind
}

// Só o que o parse de coautoria usa de GET /commits.
export interface CommitMessageDTO {
  commit: { message: string }
}

const CO_AUTHOR = /^co-authored-by:\s*(.*?)\s*<([^>]+)>\s*$/gim
const NOREPLY = /^(?:\d+\+)?([^@]+)@users\.noreply\.github\.com$/i

// O próprio GitHub liga o coautor noreply@anthropic.com ao usuário 'claude'.
const CLAUDE: Contributor = {
  login: 'claude',
  name: 'Claude',
  avatarUrl: 'https://github.com/claude.png',
  profileUrl: 'https://github.com/claude',
  contributions: 0,
  kind: 'ai',
}

const CODERABBIT: Contributor = {
  login: 'coderabbitai',
  name: 'coderabbitai',
  avatarUrl: 'https://github.com/coderabbitai.png',
  profileUrl: 'https://github.com/apps/coderabbitai',
  contributions: 0,
  kind: 'bot',
}

function isBotLogin(login: string): boolean {
  return login.endsWith('[bot]')
}

function nameOf(login: string): string {
  return login.replace(/\[bot\]$/, '')
}

// dependabot[bot] e coderabbitai viram a mesma chave com ou sem o sufixo.
function keyOf(login: string): string {
  return nameOf(login).toLowerCase()
}

function toContributor(dto: GithubContributorDTO): Contributor {
  return {
    login: dto.login,
    name: nameOf(dto.login),
    avatarUrl: dto.avatar_url,
    profileUrl: dto.html_url,
    contributions: dto.contributions,
    kind: isBotLogin(dto.login) ? 'bot' : 'human',
  }
}

// Trailer → contribuidor conhecido; e-mail que não dá pra ligar a um perfil é ignorado.
function fromTrailer(email: string): Contributor | null {
  if (/@anthropic\.com$/i.test(email)) return CLAUDE
  const login = NOREPLY.exec(email)?.[1]
  if (!login) return null
  if (keyOf(login) === 'coderabbitai') return CODERABBIT
  return {
    login,
    name: nameOf(login),
    avatarUrl: `https://github.com/${nameOf(login)}.png`,
    profileUrl: `https://github.com/${nameOf(login)}`,
    contributions: 0,
    kind: isBotLogin(login) ? 'bot' : 'human',
  }
}

// Conta 1 por commit para cada coautor, mesmo com trailer repetido.
export function countCoAuthors(commits: CommitMessageDTO[]): Contributor[] {
  const totals = new Map<string, Contributor>()
  for (const { commit } of commits) {
    const seen = new Set<string>()
    for (const [, , email = ''] of commit.message.matchAll(CO_AUTHOR)) {
      const author = fromTrailer(email)
      if (!author || seen.has(keyOf(author.login))) continue
      seen.add(keyOf(author.login))
      const prev = totals.get(keyOf(author.login)) ?? author
      totals.set(keyOf(author.login), {
        ...prev,
        contributions: prev.contributions + 1,
      })
    }
  }
  return [...totals.values()]
}

function mergeInto(list: Contributor[], extra: Contributor): Contributor[] {
  const i = list.findIndex((c) => keyOf(c.login) === keyOf(extra.login))
  if (i === -1) return [...list, extra]
  return list.map((c, j) =>
    j === i
      ? { ...c, contributions: c.contributions + extra.contributions }
      : c,
  )
}

// Humanos primeiro, depois mais commits; nunca altera os arrays de entrada.
export function toContributors(
  dtos: GithubContributorDTO[],
  coAuthors: Contributor[] = [],
): Contributor[] {
  return coAuthors
    .reduce(mergeInto, dtos.map(toContributor))
    .sort(
      (a, b) =>
        Number(a.kind !== 'human') - Number(b.kind !== 'human') ||
        b.contributions - a.contributions,
    )
}
