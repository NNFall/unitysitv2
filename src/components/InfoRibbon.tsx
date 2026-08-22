import type { ReactNode } from 'react'

type RibbonItem = {
  icon: ReactNode
  title: string
  detail: string
}

export function InfoRibbon({ items }: { items: RibbonItem[] }) {
  return (
    <div className="info-ribbon" role="region" aria-label="Коротко об UNITY">
      {items.map((item) => {
        return (
          <div className="info-ribbon__item" key={item.title}>
            <span className="info-ribbon__icon" aria-hidden="true">{item.icon}</span>
            <span>
              <strong>{item.title}</strong>
              <small>{item.detail}</small>
            </span>
          </div>
        )
      })}
    </div>
  )
}
