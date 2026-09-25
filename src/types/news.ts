import type { GithubReleaseDTO } from '@/types/github-release'

export type GithubReleaseNotesDTO = GithubReleaseDTO & { body: string | null }

export interface ReleaseNote {
  tag: string
  date: string
  url: string
  body: string
  latest: boolean
}
