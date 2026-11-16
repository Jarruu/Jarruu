# Right-Edge Scrolling Ruler (Scrollbar Replacement) — Short Design

**Date:** 2026-11-16
**Size:** Small change
**Status:** Approved

## Intent & Why
Replace the browser's native right-side scroll pill with a precision moving ruler tape (`0`–`100` scale with numeric labels and major/minor ticks) passing a fixed center needle, matching the technical engineering datasheet identity across all pages.

## Goals, Non-Goals, Anti-Goals
- **Goals:**
  - Hide the native browser scrollbar on `html` (`scrollbar-width: none`, `::-webkit-scrollbar { display: none }`).
  - Build a fixed right-edge `ScrollRuler.astro` component mounted globally via `Layout.astro`.
  - Use **Opsi B (scrolling tape + fixed center needle)**:
    - Fixed center needle at `50%` height of the ruler window with a live numeric readout (`00`–`100`).
    - Moving scale tape (`0` to `100` in steps of `2`, major ticks + numeric labels every `10` units, minor ticks every `2` units) that translates vertically so the active scroll percentage aligns directly with the center needle.
  - Support pointer **drag-to-scroll** and **click-on-tick** navigation synchronized with Lenis (`scrollToPosition` helper in `src/scripts/lib/lifecycle.ts`).
  - Adaptive contrast over both warm-paper light sections and dark Hero/Footer via `mix-blend-mode: difference`.
  - Hide on narrow mobile screens (`<= 768px`) to preserve full content width.
- **Non-Goals:** Replacing internal horizontal overflow scrollbars inside code blocks or adding section-jump menus to the ruler.
- **Anti-Goals:** Fighting Lenis scroll momentum during drag, isolating `mix-blend-mode` with `mask-image`, or leaving the native scrollbar visible alongside the ruler.

## Constraints
- Clean Astro View Transitions (`ClientRouter`) lifecycle via `onPageLoad` / cleanup in `src/scripts/lib/lifecycle.ts`.
- Accessible (`aria-hidden="true"` decorative ruler or non-intrusive widget that does not trap keyboard Tab navigation; keyboard PageUp/Down/Arrow scrolling continues working normally).
- Respects `prefers-reduced-motion: reduce`.

## Approaches Considered
1. **Static full-height ruler + moving needle (rejected by user):** Intuitive 0–100 top-to-bottom thumb, less like a physical measuring dial.
2. **Moving ruler tape + fixed center needle with numeric labels (chosen):** Scale ticks (`0`–`100`) and numeric labels (`0, 10, ..., 100`) scroll smoothly past a stationary center needle, with drag/click scrubbing tied to Lenis.

## Design Decisions (What Changes)
- **`src/styles/global.css`:** Hide native scrollbar on `html` (`scrollbar-width: none`, `-ms-overflow-style: none`, `html::-webkit-scrollbar { display: none }`).
- **`src/scripts/lib/lifecycle.ts`:** Export `scrollToRatio(ratio: number, immediate?: boolean)` using `lenisInstance` when active (falling back to `window.scrollTo`).
- **`src/components/ScrollRuler.astro`:** Fixed right-edge instrument (`width: 68px`, `height: min(52vh, 380px)`), `mix-blend-mode: difference` white markings, center needle + percentage readout, `0`–`100` ruler tape (`51` ticks, labels every `10`), pointer drag & click-to-jump handlers, hidden below `768px`.
- **`src/layouts/Layout.astro`:** Mount `<ScrollRuler />` inside `<body>`.
