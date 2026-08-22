# UNITY visual comparison — second iteration

Дата проверки: 2026-08-22  
Метод: встроенный Browser, свежая загрузка локального production-like dev server, CSS viewport `1672×941` (размеры предоставленных PNG-референсов), затем отдельные проверки `390×844` и `320×844`.

## Reference set

The supplied screens were compared visually and by section geometry:

- `C:\Users\User\Downloads\ChatGPT Image 21 авг. 2026 г., 23_31_51 (1).png` — hero/header
- `C:\Users\User\Downloads\ChatGPT Image 21 авг. 2026 г., 23_31_52 (4).png` — events
- `C:\Users\User\Downloads\ChatGPT Image 21 авг. 2026 г., 23_40_59 (3).png` — formats
- `C:\Users\User\Downloads\ChatGPT Image 21 авг. 2026 г., 23_40_58 (2).png` — booking/map
- `C:\Users\User\Downloads\ChatGPT Image 21 авг. 2026 г., 23_40_59 (4).png` — community/reviews
- `C:\Users\User\Downloads\ChatGPT Image 21 авг. 2026 г., 23_40_58 (1).png` — footer/closing rhythm

The current page was also inspected as a fresh Browser screenshot at the same CSS viewport. The Browser surface may cap the emitted bitmap near 1691 physical pixels; geometry below comes from the page's CSS viewport and is not affected by that display cap.

## Geometry and visual result

| Area | Reference intent | Current measured result | Decision |
| --- | --- | --- | --- |
| Header + hero | Large UNITY mark, airy nav, three-line serif headline, wide billiards frame | Hero media `x=567.3, y=125.8, w=1039.5, h=584.7`; title is explicitly split into `Ваше место / для отдыха, / общения и игр`; ribbon `h=128` | Kept the reference hierarchy and spacing; used a real Yandex billiards frame so the venue remains recognizable. |
| Formats | Two-line serif heading and four equal cards visible in one desktop rhythm | Grid `x=50.2, w=1556.7`; four cards `w=368.8, h=404.9`, media `225px`, body `175px` | Tightened the section so PlayStation, billiards, cinema and board games no longer create the awkward desktop wrap. |
| Events | Navy feature card, two-line title, visible tickets and carousel affordance | Feature `x=474.6, y=1875.8, w=1132.3, h=418`; hint, dots, arrows, pause/resume and concept/date status are visible | Preserved the reference composition and added discoverable motion controls; event media is unique AI-assisted editorial imagery. |
| Community/reviews | Large mosaic with clear review panel and repeated-returning headline | Mosaic `x=692.9, w=913.9, h=535`; review author/date and source attribution are visible, with autoplay/pause | Matched the reference scale while removing unverified star ratings and making the review carousel explicit. |
| Booking | Three balanced columns, route/map, address photo, strong CTA | Production layout uses equal booking columns, an illustrated route card linking to the verified Yandex organisation page, readable UNITY entrance sign, local demo form and VK alternative | Kept the map honest without claiming a live embed; VK is the real booking path until a backend is connected. |

## Responsive checks

| Viewport | Result |
| --- | --- |
| `390×844` | `scrollWidth=375`, no unexpected right-edge elements, all images loaded, no console errors; four format cards are single-column (`343px` each), event autoplay control is a full-width 44px row. |
| `320×844` | `scrollWidth=320`, no unexpected right-edge elements, all images loaded, no console errors; format cards are single-column (`288px` each), event autoplay control remains 44px high. |
| Desktop fresh reload | `scrollWidth=1657` for a `1672px` CSS viewport, no console errors, all images loaded. |

## Deliberate differences

The comparison keeps the reference art direction one-to-one where the supplied screens define layout, type hierarchy, color, crop and interaction. Differences are intentional and documented in [visual-deviations.md](visual-deviations.md): real venue photography remains documentary where it matters, AI-assisted editorial variants remove repeated frames, the map is a truthful Yandex-linked fallback, the form is explicitly a local demo, and all concept events are labelled as such.
