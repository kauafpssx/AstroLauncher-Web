import { githubGet, repoPath } from '@/lib/api/github-client'
import type { GithubReleaseDTO } from '@/types/github-release'

export const ReleaseAPI = {
  latest: () => githubGet<GithubReleaseDTO>(repoPath('/releases/latest')),
}
