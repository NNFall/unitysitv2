import { ArrowUpRight, CheckCircle, Clock, MapPin, Phone, Plus, Train } from '@phosphor-icons/react'
import { FormEvent, useState } from 'react'
import { TicketEdge } from './TicketEdge'
import { YandexMapEmbed } from './YandexMapEmbed'
import { useReveal } from './motion/Reveal'
import type { SiteContent } from '../data/siteContent'

type FormState = { name: string; contact: string; date: string; guests: string }
const emptyForm: FormState = { name: '', contact: '', date: '', guests: '' }

export function BookingSection({ content, assetPath }: { content: SiteContent; assetPath: (key: string) => string }) {
  const reveal = useReveal({ delay: 200 })
  const [form, setForm] = useState(emptyForm)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)
  const update = (field: keyof FormState, value: string) => setForm((current) => ({ ...current, [field]: value }))
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const valid = form.name.trim().length >= 2 && form.contact.trim().length >= 5
    setError(!valid)
    setSubmitted(valid)
  }

  return (
    <section ref={reveal.ref} className={`scene booking-scene ${reveal.className}`} style={reveal.style} id="booking-section" aria-labelledby="booking-title">
      <span id="booking" className="section-anchor" aria-hidden="true" />
      <span id="contacts" className="section-anchor" aria-hidden="true" />
      <div className="booking__intro">
        <p className="eyebrow">как нас найти</p>
        <h2 id="booking-title">Встретимся <em>в UNITY</em></h2>
        <span className="section-wave" aria-hidden="true">≈≈≈</span>
        <p>Мы рядом, когда хочется отдохнуть, поиграть, поработать или провести вечер с близкими.</p>
        <address className="booking__details contact-list" role="group" aria-label="Контакты UNITY">
          <span><MapPin aria-hidden="true" /><strong>{content.contact.fullAddress.value}</strong><small>Открыть карту и построить маршрут</small></span>
          <span><Train aria-hidden="true" /><strong>м. {content.contact.metro.value}</strong><small>{content.contact.metroDetail.value}</small></span>
          <span><Clock aria-hidden="true" /><strong>Пн–Вс, до позднего</strong><small>Пт–Сб до 06:00 · график в карточке</small></span>
          <span><Phone aria-hidden="true" /><a href={content.contact.phoneHref}><strong>{content.contact.phone.value}</strong></a><small>Позвонить или написать</small></span>
        </address>
      </div>
      <div className="booking__map-wrap">
        <YandexMapEmbed embedUrl={content.contact.mapEmbedUrl} mapUrl={content.contact.mapUrl} mapLabel={content.contact.mapLabel} />
        <img className="booking__photo" src={assetPath('entrance')} alt="Реальный вид входа UNITY с оранжевой вывеской" loading="lazy" decoding="async" />
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
          <div className="booking-success"><CheckCircle aria-hidden="true" /><h3>Демо-ответ</h3><p>{content.booking.form.successMessage}</p><a className="button button--secondary booking-success__vk" href={content.booking.vkCta.href} target="_blank" rel="noreferrer noopener">Написать во ВКонтакте <ArrowUpRight aria-hidden="true" /></a><button type="button" onClick={() => { setSubmitted(false); setForm(emptyForm) }}>Заполнить ещё раз</button></div>
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
            <div className="booking-form__alternative">
              <p className="form-demo-note">{content.booking.demoNote}</p>
              <a className="button button--secondary" href={content.booking.vkCta.href} target="_blank" rel="noreferrer noopener">
                {content.booking.vkCta.label} <ArrowUpRight aria-hidden="true" />
              </a>
            </div>
          </form>
        )}
      </TicketEdge>
      <TicketEdge className="faq-card">
        <div className="faq-card__intro"><p className="eyebrow">часто спрашивают</p><h3>Перед визитом</h3></div>
        <div className="faq-list">
          {content.booking.faq.map((item, index) => {
            const isOpen = openFaqIndex === index
            const triggerId = `unity-faq-trigger-${index}`
            const panelId = `unity-faq-panel-${index}`

            return (
              <div className={`faq-accordion${isOpen ? ' faq-accordion--open' : ''}`} key={item.question}>
                <button
                  id={triggerId}
                  className={`faq-accordion__trigger ${isOpen ? 'faq-accordion__trigger--open' : ''}`.trim()}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenFaqIndex((current) => current === index ? null : index)}
                >
                  <span>{item.question}</span>
                  <Plus aria-hidden="true" />
                </button>
                <div
                  id={panelId}
                  className={`faq-accordion__panel ${isOpen ? 'faq-accordion__panel--open' : ''}`.trim()}
                  role="region"
                  aria-labelledby={triggerId}
                  aria-hidden={!isOpen}
                >
                  <div className="faq-accordion__panel-inner">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </TicketEdge>
    </section>
  )
}
