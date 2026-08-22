import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SiteHeader } from './SiteHeader'
import { siteContent } from '../data/siteContent'

describe('SiteHeader', () => {
  it('opens the mobile navigation and closes it with Escape', async () => {
    render(<SiteHeader navigation={siteContent.navigation} vkHref={siteContent.social.vk.href} />)

    const menuButton = screen.getByRole('button', { name: 'Открыть меню' })
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
    expect(menuButton).toHaveAttribute('data-state', 'closed')
    expect(menuButton).not.toHaveClass('is-active')

    fireEvent.click(menuButton)
    const mobileNavigation = screen.getByRole('navigation', { name: 'Мобильная навигация' })
    expect(mobileNavigation).toHaveAttribute('data-state', 'open')
    expect(mobileNavigation).toHaveAttribute('aria-live', 'polite')
    await waitFor(() => expect(mobileNavigation).toBeVisible())
    const closeButton = screen.getByRole('button', { name: 'Закрыть меню' })
    expect(closeButton).toHaveAttribute('aria-expanded', 'true')
    expect(closeButton).toHaveClass('is-active')
    expect(closeButton).toHaveAttribute('data-state', 'open')

    fireEvent.keyDown(window, { key: 'Escape' })
    expect(screen.getByRole('button', { name: 'Открыть меню' })).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getByRole('button', { name: 'Открыть меню' })).toHaveAttribute('data-state', 'closed')
  })
})
