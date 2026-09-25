import { githubGet, repoPath } from '@/lib/api/github-client'
import type { GithubLanguagesDTO } from '@/types/github-languages'

export const LanguagesAPI = {
  get: () => githubGet<GithubLanguagesDTO>(repoPath('/languages')),
}
