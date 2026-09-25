import { Button } from '@/components/ui/button'
import { Container } from '@/components/common/Container'
import { HeroBadges } from '@/features/hero/components/HeroBadges'
import { HeroDownload } from '@/features/hero/components/HeroDownload'
import { GithubIcon } from '@/components/common/BrandIcons'
import { useLatestRelease } from '@/features/hero/hooks/useLatestRelease'
import { hero } from '@/data/hero'
import { cn } from '@/lib/utils'

export function HeroSection() {
  const { data: release } = useLatestRelease()

  return (
    <header className="border-border flex min-h-dvh items-center border-b py-24">
      <Container className="flex flex-col items-start">
        <img
          src={hero.logo.src}
          alt={hero.logo.alt}
          width={180}
          height={180}
          className="ease-ui mb-6 size-45 transition-transform duration-300 hover:scale-105"
        />
        <HeroBadges release={release} />
        <h1 className="text-accent glow-text mb-6 font-serif text-[64px] leading-none font-bold tracking-[-0.01em] md:text-[120px]">
          {hero.title}
        </h1>
        <p className="text-muted-foreground mb-14 max-w-[700px] text-[21.6px] leading-[1.6]">
          {hero.subtitle.map((part) => (
            <span
              key={part.text}
              className={cn(part.highlight && 'text-foreground font-medium')}
            >
              {part.text}
            </span>
          ))}
        </p>
        <div className="flex flex-wrap items-center gap-5">
          <HeroDownload release={release} />
          <Button
            variant="secondary"
            href={hero.githubCta.href}
            external
            className="h-12 py-0"
          >
            <GithubIcon className="size-4" />
            {hero.githubCta.label}
          </Button>
        </div>
      </Container>
    </header>
  )
}
