import { ArrowLeft, ArrowRight, CalendarBlank, Clock, UsersThree } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import type { EventItem } from '../../data/siteContent'
import { Button } from '../Button'
import { TicketEdge } from '../TicketEdge'

type CarouselProps = {
  items: readonly EventItem[]
  assetPath: (key: string) => string
}

export function Carousel({ items, assetPath }: CarouselProps) {
  const [index, setIndex] = useState(0)
  const prefersReducedMotion = useReducedMotion()
  const active = items[index]
  const go = (direction: number) => setIndex((current) => (current + direction + items.length) % items.length)

  return (
    <div className="event-carousel" role="region" aria-roledescription="карусель" aria-label="Сценарии вечера">
      <div className="event-carousel__stage">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.id}
            className="event-feature"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            role="group"
            aria-roledescription="слайд"
            aria-label={`${index + 1} из ${items.length}`}
          >
            <div className="event-feature__copy">
              <p className="eyebrow">{active.category}</p>
              <h3>{active.title}</h3>
              <p>{active.description}</p>
              <div className="event-feature__meta">
                <span><CalendarBlank aria-hidden="true" /> {active.dateLabel}</span>
                <span><Clock aria-hidden="true" /> вечерний формат</span>
                <span><UsersThree aria-hidden="true" /> для компании</span>
              </div>
              <Button href={active.cta.href} variant="secondary" showArrow>{active.cta.label}</Button>
            </div>
            <div className="event-feature__media">
              <img src={assetPath(active.media.assetKey)} alt={active.media.alt} />
              <span className="media-caption">концепция афиши</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="event-carousel__controls">
        <div className="carousel-dots" aria-label="Выбор события">
          {items.map((item, itemIndex) => <button key={item.id} type="button" className={itemIndex === index ? 'is-active' : ''} aria-label={`Показать ${item.title}`} aria-pressed={itemIndex === index} onClick={() => setIndex(itemIndex)} />)}
        </div>
        <div className="carousel-arrows">
          <button type="button" aria-label="Предыдущее событие" onClick={() => go(-1)}><ArrowLeft aria-hidden="true" /></button>
          <button type="button" aria-label="Следующее событие" onClick={() => go(1)}><ArrowRight aria-hidden="true" /></button>
        </div>
      </div>
      <div className="event-tickets">
        {items.filter((_, itemIndex) => itemIndex !== index).map((item) => (
          <TicketEdge tone="navy" className="event-ticket" key={item.id}>
            <img src={assetPath(item.media.assetKey)} alt={`Превью события: ${item.title}`} />
            <div><span>{item.dateLabel}</span><strong>{item.title}</strong></div>
            <button type="button" onClick={() => setIndex(items.indexOf(item))} aria-label={`Открыть ${item.title}`}><ArrowRight aria-hidden="true" /></button>
          </TicketEdge>
        ))}
      </div>
    </div>
  )
}
