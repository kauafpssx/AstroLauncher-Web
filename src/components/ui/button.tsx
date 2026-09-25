import type * as React from 'react'
import type { VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button-variants'
type ButtonProps = Omit<React.ComponentProps<'button'>, 'className'> &
  VariantProps<typeof buttonVariants> & {
    href?: string
    external?: boolean
    className?: string
  }
function Button({
  className,
  variant = 'primary',
  href,
  external = false,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, className }))
  if (href) {
    return (
      <a
        data-slot="button"
        data-variant={variant}
        href={href}
        className={classes}
        {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
      >
        {children}
      </a>
    )
  }
  return (
    <button
      data-slot="button"
      data-variant={variant}
      type="button"
      className={classes}
      {...props}
    >
      {children}
    </button>
  )
}
export { Button }
