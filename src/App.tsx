import { useMemo } from 'react'
import { SiteHeader } from './components/SiteHeader'
import { HeroSection } from './components/HeroSection'
import { EventsSection } from './components/EventsSection'
import { FormatsSection } from './components/FormatsSection'
import { CommunitySection } from './components/CommunitySection'
import { BookingSection } from './components/BookingSection'
import { Footer } from './components/Footer'
import { siteContent } from './data/siteContent'
import './styles/tokens.css'
import './styles/global.css'

export const assetPath = (key: string) => ({
  hero: '/assets/venue/unity-yandex-05.jpg',
  entrance: '/assets/venue/unity-yandex-01.jpg',
  'community-hero': '/assets/venue/unity-yandex-03.jpg',
  'community-lounge': '/assets/venue/unity-yandex-05.jpg',
  'community-screen': '/assets/venue/unity-yandex-08.jpg',
  playstation: '/assets/venue/unity-yandex-03.jpg',
  billiards: '/assets/venue/unity-yandex-05.jpg',
  cinema: '/assets/venue/unity-yandex-08.jpg',
  'board-games': '/assets/venue/unity-yandex-03.jpg',
  'event-game-night': '/assets/venue/unity-yandex-03.jpg',
  'event-movie-night': '/assets/venue/unity-yandex-08.jpg',
  'event-board-game': '/assets/venue/unity-yandex-05.jpg',
}[key] ?? '/assets/venue/unity-yandex-01.jpg')

function App() {
  const content = useMemo(() => siteContent, [])

  return (
    <div className="site-shell">
      <div className="grain" aria-hidden="true" />
      <SiteHeader navigation={content.navigation} vkHref={content.social.vk.href} />
      <main>
        <HeroSection content={content.hero} assetPath={assetPath} />
        <FormatsSection content={content} assetPath={assetPath} />
        <EventsSection content={content} assetPath={assetPath} />
        <CommunitySection content={content} assetPath={assetPath} />
        <BookingSection content={content} assetPath={assetPath} />
      </main>
      <Footer content={content} />
    </div>
  )
}

export default App
