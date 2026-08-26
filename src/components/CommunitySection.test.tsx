import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { siteContent } from '../data/siteContent'
import { CommunitySection } from './CommunitySection'

const assetPath = (key: string) => `/assets/${key}.jpg`

describe('CommunitySection', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('labels review summaries with author and date and removes rating claims', () => {
    render(<CommunitySection content={siteContent} assetPath={assetPath} />)

    expect(screen.getByText(siteContent.reviews[0].quote)).toBeInTheDocument()
    expect(screen.getByText(siteContent.reviews[0].author)).toBeInTheDocument()
    expect(screen.getByText(siteContent.reviews[0].dateLabel)).toBeInTheDocument()
    expect(screen.getByText(/редакционный пересказ|краткий пересказ/i)).toBeInTheDocument()
    expect(screen.queryByLabelText(/пять из пяти/i)).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /автопрокрутку/i })).not.toBeInTheDocument()
  })

  it('autoplays reviews without exposing timing or autoplay controls', () => {
    render(<CommunitySection content={siteContent} assetPath={assetPath} />)
    expect(screen.queryByText('Листайте отзывы')).not.toBeInTheDocument()
    expect(screen.queryByText(/каждые 5,6 сек/i)).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /автопрокрутку/i })).not.toBeInTheDocument()

    act(() => vi.advanceTimersByTime(5600))
    expect(screen.getByText(siteContent.reviews[1].author)).toBeInTheDocument()
  })

  it('exposes previous and next controls with a stable counter and review source', () => {
    render(<CommunitySection content={siteContent} assetPath={assetPath} />)

    expect(screen.getByRole('button', { name: 'Предыдущий отзыв' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Следующий отзыв' })).toBeInTheDocument()
    expect(screen.getByText('01 / 03')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /источник отзыва/i })).toHaveAttribute(
      'href',
      siteContent.reviews[0].provenance[0].url,
    )
  })

  it('keeps autoplay running on hover but pauses for keyboard focus', () => {
    render(<CommunitySection content={siteContent} assetPath={assetPath} />)
    const region = screen.getByRole('region', { name: 'Отзывы гостей' })

    fireEvent.mouseEnter(region)
    act(() => vi.advanceTimersByTime(5600))
    expect(screen.getByText(siteContent.reviews[1].author)).toBeInTheDocument()

    fireEvent.focus(region)
    act(() => vi.advanceTimersByTime(5600))
    expect(screen.getByText(siteContent.reviews[1].author)).toBeInTheDocument()
  })

  it('moves reviews with the visible arrow controls', () => {
    render(<CommunitySection content={siteContent} assetPath={assetPath} />)

    fireEvent.click(screen.getByRole('button', { name: 'Следующий отзыв' }))
    expect(screen.getByText(siteContent.reviews[1].author)).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Предыдущий отзыв' }))
    expect(screen.getByText(siteContent.reviews[0].author)).toBeInTheDocument()
  })

  it('makes the verified VK destination a noticeable community action', () => {
    render(<CommunitySection content={siteContent} assetPath={assetPath} />)

    expect(screen.getByText('наше сообщество')).toHaveClass('community-panel__label')
    const vkLink = screen.getByRole('link', { name: /перейти во вконтакте/i })
    expect(vkLink).toHaveAttribute('href', siteContent.social.vk.href)
    expect(vkLink).toHaveClass('button', 'button--primary', 'button--vk')
  })

  it('moves one review on a horizontal pointer swipe', () => {
    render(<CommunitySection content={siteContent} assetPath={assetPath} />)
    const region = screen.getByRole('region', { name: 'Отзывы гостей' })

    const dispatchPointer = (type: 'pointerdown' | 'pointerup', clientX: number, clientY: number) => {
      const event = new Event(type, { bubbles: true })
      Object.defineProperties(event, { clientX: { value: clientX }, clientY: { value: clientY } })
      region.dispatchEvent(event)
    }

    act(() => {
      dispatchPointer('pointerdown', 320, 160)
      dispatchPointer('pointerup', 220, 164)
    })

    expect(screen.getByText(siteContent.reviews[1].author)).toBeInTheDocument()
  })
})
