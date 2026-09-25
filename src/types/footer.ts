interface FooterLink {
  label: string
  href: string
  external?: boolean
}

export interface FooterColumn {
  title: string
  links: FooterLink[]
}

export interface SocialLink {
  kind: 'github' | 'instagram' | 'email'
  label: string
  href: string
}
