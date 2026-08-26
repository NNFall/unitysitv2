import { DiceFive, GameController, Television, UsersThree } from '@phosphor-icons/react'
import type { SiteContent } from '../data/siteContent'
import { useReveal } from './motion/Reveal'

const formatIcons = [GameController, UsersThree, Television, DiceFive]

export function FormatsSection({ content, assetPath }: { content: SiteContent; assetPath: (key: string) => string }) {
  const reveal = useReveal({ delay: 80 })

  return (
    <section ref={reveal.ref} className={`scene formats-scene ${reveal.className}`} style={reveal.style} id="formats" aria-labelledby="formats-title">
      <span id="inside" className="section-anchor" aria-hidden="true" />
      <span id="pricing" className="section-anchor" aria-hidden="true" />
      <div className="section-intro formats-intro">
        <h2 id="formats-title"><span>Форматы отдыха <em>в UNITY</em></span></h2>
        <span className="section-wave" aria-hidden="true">≈≈≈</span>
        <p className="section-intro__copy">Выбирайте, как хочется провести время: играть, смотреть, говорить или просто быть рядом.</p>
      </div>
      <div className="format-grid" role="list" aria-label="Форматы отдыха в UNITY" data-rail="formats">
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
    </section>
  )
}
