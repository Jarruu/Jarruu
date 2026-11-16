# Skills Section & Tech Logo Hover Cards Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update Skills headings and technology entries in `src/i18n/ui.ts` and `src/data/profile.ts`, round sharp corners in `#specs`, and display full-color local brand logos inside a rounded hover card for every technology chip.

**Architecture:** Install `@iconify-json/devicon` as a devDependency and resolve multi-color SVG bodies at build time via `src/data/skill-icons.ts` (with crisp fallback SVGs for non-brand hardware/protocol items). Update `Skills.astro` to render focusable rounded `.skill-chip` elements containing `.skill-hover-card` overlays revealed on `:hover` and `:focus-visible`.

**Tech Stack:** Astro 7, TypeScript, `@iconify-json/devicon`, scoped CSS.

**Spec:** `docs/superpowers/specs/2026-11-16-skills-section-design.md`

## Global Constraints
- All brand logos load locally at build time (`@iconify-json/devicon`) with zero runtime CDN requests.
- Preserve responsive 3-column table (`1fr 1.8fr 1.3fr`, collapsing at `<= 960px`) and palette variables (`--bg`, `--surface`, `--fg`, `--muted`, `--line`).
- All skill frames/chips/hover cards use rounded corners (`border-radius: 8px` / `12px`) and accessible keyboard focus (`:focus-visible`).

## Review Focus
1. Every one of the 24 skill items across all 4 `skillGroups` resolves to at least 1 valid SVG icon (zero empty or missing icons).
2. Combined items (`C / C++`, `TypeScript / JavaScript`, `PyTorch / TensorFlow`, `NumPy / Pandas`, `ESP32 / Arduino`, `Git & GitHub`) render both brand logos side-by-side.
3. Hover cards are not clipped by `.spec-row` or `.spec-sheet` (`overflow: visible`) and respect `prefers-reduced-motion: reduce`.
4. Bilingual headings and column headers in `src/i18n/ui.ts` match `Skills & Technologies` / `Keahlian & Teknologi` without draft markers.
5. `C#`, `Dart`, `Astro`, `React`, `Next.js`, `Laravel`, `ASP.NET`, `NestJS`, `REST APIs`, `Git & GitHub`, `Arduino IDE` match the user's exact list and `Linux CLI` is removed.

---

### Task 1: Install `@iconify-json/devicon` and inspect icon keys

**Files:**
- Modify: `package.json`, `package-lock.json`

- [ ] **Step 1: Install `@iconify-json/devicon` as a devDependency**
  Run `npm install -D @iconify-json/devicon` (in sandbox first; bypass sandbox if network requires).

- [ ] **Step 2: Verify exact Devicon icon names**
  Inspect `node_modules/@iconify-json/devicon/icons.json` keys for `c`, `cplusplus`, `python`, `typescript`, `javascript`, `csharp`, `dart`, `pytorch`, `tensorflow`, `opencv`, `numpy`, `pandas`, `raspberrypi`, `arduino`, `astro`, `react`, `nextjs`, `laravel`, `dotnetcore`, `nestjs`, `git`, `github`.

---

### Task 2: Create `src/data/skill-icons.ts` and update `src/i18n/ui.ts` + `src/data/profile.ts`

**Files:**
- Create: `src/data/skill-icons.ts`
- Modify: `src/i18n/ui.ts:73-76,181-184`
- Modify: `src/data/profile.ts:162-207`

**Interfaces:**
- Produces in `src/data/skill-icons.ts`: `export interface TechLogo { label: string; viewBox: string; body: string; }` and `export function getSkillLogos(skillName: string): TechLogo[]`.

- [ ] **Step 1: Create `src/data/skill-icons.ts`**
  Load `@iconify-json/devicon/icons.json` statically, normalize `viewBox` (`0 0 ${width} ${height}`), map every skill label in `skillGroups` to its multi-color Devicon SVG(s) plus crisp technical inline SVGs for non-brand items (`YOLO Object Detection`, `Edge Inference`, `ESP32`, `MQTT & HTTP Telemetry`, `I2C / SPI / UART`, `Sensor & Actuator Interfacing`, `REST APIs`).

- [ ] **Step 2: Update `src/i18n/ui.ts`**
  Update `skills.heading` (`Skills & Technologies` / `Keahlian & Teknologi`) and `skills.col.items` (`Tools & Technologies` / `Perangkat & Teknologi`).

- [ ] **Step 3: Update `skillGroups` in `src/data/profile.ts`**
  Update `Languages & Core` (`['C / C++', 'Python', 'TypeScript / JavaScript', 'C#', 'Dart']`) and `Software & Tooling` (`['Astro', 'React', 'Next.js', 'Laravel', 'ASP.NET', 'NestJS', 'REST APIs', 'Git & GitHub', 'Arduino IDE']`).

---

### Task 3: Render rounded chips and logo hover cards in `src/components/home/Skills.astro`

**Files:**
- Modify: `src/components/home/Skills.astro:1-112`

- [ ] **Step 1: Update `Skills.astro` markup**
  Import `getSkillLogos` from `../../data/skill-icons`. Render each item inside `.spec-tags li` as a `<button type="button" class="skill-chip">` with a floating `.skill-hover-card` (`role="tooltip"` / `aria-hidden="true"` visual card showing the colored `<svg>` logo(s) via `set:html={logo.body}` and the skill title).

- [ ] **Step 2: Update `Skills.astro` scoped CSS**
  Apply `border-radius: 8px` on `.skill-chip` (and rounded card styling `border-radius: 12px` on `.skill-hover-card` and `.spec-sheet`), hover/focus reveal transitions (`opacity` + `transform`), safe z-index layering, and `@media (prefers-reduced-motion: reduce)`.

- [ ] **Step 3: Verify rendered HTML and SVG logos on `http://localhost:4321/` and `http://localhost:4321/id/`**
  Confirm all 24 skill chips render valid SVG bodies, localized headings appear, and zero draft markers remain.
