# Design Direction: Rahmat Fajar Saputra Portfolio

Reading this as: Personal engineering portfolio for recruiters and technical clients, in a monochrome component-datasheet editorial language, dial ENERGY 2 / RHYTHM 3 / MOTION 3.

## Dials
- Dial: ENERGY 2 / RHYTHM 3 / MOTION 3

## Design Decisions & One-Line Reasons (R-31)
- **Color Palette (Monochrome Warm Paper & Carbon):** Warm off-white (`#F4F4F2`) and carbon (`#0E0E0E`) mimic printed hardware component datasheets and e-ink technical manuals without relying on decorative gradients.
- **Single Functional Accent (Block Inversion):** Interactive focus and primary actions invert foreground and background (`--fg` on `--bg` flips to `--bg` on `--fg`) so state changes are unmistakable at 17:1+ contrast without decorative color noise.
- **Typography (`Bricolage Grotesque` + `IBM Plex Sans` + `IBM Plex Mono`):** `Bricolage Grotesque` gives structural character to large display titles; `IBM Plex Sans` carries long-form technical copy with high legibility; `IBM Plex Mono` is restricted strictly to tabular index numbers, timestamps, and datasheet spec metadata.
- **Layout & Section Rhythm (RHYTHM 3):** Every section uses a distinct structural layout tied to its content: asymmetric 2-column 3D split in Hero, full-bleed horizontal pinned track in Selected Works, numbered specification rows in About, vertical scrub timeline in Experience, and a multi-column datasheet specification table in Skills.
- **Motion (MOTION 3):** Motion is concentrated in two functional moments: interactive 3D hardware inspection in the Hero and GSAP horizontal scroll + Flip layout filtering in Works, with complete static fallbacks under `prefers-reduced-motion: reduce`.
- **No Unverified Claims or Avatars:** Experience entries with unknown dates are explicitly marked `[TODO]`, and placeholder project entries carry a visible `Placeholder Entry` tag.
