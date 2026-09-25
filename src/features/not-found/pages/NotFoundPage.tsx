import { PageShell } from '@/components/layout/PageShell'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/lib/hash-route'

export function NotFoundPage() {
  return (
    <PageShell
      title="Página não encontrada"
      description="Esse endereço não existe no site. Talvez o link esteja errado ou a página tenha mudado de lugar."
    >
      <div className="flex flex-wrap gap-4">
        <Button variant="primary" href="#" className="h-12 py-0">
          Ir para o início
        </Button>
        <Button variant="secondary" href={ROUTES.news} className="h-12 py-0">
          Ver novidades
        </Button>
      </div>
    </PageShell>
  )
}
