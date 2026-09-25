export interface RamBarItem {
  name: string
  // Valor exibido (ex.: "30 MB" ou "~50–100 MB")
  label: string
  // MB usados para a largura: medido ou ponto médio da faixa
  megabytes: number
  highlight?: boolean
  // Caminho em /public; sem logo mostra só o nome
  logo?: string
}

export interface ReleaseMilestone {
  tag: string
  date: string
  // Release mais recente: ganha destaque na linha do tempo
  latest: boolean
}
