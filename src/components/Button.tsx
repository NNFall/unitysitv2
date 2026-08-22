import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { ArrowUpRight } from '@phosphor-icons/react'

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: 'primary' | 'secondary' | 'text'
  children: ReactNode
  showArrow?: boolean
}

export function Button({ variant = 'primary', children, showArrow = false, className = '', ...props }: ButtonProps) {
  return (
    <a className={`button button--${variant} ${className}`.trim()} {...props}>
      <span>{children}</span>
      {showArrow ? <ArrowUpRight aria-hidden="true" weight="bold" /> : null}
    </a>
  )
}
