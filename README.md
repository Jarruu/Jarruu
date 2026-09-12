# Fajar Portfolio

Portfolio of Rahmat Fajar Saputra, AI Software Developer.
Vite + React 19 + TypeScript + Tailwind CSS v4, with Supabase as the project
backend and a built-in `/admin` CMS.

## Run locally

1. `pnpm install`
2. Copy `.env.example` to `.env` and fill `VITE_SUPABASE_URL` and
   `VITE_SUPABASE_ANON_KEY`. Optional until you use `/admin`; without them
   the site runs on bundled data.
3. `pnpm dev`

## Backend setup (Supabase, once)

1. Create a project at supabase.com
2. SQL Editor, paste `supabase.sql`, Run (table `projects` + RLS + bucket
   `project-images`)
3. Authentication, Add user (login for `/admin`)
4. Project Settings, API, copy URL + anon key into `.env`, restart dev server
5. Upload project screenshots via Storage, `project-images`, paste the URL
   when adding a project in `/admin`

## Scripts

- `pnpm dev` / `pnpm build` / `pnpm preview` / `pnpm lint`

## Routes

- `/` Home · `/expertise` works archive · `/about` · `/contact`
- `/admin` project CMS (login required, not linked publicly)

## Contact form

POSTs JSON to `VITE_CONTACT_ENDPOINT` (Formspree/Web3Forms) when set,
otherwise falls back to a prefilled `mailto:`.
