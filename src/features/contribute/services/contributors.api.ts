import { githubGet, repoPath } from '@/lib/api/github-client'
import type { GithubContributorDTO } from '@/types/github-contributor'

export const ContributorsAPI = {
  list: () =>
    githubGet<GithubContributorDTO[]>(repoPath('/contributors?per_page=100')),
}
