# UNITY fourth iteration UX polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace noisy controls with premium accordions, swipeable rails and compact map/event surfaces across desktop and mobile.

**Architecture:** Keep the existing React/Vite content model. Use small controlled React state for FAQ and pointer gestures for carousels, while preserving autoplay and reduced-motion behavior internally. Use CSS scroll-snap for the mobile formats rail and semantic buttons/regions for keyboard access.

**Tech Stack:** React 19, TypeScript, Vitest/Testing Library, Framer Motion, CSS scroll-snap, in-app Browser.

---

### Task 1: Premium FAQ and map CTA

**Files:**
- Modify: `src/components/BookingSection.tsx`, `src/components/YandexMapEmbed.tsx`, `src/styles/global.css`
- Test: `src/components/BookingSection.test.tsx`

- [x] **Step 1: Add a failing FAQ behavior test**

Render `BookingSection`, click the first FAQ button, assert `aria-expanded="true"`, then click the second and assert the first closes while the second opens. Assert there are no `details` elements.

- [x] **Step 2: Replace native details with controlled accordion items**

Use `openFaq: string | null` state, a numbered button per question, `aria-controls`, and a panel region. Render the answer in the panel and keep only one active item.

- [x] **Step 3: Restyle FAQ and map fallback**

Add premium accordion borders, active tint, index column, animated panel/icon, and focus states. Make the map footer vertical with the address and one full-width `button--map` link. Render the illustrated fallback only when `embedUrl` is absent and label it `Ориентир для входа`.

- [x] **Step 4: Run focused tests**

Run `npm run test:run -- src/components/BookingSection.test.tsx`; expect all tests to pass.

### Task 2: Compact swipeable events and quiet review carousel

**Files:**
- Modify: `src/components/motion/Carousel.tsx`, `src/components/EventsSection.tsx`, `src/components/CommunitySection.tsx`, `src/styles/global.css`
- Test: `src/components/motion/Carousel.test.tsx`, `src/components/CommunitySection.test.tsx`

- [x] **Step 1: Add failing swipe/control assertions**

Assert events do not render interval/pause/format-proposal copy, and dispatch a pointer/touch gesture that advances to the next slide. Assert review controls do not render pause/hint copy.

- [x] **Step 2: Simplify carousel UI and add gesture state**

Keep dots/arrows and hidden autoplay. Add `onTouchStart/onTouchEnd` and `onPointerDown/onPointerUp` with a 48px horizontal threshold, and use a single framer-motion transition with no exit gap.

- [x] **Step 3: Compact event layout and review CTA**

Reduce event feature height/padding, remove section proposal link, hints and pause buttons, and style the community VK link as a high-contrast button. Preserve `prefers-reduced-motion` behavior.

- [x] **Step 4: Run focused carousel tests**

Run `npm run test:run -- src/components/motion/Carousel.test.tsx src/components/CommunitySection.test.tsx`.

### Task 3: Mobile formats rail and premium burger

**Files:**
- Modify: `src/components/FormatsSection.tsx`, `src/components/SiteHeader.tsx`, `src/styles/global.css`
- Test: `src/App.test.tsx`, `src/components/SiteHeader.test.tsx`

- [x] **Step 1: Update title and add rail semantics**

Change the heading to `Форматы отдыха в UNITY`; keep the four cards in DOM order and add a labelled rail wrapper usable by touch and keyboard.

- [x] **Step 2: Add mobile snap styling**

At `max-width: 760px`, switch `.format-grid` to a horizontal overflow rail, give each card `min-width: min(84vw, 320px)`, reduce media/body heights, and preserve a visible edge of the next card.

- [x] **Step 3: Polish burger overlay**

Add an active button state, subtle icon morph, overlay background, staggered nav-link transitions, and focus-visible styling without changing anchor behavior.

- [x] **Step 4: Run focused app/header tests**

Run `npm run test:run -- src/App.test.tsx src/components/SiteHeader.test.tsx`.

### Task 4: Full verification, docs, commit and deploy

**Files:**
- Add: `docs/visual-comparison-2026-08-22-fourth-iteration.md`, `docs/deployment-2026-08-22-fourth-iteration.md`

- [x] **Step 1: Run full tests, build, audit and diff check**

Run `npm run test:run`, `npm run build`, `npm audit --omit=dev --audit-level=high`, and `git diff --check`.

- [x] **Step 2: Browser QA**

Fresh-load local and public pages at `1920×1080`, `390×844`, and `320×844`; verify FAQ interaction, map CTA, swipe rails, burger overlay, no overflow, no console errors and no white carousel gap.

- [ ] **Step 3: Commit and push**

Create a focused UX polish commit and push `main`; verify `git ls-remote --heads origin main`.

- [ ] **Step 4: Deploy and smoke-test**

Build `dist`, stage it on the server, preserve the previous release, run `nginx -t && systemctl reload nginx`, and verify public index, JS, CSS, hero PNG, no-slash redirect and Yandex iframe URL.

- [x] **Step 5: Record evidence**

Update the comparison/deployment docs with the new commit, rollback path, viewport metrics and interaction checks.
