import type { StackItem } from '@/types/stack'

export const STACK_HEADING = {
  title: 'Feito com Rust e React',
  description:
    'Um núcleo nativo em Rust com interface web leve: o melhor dos dois mundos, sem o peso de um navegador embutido.',
}

export const STACK_ITEMS: StackItem[] = [
  {
    emoji: '🦀',
    name: 'Tauri v2',
    description:
      'Janela nativa usando o WebView do sistema: binário enxuto e pouca memória.',
  },
  {
    emoji: '⚛️',
    name: 'React 19',
    description:
      'Interface com TypeScript estrito, Tailwind v4 e animações com Framer Motion.',
  },
  {
    emoji: '⚙️',
    name: 'Rust',
    description:
      'Downloads, instâncias, mods e rede ZeroTier rodando no backend nativo, com segurança de memória.',
  },
  {
    emoji: '🗄️',
    name: 'SQLite',
    description:
      'Contas, instâncias, waypoints e notas guardados localmente em um banco embutido.',
  },
  {
    emoji: '🧭',
    name: 'Cubiomes',
    description:
      'Engine em C do Mapa da Seed, compilada junto com o launcher: biomas e estruturas calculados 100% offline.',
  },
  {
    emoji: '🎨',
    name: 'shadcn/ui + Radix',
    description:
      'Componentes acessíveis da interface, com teclado e leitores de tela funcionando de fábrica.',
  },
]

export const LANGUAGES_TITLE = '📊 Distribuição de linguagens'

// Tons de cinza: o acento do site é branco
export const LANGUAGE_COLORS = [
  '#ffffff',
  '#bdbdbd',
  '#8a8a8a',
  '#5c5c5c',
  '#3a3a3a',
]
