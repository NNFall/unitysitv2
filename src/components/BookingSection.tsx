import { CheckCircle, Clock, MapPin, Phone, Plus, Train } from '@phosphor-icons/react'
import { FormEvent, useState } from 'react'
import { Button } from './Button'
import { TicketEdge } from './TicketEdge'
import type { SiteContent } from '../data/siteContent'

type FormState = { name: string; contact: string; date: string; guests: string }
const emptyForm: FormState = { name: '', contact: '', date: '', guests: '' }

export function BookingSection({ content, assetPath }: { content: SiteContent; assetPath: (key: string) => string }) {
  const [form, setForm] = useState(emptyForm)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(false)
  const update = (field: keyof FormState, value: string) => setForm((current) => ({ ...current, [field]: value }))
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const valid = form.name.trim().length >= 2 && form.contact.trim().length >= 5
    setError(!valid)
    setSubmitted(valid)
  }

  return (
    <section className="scene booking-scene" id="booking-section" aria-labelledby="booking-title">
      <span id="booking" className="section-anchor" aria-hidden="true" />
      <span id="contacts" className="section-anchor" aria-hidden="true" />
      <div className="booking__intro">
        <p className="eyebrow">как нас найти</p>
        <h2 id="booking-title">Встретимся <em>в UNITY</em></h2>
        <span className="section-wave" aria-hidden="true">≈≈≈</span>
        <p>Мы рядом, когда хочется отдохнуть, поиграть, поработать или провести вечер с близкими.</p>
        <div className="contact-list">
          <span><MapPin aria-hidden="true" /><strong>{content.contact.fullAddress.value}</strong><small>Открыть карту и построить маршрут</small></span>
          <span><Train aria-hidden="true" /><strong>м. {content.contact.metro.value}</strong><small>{content.contact.metroDetail.value}</small></span>
          <span><Clock aria-hidden="true" /><strong>Пн–Вс, до позднего</strong><small>Пт–Сб до 06:00 · график в карточке</small></span>
          <span><Phone aria-hidden="true" /><a href={content.contact.phoneHref}><strong>{content.contact.phone.value}</strong></a><small>Позвонить или написать</small></span>
        </div>
      </div>
      <div className="booking__map-wrap">
        <div className="map-card">
          <div className="map-card__grid" aria-hidden="true"><span className="map-road map-road--one" /><span className="map-road map-road--two" /><span className="map-road map-road--three" /><span className="map-block map-block--one" /><span className="map-block map-block--two" /><span className="map-block map-block--three" /></div>
          <div className="map-card__pin"><MapPin aria-hidden="true" /><strong>UNITY</strong><small>Гагарина, 118</small></div>
          <a href={content.contact.mapUrl} target="_blank" rel="noreferrer" className="map-card__link">{content.contact.mapLabel} <span aria-hidden="true">↗</span></a>
        </div>
        <img className="booking__photo" src={assetPath('entrance')} alt="Вход в UNITY с оранжевой вывеской" />
        <div className="route-card">
          <p className="eyebrow">как пройти</p>
          <h3>От метро до UNITY</h3>
          <ol>
            {content.booking.routeSteps.map((step) => (
              <li key={step.step}><span>{step.step}</span><div><strong>{step.title}</strong><small>{step.detail}</small></div></li>
            ))}
          </ol>
        </div>
      </div>
      <TicketEdge tone="navy" className="booking-form-card">
        {submitted ? (
          <div className="booking-success"><CheckCircle aria-hidden="true" /><h3>Запрос отправлен</h3><p>{content.booking.form.successMessage}</p><button type="button" onClick={() => { setSubmitted(false); setForm(emptyForm) }}>Отправить ещё один</button></div>
        ) : (
          <form onSubmit={submit} noValidate>
            <p className="eyebrow">{content.booking.eyebrow}</p>
            <h3>{content.booking.title}</h3>
            <p>{content.booking.description}</p>
            <div className="form-grid">
              <label htmlFor="booking-name"><span>{content.booking.form.nameLabel}</span><input id="booking-name" required value={form.name} onChange={(event) => update('name', event.target.value)} placeholder="Как к вам обращаться" aria-invalid={error} aria-describedby={error ? 'booking-error' : undefined} /></label>
              <label htmlFor="booking-contact"><span>{content.booking.form.contactLabel}</span><input id="booking-contact" required value={form.contact} onChange={(event) => update('contact', event.target.value)} placeholder="+7 или ссылка на VK" aria-invalid={error} aria-describedby={error ? 'booking-error' : undefined} /></label>
              <label htmlFor="booking-date"><span>{content.booking.form.dateLabel}</span><input id="booking-date" type="date" value={form.date} onChange={(event) => update('date', event.target.value)} /></label>
              <label htmlFor="booking-guests"><span>{content.booking.form.guestsLabel}</span><select id="booking-guests" value={form.guests} onChange={(event) => update('guests', event.target.value)}><option value="">Выберите количество</option><option value="2">2 гостя</option><option value="4">3–5 гостей</option><option value="8">6–10 гостей</option><option value="12">больше 10</option></select></label>
            </div>
            {error ? <p className="form-error" id="booking-error" role="alert">{content.booking.form.errorMessage}</p> : null}
            <button className="button button--primary" type="submit">{content.booking.form.submitLabel} <Plus aria-hidden="true" /></button>
            <small className="form-note">{content.booking.privacyNote}</small>
          </form>
        )}
      </TicketEdge>
      <TicketEdge className="faq-card">
        <div className="faq-card__intro"><p className="eyebrow">часто спрашивают</p><h3>Перед визитом</h3></div>
        <div className="faq-list">
          {content.booking.faq.map((item) => (
            <details key={item.question}>
              <summary>{item.question}<Plus aria-hidden="true" /></summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </TicketEdge>
    </section>
  )
}
