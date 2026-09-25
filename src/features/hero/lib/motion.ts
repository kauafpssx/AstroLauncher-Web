import type { Transition, Variants } from 'framer-motion'

// Mesma curva do token ease-ui.
export const EASE_UI: [number, number, number, number] = [0.25, 0.8, 0.25, 1]

// Com reduced motion: sem deslocamento/escala, só opacidade instantânea.
function fadeTransition(reduce: boolean): Transition {
  return reduce ? { duration: 0 } : { duration: 0.18, ease: EASE_UI }
}

export function panelVariants(reduce: boolean): Variants {
  const moved = reduce ? {} : { y: -6, scale: 0.98 }
  return {
    hidden: { opacity: 0, ...moved, transition: fadeTransition(reduce) },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        ...fadeTransition(reduce),
        staggerChildren: reduce ? 0 : 0.03,
      },
    },
  }
}

export function itemVariants(reduce: boolean): Variants {
  return {
    hidden: {
      opacity: 0,
      y: reduce ? 0 : -4,
      transition: fadeTransition(reduce),
    },
    visible: { opacity: 1, y: 0, transition: fadeTransition(reduce) },
  }
}
