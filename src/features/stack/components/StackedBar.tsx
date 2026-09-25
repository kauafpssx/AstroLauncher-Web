import type { LanguageShare } from '@/types/stack'

export function StackedBar({ segments }: { segments: LanguageShare[] }) {
  return (
    <div
      className="bg-surface-hover flex h-3 overflow-hidden rounded-sm"
      aria-hidden
    >
      {segments.map((segment) => (
        <div
          key={segment.label}
          className="h-full transition-[width] duration-300"
          style={{
            width: `${segment.percent}%`,
            backgroundColor: segment.color,
          }}
        />
      ))}
    </div>
  )
}
