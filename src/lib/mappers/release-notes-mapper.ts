import type { GithubReleaseNotesDTO, ReleaseNote } from '@/types/news'

// Releases publicadas da mais nova para a mais antiga; a primeira é a atual
export function toReleaseNotes(dtos: GithubReleaseNotesDTO[]): ReleaseNote[] {
  return dtos
    .filter((dto) => dto.published_at)
    .sort((a, b) => b.published_at.localeCompare(a.published_at))
    .map((dto, i) => ({
      tag: dto.tag_name,
      date: dto.published_at,
      url: dto.html_url,
      body: dto.body?.trim() ?? '',
      latest: i === 0,
    }))
}
