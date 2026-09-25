import { motion, useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { AnimatedLink } from '@/components/common/AnimatedLink'
import { CountUp } from '@/components/common/CountUp'
import { Section } from '@/components/common/Section'
import { Button } from '@/components/ui/button'
import { CONTRIBUTE_HEADING, CONTRIBUTORS_LABEL } from '@/data/contribute'
import { useContributors } from '@/features/contribute/hooks/useContributors'
import type { Contributor } from '@/lib/mappers/contributor-mapper'
import { formatNumber } from '@/lib/format'
import { ROUTES } from '@/lib/hash-route'

const LIST_VARIANTS: Variants = {
  show: { transition: { staggerChildren: 0.06 } },
}

const ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
}

function formatCommits(n: number): string {
  return `${formatNumber(Math.round(n))} commits`
}

function ContributorCard({ contributor }: { contributor: Contributor }) {
  return (
    <motion.li
      variants={ITEM_VARIANTS}
      className="border-border bg-surface hover:border-accent/40 flex w-36 flex-col items-center gap-2 rounded-lg border p-4 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_4px_20px_var(--accent-glow)]"
    >
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
      <p className="text-muted-foreground text-xs">
        <CountUp value={contributor.contributions} format={formatCommits} />
      </p>
    </motion.li>
  )
}

function ContributorList({ contributors }: { contributors: Contributor[] }) {
  const reduce = useReducedMotion()
  return (
    <div>
      <p className="text-muted-foreground mb-4 tracking-[.05em] uppercase">
        {`${CONTRIBUTORS_LABEL} (${contributors.length})`}
      </p>
      <motion.ul
        variants={LIST_VARIANTS}
        initial={reduce ? false : 'hidden'}
        whileInView="show"
        viewport={{ once: true, margin: '0px 0px -60px 0px' }}
        className="flex flex-wrap gap-4"
      >
        {contributors.map((contributor) => (
          <ContributorCard key={contributor.login} contributor={contributor} />
        ))}
      </motion.ul>
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
