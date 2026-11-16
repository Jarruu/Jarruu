# Unified Dark Contact & Footer Redesign — Short Design

**Date:** 2026-11-16
**Size:** Small change
**Status:** Approved

## Intent & Why
Replace the separate light `Contact.astro` + `Footer.astro` blocks with a unified, bold dark Contact & Footer block (`#000000` / `#0E0E0E` surface, `#F4F4F2` ink) inspired by the user's reference screenshot, adapting all links, wordmark, and bottom metadata to Fajar's real channels.

## Goals, Non-Goals, Anti-Goals
- **Goals:**
  - Merge `#contact` and `Footer.astro` into one unified dark component rendered on all pages via `Layout.astro`, removing `<Contact />` from `HomeView.astro` (and removing the unused `Contact.astro` component).
  - Update `src/data/profile.ts` to add `email` (`jarruuwork@gmail.com`) and `github` (`https://github.com/Jarruu`) under `profile.socials`.
  - Top-left CTA block: concise 2-line display headline + two rounded pill links (`CHAT ON WHATSAPP ->` / `HUBUNGI WHATSAPP ->` and `DROP AN EMAIL @` / `KIRIM EMAIL @`).
  - Top-right links stack: `LinkedIn`, `Instagram`, `GitHub`.
  - Full-width giant uppercase **`FAJAR`** wordmark below the CTA/socials row.
  - Bottom bar: copyright (`© 2026 — Rahmat Fajar Saputra`), role/location label, tech credit (`Built with Astro, Three.js & GSAP`), and a compact `EN` / `ID` locale toggle badge at bottom-right.
  - Remove the live WIB clock (`[data-wib-clock]`, `initClock` script, `footer.clock`) and old 3D model credit (`footer.credit`).
- **Non-Goals:** Changing Nav spy IDs (`contact` remains an active spy target on `#contact`), changing other Home sections (`Hero`..`Skills`), or modifying `Works` pages.
- **Anti-Goals:** Leaving dead `Contact.astro` imports, horizontal overflow from the oversized `FAJAR` wordmark on narrow viewports, or low-contrast pill borders on dark background.

## Constraints
- Bilingual parity (`en` and `id`) in `src/i18n/ui.ts`.
- Works across Home (`/`, `/id/`), Works archive, and Work detail pages via `Layout.astro` without breaking `Nav.astro` `#contact` anchor links or scroll spy.
- Accessible focus rings (`:focus-visible`) on dark surface (`outline-color: var(--inv-fg)`).

## Approaches Considered
1. **Unified `Footer.astro` with `id="contact"` across all pages (chosen):** Single dark component at the bottom of `Layout.astro` ensures exact visual parity with the reference on Home and keeps contact CTAs + wordmark consistent on subpages.
2. **Keep `Contact.astro` only on Home + dark `Footer.astro` everywhere (rejected):** Splits one cohesive visual block into two components and leaves `/work` pages without the CTA header.

## Design Decisions (What Changes)
- **`src/data/profile.ts`:** Add `email` (`jarruuwork@gmail.com`, `mailto:jarruuwork@gmail.com`) and `github` (`Jarruu`, `https://github.com/Jarruu`) to `profile.socials`.
- **`src/i18n/ui.ts`:** Update contact/footer strings (`contact.heading`, pill labels `contact.wa`, `contact.email`, remove `footer.clock` and `footer.credit`).
- **`src/components/Footer.astro`:** Rebuild into the dark unified `#contact` footer layout with top 2-column grid (2-line headline + 2 pill buttons on left; `LinkedIn`, `Instagram`, `GitHub` on right), responsive giant `FAJAR` wordmark, and 4-slot bottom metadata bar with `EN` / `ID` switcher pill. Remove `initClock` script.
- **`src/views/HomeView.astro` & `src/components/home/Contact.astro`:** Remove `<Contact />` from `HomeView.astro` and delete `src/components/home/Contact.astro`.
