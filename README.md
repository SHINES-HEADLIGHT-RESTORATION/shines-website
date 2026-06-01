# SHINES — Headlight Restoration

Marketing site and booking platform for SHINES headlight restoration (Belgium & Europe).

## Local development

```bash
npm install
cp .env.example .env.local
# Enable booking locally:
# NEXT_PUBLIC_BOOKING_ENABLED=true
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Public site vs booking

Online booking is **disabled by default** (`NEXT_PUBLIC_BOOKING_ENABLED=false`).

- Marketing pages, pricing, contact, and news remain public.
- `/book`, `/booking/*`, and booking APIs redirect or return 403 until you set `NEXT_PUBLIC_BOOKING_ENABLED=true` in Vercel.

## Deploy on Vercel (free tier)

1. Push this repo to GitHub (public is fine for the free Hobby plan).
2. Import the repo in [Vercel](https://vercel.com/new).
3. Add environment variables from `.env.example` (do **not** commit secrets).
4. Leave `NEXT_PUBLIC_BOOKING_ENABLED=false` until you are ready to accept online bookings.
5. Deploy.

**Note:** Bookings are stored in `data/bookings.json` locally. Vercel serverless has a read-only filesystem, so persistent booking on production requires a database or blob storage (future work).

## Admin

`/admin` is password-protected via `ADMIN_PASSWORD`. Keep a strong password in Vercel env vars only.
