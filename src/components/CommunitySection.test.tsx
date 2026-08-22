import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { assetPath } from '../App'
import { siteContent } from '../data/siteContent'
import { CommunitySection } from './CommunitySection'

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
  })

  it('autoplays reviews and allows the visitor to pause it', () => {
    render(<CommunitySection content={siteContent} assetPath={assetPath} />)
    expect(screen.getByText('Листайте отзывы')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Поставить автопрокрутку на паузу' })).toBeInTheDocument()

    act(() => vi.advanceTimersByTime(5600))
    expect(screen.getByText(siteContent.reviews[1].author)).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Поставить автопрокрутку на паузу' }))
    act(() => vi.advanceTimersByTime(5600))
    expect(screen.getByText(siteContent.reviews[1].author)).toBeInTheDocument()
  })
})
