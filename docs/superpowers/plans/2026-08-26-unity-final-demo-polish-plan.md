# UNITY Final Demo Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Исправить подтверждённое обрезание event CTA и довести hero, reviews/community и booking/contact до финального демонстрационного качества на desktop и mobile.

**Architecture:** Существующая React/Vite-структура сохраняется. Поведенческие изменения покрываются Vitest/Testing Library до production-кода; motion остаётся в Framer Motion, а адаптивная геометрия решается существующей системой CSS-токенов и breakpoint-правил.

**Tech Stack:** React 19, TypeScript, Vite 7, Vitest, Testing Library, Framer Motion, Phosphor Icons, CSS.

---

## Карта файлов

- `src/data/siteContent.ts` — естественные, но честно маркированные пересказы публичных отзывов и компактный community-copy.
- `src/components/CommunitySection.tsx` — review navigation, source link, counter и motion-content.
- `src/components/CommunitySection.test.tsx` — autoplay/hover/focus, arrows, source и content-contract.
- `src/components/motion/Carousel.tsx` — event footer и CTA containment contract.
- `src/components/EventsSection.test.tsx` — regression-test структуры event CTA.
- `src/components/BookingSection.tsx` — семантическая контактная группа.
- `src/components/BookingSection.test.tsx` — regression-test контактной структуры.
- `src/components/HeroSection.tsx` — компактный editorial rail.
- `src/components/HeroSection.test.tsx` — hero polish contract.
- `src/styles/global.css` — единая геометрия, типографика, responsive и visual polish.
- `docs/visual-comparison-2026-08-26-final-polish.md` — desktop/mobile QA evidence.
- `docs/deployment-2026-08-26-final-polish.md` — commit, build, server и public-route evidence.

### Task 1: Review carousel behavior and copy

**Files:**
- Modify: `src/components/CommunitySection.test.tsx`
- Modify: `src/components/CommunitySection.tsx`
- Modify: `src/data/siteContent.ts`

- [ ] **Step 1: Write failing review tests**

Add assertions equivalent to:

```tsx
it('exposes previous and next review controls with a stable counter and source', () => {
  render(<CommunitySection content={siteContent} assetPath={assetPath} />)
  expect(screen.getByRole('button', { name: 'Предыдущий отзыв' })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Следующий отзыв' })).toBeInTheDocument()
  expect(screen.getByText('01 / 03')).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /источник отзыва/i })).toHaveAttribute('href', siteContent.reviews[0].provenance[0].url)
})

it('keeps autoplay running on hover but pauses for keyboard focus', () => {
  render(<CommunitySection content={siteContent} assetPath={assetPath} />)
  const region = screen.getByRole('region', { name: 'Отзывы гостей' })
  fireEvent.mouseEnter(region)
  act(() => vi.advanceTimersByTime(5600))
  expect(screen.getByText(siteContent.reviews[1].author)).toBeInTheDocument()
  fireEvent.focus(region)
  act(() => vi.advanceTimersByTime(5600))
  expect(screen.getByText(siteContent.reviews[1].author)).toBeInTheDocument()
})
```

- [ ] **Step 2: Run the focused tests and verify RED**

Run: `npm test -- --run src/components/CommunitySection.test.tsx`

Expected: FAIL because named arrow buttons, counter/source link, and hover autoplay behavior do not exist.

- [ ] **Step 3: Implement minimal review navigation**

Add a wrapped `goReview(direction)` callback, visible arrow buttons with `ArrowLeft`/`ArrowRight`, `01 / 03`, a source link from `review.provenance[0].url`, and a keyed `motion.div` around the changing quote/meta. Remove review `onMouseEnter`/`onMouseLeave`; retain focus pause, dots and pointer swipe.

Rewrite the three `quote` values as natural editorial summaries while retaining each existing author, date, attribution and provenance.

- [ ] **Step 4: Run focused tests and verify GREEN**

Run: `npm test -- --run src/components/CommunitySection.test.tsx`

Expected: all CommunitySection tests PASS.

- [ ] **Step 5: Commit review behavior**

```bash
git add src/components/CommunitySection.tsx src/components/CommunitySection.test.tsx src/data/siteContent.ts
git commit -m "feat: refine unity guest reviews"
```

### Task 2: Event CTA containment

**Files:**
- Modify: `src/components/EventsSection.test.tsx`
- Modify: `src/components/motion/Carousel.tsx`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Write the failing event footer test**

```tsx
it('keeps event metadata and CTA in a dedicated footer', () => {
  render(<EventsSection content={siteContent} assetPath={assetPath} />)
  const cta = screen.getByRole('link', { name: siteContent.events[0].cta.label })
  expect(cta.closest('.event-feature__footer')).not.toBeNull()
})
```

- [ ] **Step 2: Run the focused test and verify RED**

Run: `npm test -- --run src/components/EventsSection.test.tsx`

Expected: FAIL because `.event-feature__footer` is absent.

- [ ] **Step 3: Implement adaptive event geometry**

