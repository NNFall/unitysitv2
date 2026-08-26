import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { siteContent } from '../data/siteContent'
import { HeroSection } from './HeroSection'

const assetPath = (key: string) => `/assets/${key}.jpg`

describe('HeroSection', () => {
  it('adds a compact editorial rail to the main venue image', () => {
    render(<HeroSection content={siteContent.hero} assetPath={assetPath} />)

    expect(screen.getByText('бильярд · PlayStation · кино · настольные игры')).toHaveClass('hero__media-rail')
    expect(screen.getByText(/редакционный кадр/i)).toHaveClass('hero__media-caption')
  })
})
