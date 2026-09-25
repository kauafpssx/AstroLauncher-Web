import { githubGet, repoPath } from '@/lib/api/github-client'
import type { CommitMessageDTO } from '@/lib/mappers/contributor-mapper'
import type { GithubContributorDTO } from '@/types/github-contributor'

export const ContributorsAPI = {
  list: () =>
    githubGet<GithubContributorDTO[]>(repoPath('/contributors?per_page=100')),
  commits: (page: number) =>
    githubGet<CommitMessageDTO[]>(
      repoPath(`/commits?per_page=100&page=${page}`),
    ),
}
