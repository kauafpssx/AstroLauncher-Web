import { AnimatedLink } from '@/components/common/AnimatedLink'
import { Section } from '@/components/common/Section'
import { Button } from '@/components/ui/button'
import { CONTRIBUTE_HEADING, CONTRIBUTORS_LABEL } from '@/data/contribute'
import { useContributors } from '@/features/contribute/hooks/useContributors'
import type { Contributor } from '@/lib/mappers/contributor-mapper'
import { ROUTES } from '@/lib/hash-route'

function ContributorCard({ contributor }: { contributor: Contributor }) {
  const commits =
    contributor.contributions === 1
      ? '1 commit'
      : `${contributor.contributions} commits`
  return (
    <li className="border-border bg-surface hover:border-accent/40 flex w-36 flex-col items-center gap-2 rounded-lg border p-4 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_4px_20px_var(--accent-glow)]">
      <a
        href={contributor.profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={contributor.login}
      >
        <img
          src={contributor.avatarUrl}
          alt={contributor.login}
          width={60}
          height={60}
          loading="lazy"
          className="border-border bg-surface size-15 rounded-full border-2 object-cover"
        />
      </a>
      <AnimatedLink href={contributor.profileUrl} external>
        {contributor.login}
      </AnimatedLink>
      <p className="text-muted-foreground text-xs">{commits}</p>
    </li>
  )
}

function ContributorList({ contributors }: { contributors: Contributor[] }) {
  return (
    <div>
      <p className="text-muted-foreground mb-4 tracking-[.05em] uppercase">
        {`${CONTRIBUTORS_LABEL} (${contributors.length})`}
      </p>
      <ul className="flex flex-wrap gap-4">
        {contributors.map((contributor) => (
          <ContributorCard key={contributor.login} contributor={contributor} />
        ))}
      </ul>
    </div>
  )
}

export function ContributeSection() {
  const { data: contributors } = useContributors()

  return (
    <Section
      id="contribute"
      title={CONTRIBUTE_HEADING.title}
      description={CONTRIBUTE_HEADING.description}
    >
      {contributors.length > 0 ? (
        <ContributorList contributors={contributors} />
      ) : null}
      <Button variant="outline" href={ROUTES.contributing} className="mt-8">
        Guia de contribuição
      </Button>
    </Section>
  )
}
