import { List, X } from '@phosphor-icons/react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
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
  const prefersReducedMotion = useReducedMotion()

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
        <button
          className={`menu-toggle${open ? ' is-active' : ''}`}
          type="button"
          aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          data-state={open ? 'open' : 'closed'}
          onClick={() => setOpen((value) => !value)}
        >
          <motion.span
            className="menu-toggle__icon"
            aria-hidden="true"
            initial={false}
            animate={{ rotate: open ? 90 : 0, scale: open ? 1.04 : 1 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            {open ? <X /> : <List />}
          </motion.span>
          <span className="sr-only">{open ? 'Закрыть меню' : 'Открыть меню'}</span>
        </button>
      </div>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.nav
            key="mobile-navigation"
            className="mobile-navigation"
            id="mobile-navigation"
            aria-label="Мобильная навигация"
            aria-live="polite"
            data-state="open"
            initial={{ opacity: 0, y: -12, scaleY: 0.96 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -8, scaleY: 0.96 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'top' }}
          >
            {navigation.map((item) => <a href={item.href} key={item.href} onClick={() => setOpen(false)}>{item.label}</a>)}
            <Button href="#booking">Забронировать стол</Button>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
