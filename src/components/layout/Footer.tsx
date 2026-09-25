import { site } from '@/data/site'
import { Container } from '@/components/common/Container'
import { ROUTES } from '@/lib/hash-route'
export function Footer() {
  return (
    <footer className="border-border text-muted-foreground border-t py-16 text-[0.95rem]">
      <Container>
        <p>
          © {site.year} {site.project}. Feito por{' '}
          <a
            href={site.authorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-accent transition-colors"
          >
            {site.author}
          </a>
          .
        </p>
        <p className="mt-4 text-[0.85rem]">
          Código aberto sob a licença{' '}
          <a
            href={ROUTES.license}
            className="hover:text-accent underline underline-offset-3 transition-colors"
          >
            {site.license}
          </a>
          .
        </p>
      </Container>
    </footer>
  )
}
