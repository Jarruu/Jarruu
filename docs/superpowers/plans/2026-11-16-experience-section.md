# Experience Section Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the Experience & Academic Background section to group Fajar's two RES Lab assistantship periods under one organization entry, remove the intern lab assistant entry and "Permanent"/"Tetap" wording, and fill in the `2023 - Present` / `2023 - Sekarang` education period without placeholder tags.

**Architecture:** Extend `ExperienceItem` in `src/data/profile.ts` to hold an array of `ExperienceRole` periods under a single organization/location/overall-period entry, then update `src/components/home/Experience.astro` to render grouped sub-roles stacked newest-first alongside single-role entries and clean education period styling.

**Tech Stack:** Astro 7, TypeScript, scoped CSS.

**Spec:** `docs/superpowers/specs/2026-11-16-experience-section-design.md`

## Global Constraints
- Bilingual parity across `en` and `id` in `src/data/profile.ts` with zero `[TODO]` strings or `.placeholder-tag` markup remaining in `#experience`.
- Preserve monochrome datasheet CSS variables (`--bg`, `--surface`, `--fg`, `--muted`, `--line`, `--border-strong`) from `src/styles/global.css`.
- Preserve `[data-timeline-wrap]` and `[data-timeline-progress]` attributes consumed by GSAP ScrollTrigger in `src/scripts/animations/page-controllers.ts`.
- Keep responsive 2-column grid (`260px 1fr`, collapsing to `1fr` at `max-width: 860px`) intact.

## Review Focus
1. Grouped RES Lab entry renders newest sub-period (`Jun 2026 - Present` / `Jun 2026 - Sekarang`) above older sub-period (`Jul 2025 - Jun 2026`), while single-role entry (`CV. Putra Anugrah Mandiri`) renders role, organization, summary, and highlights cleanly without redundant sub-period borders.
2. Both English (`dist/index.html`) and Indonesian (`dist/id/index.html`) outputs contain `2023 - Present` / `2023 - Sekarang`, both RES Lab practicum lists, and zero occurrences of `TODO`, `placeholder-tag`, `Permanent`, `Tetap`, or `Asisten Magang Laboratorium` in `#experience`.
3. Heading hierarchy inside `#experience` stays valid (`h2.exp-heading` -> `h3` for entry/org title -> `h4` for grouped sub-role titles -> `h3.edu-degree`).
4. `[data-timeline-wrap]` and `[data-timeline-progress]` remain attached to the timeline container and fill bar so scroll-scrub animation continues working.
5. Stacked sub-roles stay legible and well-spaced on mobile (`<= 860px`) without horizontal overflow.

---

### Task 1: Update `ExperienceItem` schema and experience/education data

**Files:**
- Modify: `src/data/profile.ts:3-137`

**Interfaces:**
- Produces:
  - `export interface ExperienceRole { role: Record<Lang, string>; period: Record<Lang, string>; todoPeriod?: boolean; summary: Record<Lang, string>; highlights: Record<Lang, string[]>; }`
  - `export interface ExperienceItem { org: string; location: string; period: Record<Lang, string>; todoPeriod?: boolean; roles: ExperienceRole[]; }`
  - `profile.education.period`: `{ en: '2023 - Present', id: '2023 - Sekarang' }`
  - `experiences: ExperienceItem[]` containing RES Lab (2 stacked roles) and CV. Putra Anugrah Mandiri (1 role).

- [ ] **Step 1: Define `ExperienceRole` and update `ExperienceItem` in `src/data/profile.ts`**
  Update lines 3-11 to export `ExperienceRole` and replace flat `role`/`summary`/`highlights` on `ExperienceItem` with `roles: ExperienceRole[]`.

- [ ] **Step 2: Update `profile.education.period` in `src/data/profile.ts`**
  Set `period` to `{ en: '2023 - Present', id: '2023 - Sekarang' }`.

- [ ] **Step 3: Replace `experiences` array in `src/data/profile.ts`**
  - Entry 1: `org: 'Robotic and Embedded System Laboratory, Teknik Komputer, Universitas Andalas'`, `location: 'Padang, ID'`, `period: { en: 'Jul 2025 - Present', id: 'Jul 2025 - Sekarang' }`, `todoPeriod: false`, `roles`:
    1. `period: { en: 'Jun 2026 - Present', id: 'Jun 2026 - Sekarang' }`, `role: { en: 'Laboratory Assistant & Inventory Coordinator', id: 'Asisten Laboratorium & Koordinator Inventaris' }`, summary & highlights covering Inventory Coordinator, Embedded Systems and IoT practicum assistantship, and Electronics practicum assistantship.
    2. `period: { en: 'Jul 2025 - Jun 2026', id: 'Jul 2025 - Jun 2026' }`, `role: { en: 'Laboratory Assistant & Inventory Division Staff', id: 'Asisten Laboratorium & Staf Divisi Inventaris' }`, summary & highlights covering Inventory Division Staff, Introduction to Circuit Analysis practicum assistantship, and Electric Circuits practicum assistantship.
  - Entry 2: `org: 'CV. Putra Anugrah Mandiri'`, `location: 'Indonesia'`, `period: { en: 'Jan 2025 - Feb 2025', id: 'Jan 2025 - Feb 2025' }`, `todoPeriod: false`, `roles`:
    1. `period: { en: 'Jan 2025 - Feb 2025', id: 'Jan 2025 - Feb 2025' }`, `role: { en: 'Programmer Intern', id: 'Programmer (Magang)' }`, preserving existing summary & highlights.
  - Remove the `Intern Laboratory Assistant` / `Asisten Magang Laboratorium` entry.

