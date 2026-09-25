import { githubGet, repoPath } from '@/lib/api/github-client'
import type { GithubContributorDTO } from '@/types/github-contributor'
import type { GithubReleaseDTO } from '@/types/github-release'

export const StatsAPI = {
  releases: () =>
    githubGet<GithubReleaseDTO[]>(repoPath('/releases?per_page=100')),
  contributors: () =>
    githubGet<GithubContributorDTO[]>(repoPath('/contributors?per_page=100')),
  commitActivity: () => githubGet<unknown>(repoPath('/stats/commit_activity')),
}
