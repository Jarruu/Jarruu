# Design Direction: Rahmat Fajar Saputra Portfolio

Reading this as: Personal engineering portfolio for recruiters and technical clients, in a monochrome component-datasheet editorial language, dial ENERGY 2 / RHYTHM 3 / MOTION 2.

## Dials
- Dial: ENERGY 2 / RHYTHM 3 / MOTION 2

## Design Decisions & One-Line Reasons (R-31)
- **Color Palette (Monochrome Warm Paper & Carbon):** Warm off-white (`#F4F4F2`) and carbon (`#0E0E0E`) mimic printed hardware component datasheets and e-ink technical manuals without relying on decorative gradients.
- **Single Functional Accent (Block Inversion):** Interactive focus and primary actions invert foreground and background (`--fg` on `--bg` flips to `--bg` on `--fg`) so state changes are unmistakable at 17:1+ contrast without decorative color noise.
- **Typography (`Bricolage Grotesque` + `IBM Plex Sans` + `IBM Plex Mono`):** `Bricolage Grotesque` gives structural character to large display titles; `IBM Plex Sans` carries long-form technical copy with high legibility; `IBM Plex Mono` is restricted to the live WIB clock and code, never to decorative section labels.
- **Layout & Section Rhythm (RHYTHM 3):** Every section uses a distinct structural layout tied to its content: asymmetric 2-column 3D split in Hero, full-bleed looping track in Work Showcase, three-column discipline rows in About, vertical scrub timeline in Experience, and a three-column specification table in Skills.
- **Motion (MOTION 2):** Motion is concentrated where it carries meaning: interactive 3D hardware inspection in the Hero, the looping showcase (with a visible pause control), and the Experience timeline scrub, all disabled under `prefers-reduced-motion: reduce`.
- **No Unverified Claims or Avatars:** Experience entries with unknown dates are explicitly marked `[TODO]`, and placeholder work entries carry a visible `Placeholder Entry` tag.
