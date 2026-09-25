import { useSyncExternalStore } from 'react'

// Páginas internas usam '#/rota'; qualquer outro hash (âncoras como
// #comparativo) continua sendo a página inicial. Sem lib de rotas: são 2 páginas.
export const ROUTES = {
  home: '#/',
  contributing: '#/contribuir',
  license: '#/licenca',
} as const

export type Route = (typeof ROUTES)[keyof typeof ROUTES]

function subscribe(onChange: () => void): () => void {
  window.addEventListener('hashchange', onChange)
  return () => window.removeEventListener('hashchange', onChange)
}

function currentRoute(): Route {
  const hash = window.location.hash
  const match = Object.values(ROUTES).find(
    (r) => r !== ROUTES.home && r === hash,
  )
  return match ?? ROUTES.home
}

export function useHashRoute(): Route {
  return useSyncExternalStore(subscribe, currentRoute)
}
