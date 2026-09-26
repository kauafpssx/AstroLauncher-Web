// Deliberadamente ignora prefers-reduced-motion: o Windows com "efeitos de
// animação" desligado ativa essa preferência, e o site precisa animar mesmo assim.
export function useReducedMotion(): boolean {
  return false
}
