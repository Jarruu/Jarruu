# Works Detail Page Redesign Spec (Refined Engineering & Editorial)

## Intent & Why
The works detail page (`/work/[slug]` and `/id/work/[slug]`) currently feels raw and unpolished, heavily relying on pseudo-terminal `//` syntax (e.g. `SPEC // SOFTWARE · 2025`, `01 // TIER KLIEN & TIM`), an unanchored static sidebar, one-way bottom navigation, and bare-bones code presentation. The user requested elevating the UI/UX with Option 1 ("Refined Engineering & Editorial") while strictly avoiding AI slop.

## Goals
1. **Eliminate Raw `//` Pseudo-Syntax**:
   - Replace topbar `SPEC // CATEGORY · YEAR` with a clean breadcrumb (`Works / [Work Title]`) and a semantic category badge + year tag.
   - Refactor `.tech-arch` architecture flow in `pamtrack.md` (both `en` and `id`) and `WorkDetailView.astro` from `01 // ...` to polished numbered node cards (`01`, `02`, etc.) with clear, subtle flow connectors.
2. **Enhanced Navigation & UX**:
   - Topbar: Interactive back link with a clean SVG arrow icon and breadcrumb trail.
   - Bottom Navigation: Two-way navigation offering both "Previous Work" and "Next Work" cards with work category and year, plus a center "All Works" link.
3. **Sticky & Polished Sidebar**:
   - Make sidebar sticky on desktop (`position: sticky; top: 6rem;`) so it stays visible while scrolling long articles.
   - Restyle metadata list with clean contrast cards, subtle borders, and clear typographic hierarchy between label (`dt`) and value (`dd`).
   - Restyle tech stack badges into tactile, legible chips with subtle hover states.
4. **Content & Reading Experience**:
   - Cover media: Add subtle frame styling and metadata caption.
   - Placeholder banner: Refactor from a harsh raw box into a warm, understated callout note with an informative SVG icon.
   - Code blocks (`pre`): Add a clean header bar showing language label and an interactive copy-to-clipboard button.
5. **Anti-Slop Strict Adherence**:
   - No generic blue-purple gradients, no neon glowing effects, no excessive border radii, no decorative emoji.
   - Respect existing monochrome/neutral palette (`--bg`, `--surface`, `--fg`, `--muted`, `--line`, `--border-strong`).
   - Semantic HTML and full keyboard accessibility (`:focus-visible`).
6. **Bilingual Support**:
   - Ensure all UI strings are localized in `src/i18n/ui.ts` for both `en` and `id`.

## Non-Goals
- Changing the underlying content schema or Astro routing structure.
- Introducing heavy 3rd-party dependencies.
