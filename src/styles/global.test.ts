import { describe, expect, it } from 'vitest'
import globalStyles from './global.css?raw'
import tokens from './tokens.css?raw'

const readToken = (name: string) => tokens.match(new RegExp(`${name}:\\s*(#[0-9a-fA-F]{6})`))?.[1]

const luminance = (hex: string) => {
  const channels = [1, 3, 5].map((offset) => Number.parseInt(hex.slice(offset, offset + 2), 16) / 255)
  const linear = channels.map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4)
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2]
}

const contrast = (foreground: string, background: string) => {
  const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a)
  return (values[0] + 0.05) / (values[1] + 0.05)
}

describe('responsive visual contracts', () => {
  it('delivers the decorative paper grain through a compressed runtime asset', () => {
    expect(globalStyles).toContain("url('../assets/paper-texture.webp')")
    expect(globalStyles).not.toContain("url('../assets/paper-texture.png')")
  })

  it('keeps mobile event controls inside their ticket and separates hero labels', () => {
    const mobileStart = globalStyles.indexOf('@media (max-width: 760px)')
    const narrowStart = globalStyles.indexOf('@media (max-width: 380px)')
    const mobileStyles = globalStyles.slice(mobileStart, narrowStart)

    expect(mobileStyles).toContain('grid-template-columns: 88px minmax(0, 1fr) 44px')
    expect(mobileStyles).toContain('.hero__stamp small { display: none; }')
    expect(mobileStyles).toMatch(/\.hero__media-rail\s*\{[^}]*max-width:\s*48%/)
    expect(mobileStyles).toMatch(/\.review-card\s*\{[^}]*height:\s*510px/)

    const narrowStyles = globalStyles.slice(narrowStart)
    expect(narrowStyles).toMatch(/\.review-card\s*\{[^}]*height:\s*570px/)
  })

  it('uses AA contrast tokens for small brand text and actions', () => {
    const pairs = [
      ['--orange-action', '--white'],
      ['--orange-dark', '--paper'],
      ['--orange-on-dark', '--navy'],
      ['--vk-blue', '--white'],
    ] as const

    for (const [foregroundName, backgroundName] of pairs) {
      const foreground = readToken(foregroundName)
      const background = readToken(backgroundName)
      expect(foreground, foregroundName).toBeDefined()
      expect(background, backgroundName).toBeDefined()
      expect(contrast(foreground!, background!), `${foregroundName} on ${backgroundName}`).toBeGreaterThanOrEqual(4.5)
    }
  })
})
