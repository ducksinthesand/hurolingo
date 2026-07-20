# Hurolingo

A mobile-first PWA that teaches playful insults and curse words in 12 languages — Duolingo energy, zero politeness. Free, ad-supported, works offline.

## Quick start

```bash
npm install
npm run dev        # local dev server at http://localhost:5173
npm run build      # production build into dist/
npm run preview    # serve the production build locally
npm run generate   # regenerate content/catalogue.md + supabase/seed.sql from src/data/
```

Test the PWA features (installability, offline) against the production build (`npm run build && npm run preview`) — the service worker is disabled in dev mode.

## Renaming the app (if ever needed)

Set `APP_NAME` in `src/config.js`, and update `name`/`short_name` in `public/manifest.webmanifest` and the `<title>` in `index.html`. That's all three places.

## Project layout

```
src/data/*.json        ← SOURCE OF TRUTH for all content (12 languages)
src/data/index.js      ← language registry + the 5 categories
src/lib/lessons.js     ← builds course path + exercises from content
src/lib/store.js       ← localStorage progress, XP curve, badges
src/components/        ← screens (picker, path, lesson, results, profile)
src/config.js          ← app name, AdSense ids, gamification tuning
public/sw.js           ← service worker (offline caching)
content/catalogue.md   ← generated offline master catalogue
supabase/schema.sql    ← run once in Supabase SQL editor
supabase/seed.sql      ← generated; run after schema.sql
scripts/generate.mjs   ← regenerates catalogue.md + seed.sql
progress.md            ← build log
```

## Editing content

Edit the JSON files in `src/data/` (each entry: original, phonetic, translation, literal, note, category, severity, variants), then run `npm run generate` so `catalogue.md` and `seed.sql` stay in sync. Entries with `"variants": null` apply to every variant of the language; otherwise list the variant codes (e.g. `["en-GB", "en-AU"]`).

Content rules (keep these or lose your ad account): no slurs, nothing targeting ethnicity, religion, gender, sexuality, disability, appearance, or any protected group; no threats. Verify non-English additions with a native speaker.

## Deployment (Vercel)

1. Push this folder to a GitHub repo.
2. In Vercel: **Add New Project** → import the repo. Vite is auto-detected (build command `vite build`, output `dist`). Deploy.
3. Done — every push to `main` redeploys. Netlify works identically (build `npm run build`, publish `dist`).

## AdSense

1. Apply at [adsense.google.com](https://adsense.google.com) with your deployed domain. **Heads-up:** AdSense restricts ad serving on profanity-heavy pages, and this app is explicit by design. Expect "restricted ad serving" on some screens; alternatives if it bites: Ezoic, Monumetric, Carbon Ads, or direct sponsorships.
2. Once approved, in `src/config.js` set `ADSENSE_CLIENT` (`ca-pub-…`) and the two slot ids (`ADSENSE_SLOT_BANNER`, `ADSENSE_SLOT_INTERSTITIAL` — create two display ad units in the AdSense dashboard).
3. Uncomment the `adsbygoogle.js` script tag in `index.html` and put your client id in it.
4. Redeploy. The placeholder boxes become live ad units automatically. Until then, dashed placeholder boxes render where ads will go.

## Supabase

The app runs entirely from bundled JSON (that's what makes it work offline). Supabase is the canonical content database for later (CMS, live updates, community submissions):

1. Create a project at [supabase.com](https://supabase.com).
2. SQL editor → paste and run `supabase/schema.sql`.
3. Then paste and run `supabase/seed.sql` (regenerate any time with `npm run generate`).

Tables: `languages`, `variants`, `categories`, `entries`, `entry_variants` — read-only public RLS policies are included.

## Gamification

XP: 10 per correct answer, +20 perfect-lesson bonus (tunable in `src/config.js`). Level n requires `100·n·(n+1)/2` total XP. Nine badges in `src/lib/store.js`. No daily streaks, per spec. Progress lives in localStorage — clearing site data resets it.
