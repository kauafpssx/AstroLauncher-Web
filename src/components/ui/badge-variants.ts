import { cva } from 'class-variance-authority'
export const badgeVariants = cva(
  "inline-flex items-center gap-2 rounded-full border px-4 py-1.5 leading-none whitespace-nowrap backdrop-blur-sm [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
  {
    variants: {
      tone: {
        neutral: 'border-border bg-surface text-[0.9rem] text-foreground',
        warning:
          'border-[rgba(234,179,8,0.3)] bg-[rgba(234,179,8,0.08)] text-[0.85rem] text-warning',
      },
    },
    defaultVariants: { tone: 'neutral' },
  },
)
