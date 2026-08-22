# UNITY Second Iteration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refine, verify, and deploy the UNITY landing second iteration at `/site/unity`.

**Architecture:** Keep the existing React/TypeScript component boundaries. Extend the typed content model with media provenance, social CTAs, and carousel settings; keep visual behavior in section CSS and small reusable motion helpers. Build a static Vite artifact and deploy it behind the existing domain path without embedding secrets.

**Tech Stack:** React 19, TypeScript, Vite, Vitest/Testing Library, Framer Motion, Phosphor Icons, CSS, Image Generation Skill, in-app Browser, SSH/PowerShell.

---

### Task 1: Baseline visual evidence and asset inventory

**Files:**
- Inspect: `src/App.tsx`, `src/components/FormatsSection.tsx`, `src/components/CommunitySection.tsx`, `src/components/EventsSection.tsx`, `src/components/BookingSection.tsx`, `src/styles/global.css`
- Inspect: six files under `C:\Users\User\Downloads\ChatGPT Image 21 авг. 2026 г.`
- Update: `docs/visual-deviations.md`, `docs/asset-provenance.md`

- [ ] Capture fresh desktop and mobile layout metrics and screenshots through the Browser.
- [ ] Record the current format-card bounds, repeated asset keys, review metadata visibility, and event-control affordance.
- [ ] Add a dated comparison table with the measured baseline and target changes.
- [ ] Run `git diff --check`.

### Task 2: Extend content and CTA model with tests first

**Files:**
- Test: `src/data/siteContent.test.ts`, `src/components/BookingSection.test.tsx`, `src/components/motion/Carousel.test.tsx`
- Modify: `src/data/siteContent.ts`, `src/components/BookingSection.tsx`, `src/components/motion/Carousel.tsx`

- [ ] Add failing tests for the verified VK booking alternative, explicit review/event labels, and pause/autoplay configuration.
- [ ] Run `npm run test:run -- --reporter=dot` and confirm the new assertions fail for the missing behavior.
- [ ] Add typed content fields and minimal component behavior to satisfy the tests.
- [ ] Re-run the focused tests, then the full test suite.

### Task 3: Compact formats and typography polish

**Files:**
- Test: `src/App.test.tsx`
- Modify: `src/components/FormatsSection.tsx`, `src/styles/global.css`, `src/styles/tokens.css`

- [ ] Add a DOM assertion that all four format titles and their unique asset keys render together.
- [ ] Adjust the desktop grid/card heights and copy limits so the four formats fit the intended screen rhythm.
- [ ] Add a mobile override that preserves readable titles and no horizontal overflow.
- [ ] Verify computed bounds in Browser at 1920×1080, 390×844, and 320px.

### Task 4: Generate and integrate non-repeating image assets

**Files:**
- Create: `public/assets/editorial/*.png` or `*.jpg`
- Modify: `src/App.tsx`, `public/assets/manifest.json`, `docs/asset-provenance.md`, `docs/visual-deviations.md`

- [ ] Generate only the needed assets with Image Generation, using local venue frames as references where a real-space edit is requested.
- [ ] Visually inspect every output; reject generated signage/people that look misleading or unusable.
- [ ] Assign unique images to hero, formats, community, events, and entrance/address contexts.
- [ ] Add provenance and an explicit AI/editorial label for every generated asset.

### Task 5: Reviews/events interaction and conversion paths

**Files:**
- Test: `src/components/CommunitySection.test.tsx`, `src/components/motion/Carousel.test.tsx`
- Create: `src/components/motion/useAutoplayCarousel.ts` if the hook boundary is needed
- Modify: `src/components/CommunitySection.tsx`, `src/components/EventsSection.tsx`, `src/components/motion/Carousel.tsx`, `src/components/BookingSection.tsx`, `src/styles/global.css`

- [ ] Write failing tests for visible author/date metadata, manual controls, pause behavior, and VK alternative CTA.
- [ ] Implement an interval that stops on hover/focus and is disabled by reduced motion.
- [ ] Add clear labels/hints and 44px touch targets without introducing horizontal overflow.
- [ ] Verify carousel rotation, keyboard focus, Escape/mobile menu behavior, and form demo wording in Browser.

### Task 6: Map fallback and deployment preparation

**Files:**
- Modify: `src/components/BookingSection.tsx`, `src/styles/global.css`, `docs/visual-deviations.md`
- Create if needed: `deploy/kaigo-unity.conf.example` (no secrets)

- [x] Probe the public Yandex map URL and retain the illustrated fallback with a verified organisation link.
- [x] Run `npm run build` and `npm audit --omit=dev --audit-level=high`.
- [x] Check the exact output files under `dist/` and prepare a static deployment package.

### Task 7: SSH deploy and production verification

**Files:**
- Remote target: `/root/unitysite`
- Local evidence: `docs/deployment-2026-08-22.md`

- [x] Connect interactively to `root@5.129.236.90:22` without writing the password to disk or command history.
- [x] Inspect existing web-server ownership/configuration before replacing files.
- [x] Copy the production artifact to `/root/unitysite`, preserving a timestamped rollback copy when present.
- [x] Verify `https://kaigo.space/site/unity` returns 200 and assets resolve from the path prefix.
- [x] Record remote path, timestamp, commit SHA, HTTP status, and rollback location.

### Task 8: Final review, commit, and push

- [x] Run the complete test/build/audit/browser checklist after the final edits.
- [x] Request independent code and visual reviews; resolve P0/P1 findings.
- [x] Commit the iteration, push `main`, and verify `git ls-remote --heads origin main`.
- [x] Update the goal only after local and remote evidence are complete.
