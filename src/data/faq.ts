export const FAQ_ITEMS: { question: string; answer: string }[] = [
  {
    question: 'É seguro?',
    answer:
      'Sim. O código é aberto sob GPL-3.0 e qualquer pessoa pode auditar. O launcher não inclui nem distribui arquivos do jogo: no primeiro launch ele baixa versões, bibliotecas e assets direto dos servidores oficiais da Mojang e dos repositórios oficiais dos loaders.',
  },
  {
    question: 'Conta offline é legal?',
    answer:
      'O suporte a contas offline é só um mecanismo técnico de autenticação local. Usar isso para jogar sem ter comprado o jogo é de inteira responsabilidade do usuário. Recomendamos comprar o Minecraft oficialmente.',
  },
  {
    question: 'Funciona no Mac e no Linux?',
    answer:
      'Sim. A release atual traz instaladores para Windows, Mac (.dmg) e Linux (.AppImage, .deb e .rpm).',
  },
  {
    question: 'Preciso instalar Java?',
    answer:
      'Não. O launcher detecta o Java que já está no sistema ou baixa automaticamente um runtime portátil (Adoptium Temurin).',
  },
  {
    question: 'É afiliado à Mojang?',
    answer:
      'Não. É um projeto independente e open source, sem qualquer afiliação com a Mojang Studios ou a Microsoft. Minecraft é marca registrada da Mojang Synergies AB.',
  },
  {
    question: 'Onde reporto bugs?',
    answer: 'Nas issues do GitHub do projeto.',
  },
]
