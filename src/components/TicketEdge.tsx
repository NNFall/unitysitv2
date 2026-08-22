import type { ReactNode } from 'react'

type TicketEdgeProps = {
  children: ReactNode
  className?: string
  tone?: 'paper' | 'navy'
}

export function TicketEdge({ children, className = '', tone = 'paper' }: TicketEdgeProps) {
  return <div className={`ticket-edge ticket-edge--${tone} ${className}`.trim()}>{children}</div>
}
