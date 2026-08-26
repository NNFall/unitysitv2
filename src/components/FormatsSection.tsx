import { DiceFive, GameController, Television, UsersThree } from '@phosphor-icons/react'
import { useCallback, useEffect, useRef, useState, type PointerEvent, type UIEvent } from 'react'
import type { SiteContent } from '../data/siteContent'
import { useCarouselAutoplay } from './motion/Carousel'
import { useReveal } from './motion/Reveal'

const formatIcons = [GameController, UsersThree, Television, DiceFive]
const SWIPE_THRESHOLD = 48

export function FormatsSection({ content, assetPath }: { content: SiteContent; assetPath: (key: string) => string }) {
  const reveal = useReveal({ delay: 80 })
  const railRef = useRef<HTMLDivElement>(null)
  const pointerStart = useRef<{ id: number; x: number; y: number } | null>(null)
  const activeIndexRef = useRef(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const [canAdvance, setCanAdvance] = useState(false)

  useEffect(() => {
    activeIndexRef.current = activeIndex
  }, [activeIndex])

  const measureRail = useCallback(() => {
    const rail = railRef.current
    if (!rail) return
    setCanAdvance(rail.scrollWidth - rail.clientWidth > 2)
  }, [])

  const moveTo = useCallback((nextIndex: number) => {
    const rail = railRef.current
    if (!rail || content.formats.length < 2) return

    const cards = Array.from(rail.querySelectorAll<HTMLElement>('.format-card'))
    if (!cards.length) return

    const resolvedIndex = (nextIndex + cards.length) % cards.length
    const card = cards[resolvedIndex]
    const left = Math.max(0, card.offsetLeft - rail.offsetLeft)

    if (typeof rail.scrollTo === 'function') {
      rail.scrollTo({ left, behavior: 'smooth' })
    } else {
      rail.scrollLeft = left
    }

    activeIndexRef.current = resolvedIndex
    setActiveIndex(resolvedIndex)
  }, [content.formats.length])

  const advance = useCallback(() => {
    if (!canAdvance) return
    moveTo(activeIndexRef.current + 1)
  }, [canAdvance, moveTo])

  const autoplay = useCarouselAutoplay({
    itemCount: canAdvance ? content.formats.length : 1,
    onAdvance: advance,
  })

  useEffect(() => {
    measureRail()
    const rail = railRef.current
    if (!rail) return

    const observer = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(measureRail)
    observer?.observe(rail)
    window.addEventListener('resize', measureRail)

    return () => {
      observer?.disconnect()
      window.removeEventListener('resize', measureRail)
    }
  }, [measureRail])

  const handleRailScroll = useCallback((event: UIEvent<HTMLDivElement>) => {
    const rail = event.currentTarget
    const cards = Array.from(rail.querySelectorAll<HTMLElement>('.format-card'))
    if (!cards.length) return

    const closestIndex = cards.reduce((bestIndex, card, cardIndex) => {
      const currentDistance = Math.abs(cards[bestIndex].offsetLeft - rail.offsetLeft - rail.scrollLeft)
      const nextDistance = Math.abs(card.offsetLeft - rail.offsetLeft - rail.scrollLeft)
      return nextDistance < currentDistance ? cardIndex : bestIndex
    }, 0)

    activeIndexRef.current = closestIndex
    setActiveIndex(closestIndex)
  }, [])

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!canAdvance || (event.pointerType === 'mouse' && event.button !== 0)) return
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
    if (Math.abs(deltaX) < SWIPE_THRESHOLD || Math.abs(deltaX) <= Math.abs(deltaY)) return

    moveTo(activeIndexRef.current + (deltaX < 0 ? 1 : -1))
    autoplay.stop()
  }

  return (
    <section ref={reveal.ref} className={`scene formats-scene ${reveal.className}`} style={reveal.style} id="formats" aria-labelledby="formats-title">
      <span id="inside" className="section-anchor" aria-hidden="true" />
      <span id="pricing" className="section-anchor" aria-hidden="true" />
      <div className="section-intro formats-intro">
        <h2 id="formats-title"><span>Форматы отдыха <em>в UNITY</em></span></h2>
        <span className="section-wave" aria-hidden="true">≈≈≈</span>
        <p className="section-intro__copy">Выбирайте, как хочется провести время: играть, смотреть, говорить или просто быть рядом.</p>
      </div>
      <div
        ref={railRef}
        className="format-grid"
        role="list"
        aria-label="Форматы отдыха в UNITY"
        aria-describedby="formats-rail-help"
        tabIndex={0}
        data-rail="formats"
        data-active-index={activeIndex}
        data-autoplay={autoplay.isStopped ? 'stopped' : 'running'}
        style={{ touchAction: 'pan-y' }}
        onMouseEnter={() => autoplay.setHovered(true)}
        onMouseLeave={() => autoplay.setHovered(false)}
        onFocus={(event) => {
          if (event.target === event.currentTarget) autoplay.setFocused(true)
        }}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) autoplay.setFocused(false)
        }}
        onScroll={handleRailScroll}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={(event) => {
          if (pointerStart.current?.id !== event.pointerId) return
          pointerStart.current = null
          autoplay.setInteracting(false)
        }}
      >
        {content.formats.map((format, index) => {
          const Icon = formatIcons[index]
          return (
            <article className={`format-card format-card--${index + 1}`} role="listitem" key={format.id}>
              <div className="format-card__media"><img src={assetPath(format.media.assetKey)} alt={format.media.alt} loading="lazy" decoding="async" /><span>{format.number}</span></div>
              <div className="format-card__body">
                <div className="format-card__heading"><p className="eyebrow">{format.kicker}</p><Icon aria-hidden="true" /></div>
                <h3>{format.title}</h3>
                <p>{format.description}</p>
                <div className="format-card__footer"><span>{format.detail}</span><a href={format.cta.href}>{format.cta.label} <span aria-hidden="true">↗</span></a></div>
              </div>
            </article>
          )
        })}
      </div>
      <p className="sr-only" id="formats-rail-help">Проведите пальцем по карточкам. После ручного выбора автоматическая смена останавливается.</p>
    </section>
  )
}
