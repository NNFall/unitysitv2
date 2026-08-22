import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { BookingSection } from './BookingSection'
import { assetPath } from '../App'
import { siteContent } from '../data/siteContent'

describe('BookingSection', () => {
  it('asks for the required contact fields before submitting', () => {
    render(<BookingSection content={siteContent} assetPath={assetPath} />)

    fireEvent.click(screen.getByRole('button', { name: siteContent.booking.form.submitLabel }))
    expect(screen.getByRole('alert')).toHaveTextContent(siteContent.booking.form.errorMessage)

    fireEvent.change(screen.getByPlaceholderText('Как к вам обращаться'), { target: { value: 'Сергей' } })
    fireEvent.change(screen.getByPlaceholderText('+7 или ссылка на VK'), { target: { value: '+79879500018' } })
    fireEvent.click(screen.getByRole('button', { name: siteContent.booking.form.submitLabel }))
    expect(screen.getByRole('heading', { name: 'Запрос отправлен' })).toBeInTheDocument()
  })

  it('offers a verified VK alternative and labels the form as a local demo', () => {
    render(<BookingSection content={siteContent} assetPath={assetPath} />)

    const vkLink = screen.getByRole('link', { name: /вконтакте/i })
    expect(vkLink).toHaveAttribute('href', siteContent.booking.vkCta.href)
    expect(screen.getByText(siteContent.booking.demoNote)).toBeInTheDocument()
  })
})