Wrap meta and CTA in `.event-feature__footer`. Change `.event-feature` from fixed `height` to adaptive `min-height`, align the copy from the top, give the footer `margin-top: auto`, and use `align-items: flex-start` so CTA width follows its label.

- [ ] **Step 4: Run focused tests and verify GREEN**

Run: `npm test -- --run src/components/EventsSection.test.tsx`

Expected: all EventsSection tests PASS.

- [ ] **Step 5: Commit event containment**

```bash
git add src/components/motion/Carousel.tsx src/components/EventsSection.test.tsx src/styles/global.css
git commit -m "fix: keep unity event actions visible"
```

### Task 3: Contact semantics and hero polish

**Files:**
- Modify: `src/components/BookingSection.test.tsx`
- Modify: `src/components/BookingSection.tsx`
- Create: `src/components/HeroSection.test.tsx`
- Modify: `src/components/HeroSection.tsx`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Write failing contact and hero tests**

```tsx
expect(screen.getByRole('group', { name: 'Контакты UNITY' }).tagName).toBe('ADDRESS')
```

```tsx
render(<HeroSection content={siteContent.hero} assetPath={assetPath} />)
expect(screen.getByText('бильярд · PlayStation · кино · настольные игры')).toHaveClass('hero__media-rail')
```

- [ ] **Step 2: Run the focused tests and verify RED**

Run: `npm test -- --run src/components/BookingSection.test.tsx src/components/HeroSection.test.tsx`

Expected: FAIL because the contact group is a `div` and hero rail is absent.

- [ ] **Step 3: Implement semantic and visual structure**

Replace the contact list wrapper with `<address className="booking__details" aria-label="Контакты UNITY">`. Add the non-interactive `.hero__media-rail` label and refine hero note/media decoration in CSS.

Set `.booking__intro { align-self: start; }`, make `.booking__details` two columns on wide layouts, and return it to one column below the tablet breakpoint.

- [ ] **Step 4: Run focused tests and verify GREEN**

Run: `npm test -- --run src/components/BookingSection.test.tsx src/components/HeroSection.test.tsx`

Expected: all focused tests PASS.

- [ ] **Step 5: Commit contact and hero polish**

```bash
git add src/components/BookingSection.tsx src/components/BookingSection.test.tsx src/components/HeroSection.tsx src/components/HeroSection.test.tsx src/styles/global.css
git commit -m "feat: polish unity hero and directions"
```

### Task 4: Community/grid responsive polish

**Files:**
- Modify: `src/components/CommunitySection.tsx`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Apply the approved shared-card hierarchy**

Add a one-line community label header, keep the panel title at no more than two desktop lines, stretch `.review-carousel`, `.review-card` and `.community-panel` to the same row height, and pin both cards' controls/actions to the bottom.

- [ ] **Step 2: Tune responsive breakpoints**

At `<=760px`, preserve full-width stacked cards, keep controls at least `44px`, avoid forced heading nowrap, and ensure event/footer and booking contact grids collapse without overflow.

- [ ] **Step 3: Run all component tests**

Run: `npm run test:run`

Expected: all test files PASS with no warnings.

- [ ] **Step 4: Commit grid polish**

```bash
git add src/components/CommunitySection.tsx src/styles/global.css
git commit -m "style: align unity final demo grid"
```

### Task 5: Browser and release verification

**Files:**
- Create: `docs/visual-comparison-2026-08-26-final-polish.md`
- Create: `docs/deployment-2026-08-26-final-polish.md`

- [ ] **Step 1: Start this checkout on an unoccupied local port**

Run: `npm run dev -- --port 4174 --strictPort`

Expected: Vite serves this checkout at `http://127.0.0.1:4174/` while the unrelated process on 4173 remains untouched.

- [ ] **Step 2: Run static verification**

Run:

```bash
npm run test:run
npm run build
npm audit --omit=dev --audit-level=high
git diff --check
```

Expected: tests/build exit 0, audit reports 0 high vulnerabilities, diff check is empty.

- [ ] **Step 3: Verify four local viewports in the in-app Browser**

Check `1920×1080`, `1366×768`, `390×844`, and `320×844`: event CTA containment, review arrows/dots/swipe/autoplay, review/community alignment, compact booking intro, hero height, console and `scrollWidth === clientWidth`.

- [ ] **Step 4: Record visual evidence and commit**

Write exact geometry and interaction results to `docs/visual-comparison-2026-08-26-final-polish.md`, then:

```bash
git add docs/visual-comparison-2026-08-26-final-polish.md
git commit -m "docs: record unity final polish qa"
```

- [ ] **Step 5: Push and deploy the verified build**

Push `main`, atomically replace `/root/unitysite` with the verified `dist`, retain a timestamped backup, run `nginx -t`, reload Nginx, and verify the public route. Do not place credentials in commands captured by docs or source.

- [ ] **Step 6: Verify production and record deployment**

Fresh-load `https://kaigo.space/site/unity/` in the in-app Browser at desktop and mobile, recheck console, geometry and key interactions, write `docs/deployment-2026-08-26-final-polish.md`, and commit/push the evidence.
