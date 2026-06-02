# Neon Postgres for live bookings

Bookings and admin availability use **Neon Postgres** in production. Without `POSTGRES_URL` / `DATABASE_URL`, the app falls back to local `data/*.json` (fine for dev, **not** for Vercel).

## 1. Add Neon in Vercel (5 min)

1. Open [Vercel Dashboard](https://vercel.com/islamxyz/shines) → project **shines**.
2. **Storage** tab → **Create Database** → **Neon** → **Continue**.
3. Region: **Frankfurt (eu-central-1)** or closest to Belgium.
4. Name: `shines-bookings` → **Create**.
5. Connect to project **shines** → environments **Production** + **Preview** → **Connect**.

Vercel adds `POSTGRES_URL` (and often `DATABASE_URL`) automatically.

## 2. Run database migration (once)

Pull env locally:

```bash
npx vercel env pull .env.local
```

Apply schema (imports `data/bookings.json` if the DB is empty):

```bash
npm run db:migrate
```

## 3. Redeploy

Push to GitHub or redeploy in Vercel so production uses the new env vars.

Bookings will persist in Postgres. Admin `/admin` and customer `/book` use the same store.

## Local development

| Setup | Behavior |
|-------|----------|
| No `POSTGRES_URL` in `.env.local` | Uses `data/bookings.json` + `data/availability.json` |
| With `POSTGRES_URL` from `vercel env pull` | Uses Neon (same as production) |

## Verify

1. Submit a test booking on `/book`.
2. Open `/admin` → appointment should appear.
3. Redeploy or wait — booking should still be there (proves Postgres, not ephemeral files).

## Schema

- `appointments` — booking rows (full JSON in `data` column)
- `availability_config` — admin calendar settings (single row `default`)

SQL source: `src/lib/db/schema.sql`
