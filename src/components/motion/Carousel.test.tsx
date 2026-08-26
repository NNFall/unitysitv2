import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Carousel } from './Carousel'
import { siteContent } from '../../data/siteContent'

const assetPath = (key: string) => `/assets/${key}.jpg`

describe('Carousel', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('moves to the next scenario from the arrow control', async () => {
    render(<Carousel items={siteContent.events} assetPath={assetPath} />)

    expect(screen.getByRole('heading', { name: siteContent.events[0].title })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Следующее событие' }))
    await waitFor(() => expect(screen.getByRole('heading', { name: siteContent.events[1].title })).toBeInTheDocument())
  })

  it('silences automatic changes and announces keyboard-controlled changes', () => {
    render(<Carousel items={siteContent.events} assetPath={assetPath} />)
    const region = screen.getByRole('region', { name: 'Сценарии вечера' })

    expect(region).toHaveAttribute('aria-live', 'off')
    fireEvent.focus(region)
    expect(region).toHaveAttribute('aria-live', 'polite')
  })

  it('autoplays without exposing technical timing or pause controls', () => {
    vi.useFakeTimers()
    render(<Carousel items={siteContent.events} assetPath={assetPath} />)

    expect(screen.queryByText('Листайте сценарии')).not.toBeInTheDocument()
    expect(screen.queryByText(/каждые 5,6 сек/i)).not.toBeInTheDocument()
    expect(screen.getByText(/Концепция · афиша скоро/i)).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /автопрокрутку/i })).not.toBeInTheDocument()

    act(() => vi.advanceTimersByTime(5600))
    expect(screen.getByRole('button', { name: `Показать ${siteContent.events[1].title}` })).toHaveAttribute('aria-pressed', 'true')
  })

  it('pauses autoplay while the carousel is hovered', () => {
    vi.useFakeTimers()
    render(<Carousel items={siteContent.events} assetPath={assetPath} />)
    const region = screen.getByRole('region', { name: 'Сценарии вечера' })

    fireEvent.mouseEnter(region)
    act(() => vi.advanceTimersByTime(5600))
    expect(screen.getByRole('button', { name: `Показать ${siteContent.events[0].title}` })).toHaveAttribute('aria-pressed', 'true')

    fireEvent.mouseLeave(region)
    act(() => vi.advanceTimersByTime(5600))
    expect(screen.getByRole('button', { name: `Показать ${siteContent.events[1].title}` })).toHaveAttribute('aria-pressed', 'true')
  })

  it('stops autoplay for the session after a manual selection', () => {
    vi.useFakeTimers()
    render(<Carousel items={siteContent.events} assetPath={assetPath} />)

    fireEvent.click(screen.getByRole('button', { name: 'Следующее событие' }))
    act(() => vi.advanceTimersByTime(5600))

    expect(screen.getByRole('button', { name: `Показать ${siteContent.events[1].title}` })).toHaveAttribute('aria-pressed', 'true')
  })

  it('moves one scenario on a horizontal pointer swipe', () => {
    render(<Carousel items={siteContent.events} assetPath={assetPath} />)
    const media = document.querySelector<HTMLDivElement>('.event-feature__media')
    expect(media).not.toBeNull()

    const dispatchPointer = (type: 'pointerdown' | 'pointerup', clientX: number, clientY: number) => {
      const event = new Event(type, { bubbles: true })
      Object.defineProperties(event, { clientX: { value: clientX }, clientY: { value: clientY } })
      media!.dispatchEvent(event)
    }
    act(() => {
      dispatchPointer('pointerdown', 320, 160)
      dispatchPointer('pointerup', 220, 164)
    })

    expect(screen.getByRole('button', { name: `Показать ${siteContent.events[1].title}` })).toHaveAttribute('aria-pressed', 'true')
  })
})
