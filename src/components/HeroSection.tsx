import { ArrowDown, CalendarBlank, Clock, MapPin, Train } from '@phosphor-icons/react'
import { Button } from './Button'
import { InfoRibbon } from './InfoRibbon'
import { Reveal } from './motion/Reveal'
import type { SiteContent } from '../data/siteContent'

export function HeroSection({ content, assetPath }: { content: SiteContent['hero']; assetPath: (key: string) => string }) {
  return (
    <section className="hero scene" id="top" aria-labelledby="hero-title">
      <div className="hero__layout">
        <div className="hero__copy">
          <Reveal>
            <p className="eyebrow">{content.eyebrow}</p>
            <h1 id="hero-title" aria-label={content.title}>
              <span>Ваше место</span>
              <span>для <em>{content.accentWord}</em>,</span>
              <span>общения и игр</span>
            </h1>
            <span className="section-wave" aria-hidden="true">≈≈≈</span>
            <p className="hero__description">{content.description}</p>
            <div className="hero__buttons">
              <Button href={content.primaryCta.href} showArrow>{content.primaryCta.label}</Button>
              <Button href={content.secondaryCta.href} variant="secondary">{content.secondaryCta.label}</Button>
            </div>
            <p className="hero__note"><ArrowDown aria-hidden="true" /> {content.note}</p>
          </Reveal>
        </div>
        <Reveal className="hero__media" delay={100}>
          <img src={assetPath('hero')} alt="Редакционный кадр UNITY: бильярдный стол на переднем плане, игровые и кинозоны в глубине кафе" />
          <div className="hero__stamp"><span>UNITY</span><small>время для людей и идей</small></div>
          <div className="hero__media-caption">Самара · Гагарина, 118</div>
          <div className="hero__media-rail">бильярд · PlayStation · кино · настольные игры</div>
        </Reveal>
      </div>
      <Reveal delay={220}>
        <InfoRibbon items={[
          { icon: <MapPin />, label: 'адрес', title: 'Самара', detail: 'ул. Гагарина, 118' },
          { icon: <Train />, label: 'метро', title: 'Советская', detail: 'около 4 минут пешком' },
          { icon: <CalendarBlank />, label: 'форматы', title: '4 сценария', detail: 'PlayStation · бильярд · кино · игры' },
          { icon: <Clock />, label: 'режим', title: 'До позднего', detail: 'Пн–Чт до 04:00 · Пт–Сб до 06:00' },
        ]} />
      </Reveal>
    </section>
  )
}
