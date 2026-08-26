# UNITY Mobile Rails Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `subagent-driven-development` (recommended) or `executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make UNITY's events, reviews, and formats reliable on phones: working arrow controls, deliberate finger swipes, no blank transition frame, and a five-second automatic advance when a horizontal rail exists.

**Architecture:** Keep the event card mounted as a stable visual shell and animate only its changing inner content; this avoids an outgoing full card overlapping an incoming one. Put timing, pause/restart, and pointer-swipe state in the existing motion layer, while the formats grid becomes a scroll-snap rail controlled by React only when it overflows.

**Tech Stack:** React 19, TypeScript, Framer Motion, Vitest, Testing Library, CSS scroll snap.

---

## File map

- `src/components/motion/Carousel.tsx` — shared five-second autoplay/reset API and stable event-card transition.
- `src/components/motion/Carousel.test.tsx` — event arrow, swipe, and timing regression coverage.
- `src/components/CommunitySection.tsx` — review control reset and content-only motion.
- `src/components/CommunitySection.test.tsx` — review timing/control regression coverage.
- `src/components/FormatsSection.tsx` — mobile format rail and overflow-aware auto advance.
- `src/components/FormatsSection.test.tsx` — mobile rail gesture and five-second scroll tests.
- `src/styles/global.css` — stable event-inner geometry, rail interaction cues, and reduced-motion behavior.

### Task 1: Lock the interaction contract in tests

**Files:**

- Modify: `src/components/motion/Carousel.test.tsx`
- Modify: `src/components/CommunitySection.test.tsx`
- Create: `src/components/FormatsSection.test.tsx`

- [x] **Step 1: Write event/review timing regressions**

```tsx
fireEvent.click(screen.getByRole('button', { name: 'Следующее событие' }))
act(() => vi.advanceTimersByTime(4_999))
expect(activeEvent(1)).toBe(true)
act(() => vi.advanceTimersByTime(1))
expect(activeEvent(2)).toBe(true)
```

- [x] **Step 2: Write the formats rail regression**

```tsx
Object.defineProperties(rail, {
  clientWidth: { configurable: true, value: 300 },
  scrollWidth: { configurable: true, value: 1200 },
})
act(() => vi.advanceTimersByTime(5_000))
expect(scrollTo).toHaveBeenCalledWith(expect.objectContaining({ behavior: 'smooth' }))
```

- [x] **Step 3: Run the focused tests and verify RED**

```bash
npm test -- --run src/components/motion/Carousel.test.tsx src/components/CommunitySection.test.tsx src/components/FormatsSection.test.tsx
```

Expected: timing and format-rail tests fail against the current 5.6-second/permanently stopped behavior and static formats grid.

### Task 2: Replace the fragile event-stage transition

**Files:**

- Modify: `src/components/motion/Carousel.tsx`
- Modify: `src/components/CommunitySection.tsx`
- Modify: `src/styles/global.css`

- [x] **Step 1: Implement five-second restartable autoplay**

```ts
export const CAROUSEL_AUTOPLAY_INTERVAL = 5_000
const restart = useCallback(() => setCycle((cycle) => cycle + 1), [])
```

Arrows, dots, and swipes advance immediately, then restart a fresh five-second cycle. Hover, keyboard focus, active pointer gesture, and reduced motion remain pause conditions.

- [x] **Step 2: Keep the card shell mounted during event changes**

```tsx
<div className="event-feature">
  <motion.div key={active.id} className="event-feature__inner" initial={enter} animate={rest} transition={transition}>
    {/* current copy and media */}
  </motion.div>
</div>
```

Do not render an exiting full `.event-feature`; the stable navy shell remains visible while inner copy/media receives a short opacity/scale/y transition.

- [x] **Step 3: Apply the same low-amplitude review motion**

Use keyed review content only, with opacity, scale, and a small vertical offset. Keep controls outside the animated node.

- [x] **Step 4: Run focused tests and verify GREEN**

```bash
npm test -- --run src/components/motion/Carousel.test.tsx src/components/CommunitySection.test.tsx
```

Expected: every event/review test passes, including a manual interaction followed by a new five-second auto cycle.

### Task 3: Build the mobile formats rail

**Files:**

- Modify: `src/components/FormatsSection.tsx`
- Create: `src/components/FormatsSection.test.tsx`
- Modify: `src/styles/global.css`

- [x] **Step 1: Add an overflow-aware rail controller**

```ts
const moveTo = useCallback((nextIndex: number) => {
  const card = cards[nextIndex]
  rail?.scrollTo({ left: card.offsetLeft - rail.offsetLeft, behavior: 'smooth' })
  setActiveIndex(nextIndex)
}, [])
```

Use `ResizeObserver` when available plus a window-resize fallback so the five-second timer runs only when the rail overflows.

- [x] **Step 2: Add pointer swipe handling**

```tsx
onPointerDown={beginGesture}
onPointerUp={finishGesture}
style={{ touchAction: 'pan-y' }}
```

Only a horizontal gesture of at least 48px changes card; a vertical gesture preserves page scrolling. A manual format swipe keeps the chosen card in view and stops automatic movement without introducing a visible pause control.

- [x] **Step 3: Preserve the desktop grid**

Keep four columns at wide widths. At `max-width: 760px`, retain scroll snap and the partial next-card visual cue; add no pause UI.

- [x] **Step 4: Run focused formats tests**

```bash
npm test -- --run src/components/FormatsSection.test.tsx
```

Expected: all new rail tests pass.

### Task 4: Browser QA and release

**Files:**

- Modify: `docs/visual-comparison-2026-08-26-final-polish.md`
- Modify: `docs/deployment-2026-08-26-final-polish.md`

- [x] **Step 1: Run full static verification**

```bash
npm run test:run
npm run build
git diff --check
```

Expected: no failures and an empty whitespace diff check.

- [x] **Step 2: Verify in the in-app Browser**

At `390×844` and `320×844`, test each visible arrow, a left/right swipe on events/reviews/formats, the five-second advance, no white transition frame, and no horizontal document overflow. Then recheck desktop controls at `1920×1080`.

- [x] **Step 3: Release the verified build**

Commit only scoped source/test/docs files, push `main`, atomically deploy the built `dist` into `/root/unitysite`, run `nginx -t` and reload, then fresh-load `https://kaigo.space/site/unity/` at mobile width. Never put deployment credentials in source, logs, or documentation.
