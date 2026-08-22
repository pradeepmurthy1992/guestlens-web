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

## Deploying (GitHub Pages)

Deploys automatically via `.github/workflows/deploy.yml` on every push to
`main`. One-time setup:

1. **Settings → Pages → Build and deployment → Source → "GitHub Actions"**
2. **Settings → Secrets and variables → Actions → New repository secret** —
   add both:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. **In Supabase** (Authentication → URL Configuration), add
   `https://<username>.github.io/guestlens-web/**` to Redirect URLs, or the
   magic-link login won't redirect back correctly in production.
4. Push to `main` (or re-run the workflow manually) — the site publishes to
   `https://<username>.github.io/guestlens-web/`.

Because GitHub Pages serves static files with no server-side rewrites, the
app uses `HashRouter` (URLs look like `.../#/dashboard`) instead of
`BrowserRouter` — that's what makes client-side routing work without any
server config.

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
