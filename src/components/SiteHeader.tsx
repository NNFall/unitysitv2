import { List, X } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import { Logo } from './Logo'
import { Button } from './Button'
import type { LinkItem } from '../data/siteContent'

type SiteHeaderProps = {
  navigation: readonly LinkItem[]
  vkHref: string
}

export function SiteHeader({ navigation, vkHref }: SiteHeaderProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <header className={`site-header${open ? ' site-header--open' : ''}`}>
      <div className="site-header__inner">
        <Logo />
        <nav className="site-header__nav" aria-label="Основная навигация">
          {navigation.map((item) => (
            <a href={item.href} key={item.href} onClick={() => setOpen(false)}>{item.label}</a>
          ))}
        </nav>
        <div className="site-header__actions">
          <a className="social-link" href={vkHref} target="_blank" rel="noreferrer" aria-label="UNITY во ВКонтакте">
            <span className="social-lettermark" aria-hidden="true">VK</span>
          </a>
          <Button href="#booking" showArrow>Забронировать стол</Button>
        </div>
        <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((value) => !value)}>
          {open ? <X aria-hidden="true" /> : <List aria-hidden="true" />}
          <span className="sr-only">{open ? 'Закрыть меню' : 'Открыть меню'}</span>
        </button>
      </div>
      <nav className="mobile-navigation" id="mobile-navigation" aria-label="Мобильная навигация" hidden={!open}>
        {navigation.map((item) => <a href={item.href} key={item.href} onClick={() => setOpen(false)}>{item.label}</a>)}
        <Button href="#booking">Забронировать стол</Button>
      </nav>
    </header>
  )
}
