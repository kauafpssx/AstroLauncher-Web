type LauncherId =
  'astro' | 'prism' | 'modrinth' | 'curseforge' | 'official' | 'tlauncher'

// 'unknown' = célula ainda não verificada (`?` da nota); a UI mostra "?"
export type FeatureSupport = 'yes' | 'no' | 'partial' | 'unknown'

export interface FeatureMatrixRow {
  label: string
  values: Record<LauncherId, FeatureSupport>
  // Observação curta exibida como nota (ex.: anúncios só no app gratuito)
  note?: string
}

export interface LauncherColumn {
  id: LauncherId
  name: string
}
