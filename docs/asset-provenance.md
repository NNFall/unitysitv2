# UNITY asset provenance

Дата проверки: 2026-08-26

## Real venue photography

The following files were downloaded from the public Unity gallery on Yandex Maps and visually checked before use. They are kept as documentary venue photography, not generated imagery. Public availability is recorded, but commercial reuse rights should still be confirmed with the venue before production publication.

Gallery source: `https://yandex.ru/maps/org/unity/223835723975/gallery/`

| Local file | Source asset | Intended role | Visual note |
| --- | --- | --- | --- |
| `public/assets/venue/unity-yandex-01.jpg` | `https://avatars.mds.yandex.net/get-altay/4012790/2a00000181ec11a7f54c4771019f05fac60e/XXL_height` | Contacts exterior | Daytime facade with UNITY sign and Гагарина 118 marker. |
| `public/assets/venue/unity-yandex-02.jpg` | `https://avatars.mds.yandex.net/get-altay/7370029/2a00000182fd3980dda1dc92e8473bec9deb/XXL_height` | Hero alternate / atmosphere | Night facade with orange UNITY sign. |
| `public/assets/venue/unity-yandex-03.jpg` | `https://avatars.mds.yandex.net/get-altay/2390040/2a00000176ed9266b972f5d209f1eab3ffd7/XXL_height` | Formats / gaming | Real seating, console screen and hookah room. |
| `public/assets/venue/unity-yandex-04.jpg` | `https://avatars.mds.yandex.net/get-altay/17043127/2a00000198fc5c62c4e919a1d63f6e2c88d7/XXL_height` | Contacts exterior | Wide daytime facade and parking context. |
| `public/assets/venue/unity-yandex-05.jpg` | `https://avatars.mds.yandex.net/get-altay/3915926/2a0000017579d75bd79c1c197f523da3528d/XXL_height` | Billiards format source | Real billiards table and players; retained as a documentary source for the edited billiards card, while the third-iteration hero uses a separate editorial composition. |
| `public/assets/venue/unity-yandex-06.jpg` | `https://avatars.mds.yandex.net/get-altay/17637863/2a0000019d86cb75efcca4cd7e7e658bfc0e/XXL_height` | Community / seating | Real lounge seating. |
| `public/assets/venue/unity-yandex-07.jpg` | `https://avatars.mds.yandex.net/get-altay/11124269/2a00000191f110a66e9736b08631bd1f8487/XXL_height` | Contacts detail | Entrance detail with orange masonry. |
| `public/assets/venue/unity-yandex-08.jpg` | `https://avatars.mds.yandex.net/get-altay/11937221/2a00000190bc3717bafbc3e4537e7cc788a5/XXL_height` | Formats / cinema | Real projection room. |

## Generated decoration

`public/assets/paper-texture.png` is the generated master from the built-in Image Generation Skill; the live CSS uses its 640px compressed derivative `public/assets/paper-texture.webp` as a subtle cream paper surface. It contains no venue-specific people, signage or claims and is used only as a background texture. It must not be presented as a real venue photograph.

## AI-assisted editorial variants (second iteration)

These files are intentionally labelled as editorial/AI-assisted imagery. They add visual variety to the hero, format, events and community cards; they are not documentary proof of a particular room, person or event. The generated hero carries a visible editorial label. Real Yandex photos remain in the community mosaic and the live address/entrance position.

Runtime delivery uses quality-88 WebP derivatives with matching base names. The PNG files listed below remain the lossless editorial masters; changing the delivery format does not change their provenance or documentary status.

## AI-assisted editorial hero (third iteration)

`public/assets/editorial/unity-ai-hero-billiards-v3.png` is a new photorealistic editorial composition generated for the first screen. The billiards table intentionally dominates the foreground while PlayStation, cinema and board-game activity reads in the background. It contains no readable venue signage or brand claims and must be labelled AI-assisted, not documentary.

| Local file | Input / prompt basis | Intended role | Safeguards |
| --- | --- | --- | --- |
| `public/assets/editorial/unity-ai-gaming-v2.png` | Neutral gaming-night brief | PlayStation format and gaming event | No readable game UI, logo, venue name or recognizable character. |
| `public/assets/editorial/unity-ai-billiards-v2.png` | Edited from `unity-yandex-05.jpg` | Billiards format | Table geometry and mood retained; label as AI-assisted, not documentary. |
| `public/assets/editorial/unity-ai-cinema-v2.png` | Edited from `unity-yandex-08.jpg` | Cinema format and movie event | Screen is abstract light only; no lyrics, performers, logos or readable text. |
| `public/assets/editorial/unity-ai-board-games-v2.png` | Warm board-game scene brief | Board-games format and community lounge | No brand/game names or readable card text. |
| `public/assets/editorial/unity-ai-event-gaming-v2.png` | Group gaming-night brief | Gaming-night event | Abstract screen only; no game IP, logo or readable text. |
| `public/assets/editorial/unity-ai-event-movie-v2.png` | Movie-night brief | Movie-night event | Abstract projection only; no film IP, logo or readable text. |
| `public/assets/editorial/unity-ai-event-board-v2.png` | Social board-game brief | Board-game event | Generic pieces and cards; no brand or readable game text. |
| `public/assets/editorial/unity-ai-community-group-v2.png` | Relaxed lounge-community brief | Community mosaic | Editorial atmosphere, not a claim about a specific photographed visit. |
| `public/assets/editorial/unity-ai-entrance-v2.png` | Edited from `unity-yandex-01.jpg` | Retained editorial entrance alternative; not used by the live address block | Preserves the UNITY sign and Гагарина 118 marker; marked AI-assisted rather than documentary. |

## No background removal used

No supplied asset benefited from a foreground cutout: the reference composition relies on full-bleed venue photographs, so `remove-background-local` was evaluated but not applied. This is intentional and recorded here instead of creating an artificial cutout.
