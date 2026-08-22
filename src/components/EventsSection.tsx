import { SectionIntro } from './SectionIntro'
import { Carousel } from './motion/Carousel'
import { useReveal } from './motion/Reveal'
import type { SiteContent } from '../data/siteContent'

export function EventsSection({ content, assetPath }: { content: SiteContent; assetPath: (key: string) => string }) {
  const reveal = useReveal({ delay: 120 })

  return (
    <section ref={reveal.ref} className={`scene events-scene ${reveal.className}`} style={reveal.style} id="events-section" aria-labelledby="events-title">
      <span id="events" className="section-anchor" aria-hidden="true" />
      <div className="scene-heading-row">
        <SectionIntro eyebrow="встречаемся в UNITY" title="События и встречи" accent="встречи" copy="Кино, игры и разговоры, для которых не нужен особенный повод. Выберите сценарий или соберите свой." id="events-title" />
      </div>
      <Carousel items={content.events} assetPath={assetPath} />
    </section>
  )
}
