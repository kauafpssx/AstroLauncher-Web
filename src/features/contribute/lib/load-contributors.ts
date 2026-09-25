import { ContributorsAPI } from '@/features/contribute/services/contributors.api'
import {
  countCoAuthors,
  toContributors,
  type CommitMessageDTO,
  type Contributor,
} from '@/lib/mappers/contributor-mapper'

const PAGE_SIZE = 100
const MAX_PAGES = 5

async function loadCommits(): Promise<CommitMessageDTO[]> {
  const all: CommitMessageDTO[] = []
  for (let page = 1; page <= MAX_PAGES; page++) {
    const batch = await ContributorsAPI.commits(page)
    all.push(...batch)
    if (batch.length < PAGE_SIZE) break
  }
  return all
}

let pending: Promise<Contributor[]> | null = null

// Fonte única da lista (Comunidade) e da contagem (hero): uma busca por página.
// /commits falhando: só os de /contributors, sem erro.
export function loadContributors(): Promise<Contributor[]> {
  pending ??= Promise.all([
    ContributorsAPI.list(),
    loadCommits().catch(() => []),
  ]).then(([dtos, commits]) => toContributors(dtos, countCoAuthors(commits)))
  pending.catch(() => {
    pending = null
  })
  return pending
}
