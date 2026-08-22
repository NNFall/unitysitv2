import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'
import { siteContent } from './data/siteContent'

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
})
