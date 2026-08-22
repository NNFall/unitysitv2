import { ArrowRight, Heart, Star } from '@phosphor-icons/react'
import { useState } from 'react'
import { SectionIntro } from './SectionIntro'
import { TicketEdge } from './TicketEdge'
import type { SiteContent } from '../data/siteContent'

export function CommunitySection({ content, assetPath }: { content: SiteContent; assetPath: (key: string) => string }) {
  const [reviewIndex, setReviewIndex] = useState(0)
  const review = content.reviews[reviewIndex]

  return (
    <section className="scene community-scene" id="community-section" aria-labelledby="community-title">
      <span id="community" className="section-anchor" aria-hidden="true" />
      <div className="community__top">
        <SectionIntro eyebrow="отзывы, атмосфера и сообщество" title="Место, куда хочется возвращаться" accent="возвращаться" copy="Здесь можно начать с игры, остаться на фильм и закончить разговором, который не хочется прерывать." id="community-title" />
        <div className="community-mosaic">
          <img className="community-mosaic__hero" src={assetPath('community-hero')} alt="Живой кадр пространства UNITY" />
          <img src={assetPath('community-lounge')} alt="Мягкая зона отдыха UNITY" />
          <img src={assetPath('community-screen')} alt="Кинозал UNITY" />
        </div>
      </div>
      <div className="community__bottom">
        <TicketEdge className="review-card">
          <div className="review-card__label"><Heart aria-hidden="true" /> что говорят гости</div>
          <div className="review-card__quote"><span className="quote-mark">“</span><p>{review.quote}</p></div>
          <div className="review-card__meta"><span><strong>{review.author}</strong><small>{review.dateLabel}</small></span><span className="review-stars" aria-label="Пять из пяти"><Star /><Star /><Star /><Star /><Star /></span></div>
          <div className="review-card__controls">{content.reviews.map((item, index) => <button type="button" className={index === reviewIndex ? 'is-active' : ''} aria-label={`Отзыв ${index + 1}`} key={item.id} onClick={() => setReviewIndex(index)} />)}</div>
        </TicketEdge>
        <TicketEdge tone="navy" className="community-panel">
          <p className="eyebrow">наше сообщество</p>
          <h3>Вечера, которые складываются сами</h3>
          <p>Следите за новостями, живыми фото и ближайшими сценариями во ВКонтакте.</p>
          <a href={content.social.vk.href} target="_blank" rel="noreferrer">Перейти во ВКонтакте <ArrowRight aria-hidden="true" /></a>
        </TicketEdge>
      </div>
    </section>
  )
}
