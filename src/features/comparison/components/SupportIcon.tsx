import { Check, CircleHelp, Minus, X } from 'lucide-react'
import type { FeatureSupport } from '@/types/feature-matrix'

const SUPPORT = {
  yes: { Icon: Check, label: 'Sim', className: 'text-accent' },
  no: { Icon: X, label: 'Não', className: 'text-muted-foreground/60' },
  partial: {
    Icon: Minus,
    label: 'Parcial',
    className: 'text-muted-foreground',
  },
  unknown: {
    Icon: CircleHelp,
    label: 'Não verificado',
    className: 'text-muted-foreground/60',
  },
} satisfies Record<FeatureSupport, object>

export function SupportIcon({ value }: { value: FeatureSupport }) {
  const { Icon, label, className } = SUPPORT[value]
  return (
    <>
      <Icon className={`mx-auto size-4 ${className}`} aria-hidden />
      <span className="sr-only">{label}</span>
    </>
  )
}
