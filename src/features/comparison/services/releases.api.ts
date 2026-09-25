import { githubGet, repoPath } from '@/lib/api/github-client'
import type { GithubReleaseDTO } from '@/types/github-release'

export const ReleasesAPI = {
  list: () => githubGet<GithubReleaseDTO[]>(repoPath('/releases?per_page=100')),
}
