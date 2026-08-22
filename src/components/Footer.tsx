import { ArrowUpRight, Clock, MapPin, Phone } from '@phosphor-icons/react'
import { Logo } from './Logo'
import { useReveal } from './motion/Reveal'
import type { SiteContent } from '../data/siteContent'

export function Footer({ content }: { content: SiteContent }) {
  const reveal = useReveal({ delay: 200 })

  return (
    <footer ref={reveal.ref} className={`site-footer ${reveal.className}`} style={reveal.style}>
      <div className="site-footer__top">
        <div className="site-footer__brand">
          <Logo compact />
          <p>{content.footer.line}<br /><span>{content.footer.note}</span></p>
        </div>
        <address className="site-footer__contacts">
          <p className="eyebrow">контакты</p>
          <a href={content.contact.mapUrl} target="_blank" rel="noreferrer noopener"><MapPin aria-hidden="true" /> <span>{content.contact.fullAddress.value}</span></a>
          <a href={content.contact.phoneHref}><Phone aria-hidden="true" /> <span>{content.contact.phone.value}</span></a>
          <span><Clock aria-hidden="true" /> <span>Пн–Вс · до позднего<br /><small>Пт–Сб до 06:00</small></span></span>
        </address>
        <div className="site-footer__actions">
          <a className="button button--vk" href={content.social.vk.href} target="_blank" rel="noreferrer noopener"><span className="social-lettermark" aria-hidden="true">VK</span> Написать во ВКонтакте <ArrowUpRight aria-hidden="true" /></a>
          <a className="site-footer__map-link" href={content.contact.mapUrl} target="_blank" rel="noreferrer noopener">Открыть карту <ArrowUpRight aria-hidden="true" /></a>
          <a href="#top" className="back-top">Наверх <ArrowUpRight aria-hidden="true" /></a>
        </div>
      </div>
      <div className="site-footer__bottom">
        <span><MapPin aria-hidden="true" /> {content.contact.fullAddress.value}</span>
        <a href={content.social.vk.href} target="_blank" rel="noreferrer noopener"><span className="social-lettermark" aria-hidden="true">VK</span> ВКонтакте</a>
        <span>© UNITY, Самара</span>
      </div>
    </footer>
  )
}
