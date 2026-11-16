# Unified Dark Contact & Footer Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Merge `#contact` and `Footer.astro` into a unified dark (`#000000` / `#F4F4F2`) Contact & Footer section featuring a 2-line CTA headline with WhatsApp and Email pill buttons, vertical LinkedIn/Instagram/GitHub links, a giant `FAJAR` wordmark, and a bottom metadata bar with `EN`/`ID` locale toggle.

**Architecture:** Add `email` and `github` to `profile.socials` in `src/data/profile.ts`, update i18n keys in `src/i18n/ui.ts`, rebuild `src/components/Footer.astro` with `id="contact"` and remove `initClock`, remove `<Contact />` from `src/views/HomeView.astro`, and delete `src/components/home/Contact.astro`.

**Tech Stack:** Astro 7, TypeScript, scoped CSS.

**Spec:** `docs/superpowers/specs/2026-11-16-contact-footer-redesign-design.md`

## Global Constraints
- Bilingual (`en` and `id`) parity in `src/i18n/ui.ts`.
- Preserve `#contact` anchor target for `Nav.astro` links and scroll spy.
- Remove `data-wib-clock`, `initClock`, `footer.clock`, and `footer.credit` completely.
- No horizontal overflow from the oversized `FAJAR` wordmark across mobile (`>= 320px`) and desktop viewports.

## Review Focus
1. Both `en` (`/`) and `id` (`/id/`) render `#contact` inside `<footer id="contact">` with WhatsApp pill (`wa.me/62895600077007`), Email pill (`mailto:jarruuwork@gmail.com`), and vertical `LinkedIn`, `Instagram`, `GitHub` (`https://github.com/Jarruu`) links.
2. Giant `FAJAR` wordmark renders inside `.container` without `data-wib-clock` or `Manix3D` credit remaining anywhere in the footer.
3. Bottom-right language toggle links to `/id/` from `/` and `/` from `/id/`.
4. `/work/` and `/work/[slug]` pages include the updated footer without broken imports from deleted `Contact.astro`.
5. High-contrast `:focus-visible` outlines (`#ffffff` / `var(--inv-fg)`) work on dark background across all interactive links.

---

### Task 1: Update `src/data/profile.ts` and `src/i18n/ui.ts`

**Files:**
- Modify: `src/data/profile.ts:24-45`
- Modify: `src/i18n/ui.ts:75-90,183-198`

- [ ] **Step 1: Add `email` and `github` to `profile.socials` in `src/data/profile.ts`**
  Add `email: { label: 'Email', handle: 'jarruuwork@gmail.com', url: 'mailto:jarruuwork@gmail.com' }` and `github: { label: 'GitHub', handle: 'Jarruu', url: 'https://github.com/Jarruu' }`.

- [ ] **Step 2: Update contact/footer i18n keys in `src/i18n/ui.ts`**
  Update `contact.heading` (`Let's build\nsomething real.` / `Mari bangun\nsesuatu yang nyata.`), `contact.wa` (`Chat on WhatsApp` / `Chat di WhatsApp`), add `contact.email` (`Drop an email` / `Kirim email`), and remove unused `footer.clock` and `footer.credit` (plus `contact.sub`, `contact.li`, `contact.ig` no longer referenced).

---

### Task 2: Rebuild `src/components/Footer.astro` and clean up `Contact.astro`

**Files:**
- Modify: `src/components/Footer.astro:1-156`
- Modify: `src/views/HomeView.astro:1-31`
- Delete: `src/components/home/Contact.astro`

- [ ] **Step 1: Rebuild `src/components/Footer.astro`**
  Render `<footer id="contact" class="site-footer">` with:
  - Top row: left `.footer-cta` (2-line `<h2 class="footer-heading">` + 2 pill links: WhatsApp with `→` and Email with `@`), right `.footer-socials` (`LinkedIn`, `Instagram`, `GitHub`).
  - Middle/lower: giant `FAJAR` wordmark (`<p class="footer-wordmark" aria-hidden="true">FAJAR</p>`).
  - Bottom bar: `© {year} — {profile.fullName}`, `Padang, Indonesia`, `{t('footer.rights')}`, and `<a href={switchUrl} class="footer-lang-badge">{otherLangLabel}</a>` (actually showing current locale `EN` / `ID` or toggling between locales cleanly with `aria-label`!).
  - Remove `<script>` for `initClock` and replace light CSS with pitch-dark `#000000` styling.

- [ ] **Step 2: Remove `<Contact />` from `src/views/HomeView.astro` and delete `src/components/home/Contact.astro`**
  Remove `import Contact` and `<Contact lang={lang} />` from `HomeView.astro`, then delete `src/components/home/Contact.astro`.

- [ ] **Step 3: Verify rendered HTML on `http://localhost:4321/`, `/id/`, and `/work/`**
  Check `#contact` in `<footer>`, `mailto:jarruuwork@gmail.com`, `https://github.com/Jarruu`, `FAJAR` wordmark, locale toggle link, and zero occurrences of `wib-clock` or `Manix3D`.
