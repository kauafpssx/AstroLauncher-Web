import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/use-reduced-motion'

import type { Variants } from 'framer-motion'
import { AnimatedLink } from '@/components/common/AnimatedLink'
import { Accordion } from '@/components/common/Accordion'
import { CountUp } from '@/components/common/CountUp'
import { Section } from '@/components/common/Section'
import { Button } from '@/components/ui/button'
import {
  CONTRIBUTE_HEADING,
  CONTRIBUTOR_BADGES,
  CONTRIBUTORS_LABEL,
} from '@/data/contribute'
import { FAQ_ITEMS } from '@/data/faq'
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
  const badge = CONTRIBUTOR_BADGES[contributor.kind]
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
      <span className="max-w-full min-w-0">
        <AnimatedLink href={contributor.profileUrl} external>
          <span className="[overflow-wrap:anywhere]">{contributor.name}</span>
        </AnimatedLink>
      </span>
      {/* Faixa do badge sempre reservada: todo card fica com a mesma altura. */}
      <span className="flex h-4 items-center justify-center">
        {badge && (
          <span className="border-border text-muted-foreground rounded-sm border px-1.5 py-0.5 text-[10px] leading-none font-semibold">
            {badge}
          </span>
        )}
      </span>
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
      id="comunidade"
      title={CONTRIBUTE_HEADING.title}
      description={CONTRIBUTE_HEADING.description}
    >
      <Accordion items={FAQ_ITEMS} className="mb-10 max-w-3xl" />
      {contributors.length > 0 ? (
        <ContributorList contributors={contributors} />
      ) : null}
      <Button variant="outline" href={ROUTES.contributing} className="mt-8">
        Guia de contribuição
      </Button>
    </Section>
  )
}
