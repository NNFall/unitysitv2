import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'
import { siteContent } from './data/siteContent'
import { assetPath } from './App'

describe('UNITY landing shell', () => {
  it('renders a semantic main landmark with the UNITY brand', () => {
    render(<App />)

    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: 'UNITY, на главную' })).not.toHaveLength(0)
  })

  it('keeps every primary navigation anchor backed by a rendered target', () => {
    render(<App />)
    for (const item of siteContent.navigation) {
      expect(document.querySelector(item.href)).not.toBeNull()
    }
  })

  it('uses the editorial billiards hero asset without reusing a venue frame', () => {
    expect(assetPath('hero')).toContain('unity-ai-hero-billiards-v3.png')
    expect(assetPath('hero')).not.toContain('unity-yandex-05.jpg')
    const cardAssets = [...siteContent.formats, ...siteContent.events].map(({ media }) => assetPath(media.assetKey))
    expect(cardAssets).not.toContain(assetPath('hero'))
  })

  it('keeps the hero ribbon and footer useful beyond the section titles', () => {
    render(<App />)

    expect(screen.getByText('ул. Гагарина, 118')).toBeInTheDocument()
    expect(screen.getAllByText('около 4 минут пешком').length).toBeGreaterThan(0)
    expect(screen.getByText('Пн–Чт до 04:00 · Пт–Сб до 06:00')).toBeInTheDocument()
    expect(screen.getByText('Как узнать актуальный график?')).toBeInTheDocument()
    expect(screen.getByText(/UNITY, Самара/)).toBeInTheDocument()
  })

  it('labels the formats section with one clear promise', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Форматы отдыха в UNITY' })).toBeInTheDocument()
    expect(screen.queryByText('Что внутри UNITY')).not.toBeInTheDocument()
    const formatRail = screen.getByRole('list', { name: 'Форматы отдыха в UNITY' })
    expect(formatRail).toHaveAttribute('data-rail', 'formats')
    expect(formatRail.querySelectorAll('[role="listitem"]')).toHaveLength(siteContent.formats.length)
  })
})
