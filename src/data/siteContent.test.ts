import { describe, expect, it } from 'vitest'

import { siteContent, sources } from './siteContent'

describe('UNITY content contract', () => {
  it('exposes a complete navigation with non-empty labels and anchors', () => {
    expect(siteContent.navigation.length).toBeGreaterThanOrEqual(5)
    expect(siteContent.navigation.every(({ label, href }) => label.trim() && href.startsWith('#'))).toBe(true)
  })

  it('contains four distinct leisure formats and useful benefits', () => {
    expect(siteContent.formats).toHaveLength(4)
    expect(new Set(siteContent.formats.map(({ id }) => id)).size).toBe(4)
    expect(new Set(siteContent.formats.map(({ media }) => media.assetKey)).size).toBe(siteContent.formats.length)
    expect(siteContent.formats.every(({ title, description }) => title.trim() && description.trim())).toBe(true)
    expect(siteContent.benefits.length).toBeGreaterThanOrEqual(3)
  })

  it('contains at least three event cards and three attributed reviews', () => {
    expect(siteContent.events.length).toBeGreaterThanOrEqual(3)
    expect(new Set(siteContent.events.map(({ media }) => media.assetKey)).size).toBe(siteContent.events.length)
    expect(siteContent.reviews.length).toBeGreaterThanOrEqual(3)
    expect(siteContent.events.every(({ status, dateLabel }) => status === 'concept' && dateLabel.trim())).toBe(true)
    expect(siteContent.reviews.every(({ quote, author, dateLabel, attribution, provenance }) => (
      quote.trim() && author.trim() && dateLabel.trim() && ['excerpt', 'summary'].includes(attribution) && provenance.length > 0
    ))).toBe(true)
    expect(siteContent.reviews.every(({ provenance }) => provenance.some(({ url }) => url === sources.yandexOrg))).toBe(true)
  })

  it('attaches source provenance to confirmed location and contact facts', () => {
    const confirmedFacts = [
      siteContent.contact.address,
      siteContent.contact.metro,
      siteContent.contact.phone,
      ...siteContent.contact.hours,
    ]

    expect(confirmedFacts.every(({ provenance }) => provenance.some(({ url }) => url === sources.yandexOrg))).toBe(true)
    expect(siteContent.social.vk.provenance.some(({ url }) => url === sources.vk)).toBe(true)
    expect(siteContent.contact.mapUrl).toBe(sources.yandexOrg)
    expect(siteContent.contact.mapEmbedUrl).toBe(sources.yandexMapEmbed)
    expect(siteContent.contact.mapEmbedUrl).toContain('map-widget/v1')
    expect(siteContent.contact.shortMapUrl).toBe(sources.yandexShortMap)
  })

  it('does not bake dynamic rating or review counters into the content model', () => {
    expect(siteContent).not.toHaveProperty('rating')
    expect(siteContent).not.toHaveProperty('reviewCount')
    expect(siteContent.reviews.every((review) => !('rating' in review) && !('reviewCount' in review))).toBe(true)
  })

  it('keeps the VK booking alternative verified and marks the form as a local demo', () => {
    expect(siteContent.booking.vkCta.href).toBe(sources.vk)
    expect(siteContent.booking.vkCta.label).toMatch(/ВКонтакте/i)
    expect(siteContent.booking.demoNote).toMatch(/демо/i)
    expect(siteContent.booking.demoNote).toMatch(/сервер|backend/i)
  })

  it('marks format and event visuals as AI-assisted editorial media', () => {
    const media = [...siteContent.formats, ...siteContent.events].map((item) => item.media)
    expect(media.every(({ provenance }) => (provenance ?? []).some(({ label, verified }) => label.includes('AI-assisted') && !verified))).toBe(true)
  })
})
