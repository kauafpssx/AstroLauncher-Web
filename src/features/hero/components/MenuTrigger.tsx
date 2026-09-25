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
  children?: ReactNode
}

export function MenuTrigger({
  ref,
  open,
  controls,
  onToggle,
  segment,
  label,
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
        'bg-accent text-accent-foreground hover:bg-accent-hover focus-visible:ring-accent/50 ease-ui inline-flex h-12 cursor-pointer items-center gap-2 rounded-md leading-none font-medium shadow-[0_4px_20px_var(--accent-glow)] transition-colors duration-250 outline-none focus-visible:ring-2',
        segment
          ? 'border-accent-foreground/15 rounded-l-none border-l px-3'
          : 'px-[1.8rem]',
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
