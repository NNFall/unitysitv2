# UNITY visual QA and intentional deviations

Дата: 2026-08-22

The landing follows the supplied six-screen direction: warm paper texture, petrol/navy panels, orange accent, condensed serif display type, ticket-edge cuts, long horizontal ribbons, large editorial photography, and a single continuous scroll.

## Deliberate improvements or constraints

- **Real venue photography instead of synthetic reference interiors.** The reference screens use illustrative/generated-looking interiors. The implementation uses visually checked public Yandex gallery photos from the real venue. The hero uses the billiards frame (`unity-yandex-05.jpg`) because it keeps the reference's wide, warm, social interior composition while making the venue recognisable and truthful. Source URLs and reuse caveat are recorded in `docs/asset-provenance.md`.
- **Map panel is a lightweight illustrated route card.** It preserves the reference's map-and-pin composition and links to the verified Yandex Maps organisation page, without embedding a dynamic third-party map or claiming live route data.
- **No invented dynamic prices, ratings, follower counts, or event dates.** Those values were not stable/verified in the public sources, so the UI uses editorial format copy and clearly marked concept event cards instead of presenting fabricated facts.
- **VK mark is rendered as a compact `VK` lettermark.** The icon library did not provide the official VK glyph; the lettermark keeps the reference's circular social affordance without impersonating an unrelated icon. The second social shortcut is intentionally omitted until an official Unity Telegram URL is verified.
- **Mobile is intentionally single-column.** The desktop proportions collapse into a readable 390px layout; event tickets become a horizontal snap rail, while all controls remain at least 44px tall.

These are the only material deviations recorded after browser checks; spacing, anchors, typography hierarchy, colors, motion, and section order were tuned against the supplied references at 1920×1080 and 390×844.
