import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import '@/index.css'
import App from '@/App'

// Todo carregamento (F5 ou link com #) começa no topo, sem o navegador
// restaurar a rolagem anterior nem pular pra âncora. Âncoras de seção saem da
// URL; rotas internas (#/licenca) ficam, pois definem a página.
history.scrollRestoration = 'manual'
if (location.hash && !location.hash.startsWith('#/')) {
  history.replaceState(null, '', location.pathname + location.search)
}
const toTop = () => window.scrollTo({ top: 0, behavior: 'instant' })
toTop()
// pageshow cobre a 1ª carga e a volta pelo cache do navegador (bfcache)
window.addEventListener('pageshow', toTop)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig reducedMotion="never">
      <App />
    </MotionConfig>
  </StrictMode>,
)
