import { cva } from 'class-variance-authority'
export const buttonVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md border px-[1.8rem] py-[0.85rem] text-base leading-none font-medium whitespace-nowrap transition-all duration-250 ease-ui outline-none hover:-translate-y-[3px] focus-visible:ring-2 focus-visible:ring-accent/50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary:
          'border-transparent bg-accent text-accent-foreground shadow-[0_4px_20px_var(--accent-glow)] hover:bg-accent-hover hover:shadow-[0_8px_30px_var(--accent-glow)]',
        secondary:
          'border-border bg-surface text-foreground hover:bg-surface-hover',
        outline:
          'border-accent bg-transparent text-[1.1rem] text-accent hover:bg-accent hover:text-accent-foreground',
      },
    },
    defaultVariants: { variant: 'primary' },
  },
)
