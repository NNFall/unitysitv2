import { ArrowRight, Heart } from '@phosphor-icons/react'
import { useCallback, useState } from 'react'
import { TicketEdge } from './TicketEdge'
import { useCarouselAutoplay } from './motion/Carousel'
import { useReveal } from './motion/Reveal'
import type { ReviewItem, SiteContent } from '../data/siteContent'

export function CommunitySection({ content, assetPath }: { content: SiteContent; assetPath: (key: string) => string }) {
  const reveal = useReveal({ delay: 160 })
  const [reviewIndex, setReviewIndex] = useState(0)
  const review = content.reviews[reviewIndex]
  const advanceReview = useCallback(() => setReviewIndex((current) => (current + 1) % content.reviews.length), [content.reviews.length])
  const autoplay = useCarouselAutoplay({ itemCount: content.reviews.length, onAdvance: advanceReview })
  const attributionLabel = (review.attribution as ReviewItem['attribution']) === 'excerpt'
    ? 'Выдержка из публичного отзыва'
    : 'Краткий пересказ публичного отзыва'

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
          <img className="community-mosaic__hero" src={assetPath('community-hero')} alt="Живой кадр пространства UNITY" />
          <img src={assetPath('community-lounge')} alt="Мягкая зона отдыха UNITY" />
          <img src={assetPath('community-screen')} alt="Кинозал UNITY" />
        </div>
      </div>
      <div className="community__bottom">
        <div
          className="review-carousel"
          role="region"
          aria-roledescription="карусель"
          aria-label="Отзывы гостей"
          aria-live={autoplay.isTemporarilyPaused || autoplay.isReducedMotion ? 'off' : 'polite'}
          tabIndex={0}
          onMouseEnter={() => autoplay.setHovered(true)}
          onMouseLeave={() => autoplay.setHovered(false)}
          onFocus={() => autoplay.setFocused(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) autoplay.setFocused(false)
          }}
        >
          <TicketEdge className="review-card">
            <div className="review-card__label"><Heart aria-hidden="true" /> что говорят гости</div>
            <div className="review-card__quote"><span className="quote-mark">“</span><p>{review.quote}</p></div>
            <p className="review-card__attribution">{attributionLabel}</p>
            <div className="review-card__meta"><span><strong className="review-card__author">{review.author}</strong><small className="review-card__date">{review.dateLabel}</small></span></div>
            <div className="review-card__controls">
              <div className="review-card__dots">
                {content.reviews.map((item, index) => <button type="button" className={index === reviewIndex ? 'is-active' : ''} aria-label={`Отзыв ${index + 1}`} aria-pressed={index === reviewIndex} key={item.id} onClick={() => setReviewIndex(index)} />)}
              </div>
            </div>
          </TicketEdge>
        </div>
        <TicketEdge tone="navy" className="community-panel">
          <p className="eyebrow">наше сообщество</p>
          <h3>Вечера, которые складываются сами</h3>
          <p>Следите за новостями, живыми фото и ближайшими сценариями во ВКонтакте.</p>
          <a className="button button--primary community-panel__vk" href={content.social.vk.href} target="_blank" rel="noreferrer noopener">Перейти во ВКонтакте <ArrowRight aria-hidden="true" /></a>
        </TicketEdge>
      </div>
    </section>
  )
}
