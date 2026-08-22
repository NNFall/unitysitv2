import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SiteHeader } from './SiteHeader'
import { siteContent } from '../data/siteContent'

describe('SiteHeader', () => {
  it('opens the mobile navigation and closes it with Escape', () => {
    render(<SiteHeader navigation={siteContent.navigation} vkHref={siteContent.social.vk.href} />)

    const menuButton = screen.getByRole('button', { name: 'Открыть меню' })
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')

    fireEvent.click(menuButton)
    expect(screen.getByRole('navigation', { name: 'Мобильная навигация' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'Закрыть меню' })).toHaveAttribute('aria-expanded', 'true')

    fireEvent.keyDown(window, { key: 'Escape' })
    expect(screen.getByRole('button', { name: 'Открыть меню' })).toHaveAttribute('aria-expanded', 'false')
  })
})
