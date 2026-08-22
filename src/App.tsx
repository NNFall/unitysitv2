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

const assetRoot = `${import.meta.env.BASE_URL}assets`

export const assetPath = (key: string) => ({
  hero: `${assetRoot}/venue/unity-yandex-05.jpg`,
  entrance: `${assetRoot}/editorial/unity-ai-entrance-v2.png`,
  'community-hero': `${assetRoot}/venue/unity-yandex-03.jpg`,
  'community-lounge': `${assetRoot}/editorial/unity-ai-community-group-v2.png`,
  'community-screen': `${assetRoot}/venue/unity-yandex-08.jpg`,
  playstation: `${assetRoot}/editorial/unity-ai-gaming-v2.png`,
  billiards: `${assetRoot}/editorial/unity-ai-billiards-v2.png`,
  cinema: `${assetRoot}/editorial/unity-ai-cinema-v2.png`,
  'board-games': `${assetRoot}/editorial/unity-ai-board-games-v2.png`,
  'event-game-night': `${assetRoot}/editorial/unity-ai-event-gaming-v2.png`,
  'event-movie-night': `${assetRoot}/editorial/unity-ai-event-movie-v2.png`,
  'event-board-game': `${assetRoot}/editorial/unity-ai-event-board-v2.png`,
}[key] ?? `${assetRoot}/venue/unity-yandex-01.jpg`)

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
