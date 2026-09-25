export type OsId = 'windows' | 'macos' | 'linux' | 'mobile' | 'unknown'

type NavigatorWithUAData = Navigator & {
  userAgentData?: { platform?: string }
}

function navigatorPlatform(): string | undefined {
  if (typeof navigator === 'undefined') return undefined
  return (navigator as NavigatorWithUAData).userAgentData?.platform
}

function navigatorUserAgent(): string {
  return typeof navigator === 'undefined' ? '' : navigator.userAgent
}

// Pura quando recebe as strings (testável); sem argumentos, lê o navigator.
// Mobile vem antes porque o UA do Android contém "Linux". ChromeOS ("CrOS")
// não roda os pacotes Linux do app.
// ponytail: iPadOS se apresenta como Mac; detectar exige touch, fica macOS.
export function detectOs(
  platform = navigatorPlatform(),
  userAgent = navigatorUserAgent(),
): OsId {
  const source = `${platform ?? ''} ${userAgent}`
  if (/android|iphone|ipad|ipod|ios|mobile/i.test(source)) return 'mobile'
  if (/cros/i.test(source)) return 'unknown'
  if (/win/i.test(source)) return 'windows'
  if (/mac/i.test(source)) return 'macos'
  if (/linux|x11/i.test(source)) return 'linux'
  return 'unknown'
}
