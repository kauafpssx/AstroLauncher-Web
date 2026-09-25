import { lazy, Suspense, useEffect, useRef } from 'react'
import { GridBackground } from '@/components/layout/GridBackground'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/features/hero/components/HeroSection'
import { HighlightsSection } from '@/features/highlights/components/HighlightsSection'
import { ComparisonSection } from '@/features/comparison/components/ComparisonSection'
import { StackSection } from '@/features/stack/components/StackSection'
import { StatsSection } from '@/features/stats/components/StatsSection'
import { ContributeSection } from '@/features/contribute/components/ContributeSection'
import { ROUTES, useHashRoute, type Route } from '@/lib/hash-route'

// Páginas internas carregam sob demanda: o react-markdown não pesa na home.
const ContributingPage = lazy(() =>
  import('@/features/docs/pages/ContributingPage').then((m) => ({
    default: m.ContributingPage,
  })),
)
const LicensePage = lazy(() =>
  import('@/features/docs/pages/LicensePage').then((m) => ({
    default: m.LicensePage,
  })),
)

function HomePage() {
  return (
    <>
      <HeroSection />
      <HighlightsSection />
      <ComparisonSection />
      <StackSection />
      <StatsSection />
      <ContributeSection />
    </>
  )
}

function CurrentPage({ route }: { route: Route }) {
  if (route === ROUTES.contributing) return <ContributingPage />
  if (route === ROUTES.license) return <LicensePage />
  return <HomePage />
}

export default function App() {
  const route = useHashRoute()
  const previousRoute = useRef(route)

  // Só rola ao trocar de página (a 1ª carga sempre começa no topo, ver main.tsx).
  // Vindo de uma página interna por uma âncora da home (ex.: link do footer),
  // a seção ainda não existia quando o hash mudou.
  useEffect(() => {
    if (previousRoute.current === route) return
    previousRoute.current = route
    const anchor = document.getElementById(window.location.hash.slice(1))
    if (anchor) anchor.scrollIntoView({ behavior: 'instant' })
    else window.scrollTo({ top: 0, behavior: 'instant' })
  }, [route])

  return (
    <>
      <GridBackground />
      <main>
        <Suspense fallback={<div className="min-h-dvh" />}>
          <CurrentPage route={route} />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
