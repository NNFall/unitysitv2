import { ArrowLeft, ArrowRight, ArrowUpRight, Heart } from '@phosphor-icons/react'
import { motion, useReducedMotion } from 'framer-motion'
import { useCallback, useRef, useState, type PointerEvent } from 'react'
import { TicketEdge } from './TicketEdge'
import { useCarouselAutoplay } from './motion/Carousel'
import { useReveal } from './motion/Reveal'
import type { ReviewItem, SiteContent } from '../data/siteContent'

export function CommunitySection({ content, assetPath }: { content: SiteContent; assetPath: (key: string) => string }) {
  const reveal = useReveal({ delay: 160 })
  const prefersReducedMotion = useReducedMotion()
  const [reviewIndex, setReviewIndex] = useState(0)
  const review = content.reviews[reviewIndex]
  const advanceReview = useCallback((direction: number) => {
    setReviewIndex((current) => (current + direction + content.reviews.length) % content.reviews.length)
  }, [content.reviews.length])
  const autoplay = useCarouselAutoplay({ itemCount: content.reviews.length, onAdvance: () => advanceReview(1) })
  const goReview = useCallback((direction: number) => {
    advanceReview(direction)
    autoplay.restart()
  }, [advanceReview, autoplay.restart])
  const selectReview = useCallback((nextIndex: number) => {
    setReviewIndex(nextIndex)
    autoplay.restart()
  }, [autoplay.restart])
  const pointerStart = useRef<{ id: number; x: number; y: number } | null>(null)
  const attributionLabel = (review.attribution as ReviewItem['attribution']) === 'excerpt'
    ? 'Выдержка из публичного отзыва'
    : 'Редакционный пересказ публичного отзыва'
  const reviewSource = review.provenance.find((source) => source.url)
  const reviewCounter = `${String(reviewIndex + 1).padStart(2, '0')} / ${String(content.reviews.length).padStart(2, '0')}`
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
    goReview(deltaX < 0 ? 1 : -1)
  }

  return (
    <section ref={reveal.ref} className={`scene community-scene ${reveal.className}`} style={reveal.style} id="community-section" aria-labelledby="community-title">
      <span id="community" className="section-anchor" aria-hidden="true" />
      <div className="community__top">
        <div className="section-intro community-intro">
          <p className="eyebrow">отзывы, атмосфера и сообщество</p>
          <h2 id="community-title"><span>Место, куда хочется</span><span><em>возвращаться</em> снова</span><span>и снова</span></h2>
          <span className="section-wave" aria-hidden="true">≈≈≈</span>
          <p className="section-intro__copy">Здесь можно начать с игры, остаться на фильм и закончить разговором, который не хочется прерывать.</p>
        </div>
        <div className="community-mosaic">
          <img className="community-mosaic__hero" src={assetPath('community-hero')} alt="Живой кадр пространства UNITY" loading="lazy" decoding="async" />
          <img src={assetPath('community-lounge')} alt="Мягкая зона отдыха UNITY" loading="lazy" decoding="async" />
          <img src={assetPath('community-screen')} alt="Кинозал UNITY" loading="lazy" decoding="async" />
        </div>
      </div>
      <div className="community__bottom">
        <div
          className="review-carousel"
          role="region"
          aria-roledescription="карусель"
          aria-label="Отзывы гостей"
          aria-live={autoplay.isTemporarilyPaused || autoplay.isReducedMotion ? 'polite' : 'off'}
          aria-describedby="review-carousel-help"
          tabIndex={0}
          onMouseEnter={() => autoplay.setHovered(true)}
          onMouseLeave={() => autoplay.setHovered(false)}
          onFocus={(event) => {
            if (event.target === event.currentTarget) autoplay.setFocused(true)
          }}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) autoplay.setFocused(false)
          }}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={(event) => {
            if (pointerStart.current?.id !== event.pointerId) return
            pointerStart.current = null
            autoplay.setInteracting(false)
          }}
          style={{ touchAction: 'pan-y' }}
        >
          <p className="sr-only" id="review-carousel-help">Ручное переключение начинает новый пятисекундный цикл смены отзывов.</p>
          <TicketEdge className="review-card">
            <div className="review-card__label"><Heart aria-hidden="true" /> что говорят гости</div>
            <motion.div
              key={review.id}
              className="review-card__content"
              initial={prefersReducedMotion ? false : { opacity: 0.45, scale: 0.992, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="review-card__quote"><span className="quote-mark">“</span><p>{review.quote}</p></div>
              <div className="review-card__source-row">
                <p className="review-card__attribution">{attributionLabel}</p>
                {reviewSource?.url ? (
                  <a
                    className="review-card__source"
                    href={reviewSource.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`Источник отзыва: ${reviewSource.label}`}
                  >
                    Источник отзыва <ArrowUpRight aria-hidden="true" />
                  </a>
                ) : null}
              </div>
              <div className="review-card__meta"><span><strong className="review-card__author">{review.author}</strong><small className="review-card__date">{review.dateLabel}</small></span></div>
            </motion.div>
            <div className="review-card__controls">
              <div className="review-card__arrows">
                <button type="button" aria-label="Предыдущий отзыв" onClick={() => goReview(-1)}><ArrowLeft aria-hidden="true" /></button>
                <span className="review-card__counter" aria-live="off">{reviewCounter}</span>
                <button type="button" aria-label="Следующий отзыв" onClick={() => goReview(1)}><ArrowRight aria-hidden="true" /></button>
              </div>
              <div className="review-card__dots">
                {content.reviews.map((item, index) => <button type="button" className={index === reviewIndex ? 'is-active' : ''} aria-label={`Отзыв ${index + 1}`} aria-pressed={index === reviewIndex} key={item.id} onClick={() => selectReview(index)} />)}
              </div>
            </div>
          </TicketEdge>
        </div>
        <TicketEdge tone="navy" className="community-panel">
          <p className="eyebrow community-panel__label">наше сообщество</p>
          <h3>Вечера собирают своих</h3>
          <p>Анонсы, живые фотографии и быстрый способ узнать, что происходит в UNITY сегодня.</p>
          <a className="button button--primary button--vk community-panel__vk" href={content.social.vk.href} target="_blank" rel="noreferrer noopener">Перейти во ВКонтакте <ArrowRight aria-hidden="true" /></a>
        </TicketEdge>
      </div>
    </section>
  )
}
