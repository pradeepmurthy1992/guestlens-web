# GuestLens

The wedding memory platform for couples and photographers — professional
photos, guest photos, videos and voice wishes, collected in one private
gallery instead of scattered across WhatsApp and Google Drive.

## Stack

- React + Vite + Tailwind CSS v4
- Supabase (Auth, Postgres, Storage) — schema lives in `supabase/migrations`
- React Router

## Local development

```bash
npm install
npm run dev      # http://localhost:5173
npm run lint
npm run build
```

Copy `.env.example` to `.env` and fill in your Supabase project's URL and
anon/publishable key.

## Deploying (Vercel)

1. Import this repo at [vercel.com/new](https://vercel.com/new) — Vercel
   auto-detects the Vite framework preset, no build config needed.
2. Add two environment variables in the Vercel project settings:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Deploy. `vercel.json` in this repo handles the SPA rewrite so client-side
   routes (`/dashboard`, `/e/:slug`, etc.) work on direct load and refresh.

## Database

Schema and RLS policies are tracked as SQL migrations in
`supabase/migrations/`, applied in order. `supabase/SEED_DATA.md` documents
the one demo event seeded for the landing page's trust-stats bar — delete it
before real launch (instructions in that file).

## Status

Core product flow is live: auth, event creation, QR/guest upload (photo,
video, voice, message), reveal-gated gallery, and a scoped photographer
portal. Payment processing is not yet wired up — pricing is displayed but
plan upgrades are currently handled manually.
