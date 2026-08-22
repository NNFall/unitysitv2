# UNITY third iteration implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the UNITY landing hero, information ribbon, booking/map surface, FAQ/footer content and reveal motion while preserving the approved reference-matched art direction and production route.

**Architecture:** Keep the existing React/Vite single-page composition and provenance-first content model. Add one new editorial hero asset, a progressive-enhancement Yandex iframe widget with a truthful fallback, and shared motion tokens/classes rather than section-specific animation hacks. All changes remain responsive at desktop 1920×1080, 390px and 320px.

**Tech Stack:** React 19, TypeScript, Vite, Vitest/Testing Library, Framer Motion, CSS custom properties, built-in Image Generation Skill, in-app Browser.

---

### Task 1: Generate and wire the new hero image

**Files:**
- Create: `public/assets/editorial/unity-ai-hero-billiards-v3.png`
- Modify: `src/App.tsx`, `src/components/HeroSection.tsx`, `src/styles/tokens.css`, `docs/asset-provenance.md`, `public/assets/manifest.json`
- Test: `src/data/siteContent.test.ts`

- [x] **Step 1: Generate a wide hero image**

Use the built-in Image Generation Skill with this prompt: photorealistic cinematic 16:9 interior of a warm Russian time-cafe, a billiards table and cue ball dominating the foreground as if the table reaches into the frame, shallow depth of field, background visibly includes a PlayStation lounge, a small cinema projection glow and friends around a table, warm tungsten lights, navy and orange accents, realistic materials, no readable text, no logos, no watermark, no recognizable game or movie IP, no distorted hands or billiard geometry.

- [x] **Step 2: Inspect and copy the selected output**

Inspect the generated result visually. Copy the selected output from `$CODEX_HOME/generated_images/...` into `public/assets/editorial/unity-ai-hero-billiards-v3.png`; do not overwrite the previous documentary hero.

- [x] **Step 3: Add provenance and an asset uniqueness assertion**

Register the image as `AI-assisted`, `verified: false`, with the prompt basis and the requirement that the hero is editorial rather than documentary. Update the manifest and assert that the hero asset key is distinct from every format/event asset key.

- [x] **Step 4: Wire the hero and tune its crop**

Point `assetPath('hero')` at the new editorial image, change the alt text to describe the editorial composite honestly, and tune `object-position` so the table fills the lower foreground while the background activity remains legible at desktop and mobile.

- [x] **Step 5: Run focused tests**

Run `npm run test:run -- src/data/siteContent.test.ts`; expect all content/provenance tests to pass.

### Task 2: Enrich the hero information ribbon and booking language

**Files:**
- Modify: `src/components/HeroSection.tsx`, `src/components/InfoRibbon.tsx`, `src/data/siteContent.ts`, `src/styles/global.css`, `src/styles/tokens.css`
- Test: `src/App.test.tsx`, `src/components/BookingSection.test.tsx`

- [x] **Step 1: Define concise factual ribbon details**

Use the existing sourced address, metro, format and hours values to render a title, a stronger detail line and a small category label for each ribbon item. Do not invent a rating, price or schedule beyond the existing provenance-backed content.

- [x] **Step 2: Add a small information hierarchy to `InfoRibbon`**

Render each item as icon, label, title and detail, keeping the four-column desktop rhythm and the two-column/one-column mobile fallbacks. Preserve `role="region"` and readable text for screen readers.

- [x] **Step 3: Make VK the obvious alternative booking action**

Style booking VK links with the VK blue role (`#0077ff`) and a larger readable label while retaining a contrasting treatment inside navy cards. Keep the demo-form disclaimer visible beside the real VK path.

- [x] **Step 4: Add tests for visible labels and links**

Assert that the hero includes the enriched address/metro/hours details and the booking surface exposes a VK link with the verified `https://vk.ru/unitysmr` target.

### Task 3: Add a progressive Yandex Maps widget with fallback

