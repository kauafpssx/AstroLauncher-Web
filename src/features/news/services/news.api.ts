import { githubGet, repoPath } from '@/lib/api/github-client'
import type { GithubReleaseNotesDTO } from '@/types/news'

// Mesmo path do ReleasesAPI do comparativo: o cache da sessão serve os dois
export const NewsAPI = {
  releases: () =>
    githubGet<GithubReleaseNotesDTO[]>(repoPath('/releases?per_page=100')),
}
