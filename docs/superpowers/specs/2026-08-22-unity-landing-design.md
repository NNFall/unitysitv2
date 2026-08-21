# UNITY landing design specification

Дата: 2026-08-22

## Решение

UNITY получает один длинный лендинг с естественным вертикальным потоком. Шесть референсов не превращаются в шесть отдельных страниц: каждый референс становится сценой внутри единого маршрута, а границы между сценами задаются сменой материала, билетными срезами и широкими информационными лентами. На desktop сцены должны собираться в композиции, читаемые при viewport 1920x1080; на mobile композиция перестраивается в одну колонку с сохранением ритма, контраста и иерархии.

Критерий визуального соответствия: воспроизвести референсы один в один до мелких деталей, а не просто взять их настроение. Допустимое улучшение фиксируется в `docs/visual-deviations.md` с полями `reference`, `implementation`, `reason`, `evidence`.

## Источники и происхождение данных

Входные источники:

- GitHub: `https://github.com/NNFall/unitysitv2`
- VK: `https://vk.ru/unitysmr`
- Яндекс Карты: `https://yandex.ru/maps/51/samara/?ll=50.218803%2C53.203706&mode=poi&poi%5Bpoint%5D=50.218693%2C53.203295&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D223835723975&tab=gallery&z=17`
- Короткая ссылка Яндекс Карт: `https://yandex.ru/maps/-/CTs~bMp~`
- Референс 1: `C:\Users\User\Downloads\ChatGPT Image 21 авг. 2026 г., 23_31_51 (1).png`
- Референс 2: `C:\Users\User\Downloads\ChatGPT Image 21 авг. 2026 г., 23_31_52 (4).png`
- Референс 3: `C:\Users\User\Downloads\ChatGPT Image 21 авг. 2026 г., 23_40_59 (3).png`
- Референс 4: `C:\Users\User\Downloads\ChatGPT Image 21 авг. 2026 г., 23_40_58 (2).png`
- Референс 5: `C:\Users\User\Downloads\ChatGPT Image 21 авг. 2026 г., 23_40_59 (4).png`
- Референс 6: `C:\Users\User\Downloads\ChatGPT Image 21 авг. 2026 г., 23_40_58 (1).png`

Реальные кадры кафе разрешено включать только после визуальной проверки происхождения в VK/Яндекс. Синтетические кадры и сгенерированные декоративные ассеты хранятся отдельно и не маркируются как документальные фотографии. В коде не будет API-ключей или приватных токенов.

На этапе источниковой проверки подтверждены: Самара, улица Гагарина, 118; ближайшее метро «Советская»; телефон `+7 (987) 950-00-18`; расписание по дням недели из карточки Яндекс Карт; карточка организации `org id 223835723975`. Прямые photo assets Яндекса и их происхождение фиксируются в `docs/asset-provenance.md`; динамические рейтинг и счётчики не зашиваются без свежей проверки. VK shell не отдал в read-only режиме структурированный текст, поэтому неподтверждённые VK-факты не выдаются за официальные.

## Визуальная система

- Фон: тёплый бумажный `#F2E8D8` с лёгким фиксированным grain-слоем, который не участвует в прокрутке.
- Основной текст и тёмные ленты: petrol/navy `#10283D`.
- Акцент: приглушённый UNITY orange `#C95116`, один акцентный цвет.
- Нейтраль: тёплый parchment `#F8F0E4`, тонкие линии `#C8B9A6`.
- Display type: выразительный serif для редакционного характера; UI/body: геометрический sans без Inter.
- Края: CSS ticket-cut через маску/псевдоэлементы, а не одинаковые большие скругления.
- Иконки: единый stroke 1.5-2px, без emoji.
- Motion: opacity/transform-only, staggered reveal, slider crossfade/slide, мягкие spring-like CSS easing; `prefers-reduced-motion` отключает автоматические циклы и оставляет ручные действия.

### Измеренные ориентиры референсов

