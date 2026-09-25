const GITHUB_API = 'https://api.github.com'
const GITHUB_RAW = 'https://raw.githubusercontent.com'
const GITHUB_REPO = 'kauafpssx/AstroLauncher'
const GITHUB_BRANCH = 'main'

// Sem token a API permite 60 req/h por IP: cada resposta fica em cache na
// sessão, então recarregar a página não gasta cota. Só 200 é cacheado.
async function cachedFetch<T>(
  url: string,
  parse: (r: Response) => Promise<T>,
): Promise<T> {
  const cached = readCache<T>(url)
  if (cached !== null) return cached
  const response = await fetch(url, {
    headers: { Accept: 'application/vnd.github+json' },
  })
  if (!response.ok) {
    throw new Error(`GitHub ${response.status} em ${url}`)
  }
  const data = await parse(response)
  // 202 = GitHub ainda calculando (/stats/*): resposta vazia, não pode ficar em cache.
  if (response.status === 200) writeCache(url, data)
  return data
}

function readCache<T>(key: string): T | null {
  try {
    const raw = sessionStorage.getItem(key)
    return raw === null ? null : (JSON.parse(raw) as T)
  } catch {
    return null
  }
}

function writeCache(key: string, data: unknown): void {
  try {
    sessionStorage.setItem(key, JSON.stringify(data))
  } catch {}
}

// Único ponto de fetch do site (papel do apiInvoke no launcher).
export function githubGet<T>(path: string): Promise<T> {
  return cachedFetch(`${GITHUB_API}${path}`, (r) => r.json() as Promise<T>)
}

// Arquivos do repositório (CONTRIBUTING, LICENSE...): não conta na cota da API.
export function githubRaw(filePath: string): Promise<string> {
  return cachedFetch(
    `${GITHUB_RAW}/${GITHUB_REPO}/${GITHUB_BRANCH}/${filePath}`,
    (r) => r.text(),
  )
}

export function repoPath(suffix = ''): string {
  return `/repos/${GITHUB_REPO}${suffix}`
}

export function repoBlobUrl(filePath: string): string {
  return `https://github.com/${GITHUB_REPO}/blob/${GITHUB_BRANCH}/${filePath}`
}
