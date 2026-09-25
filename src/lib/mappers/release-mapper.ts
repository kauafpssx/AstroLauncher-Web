import type { GithubReleaseDTO } from '@/types/github-release'
import type {
  DownloadGroup,
  DownloadOs,
  LatestRelease,
  ReleaseDownload,
} from '@/types/release'

interface Installer {
  ext: string
  os: DownloadOs
  format: string
  hint: string | null
}

// Ordem = prioridade dentro de cada SO (no Linux, AppImage é o padrão).
// Arquivos do updater (.app.tar.gz, latest.json, .sig) não casam e ficam fora.
const INSTALLERS: Installer[] = [
  { ext: '.msi', os: 'windows', format: '.msi', hint: null },
  { ext: '.exe', os: 'windows', format: '.exe', hint: null },
  { ext: '.dmg', os: 'macos', format: '.dmg', hint: null },
  {
    ext: '.appimage',
    os: 'linux',
    format: '.AppImage',
    hint: 'qualquer distro',
  },
  { ext: '.deb', os: 'linux', format: '.deb', hint: 'Debian/Ubuntu' },
  { ext: '.rpm', os: 'linux', format: '.rpm', hint: 'Fedora/openSUSE' },
]

// Arquitetura lida do nome do arquivo (ex.: _x64_, _amd64, x86_64, _universal).
const ARCHES: [RegExp, string][] = [
  [/universal/i, 'Universal: Intel + Apple Silicon'],
  [/aarch64|arm64/i, 'ARM64'],
  [/x86_64|amd64/i, 'amd64'],
  [/x64/i, 'x64'],
]

const OS_ORDER: DownloadOs[] = ['windows', 'macos', 'linux']

function archOf(fileName: string): string | null {
  return ARCHES.find(([pattern]) => pattern.test(fileName))?.[1] ?? null
}

function toDownloads(dto: GithubReleaseDTO): ReleaseDownload[] {
  return INSTALLERS.flatMap(({ ext, os, format, hint }) =>
    dto.assets
      .filter((asset) => asset.name.toLowerCase().endsWith(ext))
      .map((asset) => ({
        os,
        format,
        hint,
        arch: archOf(asset.name),
        url: asset.browser_download_url,
        sizeBytes: asset.size,
      })),
  )
}

export function toLatestRelease(dto: GithubReleaseDTO): LatestRelease {
  return {
    version: dto.tag_name,
    publishedAt: dto.published_at,
    downloads: toDownloads(dto),
  }
}

export function pickDownload(
  downloads: ReleaseDownload[],
  os: string,
): ReleaseDownload | null {
  return downloads.find((d) => d.os === os) ?? null
}

// Um grupo por SO que tenha instalador; o do sistema atual vem primeiro.
export function groupDownloads(
  downloads: ReleaseDownload[],
  currentOs: DownloadOs | null,
): DownloadGroup[] {
  const order = currentOs
    ? [currentOs, ...OS_ORDER.filter((os) => os !== currentOs)]
    : OS_ORDER
  return order
    .map((os) => ({ os, downloads: downloads.filter((d) => d.os === os) }))
    .filter((group) => group.downloads.length > 0)
}
