export interface ChartPoint {
  label: string
  value: number
}

export interface ProjectStats {
  commits: number | null
  releases: number | null
  downloads: number | null
  contributors: number | null
  weekly: ChartPoint[]
}
