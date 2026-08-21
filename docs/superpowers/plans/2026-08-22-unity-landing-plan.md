# UNITY Landing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and verify a one-page UNITY time-cafe landing that reproduces the six supplied reference screens one-to-one or documents every intentional improvement, with desktop 1920x1080 and mobile compositions.

**Architecture:** Vite + React + TypeScript app with typed content data, scene-level components, CSS token system, native CSS/IntersectionObserver reveals, and isolated Framer Motion controls only where stateful carousel motion improves the reference. Assets are local and provenance-labeled. The app has no backend and uses external booking/social links rather than inventing a payment flow.

**Tech Stack:** React 18+, TypeScript, Vite, CSS, Vitest, Testing Library, `framer-motion`, `@phosphor-icons/react`.

---

### Task 1: Bootstrap repository and test harness

**Files:**
- Create: `package.json`, `tsconfig.json`, `tsconfig.node.json`, `vite.config.ts`, `index.html`
- Create: `src/main.tsx`, `src/App.tsx`
- Create: `src/test/setup.ts`
- Create: `src/App.test.tsx`
- Create: `.gitignore`

- [ ] **Step 1: Write the failing smoke test**

Create a Vitest + Testing Library test that imports `App`, expects the `main` landmark and a `UNITY` brand label. The test must fail because the app files do not exist yet.

- [ ] **Step 2: Run the focused test and verify the expected failure**

Run `npm test -- --run src/App.test.tsx`. Expected: module/file failure, not a test-runner configuration failure.

- [ ] **Step 3: Add minimal Vite/React configuration and app shell**

Add scripts `dev`, `build`, `preview`, `test`, `test:watch`; configure jsdom and setup file; render a semantic `main` from `src/main.tsx`.

- [ ] **Step 4: Run the focused test and then build**

Run `npm test -- --run src/App.test.tsx` and `npm run build`. Expected: the smoke test passes and the production build exits 0.

- [ ] **Step 5: Commit the bootstrap**

Run `git add package.json tsconfig.json tsconfig.node.json vite.config.ts index.html src .gitignore` and `git commit -m "chore: bootstrap unity landing"`.

### Task 2: Add typed content and visual tokens

**Files:**
- Create: `src/data/siteContent.ts`
- Create: `src/styles/tokens.css`, `src/styles/global.css`
- Create: `src/data/siteContent.test.ts`
- Modify: `src/main.tsx`

- [ ] **Step 1: Write failing content contract tests**

Assert that content contains five nav anchors, four formats, at least three event items, provenance fields for external claims, and no empty CTA labels.

- [ ] **Step 2: Run the test to confirm missing data fails**

Run `npm test -- --run src/data/siteContent.test.ts`. Expected: import/property failures.

- [ ] **Step 3: Implement typed content and CSS tokens**

Use the reference copy only as visual scaffolding until source research confirms facts. Define cream/petrol/orange tokens, serif and sans stacks, texture pseudo-element, focus rules, reduced-motion rules and responsive breakpoints. Do not use Inter, emoji or pure black.

- [ ] **Step 4: Run content tests and build**

Run `npm test -- --run src/data/siteContent.test.ts` and `npm run build`. Expected: pass/exit 0.

- [ ] **Step 5: Commit**

Run `git add src/data src/styles src/main.tsx` and `git commit -m "feat: add unity content and visual tokens"`.

### Task 3: Build primitives and navigation

**Files:**
- Create: `src/components/Logo.tsx`, `src/components/Button.tsx`, `src/components/TicketEdge.tsx`, `src/components/SectionIntro.tsx`, `src/components/InfoRibbon.tsx`
- Create: `src/components/SiteHeader.tsx`, `src/components/SiteHeader.test.tsx`
- Modify: `src/App.tsx`, `src/styles/global.css`

- [ ] **Step 1: Write failing interaction tests**

Test that nav links point to `#inside`, `#events`, `#pricing`, `#booking`, `#contacts`; mobile menu opens with a button, exposes links, and closes on Escape; primary CTA has an accessible name.

- [ ] **Step 2: Verify red**

Run `npm test -- --run src/components/SiteHeader.test.tsx`. Expected: missing component/anchors.

- [ ] **Step 3: Implement the primitives and header**

Use semantic buttons/links, 44px touch targets, exact reference spacing at desktop, CSS ticket-cut edges, and an isolated client interaction component. Keep icons from `@phosphor-icons/react` and verify package imports against `package.json`.

- [ ] **Step 4: Verify green and build**

Run the focused test and `npm run build`.

- [ ] **Step 5: Commit**

Run `git add src/components src/App.tsx src/styles/global.css` and commit `feat: add unity navigation primitives`.

### Task 4: Implement the six reference scenes

