# UNITY visual comparison — third iteration

Дата проверки: 2026-08-22  
Метод: свежая загрузка локального production-like dev server во встроенном Browser, затем проверка публичных интеракций и mobile viewport.

## Reference set

The comparison uses the six supplied reference screens:

- `C:\Users\User\Downloads\ChatGPT Image 21 авг. 2026 г., 23_31_51 (1).png` — hero/header
- `C:\Users\User\Downloads\ChatGPT Image 21 авг. 2026 г., 23_31_52 (4).png` — events
- `C:\Users\User\Downloads\ChatGPT Image 21 авг. 2026 г., 23_40_59 (3).png` — formats
- `C:\Users\User\Downloads\ChatGPT Image 21 авг. 2026 г., 23_40_58 (2).png` — booking/map
- `C:\Users\User\Downloads\ChatGPT Image 21 авг. 2026 г., 23_40_59 (4).png` — community/reviews
- `C:\Users\User\Downloads\ChatGPT Image 21 авг. 2026 г., 23_40_58 (1).png` — footer/closing rhythm

## Current result

| Area | Reference intent | Third-iteration result | Decision |
| --- | --- | --- | --- |
| Header + hero | Large UNITY mark, airy navigation, three-line serif headline, wide warm billiards frame | New editorial hero puts a billiards table and cue ball in the foreground while showing gaming, cinema and board-game zones in one frame. Info ribbon now carries address, metro walk time, formats and late-hours detail. | Kept the supplied hierarchy and crop language; changed only the image provenance to a clearly labelled editorial hero so the requested billiards focus is legible. |
| Formats | Four equal format cards held in one desktop rhythm | At the desktop CSS regime, the grid is `repeat(4, minmax(0, 1fr))`; media is capped at roughly `225px` and card bodies at `175px`, so “Форматы отдыха” and all four cards read together. | Matches the reference rhythm and removes the unwanted title/card wrap. |
| Events + reviews | Navy feature, ticket previews, readable carousel/review affordance | Events expose concept/date status, hint text, arrows, dots and pause control; reviews expose author/date/source attribution and the same reduced-motion-aware autoplay pattern. | Motion is slower and discoverable; editorial concepts remain labelled instead of being presented as a confirmed calendar. |
| Booking + map | Three-column contact/route/form composition with a map panel | Booking keeps balanced columns, a real lazy Yandex iframe, direct organisation link, illustrated fallback, readable UNITY entrance frame, local-demo disclaimer and prominent VK alternative. | Progressive embed improves utility while preserving a no-network fallback and truthful booking path. |
| FAQ + footer | Closing information block and compact footer | FAQ expanded to seven practical questions. Footer now groups address, phone, hours, VK CTA, map link, return-to-top and copyright in a responsive three-column-to-single-column layout. | Adds the requested utility without changing the warm paper/navy/orange visual system. |

## Browser evidence

| Viewport | Result |
| --- | --- |
| Desktop CSS `1920×1080` | Browser surface reports `clientWidth=1905`, `scrollWidth=1905`, `scrollHeight≈5739`; hero asset resolves to `/assets/editorial/unity-ai-hero-billiards-v3.png`; Yandex iframe resolves to the verified `map-widget/v1` URL. |
| Reference-sized desktop `1672×941` | Same desktop CSS regime; formats remain a four-card row and the emitted screenshot may be capped near 1691 physical pixels by the in-app surface, not by page overflow. |
| Mobile CSS `390×844` | Browser reports `clientWidth=375`, `scrollWidth=375`, no horizontal overflow; hero image begins around `y≈713` after the mobile spacing pass, map iframe is `330px` high, FAQ count is `7`. |
| Interaction checks | Mobile menu opens and closes on Escape; event carousel advances automatically after about `5.6s`; reduced-motion support and pause controls remain in place. |

## Deliberate differences

The design remains one continuous landing page and follows the supplied screens in palette, serif/sans hierarchy, ticket-edge cards, generous whitespace, navy panels and orange accents. The only material third-iteration differences are intentional improvements: a billiards-forward editorial hero, a progressive Yandex map, clearer VK booking, expanded FAQ/footer, and slower lazy reveals. All generated imagery is marked AI-assisted in `public/assets/manifest.json` and `docs/asset-provenance.md`.
