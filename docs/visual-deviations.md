# UNITY visual QA and intentional deviations

Дата: 2026-08-22

The landing follows the supplied six-screen direction: warm paper texture, petrol/navy panels, orange accent, condensed serif display type, ticket-edge cuts, long horizontal ribbons, large editorial photography, and a single continuous scroll.

## Deliberate improvements or constraints

- **Hero is now a dedicated billiards-forward editorial composition.** The third iteration uses `unity-ai-hero-billiards-v3.png`: the table dominates the foreground while PlayStation, cinema and board-game zones read behind it. The image is explicitly labelled AI-assisted and is not presented as a documentary venue frame. Public Yandex photos remain in the entrance and community anchors.
- **Map panel uses a progressive Yandex widget.** The live `map-widget/v1` iframe is lazy-loaded with an accessible title, a direct organisation link is always visible, and the original illustrated route card remains available in an expandable fallback when an embed is unavailable.
- **No invented dynamic prices, ratings, follower counts, or event dates.** Those values were not stable/verified in the public sources, so the UI uses editorial format copy and clearly marked concept event cards instead of presenting fabricated facts.
- **VK mark is rendered as a compact `VK` lettermark.** The icon library did not provide the official VK glyph; the lettermark keeps the reference's circular social affordance without impersonating an unrelated icon. The second social shortcut is intentionally omitted until an official Unity Telegram URL is verified.
- **Mobile is intentionally single-column.** The desktop proportions collapse into a readable 390px layout; event tickets become a horizontal snap rail, while all controls remain at least 44px tall.
- **Editorial image variants avoid repeated frames.** AI-assisted images break up repeated Yandex frames across formats/events/community; the new hero is tracked separately in the asset manifest and provenance note.
- **Compact desktop formats.** The format grid is tightened so PlayStation, billiards, cinema and board games read together in one desktop rhythm; the extra compactness is intentional against the original reference's taller card proportions.
- **Booking has two paths.** The local form remains a demo, while verified VK is shown as the real contact path until a backend endpoint is authorized.
- **Reviews/events now expose behavior.** Visible labels, author/date metadata, pause controls and autoplay hints make the carousels discoverable; reduced-motion disables autoplay.

The measured comparison is recorded in [visual-comparison-2026-08-22-third-iteration.md](visual-comparison-2026-08-22-third-iteration.md). These are the only material deviations recorded after fresh browser checks; spacing, anchors, typography hierarchy, colors, motion, and section order were tuned against the supplied references at 1672×941, 1920×1080, 390×844 and 320×844.
