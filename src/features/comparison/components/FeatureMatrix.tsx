import { Card } from '@/components/ui/card'
import { MATRIX_TITLE } from '@/data/comparison'
import { FEATURE_MATRIX } from '@/data/feature-matrix'
import { MatrixHeader } from '@/features/comparison/components/MatrixHeader'
import { MatrixRow } from '@/features/comparison/components/MatrixRow'

export function FeatureMatrix() {
  return (
    <Card hoverable accentTop className="overflow-hidden">
      <h3 className="mb-6 font-serif text-2xl">{MATRIX_TITLE}</h3>
      <div className="-mx-2 overflow-x-auto px-2">
        <table className="w-full min-w-[680px] border-collapse text-sm">
          <MatrixHeader />
          <tbody>
            {FEATURE_MATRIX.map((row) => (
              <MatrixRow key={row.label} row={row} />
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
