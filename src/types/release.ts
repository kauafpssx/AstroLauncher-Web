export type DownloadOs = 'windows' | 'macos' | 'linux'

export interface ReleaseDownload {
  os: DownloadOs
  format: string
  hint: string | null
  arch: string | null
  url: string
  sizeBytes: number
}

export interface DownloadGroup {
  os: DownloadOs
  downloads: ReleaseDownload[]
}

export interface LatestRelease {
  version: string
  publishedAt: string
  downloads: ReleaseDownload[]
}
