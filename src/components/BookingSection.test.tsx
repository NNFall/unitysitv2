import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { BookingSection } from './BookingSection'
import { YandexMapEmbed } from './YandexMapEmbed'
import { assetPath } from '../App'
import { siteContent } from '../data/siteContent'

describe('BookingSection', () => {
  it('groups the venue contact facts in a labelled address block', () => {
    render(<BookingSection content={siteContent} assetPath={assetPath} />)

    const contacts = screen.getByRole('group', { name: 'Контакты UNITY' })
    expect(contacts.tagName).toBe('ADDRESS')
  })

  it('asks for the required contact fields before submitting', () => {
    render(<BookingSection content={siteContent} assetPath={assetPath} />)

    fireEvent.click(screen.getByRole('button', { name: siteContent.booking.form.submitLabel }))
    expect(screen.getByRole('alert')).toHaveTextContent(siteContent.booking.form.errorMessage)

    fireEvent.change(screen.getByPlaceholderText('Как к вам обращаться'), { target: { value: 'Сергей' } })
    fireEvent.change(screen.getByPlaceholderText('+7 или ссылка на VK'), { target: { value: '+79879500018' } })
    fireEvent.click(screen.getByRole('button', { name: siteContent.booking.form.submitLabel }))
    expect(screen.getByRole('heading', { name: 'Демо-ответ' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /написать во вконтакте/i })).toHaveAttribute('href', siteContent.booking.vkCta.href)
  })

  it('offers a verified VK alternative and labels the form as a local demo', () => {
    render(<BookingSection content={siteContent} assetPath={assetPath} />)

    const vkLink = screen.getByRole('link', { name: /вконтакте/i })
    expect(vkLink).toHaveAttribute('href', siteContent.booking.vkCta.href)
    expect(screen.getByText(siteContent.booking.demoNote)).toBeInTheDocument()
  })

  it('renders a lazy Yandex map widget with an accessible title and direct fallback link', () => {
    render(<BookingSection content={siteContent} assetPath={assetPath} />)

    expect(screen.getByTitle('Интерактивная карта UNITY — Самара, улица Гагарина, 118')).toHaveAttribute('loading', 'lazy')
    expect(screen.getByRole('link', { name: /открыть маршрут в яндекс картах/i })).toHaveAttribute('href', siteContent.contact.mapUrl)
    expect(screen.queryByText('Ориентир для входа')).not.toBeInTheDocument()
    expect(screen.queryByText('Показать схему и ориентир')).not.toBeInTheDocument()
  })

  it('keeps the illustrated route fallback available without an embed URL', () => {
    render(<YandexMapEmbed embedUrl={undefined} mapUrl={siteContent.contact.mapUrl} mapLabel={siteContent.contact.mapLabel} />)

    expect(screen.queryByTitle('Интерактивная карта UNITY — Самара, улица Гагарина, 118')).not.toBeInTheDocument()
    expect(screen.getByText('Ориентир для входа')).toBeInTheDocument()
    expect(screen.getByText('Самара, ул. Гагарина, 118')).toBeInTheDocument()
  })

  it('keeps one FAQ item open at a time with accessible state and animation classes', () => {
    render(<BookingSection content={siteContent} assetPath={assetPath} />)

    const firstQuestion = siteContent.booking.faq[0].question
    const secondQuestion = siteContent.booking.faq[1].question
    const firstTrigger = screen.getByRole('button', { name: firstQuestion })
    const secondTrigger = screen.getByRole('button', { name: secondQuestion })
    const firstPanel = document.getElementById(firstTrigger.getAttribute('aria-controls') ?? '')
    const secondPanel = document.getElementById(secondTrigger.getAttribute('aria-controls') ?? '')

    expect(firstTrigger).toHaveAttribute('aria-expanded', 'true')
    expect(firstTrigger).toHaveClass('faq-accordion__trigger--open')
    expect(firstPanel).toHaveClass('faq-accordion__panel--open')
    expect(secondTrigger).toHaveAttribute('aria-expanded', 'false')

    fireEvent.click(secondTrigger)
    expect(firstTrigger).toHaveAttribute('aria-expanded', 'false')
    expect(firstPanel).toHaveAttribute('aria-hidden', 'true')
    expect(secondTrigger).toHaveAttribute('aria-expanded', 'true')
    expect(secondPanel).toHaveClass('faq-accordion__panel--open')

    fireEvent.click(secondTrigger)
    expect(secondTrigger).toHaveAttribute('aria-expanded', 'false')
  })
})
