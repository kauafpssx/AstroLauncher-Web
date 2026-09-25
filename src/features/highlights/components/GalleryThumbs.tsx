import { GalleryProgress } from '@/features/highlights/components/GalleryProgress'
import type { GalleryShot } from '@/data/gallery'
import { cn } from '@/lib/utils'

interface GalleryThumbsProps {
  shots: GalleryShot[]
  active: number
  onSelect: (index: number) => void
  autoplay: { paused: boolean; onComplete: () => void } | null
}

export function GalleryThumbs({
  shots,
  active,
  onSelect,
  autoplay,
}: GalleryThumbsProps) {
  return (
    <div
      role="tablist"
      className="mt-5 grid grid-cols-3 gap-3 min-[769px]:grid-cols-6"
    >
      {shots.map((shot, i) => {
        const isActive = i === active
        return (
          <button
            key={shot.src}
            type="button"
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onSelect(i)}
            className={cn(
              'group ease-ui cursor-pointer text-left transition-opacity duration-300',
              isActive ? 'opacity-100' : 'opacity-60 hover:opacity-90',
            )}
          >
            <div
              className={cn(
                'bg-surface-hover ease-ui rounded-lg border p-1.5 transition-[border-color,box-shadow] duration-300',
                isActive
                  ? 'border-accent/60 shadow-[0_0_16px_var(--accent-glow)]'
                  : 'border-border',
              )}
            >
              <img
                src={shot.src}
                alt=""
                loading="lazy"
                width={1920}
                height={1042}
                className="aspect-[1920/1042] w-full rounded-md object-cover object-top"
              />
            </div>
            <div className="mt-2 h-0.5">
              {isActive && autoplay && <GalleryProgress {...autoplay} />}
            </div>
            <span className="text-muted-foreground group-aria-selected:text-foreground mt-2 block text-[13px] font-medium">
              {shot.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
