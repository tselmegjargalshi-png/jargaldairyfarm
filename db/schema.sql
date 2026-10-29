-- Ц. Жаргал | Сүүний аж ахуй — database schema (PostgreSQL)
-- Safe to run repeatedly: `npm run db:setup`

CREATE TABLE IF NOT EXISTS settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS articles (
  id serial PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  excerpt text NOT NULL DEFAULT '',
  body text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT '',
  cover_url text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published')),
  seo_title text NOT NULL DEFAULT '',
  seo_description text NOT NULL DEFAULT '',
  published_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS media (
  id serial PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  category text NOT NULL,
  kind text NOT NULL CHECK (kind IN ('image','video')),
  url text NOT NULL,
  poster_url text NOT NULL DEFAULT '',
  is_sample boolean NOT NULL DEFAULT false,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS services (
  id serial PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  summary text NOT NULL DEFAULT '',
  details text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'interest' CHECK (status IN ('interest','open','paused')),
  price_note text NOT NULL DEFAULT '',
  schedule_note text NOT NULL DEFAULT '',
  sort_order int NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS inquiries (
  id serial PRIMARY KEY,
  kind text NOT NULL,
  org_name text NOT NULL DEFAULT '',
  contact_name text NOT NULL,
  phone text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  topic text NOT NULL DEFAULT '',
  message text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new','read','archived')),
  ip_hash text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS inquiries_created_idx ON inquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS inquiries_ip_idx ON inquiries (ip_hash, created_at);

-- Added after first release: preferred meeting time + new inquiry kinds (idempotent)
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS preferred_time text NOT NULL DEFAULT '';
ALTER TABLE inquiries DROP CONSTRAINT IF EXISTS inquiries_kind_check;
ALTER TABLE inquiries ADD CONSTRAINT inquiries_kind_check
  CHECK (kind IN ('partnership','interest','contact','meeting','training'));
