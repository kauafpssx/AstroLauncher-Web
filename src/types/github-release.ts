interface GithubReleaseAssetDTO {
  name: string
  size: number
  download_count: number
  browser_download_url: string
}

export interface GithubReleaseDTO {
  tag_name: string
  name: string | null
  published_at: string
  html_url: string
  assets: GithubReleaseAssetDTO[]
}
