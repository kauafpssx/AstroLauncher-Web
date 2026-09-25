import { cva } from 'class-variance-authority'
// A linha de acento do topo é o ::before: sempre visível com accentTop, só no hover com hoverable.
export const cardVariants = cva(
  'relative overflow-hidden rounded-lg border p-8 shadow-[0_4px_20px_rgba(0,0,0,0.1)] transition-all duration-250 ease-ui before:absolute before:inset-x-0 before:top-0 before:h-0.5 before:bg-linear-to-r before:from-transparent before:via-accent before:to-transparent before:opacity-0 before:transition-opacity before:duration-250 md:p-10',
  {
    variants: {
      tone: {
        surface: 'border-border bg-surface',
        accent: 'border-accent/40 bg-accent/[0.03]',
      },
      hoverable: {
        true: 'hover:-translate-y-[5px] hover:border-accent/40 hover:before:opacity-100',
        false: '',
      },
      accentTop: {
        true: 'before:opacity-100',
        false: '',
      },
    },
    defaultVariants: { tone: 'surface', hoverable: false, accentTop: false },
  },
)
