-- ================================================================
-- Hurolingo content schema for Supabase
-- Run this once in your Supabase project's SQL editor,
-- then run seed.sql (regenerate it any time with `npm run generate`).
--
-- The app itself reads bundled JSON (offline-first). This database is
-- the canonical content store you can later wire up for live sync,
-- a CMS, or community submissions.
-- ================================================================

create table if not exists languages (
  code        text primary key,          -- 'de'
  name        text not null,             -- 'German'
  native_name text not null,             -- 'Deutsch'
  flag        text not null,             -- emoji
  status      text not null default 'starter' check (status in ('full', 'starter')),
  note        text
);

create table if not exists variants (
  code          text primary key,        -- 'en-GB'
  language_code text not null references languages(code) on delete cascade,
  name          text not null,           -- 'British'
  flag          text not null
);

create table if not exists categories (
  id    text primary key,                -- 'playful'
  name  text not null,
  emoji text not null,
  description text not null,
  sort_order int not null
);

create table if not exists entries (
  id            text primary key,        -- 'de-01'
  language_code text not null references languages(code) on delete cascade,
  original      text not null,
  phonetic      text not null,
  translation   text not null,
  literal       text not null,
  note          text not null,
  category_id   text not null references categories(id),
  severity      int  not null check (severity between 1 and 3)
);

-- Which variants an entry applies to. No rows = applies to all variants.
create table if not exists entry_variants (
  entry_id     text not null references entries(id) on delete cascade,
  variant_code text not null references variants(code) on delete cascade,
  primary key (entry_id, variant_code)
);

-- Public read-only access (content is not user data)
alter table languages      enable row level security;
alter table variants       enable row level security;
alter table categories     enable row level security;
alter table entries        enable row level security;
alter table entry_variants enable row level security;

create policy "public read languages"      on languages      for select using (true);
create policy "public read variants"       on variants       for select using (true);
create policy "public read categories"     on categories     for select using (true);
create policy "public read entries"        on entries        for select using (true);
create policy "public read entry_variants" on entry_variants for select using (true);