Все шесть PNG имеют размер 1672x941 и aspect ratio 16:9. Внутреннее поле контента составляет примерно 2.5-3.3% ширины, базовый шаг сетки 20-24px, desktop H1 68-84px с плотным line-height 0.92-1.05, labels/nav 13-16px uppercase. Ticket выемки имеют диаметр около 10-14px с шагом 18-22px. Эти величины нормализуются к целевому viewport 1920x1080, а не копируются как фиксированные пиксели.

Ключевые координатные якоря исходника: hero photo x=567,y=124,w=1049,h=588; hero benefits band x=54,y=745,w=1563,h=145; formats cards x≈49/444/846/1245,y≈380,w=374-380,h≈403; contacts map x≈566,y=113,w≈523,h≈547 и booking panel x≈1113,y=109,w≈511,h≈387. Два event-референса считаются альтернативными состояниями одной секции и реализуются через slider, а не выбрасываются.

## Состав лендинга

1. **Sticky navigation**: логотип UNITY, пункты «Что внутри», «Мероприятия», «Цены и условия», «Бронирование», «Контакты», VK/Telegram, оранжевый CTA.
2. **Hero**: слева eyebrow, крупный serif-заголовок с оранжевым словом, описание и две CTA; справа frameless photo collage/hero кадр; внизу navy информационная лента с адресом, метро, условиями и оплатой времени.
3. **Events**: editorial intro слева, featured event с крупным фото и метаданными, два компактных event tickets; ручное перелистывание featured item.
4. **Formats**: заголовок и четыре формата отдыха в неодинаковой сетке: PS5/игровая зона, бильярд, кинозал, настольные игры/комнаты. Карточки используют реальный media-first layout, не шаблонные одинаковые boxes.
5. **Atmosphere/community**: крупный кадр пространства, две вертикальные фотографии, отзывы, VK community panel, статистические facts только если подтверждены источником.
6. **Booking/contact**: адрес, путь от метро, часы и контакты из verified source; карта/ссылка на Яндекс без попытки подменить официальный embed; booking form with visible labels, inline validation, success and error states.
7. **Footer**: повтор CTA, social links, legal/accessibility notes.

## Component boundaries

- `src/data/siteContent.ts`: typed content and provenance labels.
- `src/components/Logo.tsx`, `Button.tsx`, `TicketEdge.tsx`, `SectionIntro.tsx`, `InfoRibbon.tsx`: small stable primitives.
- `src/components/SiteHeader.tsx`: sticky desktop/mobile navigation and menu state.
- `src/components/HeroSection.tsx`, `EventsSection.tsx`, `FormatsSection.tsx`, `CommunitySection.tsx`, `BookingSection.tsx`, `Footer.tsx`: scene-level layout.
- `src/components/motion/Reveal.tsx`, `Carousel.tsx`: isolated client-side interaction leaves.
- `src/styles/tokens.css`, `src/styles/global.css`: tokens, texture, responsive rules and reduced-motion rules.

## Interaction and accessibility

- Anchor navigation uses semantic landmarks and visible focus states.
- Mobile menu is keyboard reachable, closes on Escape and does not trap scrolling after close.
- Carousel has previous/next buttons, current slide label and no autoplay under reduced motion.
- Booking inputs have labels, `aria-describedby`, deterministic validation and non-blocking error messages.
- All photos have descriptive Russian alt text; decorative grain has empty alt/pointer-events none.
- Touch targets are at least 44px; no hover-only content is required.

## Verification gates

- `npm test` covers content shape, navigation anchors, carousel controls, form validation and reduced-motion behavior.
- `npm run build` must finish with exit code 0.
- Local server uses fixed port `4173`; final response includes `http://localhost:4173`.
- In-app Browser captures/inspects desktop 1920x1080 and mobile 390x844 (or equivalent) states, including top fold, events, formats and booking.
- Visual comparison checks: header proportions, hero split, navy ribbons, typography hierarchy, ticket edge geometry, image crop, section rhythm, overflow and mobile single-column behavior.
- Independent subagents and Antigravity review the result; their evidence is checked against the actual diff and runtime.

## Known uncertainty

The public source pages may expose different amounts of data depending on access. Unverified facts stay marked as such in content metadata until independently confirmed. The first implementation may use the provided reference copy for visual scaffolding, then replace claims with verified content before publish.
