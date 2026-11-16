# Right-Edge Scrolling Ruler Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Hide the browser's native scrollbar and mount a fixed right-edge scrolling ruler tape (`0`–`100` scale with numeric labels) passing a stationary center needle with drag/click scrubbing synced to Lenis.

**Architecture:** Hide native scrollbars in `src/styles/global.css`, expose `scrollToRatio` from `src/scripts/lib/lifecycle.ts` to coordinate with Lenis, create `src/components/ScrollRuler.astro` with adaptive `mix-blend-mode: difference` markings, and mount it in `src/layouts/Layout.astro`.

**Tech Stack:** Astro 7, TypeScript, Lenis, CSS.

**Spec:** `docs/superpowers/specs/2026-11-16-scroll-ruler-design.md`

## Global Constraints
- Hide native vertical scrollbar across desktop/tablet (`scrollbar-width: none`, `::-webkit-scrollbar { display: none }`).
- `mix-blend-mode: difference` lives directly on the `position: fixed` `.scroll-ruler` element with no `mask-image` or isolating opacity.
- Hidden at `<= 768px` and on non-scrollable short pages (`maxScroll <= 4`).
- Clean Astro View Transitions lifecycle cleanup via `onPageLoad`.

## Review Focus
1. `0` aligns to the center needle at scroll top, `100` aligns at scroll bottom, and readout stays `00`–`100` without exceeding bounds.
2. Dragging the tape updates scroll smoothly via `scrollToRatio` without fighting Lenis momentum, and clicking a tick jumps to that percentage.
3. No `mask-image` or parent isolation breaks `mix-blend-mode: difference` over `#f4f4f2` sections vs `#000000` Hero/Footer.
4. Native scrollbar CSS hides the default scroll pill across Firefox, Chromium, and WebKit.
5. Ruler hides cleanly below `768px` and does not trap keyboard Tab navigation.

---

### Task 1: Hide native scrollbar and expose `scrollToRatio` in `lifecycle.ts`

**Files:**
- Modify: `src/styles/global.css:33-44`
- Modify: `src/scripts/lib/lifecycle.ts:55-94`

- [ ] **Step 1: Hide native scrollbar on `html` in `src/styles/global.css`**
  Add `scrollbar-width: none; -ms-overflow-style: none;` to `html` and `html::-webkit-scrollbar { display: none; }`.

- [ ] **Step 2: Export `scrollToRatio` from `src/scripts/lib/lifecycle.ts`**
  Compute target `y = Math.max(0, Math.min(1, ratio)) * maxScroll` and delegate to `lenisInstance.scrollTo(y, { immediate })` when Lenis is active, otherwise `window.scrollTo`.

---

### Task 2: Build `src/components/ScrollRuler.astro` and mount in `src/layouts/Layout.astro`

**Files:**
- Create: `src/components/ScrollRuler.astro`
- Modify: `src/layouts/Layout.astro:8-52`

- [ ] **Step 1: Create `src/components/ScrollRuler.astro`**
  Render `0..100` ticks (`step = 2`, major ticks + numeric labels every `10`), fixed center needle + readout badge, `onPageLoad` scroll/resize listeners + pointer drag & click-to-jump handlers.

- [ ] **Step 2: Mount `<ScrollRuler />` in `src/layouts/Layout.astro`**
  Import and render `<ScrollRuler />` after `<Footer lang={lang} />`.

- [ ] **Step 3: Verify rendered markup and CSS on `http://localhost:4321/`, `/id/`, and `/work/`**
  Confirm `.scroll-ruler` (`51` ticks, labels `0..100`), hidden native scrollbar rules, and `mix-blend-mode: difference` are served cleanly.
