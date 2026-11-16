# Skills Section Update & Tech Logo Hover Cards — Short Design

**Date:** 2026-11-16
**Size:** Small change
**Status:** Approved

## Intent & Why
Replace draft headings and placeholder skill entries in `#specs` with Fajar's actual programming languages and software stack, soften sharp rectangular tag frames with rounded corners, and reveal each technology's full-color original logo inside a hover card.

## Goals, Non-Goals, Anti-Goals
- **Goals:**
  - Update `skills.heading` in `src/i18n/ui.ts` to `Skills & Technologies` (`en`) / `Keahlian & Teknologi` (`id`).
  - Remove `(Draft - verify with Fajar)` / `(Draf - konfirmasi Fajar)` from `skills.col.items`.
  - Update `skillGroups` in `src/data/profile.ts`:
    - **Languages & Core:** `['C / C++', 'Python', 'TypeScript / JavaScript', 'C#', 'Dart']`
    - **AI & Computer Vision:** unchanged
    - **IoT & Embedded Hardware:** unchanged
    - **Software & Tooling:** `['Astro', 'React', 'Next.js', 'Laravel', 'ASP.NET', 'NestJS', 'REST APIs', 'Git & GitHub', 'Arduino IDE']`
  - Give all skill chips (`border-radius: 8px`) and hover cards (`border-radius: 12px`) gently rounded corners instead of sharp boxes.
  - Display a floating hover card on `:hover` / `:focus-visible` for every skill item showing full-color original brand SVG logos (side-by-side for combined items like `C / C++`, `TypeScript / JavaScript`, `PyTorch / TensorFlow`, `NumPy / Pandas`, `ESP32 / Arduino`, `Git & GitHub`), plus crisp technical fallback SVGs for non-brand concepts (`YOLO Object Detection`, `Edge Inference`, `ESP32`, `MQTT & HTTP Telemetry`, `I2C / SPI / UART`, `Sensor & Actuator Interfacing`, `REST APIs`).
- **Non-Goals:** Modifying sections outside `#specs` (`Skills.astro`), adding client-side icon CDN fetches, or introducing heavy JS tooltip libraries.
- **Anti-Goals:** Missing C# / ASP.NET brand icons, runtime external CDN dependency, clipped hover cards near container edges, or inaccessible hover-only elements without keyboard focus support.

## Constraints
- Offline/local build-time assets only (zero runtime external icon CDN calls).
- Preserves existing 3-column specification layout (`1fr 1.8fr 1.3fr`, collapsing at `<= 960px`) and monochrome page palette (`--bg`, `--surface`, `--fg`, `--muted`, `--line`).

## Approaches Considered
1. **Local `@iconify-json/devicon` devDependency + build-time SVG helper (chosen):** Provides authentic multi-color original brand SVGs for all required languages and frameworks (including C#, .NET/ASP.NET, Dart, Astro, NestJS, OpenCV, PyTorch, Arduino, etc.), rendered statically into HTML with zero runtime network requests.
2. **Local `simple-icons` (rejected):** Single-color monochrome paths rather than multi-color brand logos, and drops/restricts Microsoft/C#/.NET icons.
3. **External CDN (`cdn.simpleicons.org`) (rejected):** Runtime network dependency and fails offline.

## Design Decisions (What Changes)
- **`package.json`:** Install `@iconify-json/devicon` as a devDependency.
- **`src/data/skill-icons.ts`:** Build-time helper resolving multi-color brand SVGs from `@iconify-json/devicon/icons.json` (plus minimal technical inline SVGs for non-brand protocol/hardware concepts) into structured `{ viewBox, body }[]` arrays per skill label.
- **`src/i18n/ui.ts` & `src/data/profile.ts`:** Update headings, column label, and `skillGroups` arrays.
- **`src/components/home/Skills.astro`:** Render each skill item as an accessible focusable `.skill-chip` (`<button type="button">`) with rounded corners (`border-radius: 8px`) and a `.skill-hover-card` (`border-radius: 12px`) revealed smoothly on `:hover` and `:focus-visible`, with viewport-safe edge alignment on mobile/narrow screens.
