# Works Detail Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Modernize the Works Detail page UI/UX by removing raw pseudo-syntax (`//`), introducing breadcrumbs, sticky metadata sidebar, two-way work navigation, polished architecture node flows, and code block copy functionality without AI slop.

**Architecture:** Astro component architecture using Astro's Content Collections and static paths. Updates `WorkDetailView.astro` template and scoped CSS, enhances `[slug].astro` route props to supply both previous and next entries, expands i18n dictionary, cleans up markdown `.tech-arch` markup, and adds lightweight vanilla client-side interactivity for code copying.

**Tech Stack:** Astro 5 / 7, TypeScript, CSS (vanilla scoped), SVG icons.

**Spec:** `docs/superpowers/specs/2026-11-11-works-detail-redesign-design.md`

## Global Constraints
- Strictly follow anti-slop rules: no generic purple gradients, no floating soft shadows, no excessive rounded pills, no decorative emoji, no fake AI capsule badges.
- Preserve existing palette CSS variables (`--bg`, `--surface`, `--fg`, `--muted`, `--line`, `--border-strong`, `--inv-bg`, `--inv-fg`).
- Preserve font stack: `Bricolage Grotesque Variable` for headings, `IBM Plex Sans` for body, `IBM Plex Mono` for code and metadata.
- Fully accessible keyboard navigation (`:focus-visible`) and responsive down to mobile viewports (<640px).

## Review Focus
1. Previous/Next cyclic navigation wraps correctly without crashing for the first/last items in the collection.
2. Code block copy button handles missing Clipboard API gracefully and resets its "Copied" state after a timeout.
3. Sticky sidebar behavior does not overlap content or break layout on narrow/mobile viewports.
4. Breadcrumb and all newly introduced strings are translated across both `en` and `id` locales.
5. High contrast focus rings are visible on all interactive elements.

---

### Task 1: Update Route Props & i18n Dictionary for 2-Way Navigation & Breadcrumbs

**Files:**
- Modify: `src/i18n/ui.ts`
- Modify: `src/pages/work/[slug].astro`
- Modify: `src/pages/id/work/[slug].astro`

**Interfaces:**
- Consumes: Astro Content Collections `works`
- Produces: `prevEntry` prop alongside `nextEntry` to `WorkDetailView.astro`, new i18n keys (`detail.prev`, `detail.breadcrumb.home`, `detail.breadcrumb.works`, `detail.copyCode`, `detail.copiedCode`, `detail.allWorks`).

- [ ] **Step 1: Add new translation keys in `src/i18n/ui.ts`**
Add:
- `detail.prev`: "Previous Work" / "Proyek Sebelumnya"
- `detail.breadcrumb.home`: "Home" / "Beranda"
- `detail.breadcrumb.works`: "Works" / "Karya"
- `detail.copyCode`: "Copy" / "Salin"
- `detail.copiedCode`: "Copied!" / "Tersalin!"
- `detail.allWorks`: "All Works" / "Semua Karya"

- [ ] **Step 2: Update `src/pages/work/[slug].astro` to pass `prevEntry`**
Compute:
```ts
prevEntry: entries[(idx - 1 + entries.length) % entries.length],
nextEntry: entries[(idx + 1) % entries.length],
```
Pass `prevEntry` into `<WorkDetailView />`.

- [ ] **Step 3: Update `src/pages/id/work/[slug].astro` to pass `prevEntry`**
Same logic for Indonesian locale route.

- [ ] **Step 4: Verify syntax & route exports**
Verify `src/pages/work/[slug].astro` and `src/pages/id/work/[slug].astro` compile without type errors.

---

### Task 2: Refactor Markdown Case Studies (Remove `//` & Pseudo-Syntax)

**Files:**
- Modify: `src/content/works/id/pamtrack.md`
- Modify: `src/content/works/en/pamtrack.md`

**Interfaces:**
- Consumes: Markdown content
- Produces: Clean semantic markup in `.tech-arch` without `//` slashes.

- [ ] **Step 1: Refactor `src/content/works/id/pamtrack.md`**
Replace:
- `TOPOLOGY // EVENT-DRIVEN DISPATCH PIPELINE` -> `PIPELINE TOPOLOGI SISTEM`
- `01 // TIER KLIEN & TIM` -> `<span class="tech-arch-step">01</span> Tier Klien & Tim`
- `02 // DATA LAYER & KEAMANAN` -> `<span class="tech-arch-step">02</span> Data Layer & Keamanan`
- `03 // ENGINE OTOMASI` -> `<span class="tech-arch-step">03</span> Engine Otomasi`
- `04 // ENDPOINT PENERIMA` -> `<span class="tech-arch-step">04</span> Endpoint Penerima`

