// Grade fixa de 40px que se apaga em direção ao rodapé (máscara radial).
export function GridBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(to_right,var(--grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-line)_1px,transparent_1px)] mask-[radial-gradient(ellipse_at_top,black_30%,transparent_80%)] bg-size-[40px_40px]"
    />
  )
}
