import {
  Boxes,
  Layers,
  History,
  Search,
  Package,
  UserRound,
  Map as MapIcon,
  Network,
  Timer,
  Coffee,
  Archive,
  MapPin,
  Settings2,
  MessageCircle,
  Earth,
} from 'lucide-react'
import type { Highlight } from '@/types/highlights'

export const highlightsSection = {
  id: 'recursos',
  title: 'Tudo o que você precisa',
  description:
    'Do primeiro mundo ao modpack pesado: o AstroLauncher cuida do trabalho chato para você só jogar.',
}

export const highlights: Highlight[] = [
  {
    icon: Boxes,
    title: 'Instâncias',
    description:
      'Crie, edite e organize instâncias em pastas com arrastar e soltar. Cada uma com seu Java, memória e janela.',
  },
  {
    icon: History,
    title: 'Todas as versões',
    description:
      'Releases, snapshots, alphas, betas, infdev, indev e classic, do Minecraft de 2009 ao mais recente.',
  },
  {
    icon: Layers,
    title: 'Todos os loaders',
    description:
      'Fabric, Quilt, Forge, NeoForge e LiteLoader instalados em um clique.',
  },
  {
    icon: Search,
    title: 'Mod Browser',
    description:
      'Busque e instale mods do Modrinth e do CurseForge juntos, sem sair do launcher.',
  },
  {
    icon: Package,
    title: 'Modpacks',
    description:
      'Instale arquivos .mrpack e manifests do CurseForge, com sugestão automática de RAM.',
  },
  {
    icon: UserRound,
    title: 'Contas offline',
    description:
      'Várias contas offline, com conta padrão e avatares, sem precisar de conta Microsoft.',
  },
  {
    icon: MapIcon,
    title: 'Mapa da Seed',
    description:
      'Biomas, estruturas, slime chunks, strongholds e spawn da sua seed, calculados 100% no seu PC.',
  },
  {
    icon: Network,
    title: 'Rede ZeroTier',
    description:
      'Jogue em LAN pela internet: entre em redes e aprove membros direto pelo launcher.',
  },
  {
    icon: Timer,
    title: 'Playtime',
    description:
      'Saiba quanto você jogou: tempo por instância, histórico de sessões e estatísticas.',
  },
  {
    icon: Earth,
    title: 'Mundos',
    description:
      'Gerencie os mundos salvos de cada instância, com a seed extraída direto do level.dat.',
  },
  {
    icon: MapPin,
    title: 'Waypoints',
    description:
      'Pontos de interesse por instância, com nome, ícone, dimensão e coordenadas, e menções @ nas notas.',
  },
  {
    icon: Coffee,
    title: 'Java Manager',
    description:
      'Detecta o Java do sistema ou baixa runtimes Adoptium Temurin automaticamente, com Java próprio por instância.',
  },
  {
    icon: Settings2,
    title: 'Editor de Config',
    description:
      'options.txt tipado, arquivos da pasta config/ e keybinds com detecção de conflito.',
  },
  {
    icon: Archive,
    title: 'AstroPack',
    description:
      'Exporte e importe instâncias completas em .astropack; duplo clique no arquivo já importa.',
  },
  {
    icon: MessageCircle,
    title: 'Discord RPC',
    description: 'Mostre no seu perfil do Discord o que você está jogando.',
  },
]
