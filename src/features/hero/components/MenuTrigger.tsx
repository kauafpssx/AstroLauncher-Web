import type { ReactNode, Ref } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MenuTriggerProps {
  ref: Ref<HTMLButtonElement>
  open: boolean
  controls: string
  onToggle: () => void
  // Segmento do split button (só a setinha, com aria-label) ou botão inteiro com texto.
  segment: boolean
  label: string
  // Visual discreto (secondary), usado no celular.
  subtle?: boolean
  children?: ReactNode
}

export function MenuTrigger({
  ref,
  open,
  controls,
  onToggle,
  segment,
  label,
  subtle = false,
  children,
}: MenuTriggerProps) {
  return (
    <button
      ref={ref}
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      aria-controls={controls}
      aria-label={segment ? label : undefined}
      className={cn(
        'focus-visible:ring-accent/50 ease-ui inline-flex h-12 cursor-pointer items-center gap-2 rounded-md leading-none font-medium transition-colors duration-250 outline-none focus-visible:ring-2',
        subtle
          ? 'border-border bg-surface text-muted-foreground hover:bg-surface-hover hover:text-foreground border'
          : 'bg-accent text-accent-foreground hover:bg-accent-hover shadow-[0_4px_20px_var(--accent-glow)]',
        !segment && 'px-[1.8rem]',
        segment && 'rounded-l-none px-3',
        segment &&
          (subtle ? 'border-l-0' : 'border-accent-foreground/15 border-l'),
      )}
    >
      {!segment && (children ?? label)}
      <ChevronDown
        className={cn(
          'size-4 transition-transform duration-200 motion-reduce:transition-none',
          open && 'rotate-180',
        )}
        aria-hidden
      />
    </button>
  )
}
