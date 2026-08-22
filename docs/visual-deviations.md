# UNITY visual QA and intentional deviations

Дата: 2026-08-22

The landing follows the supplied six-screen direction: warm paper texture, petrol/navy panels, orange accent, condensed serif display type, ticket-edge cuts, long horizontal ribbons, large editorial photography, and a single continuous scroll.

## Deliberate improvements or constraints

- **Real venue photography instead of synthetic reference interiors.** The reference screens use illustrative/generated-looking interiors. The implementation uses visually checked public Yandex gallery photos from the real venue. The hero uses the billiards frame (`unity-yandex-05.jpg`) because it keeps the reference's wide, warm, social interior composition while making the venue recognisable and truthful. Source URLs and reuse caveat are recorded in `docs/asset-provenance.md`.
- **Map panel is a lightweight illustrated route card.** It preserves the reference's map-and-pin composition and links to the verified Yandex Maps organisation page, without embedding a dynamic third-party map or claiming live route data.
- **No invented dynamic prices, ratings, follower counts, or event dates.** Those values were not stable/verified in the public sources, so the UI uses editorial format copy and clearly marked concept event cards instead of presenting fabricated facts.
- **VK mark is rendered as a compact `VK` lettermark.** The icon library did not provide the official VK glyph; the lettermark keeps the reference's circular social affordance without impersonating an unrelated icon. The second social shortcut is intentionally omitted until an official Unity Telegram URL is verified.
- **Mobile is intentionally single-column.** The desktop proportions collapse into a readable 390px layout; event tickets become a horizontal snap rail, while all controls remain at least 44px tall.
- **Second-iteration editorial image variants.** Four new AI-assisted images break up repeated Yandex frames across formats/events/community. They are deliberately labelled in the asset manifest and do not replace the documentary hero/facade anchors.
- **Compact desktop formats.** The format grid is tightened so PlayStation, billiards, cinema and board games read together in one desktop rhythm; the extra compactness is intentional against the original reference's taller card proportions.
- **Booking has two paths.** The local form remains a demo, while verified VK is shown as the real contact path until a backend endpoint is authorized.
- **Reviews/events now expose behavior.** Visible labels, author/date metadata, pause controls and autoplay hints make the carousels discoverable; reduced-motion disables autoplay.

The measured comparison is recorded in [visual-comparison-2026-08-22.md](visual-comparison-2026-08-22.md). These are the only material deviations recorded after fresh browser checks; spacing, anchors, typography hierarchy, colors, motion, and section order were tuned against the supplied references at 1672×941, 390×844 and 320×844 (the requested 1920×1080 layout is the same desktop CSS regime).
