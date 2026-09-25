import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { newsPage as copy } from '@/data/news'

interface ReleaseNavProps {
  onOlder?: () => void
  onNewer?: () => void
}

// 'Anterior' = versão mais antiga; sem handler, o botão fica desabilitado
export function ReleaseNav({ onOlder, onNewer }: ReleaseNavProps) {
  return (
    <nav className="border-border mt-10 flex justify-end gap-3 border-t pt-6">
      <Button variant="outline" disabled={!onOlder} onClick={onOlder}>
        <ChevronLeft className="size-4" aria-hidden />
        {copy.previous}
      </Button>
      <Button variant="outline" disabled={!onNewer} onClick={onNewer}>
        {copy.next}
        <ChevronRight className="size-4" aria-hidden />
      </Button>
    </nav>
  )
}
