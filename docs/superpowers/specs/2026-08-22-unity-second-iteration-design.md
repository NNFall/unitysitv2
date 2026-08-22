# UNITY Second Iteration Design

**Date:** 2026-08-22

## Goal

Refine the UNITY landing without abandoning the approved first-iteration visual language: warm paper, petrol/navy contrast, orange accents, editorial serif typography, ticket-edge panels, and a continuous responsive scroll. The second iteration addresses the desktop review: compact formats, non-repeating imagery, stronger booking alternatives, clearer reviews/events, and a truthful deployment at `/site/unity`.

## Design decisions

### 1. Formats

Desktop keeps four formats visible in one viewport-width grid. Each card receives a unique visual treatment and compact metadata row; copy is capped so the titles do not wrap into awkward isolated lines. At mobile widths the grid becomes a readable single column and preserves the large editorial imagery.

### 2. Image system

Documentary Yandex photos remain identifiable venue evidence. New generated images are derived from supplied venue frames or are explicitly editorial atmosphere scenes; they are stored with provenance labels and never described as documentary photos. The entrance/address image will be reframed or enhanced so the UNITY sign is readable while preserving the real facade context.

### 3. Booking and social conversion

Every major booking CTA has two clear paths: the local form and a verified VK action. VK links use the official `vk.ru/unitysmr` source and open in a new tab. The local form remains a demo until a real endpoint is authorized; copy will not imply that a request has reached staff.

### 4. Reviews and events

Reviews gain a clear `Отзывы гостей` label, prominent author/date metadata, accessible controls, pause/resume affordance, and timed autoplay. Events gain the same discoverability pattern: an explicit carousel label, visible next/previous controls, a pause state, and a short “листайте сценарии” hint. Autoplay is disabled when `prefers-reduced-motion` is active and pauses on hover/focus.

### 5. Map

The existing illustrated map remains the truthful fallback. A dynamic Yandex embed is added only if the public map URL and server response allow it without exposing a private API key or introducing an iframe policy failure. Otherwise the page keeps the illustrated route card and direct Yandex link.

### 6. Verification and deployment

The iteration is verified with focused Vitest tests, production build, dependency audit, fresh Browser checks at 1920×1080, 390×844, and 320px, plus a visual comparison log. The build is deployed to `/root/unitysite` on `5.129.236.90:22` and checked at `https://kaigo.space/site/unity`. Credentials are used interactively only and never written to files or logs.

## Intentional deviations to record

- Generated imagery will be labelled as editorial/AI-assisted and will not replace all documentary venue photos.
- The local booking form remains a UX demo until a backend destination is supplied.
- A live map is optional and must not displace a working Yandex link/fallback.
- Desktop compactness may make format cards shorter than the original reference; this is an explicit improvement for the user's “one screen” requirement.
