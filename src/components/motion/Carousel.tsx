import { ArrowLeft, ArrowRight, Clock, UsersThree } from '@phosphor-icons/react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react'
import type { EventItem } from '../../data/siteContent'
import { Button } from '../Button'
import { TicketEdge } from '../TicketEdge'

type CarouselProps = {
  items: readonly EventItem[]
  assetPath: (key: string) => string
}

export const CAROUSEL_AUTOPLAY_INTERVAL = 5600

type CarouselAutoplayOptions = {
  itemCount: number
  onAdvance: () => void
  intervalMs?: number
}

type CarouselAutoplayState = {
  isReducedMotion: boolean
  isTemporarilyPaused: boolean
  setHovered: (value: boolean) => void
  setFocused: (value: boolean) => void
}

/** Shared autoplay behavior for editorial carousels with accessible escape hatches. */
export function useCarouselAutoplay({
  itemCount,
  onAdvance,
  intervalMs = CAROUSEL_AUTOPLAY_INTERVAL,
}: CarouselAutoplayOptions): CarouselAutoplayState {
  const prefersReducedMotion = useReducedMotion()
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const onAdvanceRef = useRef(onAdvance)

  useEffect(() => {
    onAdvanceRef.current = onAdvance
  }, [onAdvance])

  useEffect(() => {
    if (prefersReducedMotion || isHovered || isFocused || itemCount < 2) return

    const timer = window.setInterval(() => onAdvanceRef.current(), intervalMs)
    return () => window.clearInterval(timer)
  }, [intervalMs, isFocused, isHovered, itemCount, prefersReducedMotion])

  return {
    isReducedMotion: Boolean(prefersReducedMotion),
    isTemporarilyPaused: isHovered || isFocused,
    setHovered: setIsHovered,
    setFocused: setIsFocused,
  }
}

export function Carousel({ items, assetPath }: CarouselProps) {
  const [index, setIndex] = useState(0)
  const prefersReducedMotion = useReducedMotion()
  const active = items[index]
  const go = useCallback((direction: number) => setIndex((current) => (current + direction + items.length) % items.length), [items.length])
  const autoplay = useCarouselAutoplay({ itemCount: items.length, onAdvance: () => go(1) })
  const pointerStart = useRef<{ x: number; y: number } | null>(null)

  if (!active) return null

  const statusLabel = active.status === 'concept' ? 'Концепция' : 'Опубликовано'
  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    pointerStart.current = { x: event.clientX, y: event.clientY }
    event.currentTarget.setPointerCapture?.(event.pointerId)
  }
  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const start = pointerStart.current
    pointerStart.current = null
    if (!start) return

    const deltaX = event.clientX - start.x
    const deltaY = event.clientY - start.y
    if (Math.abs(deltaX) < 48 || Math.abs(deltaX) <= Math.abs(deltaY)) return
    go(deltaX < 0 ? 1 : -1)
  }

  return (
    <div
      className="event-carousel"
      role="region"
      aria-roledescription="карусель"
      aria-label="Сценарии вечера"
      aria-live={autoplay.isTemporarilyPaused || autoplay.isReducedMotion ? 'off' : 'polite'}
      tabIndex={0}
      onMouseEnter={() => autoplay.setHovered(true)}
      onMouseLeave={() => autoplay.setHovered(false)}
      onFocus={() => autoplay.setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) autoplay.setFocused(false)
      }}
    >
      <div className="event-carousel__stage">
        <AnimatePresence initial={false}>
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
              <p className="event-feature__status" aria-label={`${statusLabel}, ${active.dateLabel}`}>{statusLabel} · {active.dateLabel}</p>
              <h3>{active.title}</h3>
              <p>{active.description}</p>
              <div className="event-feature__meta">
                <span><Clock aria-hidden="true" /> вечерний формат</span>
                <span><UsersThree aria-hidden="true" /> для компании</span>
              </div>
              <Button href={active.cta.href} variant="secondary" showArrow>{active.cta.label}</Button>
            </div>
            <div
              className="event-feature__media"
              style={{ touchAction: 'pan-y' }}
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onPointerCancel={() => { pointerStart.current = null }}
            >
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
