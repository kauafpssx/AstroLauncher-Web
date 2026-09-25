// /stats/commit_activity: 52 semanas; responde 202 enquanto o GitHub calcula.
export interface GithubCommitActivityDTO {
  week: number
  total: number
  days: number[]
}
