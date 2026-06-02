# GoDaddy DNS for shines.be → Vercel

**Status:** Domains are added in Vercel. DNS at GoDaddy is **not configured yet** — the site will not load on `shines.be` until you complete this (5 minutes).

## Steps at GoDaddy

1. Log in at [godaddy.com](https://www.godaddy.com) → **My Products**.
2. Open **shines.be** → **DNS** (or **Manage DNS**).
3. **Delete or edit** any existing `A` records for `@` and `www` that point elsewhere.
4. Add these records:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| **A** | `@` | `76.76.21.21` | 600 (or default) |
| **A** | `www` | `76.76.21.21` | 600 (or default) |

5. Save. Propagation usually takes **5–60 minutes** (sometimes up to 24h).
6. Vercel will email you when the domain is verified and SSL is active.

## Verify

- Vercel dashboard → **shines** project → **Settings → Domains** → both should show **Valid Configuration**.
- Open `https://shines.be` in your browser.

## Live URLs (before DNS)

Until DNS propagates, the site is live at:

- https://shines-islamxyz.vercel.app
- https://shines-three.vercel.app

## Email DNS (separate — do not remove website records)

When you set up **Resend** or **Cloudflare Email Routing**, you will add **additional** TXT/CNAME/MX records. Do not delete the Vercel `A` records above.

See [LAUNCH.md](./LAUNCH.md) Phase 3 for email setup.
