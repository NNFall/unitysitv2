import { ArrowLeft, ArrowRight, Clock, UsersThree } from '@phosphor-icons/react'
import { motion, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react'
import type { EventItem } from '../../data/siteContent'
import { Button } from '../Button'
import { TicketEdge } from '../TicketEdge'

type CarouselProps = {
  items: readonly EventItem[]
  assetPath: (key: string) => string
}

export const CAROUSEL_AUTOPLAY_INTERVAL = 5000

type CarouselAutoplayOptions = {
  itemCount: number
  onAdvance: () => void
  intervalMs?: number
}

type CarouselAutoplayState = {
  isReducedMotion: boolean
  isTemporarilyPaused: boolean
  isStopped: boolean
  setHovered: (value: boolean) => void
  setFocused: (value: boolean) => void
  setInteracting: (value: boolean) => void
  restart: () => void
  stop: () => void
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
  const [isInteracting, setIsInteracting] = useState(false)
  const [isStopped, setIsStopped] = useState(false)
  const [cycle, setCycle] = useState(0)
  const onAdvanceRef = useRef(onAdvance)
  const restart = useCallback(() => {
    setIsStopped(false)
    setCycle((current) => current + 1)
  }, [])
  const stop = useCallback(() => setIsStopped(true), [])
  const isTemporarilyPaused = isHovered || isFocused || isInteracting

  useEffect(() => {
    onAdvanceRef.current = onAdvance
  }, [onAdvance])

  useEffect(() => {
    if (prefersReducedMotion || isTemporarilyPaused || isStopped || itemCount < 2) return

    const timer = window.setInterval(() => onAdvanceRef.current(), intervalMs)
    return () => window.clearInterval(timer)
  }, [cycle, intervalMs, isStopped, isTemporarilyPaused, itemCount, prefersReducedMotion])

  return {
    isReducedMotion: Boolean(prefersReducedMotion),
    isTemporarilyPaused,
    isStopped,
    setHovered: setIsHovered,
    setFocused: setIsFocused,
    setInteracting: setIsInteracting,
    restart,
    stop,
  }
}

export function Carousel({ items, assetPath }: CarouselProps) {
  const [index, setIndex] = useState(0)
  const prefersReducedMotion = useReducedMotion()
  const active = items[index]
  const advance = useCallback((direction: number) => setIndex((current) => (current + direction + items.length) % items.length), [items.length])
  const autoplay = useCarouselAutoplay({ itemCount: items.length, onAdvance: () => advance(1) })
  const go = useCallback((direction: number) => {
    advance(direction)
    autoplay.restart()
  }, [advance, autoplay.restart])
  const select = useCallback((nextIndex: number) => {
    setIndex(nextIndex)
    autoplay.restart()
  }, [autoplay.restart])
  const pointerStart = useRef<{ id: number; x: number; y: number } | null>(null)

  if (!active) return null

  const statusLabel = active.status === 'concept' ? 'Концепция' : 'Опубликовано'
  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    if (event.target instanceof Element && event.target.closest('a, button')) return
    if (pointerStart.current) return
    pointerStart.current = { id: event.pointerId, x: event.clientX, y: event.clientY }
    autoplay.setInteracting(true)
    event.currentTarget.setPointerCapture?.(event.pointerId)
  }
  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const start = pointerStart.current
    if (!start || start.id !== event.pointerId) return
    pointerStart.current = null
    autoplay.setInteracting(false)

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
      aria-live={autoplay.isTemporarilyPaused || autoplay.isReducedMotion ? 'polite' : 'off'}
      aria-describedby="event-carousel-help"
      tabIndex={0}
      onMouseEnter={() => autoplay.setHovered(true)}
      onMouseLeave={() => autoplay.setHovered(false)}
      onFocus={(event) => {
        if (event.target === event.currentTarget) autoplay.setFocused(true)
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) autoplay.setFocused(false)
      }}
    >
      <p className="sr-only" id="event-carousel-help">Ручное переключение начинает новый пятисекундный цикл смены событий.</p>
      <div
        className="event-carousel__stage"
        style={{ touchAction: 'pan-y' }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={(event) => {
          if (pointerStart.current?.id !== event.pointerId) return
          pointerStart.current = null
          autoplay.setInteracting(false)
        }}
      >
        <div className="event-feature">
          <motion.div
            key={active.id}
            className="event-feature__inner"
            initial={prefersReducedMotion ? false : { opacity: 0.45, scale: 0.992, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
            role="group"
            aria-roledescription="слайд"
            aria-label={`${index + 1} из ${items.length}`}
          >
            <div className="event-feature__copy">
              <p className="eyebrow">{active.category}</p>
              <p className="event-feature__status" aria-label={`${statusLabel}, ${active.dateLabel}`}>{statusLabel} · {active.dateLabel}</p>
              <h3>{active.title}</h3>
              <p>{active.description}</p>
              <div className="event-feature__footer">
                <div className="event-feature__meta">
                  <span><Clock aria-hidden="true" /> вечерний формат</span>
                  <span><UsersThree aria-hidden="true" /> для компании</span>
                </div>
                <Button href={active.cta.href} variant="secondary" showArrow>{active.cta.label}</Button>
              </div>
            </div>
            <div className="event-feature__media">
              <img src={assetPath(active.media.assetKey)} alt={active.media.alt} loading="lazy" decoding="async" />
              <span className="media-caption">концепция афиши</span>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="event-carousel__controls">
        <div className="carousel-dots" aria-label="Выбор события">
          {items.map((item, itemIndex) => <button key={item.id} type="button" className={itemIndex === index ? 'is-active' : ''} aria-label={`Показать ${item.title}`} aria-pressed={itemIndex === index} onClick={() => select(itemIndex)} />)}
        </div>
        <div className="carousel-arrows">
          <button type="button" aria-label="Предыдущее событие" onClick={() => go(-1)}><ArrowLeft aria-hidden="true" /></button>
          <button type="button" aria-label="Следующее событие" onClick={() => go(1)}><ArrowRight aria-hidden="true" /></button>
        </div>
      </div>
      <div className="event-tickets">
        {items.filter((_, itemIndex) => itemIndex !== index).map((item) => (
          <TicketEdge tone="navy" className="event-ticket" key={item.id}>
            <img src={assetPath(item.media.assetKey)} alt={`Превью события: ${item.title}`} loading="lazy" decoding="async" />
            <div><span>{item.dateLabel}</span><strong>{item.title}</strong></div>
            <button type="button" onClick={() => select(items.indexOf(item))} aria-label={`Открыть ${item.title}`}><ArrowRight aria-hidden="true" /></button>
          </TicketEdge>
        ))}
      </div>
    </div>
  )
}
