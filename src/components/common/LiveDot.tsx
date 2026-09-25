import { cn } from '@/lib/utils'
type LiveDotProps = { className?: string }
export function LiveDot({ className }: LiveDotProps) {
  return (
    <span
      aria-hidden="true"
      className={cn('relative inline-flex size-2 shrink-0', className)}
    >
      <span className="bg-accent absolute inset-0 animate-ping rounded-full opacity-60 [animation-duration:2s] motion-reduce:hidden" />
      <span className="bg-accent relative size-2 rounded-full shadow-[0_0_6px_var(--accent-glow)]" />
    </span>
  )
}
