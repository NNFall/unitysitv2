import { DiceFive, GameController, Television, UsersThree } from '@phosphor-icons/react'
import { SectionIntro } from './SectionIntro'
import type { SiteContent } from '../data/siteContent'

const formatIcons = [GameController, UsersThree, Television, DiceFive]

export function FormatsSection({ content, assetPath }: { content: SiteContent; assetPath: (key: string) => string }) {
  return (
    <section className="scene formats-scene" id="formats" aria-labelledby="formats-title">
      <span id="inside" className="section-anchor" aria-hidden="true" />
      <span id="pricing" className="section-anchor" aria-hidden="true" />
      <SectionIntro eyebrow="что внутри UNITY" title="Форматы отдыха" accent="отдыха" copy="Выбирайте, как хочется провести время: играть, смотреть, говорить или просто быть рядом." id="formats-title" />
      <div className="format-grid">
        {content.formats.map((format, index) => {
          const Icon = formatIcons[index]
          return (
            <article className={`format-card format-card--${index + 1}`} key={format.id}>
              <div className="format-card__media"><img src={assetPath(format.media.assetKey)} alt={format.media.alt} /><span>{format.number}</span></div>
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
