export interface GalleryShot {
  src: string
  label: string
  // Rótulo de uma palavra pras miniaturas no celular.
  short: string
  alt: string
}

export const galleryCopy = {
  ariaLabel: 'Galeria de telas do AstroLauncher',
  windowTitle: 'AstroLauncher',
}

export const gallery: GalleryShot[] = [
  {
    src: '/screenshots/home.png',
    label: 'Instâncias',
    short: 'Instâncias',
    alt: 'Tela inicial do AstroLauncher com a lista de instâncias de Minecraft',
  },
  {
    src: '/screenshots/create-instance.png',
    label: 'Criar instância',
    short: 'Criar',
    alt: 'Tela de criação de instância, com escolha de versão e loader',
  },
  {
    src: '/screenshots/editor.png',
    label: 'Editor de instância',
    short: 'Editor',
    alt: 'Editor de instância do AstroLauncher com mods e configurações',
  },
  {
    src: '/screenshots/modpacks.png',
    label: 'Modpacks',
    short: 'Modpacks',
    alt: 'Navegador de modpacks do AstroLauncher com resultados de busca',
  },
  {
    src: '/screenshots/skins.png',
    label: 'Galeria de skins',
    short: 'Skins',
    alt: 'Galeria de skins do AstroLauncher com visualizador 3D',
  },
  {
    src: '/screenshots/screenshots.jpg',
    label: 'Screenshots do jogo',
    short: 'Screenshots',
    alt: 'Galeria de screenshots do jogo tiradas nas instâncias',
  },
]
