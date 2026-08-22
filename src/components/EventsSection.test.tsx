import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { siteContent } from '../data/siteContent'
import { EventsSection } from './EventsSection'

const assetPath = (key: string) => `/assets/${key}.jpg`

describe('EventsSection', () => {
  it('keeps the section focused on the event scenarios', () => {
    render(<EventsSection content={siteContent} assetPath={assetPath} />)

    expect(screen.getByRole('heading', { name: /события и встречи/i })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'Сценарии вечера' })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /предложить свой формат/i })).not.toBeInTheDocument()
  })
})
