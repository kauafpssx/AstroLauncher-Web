import { formatNumber } from '@/lib/format'
import type { ChartPoint } from '@/types/stats'

interface ChartBarProps {
  point: ChartPoint
  unit: string
  cx: number
  top: number
  bottom: number
  hitTop: number
  slot: number
}

const BAR = 8

// Área de hover ocupa a coluna inteira; tooltip sobe 4px ao aparecer.
export function ChartBar({
  point,
  unit,
  cx,
  top,
  bottom,
  hitTop,
  slot,
}: ChartBarProps) {
  return (
    <g className="group cursor-pointer">
      <title>{`${point.label}: ${formatNumber(point.value)} ${unit}`}</title>
      <rect
        x={cx - slot / 2}
        y={hitTop}
        width={slot}
        height={bottom - hitTop}
        fill="transparent"
      />
      <rect
        x={cx - BAR / 2}
        y={top}
        width={BAR}
        height={bottom - top}
        rx={4}
        className="fill-accent group-hover:fill-accent-hover transition-[fill,filter] duration-200 group-hover:drop-shadow-[0_0_6px_var(--accent-glow)]"
      />
      <text
        x={cx}
        y={top - 8}
        textAnchor="middle"
        className="fill-foreground translate-y-1 text-[11px] font-semibold opacity-0 transition-[opacity,translate] duration-200 group-hover:translate-y-0 group-hover:opacity-100"
      >
        {point.value}
      </text>
    </g>
  )
}
