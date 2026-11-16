# Experience Section Update — Short Design

**Date:** 2026-11-16
**Size:** Small change
**Status:** Approved

## Intent & Why
Replace remaining `[TODO]` placeholders and draft roles in the Experience and Academic Background section with Fajar's actual laboratory assistantship timeline, internship record, and university cohort so the section is ready for recruiters and clients in both `id` and `en`.

## Goals, Non-Goals, Anti-Goals
- **Goals:**
  - Remove the `Intern Laboratory Assistant` (`Asisten Magang Laboratorium`) entry.
  - Remove `"Permanent"` / `"Tetap"` from the RES Lab assistant role titles.
  - Group the two RES Lab assistantship periods (`Jun 2026 – Present` and `Jul 2025 – Jun 2026`) under a single organization timeline entry, ordered newest first, covering all specified practicum courses and inventory responsibilities.
  - Keep `Programmer Intern` (`CV. Putra Anugrah Mandiri`, `Jan 2025 - Feb 2025`).
  - Set `profile.education.period` to `2023 - Present` (`en`) / `2023 - Sekarang` (`id`) and remove the permanent `.placeholder-tag` styling on the education period.
- **Non-Goals:**
  - Modifying other home sections (`Hero`, `About`, `Showcase`, `Skills`, `Contact`), GSAP scroll-scrub animation logic, or adding separate experience detail pages.
- **Anti-Goals:**
  - Repeating the same laboratory organization block twice in the timeline, leaving any `[TODO]` / `.placeholder-tag` markers behind, or breaking the monochrome datasheet visual language in `DESIGN.md`.

## Constraints
- Bilingual (`en` and `id`) parity in `src/data/profile.ts`.
- Responsive 2-column timeline layout (`260px 1fr` on desktop, stacked below `860px`) in `src/components/home/Experience.astro`.

## Approaches Considered
1. **Separate timeline entries (rejected):** Uses the existing flat `ExperienceItem` shape without component changes, but repeats the RES Lab organization name and location twice in succession.
2. **Grouped organization entry with stacked sub-periods (chosen):** Keeps the RES Lab organization once in the timeline entry with the overall span (`Jul 2025 - Present`) on the left and the two role periods stacked newest-first on the right. Trades a small extension to `ExperienceItem` and `Experience.astro` for cleaner hierarchy and zero organization repetition.

## Design Decisions (What Changes)
- **`src/data/profile.ts`:**
  - Update `profile.education.period` to `{ en: '2023 - Present', id: '2023 - Sekarang' }`.
  - Extend `ExperienceItem` with an optional `roles` list (`period`, `role`, `summary`, `highlights`) alongside existing single-role fields (or unify cleanly in `Experience.astro`), removing `todoPeriod` once populated.
  - Entry 1 (`Robotic and Embedded System Laboratory, Teknik Komputer, Universitas Andalas`, overall `Jul 2025 - Present` / `Jul 2025 - Sekarang`):
    - `Jun 2026 - Present` / `Jun 2026 - Sekarang`: **Laboratory Assistant & Inventory Coordinator** / **Asisten Laboratorium & Koordinator Inventaris** — Inventory Coordinator; Practicum Assistant for Embedded Systems & IoT and Electronics.
    - `Jul 2025 - Jun 2026`: **Laboratory Assistant & Inventory Division Staff** / **Asisten Laboratorium & Staf Divisi Inventaris** — Inventory Division Staff; Practicum Assistant for Introduction to Circuit Analysis and Electric Circuits.
  - Entry 2 (`CV. Putra Anugrah Mandiri`, `Jan 2025 - Feb 2025`): **Programmer Intern** / **Programmer (Magang)** (unchanged content).
- **`src/components/home/Experience.astro`:**
  - Render grouped sub-roles cleanly with subtle vertical spacing/divider when an entry has multiple periods, and render single-role entries cleanly.
  - Replace hardcoded `class="placeholder-tag"` on `profile.education.period[lang]` with standard period styling (`edu-period-text`).
- **Left to builder:** Exact copy polish for the bilingual summaries/highlights of the two RES Lab periods and CSS spacing tokens matching `--line` / `--muted`.

---

## Addendum (2026-11-16): Experience Entry Photos
**Status:** Approved

- **Intent:** Add documentary photos for both timeline entries so recruiters/clients see real laboratory and internship context.
- **Approaches Considered:**
  1. **Left metadata column below period (chosen):** Places a `4 / 3` landscape `<Image />` directly under `.item-period` inside the `260px` `.timeline-meta` column. Keeps overall timeline height compact and balances left-right column density.
  2. **Right content column below highlights (rejected):** Renders larger images below bullet lists, increasing section scroll height and leaving the left column empty.
- **Design Decisions:**
  - **`src/data/profile.ts`:** Import `src/assets/Asisten Reslab 2025-2026.webp` and `src/assets/Laporan_PKL_IEEE.webp` via Astro asset imports and attach optional `photo: { src: ImageMetadata; alt: Record<Lang, string> }` to `ExperienceItem`.
  - **`src/components/home/Experience.astro`:** Render Astro `<Image />` inside `.timeline-meta` below `.item-period` in full natural color (`aspect-ratio: 4 / 3`, `object-fit: cover`, `border: 1px solid var(--line)`, `border-radius: 4px`, `max-width: 360px` on `<= 860px`).
