import type { GalleryShot } from '@/data/gallery'
import { cn } from '@/lib/utils'

interface GalleryThumbsProps {
  shots: GalleryShot[]
  active: number
  onSelect: (index: number) => void
}

export function GalleryThumbs({ shots, active, onSelect }: GalleryThumbsProps) {
  return (
    <div
      role="tablist"
      className="mt-5 grid grid-cols-3 gap-3 min-[769px]:grid-cols-6"
    >
      {shots.map((shot, i) => (
        <button
          key={shot.src}
          type="button"
          role="tab"
          aria-selected={i === active}
          tabIndex={i === active ? 0 : -1}
          onClick={() => onSelect(i)}
          className={cn(
            'group ease-ui cursor-pointer text-left transition-opacity duration-300',
            i === active ? 'opacity-100' : 'opacity-50 hover:opacity-80',
          )}
        >
          <img
            src={shot.src}
            alt=""
            loading="lazy"
            width={1920}
            height={1042}
            className={cn(
              'aspect-[1920/1042] w-full rounded-md border object-cover object-top',
              i === active ? 'border-accent/60' : 'border-border',
            )}
          />
          <span className="text-muted-foreground group-aria-selected:text-foreground mt-2 block text-[13px] font-medium">
            {shot.label}
          </span>
        </button>
      ))}
    </div>
  )
}
