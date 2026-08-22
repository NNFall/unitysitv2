import { ArrowUpRight } from '@phosphor-icons/react'
import { SectionIntro } from './SectionIntro'
import { Carousel } from './motion/Carousel'
import type { SiteContent } from '../data/siteContent'

export function EventsSection({ content, assetPath }: { content: SiteContent; assetPath: (key: string) => string }) {
  return (
    <section className="scene events-scene" id="events-section" aria-labelledby="events-title">
      <span id="events" className="section-anchor" aria-hidden="true" />
      <div className="scene-heading-row">
        <SectionIntro eyebrow="встречаемся в UNITY" title="События и встречи" accent="встречи" copy="Кино, игры и разговоры, для которых не нужен особенный повод. Выберите сценарий или соберите свой." id="events-title" />
        <a className="section-link" href="#booking">Предложить свой формат <ArrowUpRight aria-hidden="true" /></a>
      </div>
      <Carousel items={content.events} assetPath={assetPath} />
    </section>
  )
}