- [ ] **Step 2: Refactor `src/content/works/en/pamtrack.md`**
Apply identical cleanup to the English version.

- [ ] **Step 3: Check remaining markdown files for unwanted `//` decoration**
Ensure any other case studies have clean headings and copy.

---

### Task 3: Modernize Topbar, Breadcrumbs, Cover Media, and Bottom Navigation

**Files:**
- Modify: `src/views/WorkDetailView.astro`

**Interfaces:**
- Consumes: `Props` including `lang`, `entry`, `prevEntry`, `nextEntry`
- Produces: Polished topbar with breadcrumb, back link with SVG arrow, refined cover container, and 2-way bottom work navigation.

- [ ] **Step 1: Update `WorkDetailView.astro` Props interface**
Add `prevEntry: CollectionEntry<'works'>;` to `Props`.

- [ ] **Step 2: Implement Breadcrumb & Modern Topbar**
Replace raw `SPEC // ...` with:
- Back button with sleek inline SVG left arrow.
- Breadcrumb trail: `Home / Works / [Title]`.
- Badges for Subsystem (`Software`, `IoT`, `AI`) and Year without `//`.

- [ ] **Step 3: Refactor Placeholder Banner**
Replace raw border box with an elegant informative callout card containing an info SVG icon and clean, legible text.

- [ ] **Step 4: Refactor Cover Media Container**
Add a refined frame with subtle contrast border, rounded corner micro-radius (`2px` matching site token), and image hover/focus state.

- [ ] **Step 5: Implement 2-Way Work Navigation Footer**
Render:
- Previous work card (with direction indicator `←`, title, category, year).
- Center "All Works" button with grid icon.
- Next work card (with direction indicator `→`, title, category, year).

---

### Task 4: Modernize Sidebar into a Sticky Spec Dashboard

**Files:**
- Modify: `src/views/WorkDetailView.astro`

**Interfaces:**
- Consumes: `entry.data.role`, `entry.data.category`, `entry.data.year`, `entry.data.specs`, `entry.data.stack`
- Produces: Sticky, modular specifications sidebar.

- [ ] **Step 1: Update Sidebar Layout & Positioning**
Set `position: sticky; top: 6rem;` on desktop (`@media (min-width: 901px)`).
Ensure responsive fallback for tablet/mobile (`position: static`).

- [ ] **Step 2: Redesign Specification List Items (`.meta-item`)**
Group specifications cleanly:
- Label (`dt`): uppercase, mono-meta, muted.
- Value (`dd`): font-medium, clear foreground color.
- Subtle row separator using `var(--line)` and comfortable padding.

- [ ] **Step 3: Redesign Tech Stack Pills (`.stack-pills`)**
Style tech pills with `var(--bg)` background on `var(--surface)` container, subtle `var(--border-strong)` border, and smooth hover state.

---

### Task 5: Enhance Prose Content, Architecture Node Flow & Code Block Copying

**Files:**
- Modify: `src/views/WorkDetailView.astro`

**Interfaces:**
- Consumes: Rendered `<Content />` component
- Produces: Enhanced typography, styled `.tech-arch` component, client-side code copy functionality.

- [ ] **Step 1: Redesign `.tech-arch` architecture styles**
Update CSS in `WorkDetailView.astro`:
- Header with clean badges.
- Node cards with distinct step indicator badge (`.tech-arch-step`), clear title, and concise bullet points.
- Connector line and arrow redesigned with clean geometry and high contrast.

- [ ] **Step 2: Add Code Block Header & Copy Button Script**
In `WorkDetailView.astro`:
Add client-side script that:
- Finds all `.detail-prose pre` elements.
- Wraps or injects a clean top toolbar with a code label and a "Copy" button.
- Copies code on click, changes text to "Copied!", and reverts after 2000ms.
- Accessible via keyboard and screen readers.

- [ ] **Step 3: Polish prose typography**
Improve `h2`, `h3`, `p`, `ul`, `ol` spacing and readability in `.detail-prose`.

---

### Task 6: Visual & Functional Verification

**Files:**
- Test across locales: `/work/pamtrack` and `/id/work/pamtrack`
- Test across other works: `/work/smart-greenhouse-monitor`, `/id/work/smart-greenhouse-monitor`, etc.

- [ ] **Step 1: Check build & rendering**
Run test or build to ensure zero errors.

- [ ] **Step 2: Anti-slop checklist verification**
Run through the antislop-ui checklist:
- No generic gradients or purple glows.
- No decorative emojis in UI copy.
- No raw `//` pseudo-syntax.
- Correct contrast and keyboard focus visibility.
- Mobile layout verified down to small screens.
