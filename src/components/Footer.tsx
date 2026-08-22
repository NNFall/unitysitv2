import { ArrowUpRight, MapPin } from '@phosphor-icons/react'
import { Logo } from './Logo'
import type { SiteContent } from '../data/siteContent'

export function Footer({ content }: { content: SiteContent }) {
  return (
    <footer className="site-footer">
      <div className="site-footer__top"><Logo compact /><p>{content.footer.line}<br /><span>{content.footer.note}</span></p><a href="#top" className="back-top">Наверх <ArrowUpRight aria-hidden="true" /></a></div>
      <div className="site-footer__bottom"><span><MapPin aria-hidden="true" /> {content.contact.fullAddress.value}</span><a href={content.social.vk.href} target="_blank" rel="noreferrer"><span className="social-lettermark" aria-hidden="true">VK</span> ВКонтакте</a><span>© UNITY, Самара</span></div>
    </footer>
  )
}
