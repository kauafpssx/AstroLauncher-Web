import type { FeatureMatrixRow, LauncherColumn } from '@/types/feature-matrix'

export const LAUNCHER_COLUMNS: LauncherColumn[] = [
  { id: 'astro', name: 'AstroLauncher', logo: '/logo.svg' },
  { id: 'prism', name: 'Prism', logo: '/prism.svg' },
  { id: 'modrinth', name: 'Modrinth', logo: '/modrinth.svg' },
  { id: 'curseforge', name: 'CurseForge', logo: '/curseforge.svg' },
  { id: 'official', name: 'Oficial', logo: '/minecraft-launcher.svg' },
  { id: 'tlauncher', name: 'TLauncher', logo: '/tlauncher.png' },
]

// Matriz da nota Orquestração (bloco B do comparativo).
// Verificação 11b (docs oficiais via busca; modrinth.com/prismlauncher.org/support
// .modrinth.com bloqueados na sandbox; portal Inspiração devolvido intacto):
// - Modrinth versões → yes ("Historical versions - Classic and old releases"):
//   modrinth-code.mintlify.app/platform/desktop-app
// - Prism Discord → no ("we do not plan any Discord integration"):
//   github.com/PrismLauncher/PrismLauncher/issues/232 e #3758
// - Modrinth anúncios → no ("Ad-free" é benefício pago):
//   modrinth.com/news/article/design-refresh, modrinth.com/plus
// TLauncher (rodada 3, fontes tlauncher.org salvo indicação):
// - loaders partial (Forge/Fabric/NeoForge com guia oficial; Quilt só em guia de
//   terceiro): /en/how-install-neoforge.html, /how-install-fabric.html
// - LiteLoader yes (lista oficial de versões): go.tlauncher.org
// - versões partial ("from Alpha to Snapshots"; classic/infdev s/ confirmação):
//   tlauncher.org, /en/enable-snapshot-older-versions.html
// - Modrinth+CF no (sistema próprio TLMods): /en/news_26/modpack-system_5100.html
// - offline yes (versões TL rodam "without a Mojang license"): /en/open-lan.html
// - Seed/ZeroTier/waypoints no (exclusivos do Astro, mesma base das demais colunas)
// - skin 3D, export instância, Discord → unknown (sem evidência)
// - anúncios no (Premium desativa a publicidade): /en/premium.html
// - código aberto no (proprietário, TLauncher Inc.): github.com/tlauncher
export const FEATURE_MATRIX: FeatureMatrixRow[] = [
  {
    label: 'Fabric, Quilt, Forge e NeoForge',
    values: {
      astro: 'yes',
      prism: 'yes',
      modrinth: 'yes',
      curseforge: 'yes',
      official: 'no',
      tlauncher: 'partial',
    },
    note: 'TLauncher: Forge, Fabric e NeoForge documentados; Quilt sem confirmação oficial.',
  },
  {
    label: 'LiteLoader',
    values: {
      astro: 'yes',
      prism: 'yes',
      modrinth: 'no',
      curseforge: 'no',
      official: 'no',
      tlauncher: 'yes',
    },
  },
  {
    label: 'Todas as versões (alpha, beta, classic, infdev)',
    values: {
      astro: 'yes',
      prism: 'yes',
      modrinth: 'yes',
      curseforge: 'no',
      official: 'partial',
      tlauncher: 'partial',
    },
    note: 'TLauncher: site oficial anuncia "from Alpha to Snapshots"; classic/infdev sem confirmação.',
  },
  {
    label: 'Mods do Modrinth + CurseForge juntos',
    values: {
      astro: 'yes',
      prism: 'yes',
      modrinth: 'no',
      curseforge: 'no',
      official: 'no',
      tlauncher: 'no',
    },
    note: 'TLauncher: usa o sistema próprio TLMods, sem integração nativa.',
  },
  {
    label: 'Contas offline sem conta Microsoft',
    values: {
      astro: 'yes',
      prism: 'no',
      modrinth: 'no',
      curseforge: 'no',
      official: 'no',
      tlauncher: 'yes',
    },
  },
  {
    label: 'Mapa da Seed (biomas e estruturas) embutido',
    values: {
      astro: 'yes',
      prism: 'no',
      modrinth: 'no',
      curseforge: 'no',
      official: 'no',
      tlauncher: 'no',
    },
  },
  {
    label: 'Rede ZeroTier (jogar LAN pela internet)',
    values: {
      astro: 'yes',
      prism: 'no',
      modrinth: 'no',
      curseforge: 'no',
      official: 'no',
      tlauncher: 'no',
    },
  },
  {
    label: 'Visualizador de skin 3D',
    values: {
      astro: 'yes',
      prism: 'yes',
      modrinth: 'yes',
      curseforge: 'no',
      official: 'yes',
      tlauncher: 'unknown',
    },
  },
  {
    label: 'Waypoints + notas por instância',
    values: {
      astro: 'yes',
      prism: 'no',
      modrinth: 'no',
      curseforge: 'no',
      official: 'no',
      tlauncher: 'no',
    },
  },
  {
    label: 'Exportar e importar instância completa (AstroPack)',
    values: {
      astro: 'yes',
      prism: 'yes',
      modrinth: 'yes',
      curseforge: 'yes',
      official: 'no',
      tlauncher: 'unknown',
    },
  },
  {
    label: 'Discord Rich Presence',
    values: {
      astro: 'yes',
      prism: 'no',
      modrinth: 'yes',
      curseforge: 'no',
      official: 'no',
      tlauncher: 'unknown',
    },
  },
  {
    label: 'Sem anúncios',
    values: {
      astro: 'yes',
      prism: 'yes',
      modrinth: 'no',
      curseforge: 'no',
      official: 'yes',
      tlauncher: 'no',
    },
    note: 'Modrinth e TLauncher exibem anúncios na versão gratuita (Modrinth+ e Premium removem).',
  },
  {
    label: 'Código aberto',
    values: {
      astro: 'yes',
      prism: 'yes',
      modrinth: 'yes',
      curseforge: 'no',
      official: 'no',
      tlauncher: 'no',
    },
  },
]
