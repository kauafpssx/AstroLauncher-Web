import { githubRaw } from '@/lib/api/github-client'
import { docsPages } from '@/data/docs'

export const DocsAPI = {
  contributing: () => githubRaw(docsPages.contributing.file),
  copying: () => githubRaw(docsPages.license.file),
  license: () => githubRaw(docsPages.licenseText.file),
}