- [ ] **Step 4: Verify TypeScript definitions**
  Run `npx astro check` (expected: reports type error only in `Experience.astro` until Task 2 updates template consumption, or 0 errors in `src/data/profile.ts`).

---

### Task 2: Render grouped sub-periods and clean education period in `Experience.astro`

**Files:**
- Modify: `src/components/home/Experience.astro:22-183`

**Interfaces:**
- Consumes: `experiences: ExperienceItem[]` and `profile.education` from `src/data/profile.ts` (Task 1).

- [ ] **Step 1: Update timeline item template in `src/components/home/Experience.astro`**
  Inside `experiences.map((item) => ...)`:
  - Compute `const isGrouped = item.roles.length > 1;` and `const RoleTag = isGrouped ? 'h4' : 'h3';`.
  - Render `.timeline-meta` with `item.period[lang]`.
  - When `isGrouped`, render `<h3 class="item-org-title">{item.org}</h3>` and `<p class="item-org">{item.location}</p>` at the top of `.timeline-content`.
  - Map `item.roles` through a single `.role-list` / `.role-entry` block so summary and highlights are never duplicated:
    - When `isGrouped`, render `<span class="subrole-period">{entry.period[lang]}</span>`.
    - Render `<RoleTag class="item-role">{entry.role[lang]}</RoleTag>`.
    - When `!isGrouped`, render `<p class="item-org">{item.org}, {item.location}</p>`.
    - Render `<p class="item-summary">{entry.summary[lang]}</p>` and `<ul class="item-highlights">`.

- [ ] **Step 2: Remove hardcoded `.placeholder-tag` on `.edu-period` in `src/components/home/Experience.astro`**
  Replace `<span class="placeholder-tag">{profile.education.period[lang]}</span>` with `<span class="item-period">{profile.education.period[lang]}</span>`.

- [ ] **Step 3: Add scoped CSS for grouped organization header and stacked sub-roles in `src/components/home/Experience.astro`**
  Style `.item-org-title`, `.role-list` (`display: flex; flex-direction: column; gap: 1.5rem;`), `.role-entry + .role-entry` (`padding-top: 1.5rem; border-top: 1px dashed var(--line);`), and `.subrole-period` (`font-family: var(--font-mono); font-size: 0.8125rem; color: var(--muted);`) using existing design tokens.

- [ ] **Step 4: Run build and verify rendered HTML outputs**
  Run `npm run build` (Expected: exits with code 0) and inspect the `#experience` section in `dist/index.html` and `dist/id/index.html` to verify:
  - Both RES Lab sub-periods (`Jun 2026 - Present` / `Jun 2026 - Sekarang` and `Jul 2025 - Jun 2026`) and all courses are present.
  - `2023 - Present` and `2023 - Sekarang` are present in `#experience` without `placeholder-tag`.
  - None of `TODO`, `Permanent`, `Tetap`, or `Asisten Magang Laboratorium` appear in `#experience`.

---

### Task 3: Add Documentary Photos to Experience Entries

**Files:**
- Modify: `src/data/profile.ts`
- Modify: `src/components/home/Experience.astro`

**Interfaces:**
- Produces in `src/data/profile.ts`: `ExperiencePhoto` (`{ src: ImageMetadata; alt: Record<Lang, string>; }`) attached as `photo?: ExperiencePhoto` on `ExperienceItem`.
- Consumes in `src/components/home/Experience.astro`: `Image` from `'astro:assets'` and `item.photo`.

- [ ] **Step 1: Import photos and add `photo` field to `ExperienceItem` in `src/data/profile.ts`**
  Import `ImageMetadata` from `'astro'`, `../assets/Asisten Reslab 2025-2026.webp`, and `../assets/Laporan_PKL_IEEE.webp`, and attach `photo` with bilingual `alt` text to both `experiences` entries.

- [ ] **Step 2: Render `<Image />` in `.timeline-meta` in `src/components/home/Experience.astro`**
  Import `{ Image } from 'astro:assets'`. Inside `.timeline-meta` below `.item-period`, when `item.photo` exists, render `<Image src={item.photo.src} alt={item.photo.alt[lang]} width={520} height={390} class="timeline-photo" loading="lazy" />`.

- [ ] **Step 3: Add scoped CSS for `.timeline-photo` in `src/components/home/Experience.astro`**
  Style `.timeline-photo` (`width: 100%; height: auto; aspect-ratio: 4 / 3; object-fit: cover; border-radius: 4px; border: 1px solid var(--line); background-color: var(--surface); margin-top: 0.35rem;`) with `max-width: 360px;` under `@media (max-width: 860px)` and full natural color (no grayscale filter).

- [ ] **Step 4: Verify rendered HTML output for both `en` and `id`**
  Inspect `#experience` in `http://localhost:4321/` and `http://localhost:4321/id/` to verify both `<img>` tags render with optimized `/_image` sources, `4/3` dimensions, and localized `alt` text.
