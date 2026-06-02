# SHINES Headlight Restoration

Marketing site and online booking for SHINES headlight restoration (Belgium & Europe).

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## GitHub (public repo): what stays private

A **public** GitHub repo is fine for Vercel’s free Hobby plan. You do **not** need to disable booking on the live site.

What must **never** be committed (already in `.gitignore`):

- `.env.local`: passwords, Stripe keys, Resend API keys
- `data/bookings.json`: real customer appointments and PII

The booking **source code** in the repo is visible on a public repo (that is normal for open-source sites). If you want the codebase private too, switch the repo to **Private** on GitHub. Vercel still deploys private repos on the free plan.

Secrets and customer data stay in Vercel Environment Variables and your database/storage, not in git.

## Deploy on Vercel (free tier)

**Full launch playbook (domain, email, Google Maps, SEO):** see [docs/LAUNCH.md](docs/LAUNCH.md).

1. Import [SHINES-HEADLIGHT-RESTORATION/shines-website](https://github.com/SHINES-HEADLIGHT-RESTORATION/shines-website) in [Vercel](https://vercel.com/new).
2. Add environment variables from `.env.example` in the Vercel dashboard (never commit real values).
3. Set `ADMIN_PASSWORD`, `NEXT_PUBLIC_SITE_URL`, `WORKSHOP_ADDRESS`, and Resend keys (`RESEND_API_KEY`, `RESEND_FROM=SHINES <info@shines.be>`).
4. Deploy. Booking stays on unless you set `NEXT_PUBLIC_BOOKING_ENABLED=false`.

**Note:** Bookings are stored in `data/bookings.json` locally. Vercel serverless has a read-only filesystem, so production persistence needs a database (e.g. Neon via Vercel Marketplace) when you take live bookings on Vercel.

## Admin

`/admin` is password-protected via `ADMIN_PASSWORD`. Use a strong value in Vercel env vars only.
