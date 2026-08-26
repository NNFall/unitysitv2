import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { siteContent } from '../data/siteContent'
import { CAROUSEL_AUTOPLAY_INTERVAL } from './motion/Carousel'
import { FormatsSection } from './FormatsSection'

const assetPath = (key: string) => `/assets/${key}.jpg`

describe('FormatsSection mobile rail', () => {
  const nativeScrollTo = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollTo')
  const clientWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientWidth')
  const scrollWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollWidth')
  const offsetLeft = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetLeft')
  const scrollTo = vi.fn(function (this: HTMLElement, options: ScrollToOptions) {
    this.scrollLeft = Number(options.left ?? 0)
  })

  beforeEach(() => {
    vi.useFakeTimers()
    Object.defineProperty(HTMLElement.prototype, 'scrollTo', {
      configurable: true,
      value: scrollTo,
    })
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
      configurable: true,
      get() {
        return this.classList.contains('format-grid') ? 300 : clientWidth?.get?.call(this) ?? 0
      },
    })
    Object.defineProperty(HTMLElement.prototype, 'scrollWidth', {
      configurable: true,
      get() {
        return this.classList.contains('format-grid') ? 1200 : scrollWidth?.get?.call(this) ?? 0
      },
    })
    Object.defineProperty(HTMLElement.prototype, 'offsetLeft', {
      configurable: true,
      get() {
        if (!this.classList.contains('format-card')) return offsetLeft?.get?.call(this) ?? 0
        return Array.from(this.parentElement?.children ?? []).indexOf(this) * 280
      },
    })
  })

  afterEach(() => {
    vi.useRealTimers()
    if (nativeScrollTo) {
      Object.defineProperty(HTMLElement.prototype, 'scrollTo', nativeScrollTo)
    } else {
      delete (HTMLElement.prototype as { scrollTo?: unknown }).scrollTo
    }
    if (clientWidth) Object.defineProperty(HTMLElement.prototype, 'clientWidth', clientWidth)
    if (scrollWidth) Object.defineProperty(HTMLElement.prototype, 'scrollWidth', scrollWidth)
    if (offsetLeft) Object.defineProperty(HTMLElement.prototype, 'offsetLeft', offsetLeft)
    scrollTo.mockClear()
  })

  it('advances an overflowing mobile rail every five seconds', () => {
    render(<FormatsSection content={siteContent} assetPath={assetPath} />)

    act(() => vi.advanceTimersByTime(CAROUSEL_AUTOPLAY_INTERVAL))

    expect(scrollTo).toHaveBeenCalledWith(expect.objectContaining({ left: 280, behavior: 'smooth' }))
  })

  it('moves one card for a horizontal finger swipe and ignores a vertical gesture', () => {
    render(<FormatsSection content={siteContent} assetPath={assetPath} />)
    const rail = screen.getByRole('list', { name: 'Форматы отдыха в UNITY' })

    const dispatchPointer = (type: 'pointerdown' | 'pointerup', clientX: number, clientY: number, pointerId: number) => {
      const event = new Event(type, { bubbles: true })
      Object.defineProperties(event, {
        clientX: { value: clientX },
        clientY: { value: clientY },
        pointerId: { value: pointerId },
        pointerType: { value: 'touch' },
      })
      rail.dispatchEvent(event)
    }

    act(() => {
      dispatchPointer('pointerdown', 320, 160, 1)
      dispatchPointer('pointerup', 220, 164, 1)
    })

    expect(scrollTo).toHaveBeenCalledWith(expect.objectContaining({ left: 280, behavior: 'smooth' }))
    expect(rail).toHaveAttribute('data-autoplay', 'stopped')
    scrollTo.mockClear()

    act(() => {
      dispatchPointer('pointerdown', 320, 160, 2)
      dispatchPointer('pointerup', 220, 164, 2)
    })

    expect(scrollTo).toHaveBeenCalledWith(expect.objectContaining({ left: 560, behavior: 'smooth' }))
    scrollTo.mockClear()

    act(() => {
      dispatchPointer('pointerdown', 220, 160, 3)
      dispatchPointer('pointerup', 218, 260, 3)
    })

    expect(scrollTo).not.toHaveBeenCalled()
  })
})
