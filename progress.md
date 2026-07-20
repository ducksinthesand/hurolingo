# Build progress log

Detailed record of every step taken to build the app, per spec.

## 2026-07-16 — v0.1.0 initial build

### 1. Planning
- Confirmed choices with owner: fully explicit content tier; 4 languages fully populated + 8 scaffolded as starter packs; Supabase delivered as schema + seed SQL with the app reading bundled JSON at runtime (offline-first); app later named "Hurolingo" (configurable in `src/config.js`).
- Architecture decided: Vite + React SPA, PWA via hand-written manifest + service worker, no backend at runtime, content as JSON source of truth with generated artifacts (catalogue.md, seed.sql), localStorage progress, AdSense placeholder slots.
- Arabic variant recommendation documented: Egyptian (widest reach via film/TV) + Levantine chosen for launch; Gulf and Maghrebi later; MSA skipped (nobody swears in formal Arabic).

### 2. Scaffold
- `package.json` (react 18, vite 5), `vite.config.js`, `index.html` (with commented AdSense script tag), `src/config.js` (app name, AdSense ids, gamification tuning in one place).
- PWA: `public/manifest.webmanifest`, `public/sw.js` (cache-first for same-origin GET, shell pre-cache, versioned cache, never caches ad requests), SVG icon + generated 192/512 PNG icons (Python/PIL).
- `src/theme.css`: joyful theme — purple/pink gradient logo, bouncy path nodes, confetti animation, card-based layout, rounded system font stack, bottom tab nav.

### 3. Content catalogue (biggest work item)
- 5 categories fixed (per spec, max 5): Playful & Silly, Safe in Public, Best-Friend Banter, Everyday Frustration, Full Send (explicit).
- Full languages (50 entries each): German; English (shared entries + variant-tagged en-GB/en-US/en-AU items like wanker/drongo/schmuck); French; Spanish (variant-tagged es-ES/es-419, incl. Mexican/Argentine/Chilean items).
- Starter languages (10 entries each): Portuguese (pt-PT/pt-BR), Mandarin Chinese, Japanese, Arabic (Egyptian + Levantine), Turkish, Dutch, Afrikaans, Russian.
- Every entry: original, phonetic, translation, literal translation, cultural note, category, severity 1–3, variant tags.
- Content rules enforced during authoring: no slurs, nothing targeting protected groups or appearance, no threats. Several statistically common terms in various languages were deliberately EXCLUDED as slurs (ethnic, homophobic, and mental-disability-based terms). Borderline items kept with warning notes: de-50 Hurensohn, ru-08 kozyol (criminal-slang weight), ar-09 ya kalb, en-47 bogan / fr-28 plouc (class-adjacent; notes advise irony/care).
- Total: 280 entries, 12 languages, 18 variants.

### 4. App build
- `src/data/index.js`: language registry, category definitions, variant filtering.
- `src/lib/lessons.js`: builds course path (units per category → lessons of 5), generates exercises: multiple choice (both directions), fill-the-blank (for multi-word phrases), match-pairs finale.
- `src/lib/store.js`: localStorage persistence, XP/level curve (level n = 100·n·(n+1)/2 total XP), 9 badges with earn logic.
- Screens: LanguagePicker (flag cards + starter-pack tags), PathScreen (variant chips, winding node path, lock/next/done states), LessonScreen (3 exercise types, per-answer feedback with literal translation + cultural note), ResultsScreen (confetti on perfect, XP + badge awards, interstitial ad slot with 3s countdown), ProfileScreen (level bar, stats, badge wall).
- AdSlot component: renders labelled placeholder until `ADSENSE_CLIENT` + slot ids are set in config; then renders real `adsbygoogle` units. Banner slots on picker/path/profile; interstitial-style slot on results screen.
- No daily streak mechanics, per spec.

### 5. Supabase + generators
- `supabase/schema.sql`: languages, variants, categories, entries, entry_variants; public read-only RLS.
- `scripts/generate.mjs`: generates `content/catalogue.md` (offline master, per spec) and `supabase/seed.sql` from the JSON source of truth. Wired as `npm run generate`.

### 6. Verification
- `npm install` clean; `npm run generate` → 12 languages / 280 entries; `vite build` succeeds (bundle ~70 kB gzipped).
- Final content review pass against AdSense derogatory-content rules: see "flagged for owner review" below.

### Flagged for owner review (borderline entries)
- **de-50 Hurensohn** — extremely strong; kept with a warning note. Remove if you want a safety margin.
- **es-39 pendejo / es-43 pelotudo** — strong but standard phrasebook fare; kept.
- **en-47 bogan, fr-28 plouc** — class-based; notes advise ironic use only. Remove if uncomfortable.
- **ru-08 kozyol** — kept with explicit cultural warning (criminal-slang weight).
- General: the "Full Send" category as a whole is what risks AdSense restricted serving. If monetization suffers, the fastest fix is hiding that category behind an opt-in toggle so default pages stay tamer.

### Open items
- [x] App named **Hurolingo** (2026-07-20): updated config.js, manifest, index.html title, sw.js cache name, package.json, README
- [ ] Owner: create GitHub repo + Vercel project (see README)
- [ ] Owner: AdSense application + real ids in src/config.js
- [ ] Owner: run schema.sql + seed.sql in own Supabase project
- [ ] Later: expand starter languages to 50 entries each (native-speaker review recommended)
- [ ] Later: audio pronunciation, per-language leaderboards, community submissions via Supabase
