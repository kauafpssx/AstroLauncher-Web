import { Mail } from 'lucide-react'
import type { ComponentType } from 'react'
import { Container } from '@/components/common/Container'
import { GithubIcon, InstagramIcon } from '@/components/common/BrandIcons'
import { footerColumns, site, socialLinks } from '@/data/site'
import { ROUTES } from '@/lib/hash-route'
import type { FooterColumn, SocialLink } from '@/types/footer'

const SOCIAL_ICONS: Record<
  SocialLink['kind'],
  ComponentType<{ className?: string }>
> = {
  github: GithubIcon,
  instagram: InstagramIcon,
  email: Mail,
}

const LINK = 'hover:text-foreground transition-colors'

function SocialButton({ link }: { link: SocialLink }) {
  const Icon = SOCIAL_ICONS[link.kind]
  const external = link.kind !== 'email'
  return (
    <a
      href={link.href}
      aria-label={link.label}
      title={link.label}
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
      className="border-border bg-surface text-muted-foreground hover:border-accent/40 hover:text-foreground flex size-10 items-center justify-center rounded-md border transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_18px_var(--accent-glow)]"
    >
      <Icon className="size-[18px]" />
    </a>
  )
}

function Brand() {
  return (
    <div className="col-span-2 max-w-sm md:col-span-1">
      <a href="#" className="flex items-center gap-3">
        <img src="/logo.svg" alt="" className="size-9 rounded-md" />
        <span className="text-foreground font-serif text-2xl">
          {site.project}
        </span>
      </a>
      <p className="mt-4 leading-relaxed">{site.tagline}</p>
      <ul className="mt-6 flex gap-2">
        {socialLinks.map((link) => (
          <li key={link.kind}>
            <SocialButton link={link} />
          </li>
        ))}
      </ul>
    </div>
  )
}

function LinkColumn({ column }: { column: FooterColumn }) {
  return (
    <nav aria-label={column.title}>
      <p className="text-foreground mb-4 text-sm font-semibold tracking-[0.05em] uppercase">
        {column.title}
      </p>
      <ul className="space-y-2.5">
        {column.links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className={LINK}
              {...(link.external && {
                target: '_blank',
                rel: 'noopener noreferrer',
              })}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export function Footer() {
  return (
    <footer className="border-border text-muted-foreground border-t pt-16 pb-10 text-[0.95rem]">
      <Container>
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-[2fr_1fr_1fr]">
          <Brand />
          {footerColumns.map((column) => (
            <LinkColumn key={column.title} column={column} />
          ))}
        </div>
        <div className="border-border mt-14 flex flex-col gap-3 border-t pt-8 text-[0.85rem] sm:flex-row sm:items-center sm:justify-between">
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
            , sob a licença{' '}
            <a
              href={ROUTES.license}
              className="hover:text-accent underline underline-offset-3 transition-colors"
            >
              {site.license}
            </a>
            .
          </p>
          <p>{site.disclaimer}</p>
        </div>
      </Container>
    </footer>
  )
}