**Files:**
- Create: `src/components/YandexMapEmbed.tsx`
- Modify: `src/components/BookingSection.tsx`, `src/data/siteContent.ts`, `src/styles/global.css`, `docs/visual-deviations.md`, `docs/deployment-2026-08-22.md`
- Test: `src/components/BookingSection.test.tsx`

- [x] **Step 1: Add a sourced embed configuration**

Extend contact content with the approved Yandex widget URL when available, keeping `mapUrl` as the direct organisation link and the existing illustrated card as fallback content. Do not add an API key or claim live data without a verified embed URL.

- [x] **Step 2: Implement the lazy iframe component**

Render an iframe only when the embed URL is present, with `loading="lazy"`, a descriptive title, `referrerPolicy="no-referrer-when-downgrade"`, and a visible link to Yandex Maps. If the URL is absent or blocked, render the existing illustrated map without a broken frame.

- [x] **Step 3: Place the widget without breaking the reference geometry**

Keep the map/photo/route stack balanced on desktop and single-column on mobile. Use a restrained border/radius treatment so the live widget still belongs to the paper/navy/ticket system.

- [x] **Step 4: Test both configured and fallback states**

Cover the direct Yandex link, iframe title/loading attributes and fallback visibility in `BookingSection.test.tsx`.

### Task 4: Expand FAQ/footer and add slower reveal motion

**Files:**
- Modify: `src/data/siteContent.ts`, `src/components/Footer.tsx`, `src/components/BookingSection.tsx`, `src/components/motion/Reveal.tsx`, `src/styles/global.css`, `src/styles/tokens.css`
- Test: `src/App.test.tsx`, `src/components/BookingSection.test.tsx`

- [x] **Step 1: Add practical pre-visit FAQ entries**

Add questions about arrival time, food/drink policy, large groups, children/age rules only when phrased as guidance to confirm, and current hours; keep uncertain policy text explicitly editorial or “уточните при бронировании”.

- [x] **Step 2: Expand footer contact utility**

Add phone, address, hours note, VK and Yandex links with clear grouping, keeping the closing editorial line and the back-to-top action.

- [x] **Step 3: Slow and stagger reveal animations**

Use the existing `Reveal` component and CSS variables to move to a calmer 780–900ms ease-out, with section-level stagger delays for headings, media and controls. Do not animate layout properties; disable transforms/opacity transitions under `prefers-reduced-motion`.

- [x] **Step 4: Add a reduced-motion regression assertion**

Keep the existing reveal behavior testable and verify that the page still renders all major landmarks when motion is reduced.

### Task 5: Final visual QA, commit and deploy

**Files:**
- Modify: `docs/visual-comparison-2026-08-22.md`, `docs/visual-deviations.md`, `docs/asset-provenance.md`, `docs/deployment-2026-08-22.md`

- [x] **Step 1: Run the complete local verification**

Run `npm run test:run`, `npm run build`, `npm audit --omit=dev --audit-level=high` and `git diff --check`.

- [x] **Step 2: Verify with the in-app Browser**

Fresh-load at 1920×1080 (and the reference-sized CSS viewport), then 390×844 and 320×844. Check hero crop, ribbon text, VK contrast, live/fallback map, FAQ/footer, reveal timing, carousel controls, image completion, `scrollWidth`, anchors and console errors. Capture a fresh visual comparison note.

- [ ] **Step 3: Commit and push**

Create a focused commit for this iteration, push `main`, and verify `git ls-remote --heads origin main`.

- [ ] **Step 4: Deploy and smoke-test**

Build the static artifact, upload it to `/root/unitysite`, preserve the previous remote directory/configuration if present, run `nginx -t && systemctl reload nginx` only after a successful test, and verify `https://kaigo.space/site/unity/` plus representative JS/CSS/PNG/JPG assets.

- [ ] **Step 5: Update evidence and finish**

Record commit SHA, generated asset provenance, map mode, remote path, HTTP checks and rollback location. Mark the task complete only after the public URL and mobile checks pass.
