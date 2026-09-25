import { motion, useReducedMotion } from 'framer-motion'
import { ChartBar } from '@/features/stats/components/ChartBar'
import type { ChartPoint } from '@/types/stats'

interface BarChartProps {
  data: ChartPoint[]
  unit: string
  className?: string
}

const HEIGHT = 160
const SLOT = 40
const AXIS = 32
const TOP = 20
const LABEL = 'fill-muted-foreground text-[11px]'

// Barras crescem em stagger ao entrar na viewport (variants propagam pro ChartBar).
// SVG puro: tooltip via group-hover do Tailwind, <title> para leitores de tela.
export function BarChart({ data, unit, className }: BarChartProps) {
  const max = Math.max(1, ...data.map((d) => d.value))
  const width = AXIS + data.length * SLOT
  const y = (value: number) => HEIGHT - (value / max) * (HEIGHT - TOP)
  const edges = [data[0], data[data.length - 1]]
  const reduce = useReducedMotion()

  return (
    <motion.svg
      initial={reduce ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      viewBox={`0 0 ${width} ${HEIGHT + 24}`}
      className={className}
      role="img"
      aria-label={`${unit} por semana`}
      style={{ width: '100%', height: 'auto', overflow: 'visible' }}
    >
      {[0, Math.round(max / 2), max].map((tick) => (
        <text
          key={tick}
          x={AXIS - 8}
          y={y(tick) + 4}
          textAnchor="end"
          className={LABEL}
        >
          {tick}
        </text>
      ))}
      {data.map((point, i) => (
        <ChartBar
          key={point.label}
          point={point}
          index={i}
          unit={unit}
          cx={AXIS + i * SLOT + SLOT / 2}
          top={y(point.value)}
          bottom={HEIGHT}
          hitTop={TOP}
          slot={SLOT}
        />
      ))}
      {edges.map((point, i) => (
        <text
          key={`x-${i}`}
          x={i === 0 ? AXIS + SLOT / 2 : width - SLOT / 2}
          y={HEIGHT + 18}
          textAnchor="middle"
          className={LABEL}
        >
          {point?.label}
        </text>
      ))}
    </motion.svg>
  )
}
