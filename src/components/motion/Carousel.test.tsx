import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Carousel } from './Carousel'
import { assetPath } from '../../App'
import { siteContent } from '../../data/siteContent'

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

  it('autoplays after the interval and exposes an explicit pause control', () => {
    vi.useFakeTimers()
    render(<Carousel items={siteContent.events} assetPath={assetPath} />)

    expect(screen.getByText('Листайте сценарии')).toBeInTheDocument()
    expect(screen.getByText(/Концепция · афиша скоро/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Поставить автопрокрутку на паузу' })).toBeInTheDocument()

    act(() => vi.advanceTimersByTime(5600))
    expect(screen.getByRole('button', { name: `Показать ${siteContent.events[1].title}` })).toHaveAttribute('aria-pressed', 'true')

    fireEvent.click(screen.getByRole('button', { name: 'Поставить автопрокрутку на паузу' }))
    expect(screen.getByRole('button', { name: 'Возобновить автопрокрутку' })).toBeInTheDocument()
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
})