**Files:**
- Create: `src/components/HeroSection.tsx`, `EventsSection.tsx`, `FormatsSection.tsx`, `CommunitySection.tsx`, `BookingSection.tsx`, `Footer.tsx`
- Create: `src/components/motion/Reveal.tsx`, `src/components/motion/Carousel.tsx`, `src/components/motion/Carousel.test.tsx`
- Modify: `src/App.tsx`, `src/styles/global.css`, `src/data/siteContent.ts`

- [ ] **Step 1: Write failing carousel and form behavior tests**

Assert next/previous controls change the active event, wrap at the ends, expose `aria-label` and current slide text; assert booking validation rejects empty name/contact and exposes inline errors.

- [ ] **Step 2: Verify red**

Run `npm test -- --run src/components/motion/Carousel.test.tsx`. Expected: missing component/behavior.

- [ ] **Step 3: Implement scenes and interactions**

Build the hero, events, formats, community and booking scenes against the reference geometry. Use a split hero, asymmetrical formats layout, navy ribbons, editorial headings, ticket cuts, real/provenance-labeled imagery, and CSS reveal. Use Framer Motion only inside `Carousel`/`Reveal` leaves; animate transform/opacity and respect reduced motion.

- [ ] **Step 4: Verify tests, build, and static overflow**

Run the focused tests, `npm test`, `npm run build`, and a local script that checks no element exceeds `document.documentElement.scrollWidth` at 390px.

- [ ] **Step 5: Commit**

Run `git add src/components src/App.tsx src/styles src/data` and commit `feat: build unity landing scenes`.

### Task 5: Prepare image assets

**Files:**
- Create: `public/assets/` and `public/assets/manifest.json`
- Create: `docs/asset-provenance.md`
- Modify: `src/data/siteContent.ts`

- [ ] **Step 1: Inventory verified VK/Яндекс photos**

Record source URL, capture date, whether the image is a genuine venue frame, crop role and any transformation. Do not label generated assets as real venue photos.

- [ ] **Step 2: Generate only beneficial supplemental assets**

Use built-in Image Generation Skill for missing decorative texture/background/illustrative details. If a cutout materially improves the composition, run the local remove-background wrapper, inspect its checkerboard preview, and keep the best non-destructive version.

- [ ] **Step 3: Copy final assets into `public/assets` and wire them**

Use descriptive names, responsive `srcSet` where useful, and `loading="lazy"` below the fold. Keep the local reference PNGs out of the production bundle unless needed for comparison.

- [ ] **Step 4: Verify asset paths and build**

Run `npm run build` and a local asset existence check for every referenced image.

- [ ] **Step 5: Commit**

Run `git add public/assets docs/asset-provenance.md src/data/siteContent.ts` and commit `feat: add verified unity imagery`.

### Task 6: Browser QA and visual iteration

**Files:**
- Create: `docs/visual-deviations.md`, `docs/qa/desktop-1920x1080.md`, `docs/qa/mobile-390x844.md`
- Modify: scene/style files identified by evidence

- [ ] **Step 1: Start the fixed-port local server**

Run `npm run dev -- --host 127.0.0.1 --port 4173` and keep it running for the rest of the visual pass.

- [ ] **Step 2: Inspect desktop in the in-app Browser**

Set viewport 1920x1080, capture top fold and full-page evidence, inspect console logs, anchor navigation, CTA, carousel and booking states. Compare against all six references and log every intentional improvement.

- [ ] **Step 3: Inspect mobile in the in-app Browser**

Set viewport 390x844, capture top fold, menu, formats, events and booking, check no horizontal overflow, text wrapping and touch targets. Fix issues and repeat.

- [ ] **Step 4: Run automated checks**

Run `npm test`, `npm run build`, and any browser smoke script. Expected: all green, no console errors, no layout overflow.

- [ ] **Step 5: Commit visual QA fixes**

Commit only evidence-backed fixes as `fix: polish unity responsive visuals`.

### Task 7: Independent review and delivery

**Files:**
- Modify only files required by review findings
- Create: `docs/review-report.md`

- [ ] **Step 1: Dispatch spec-compliance reviewer**

Give a fresh subagent the spec and diff; require a checklist for one-to-one fidelity, source provenance, mobile, motion, accessibility, tests and fixed-port evidence.

- [ ] **Step 2: Dispatch code-quality reviewer**

After compliance is green, review component boundaries, dependency correctness, performance and security. Fix all critical/important findings and re-review.

- [ ] **Step 3: Run Antigravity analysis**

Ask the bounded worker to inspect runtime screenshots/DOM and report exact deviations. Verify its claims independently and apply only scoped fixes.

- [ ] **Step 4: Final verification**

Run `npm test`, `npm run build`, inspect `git diff --check`, check `git status`, verify local URL and remote credentials. Confirm no secrets or unintended files.

- [ ] **Step 5: Commit and push**

Run `git add -A`, inspect staged diff, commit `feat: launch unity time cafe landing`, then `git push -u origin main`. Verify remote SHA with `git ls-remote --heads origin` and record it in `docs/review-report.md`.
