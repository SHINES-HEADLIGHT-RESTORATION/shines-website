# Production launch — SHINES shines.be

Master checklist. Full step-by-step instructions: **[docs/LAUNCH.md](../docs/LAUNCH.md)**

## Launch todos

### Vercel & GitHub
- [ ] Import `SHINES-HEADLIGHT-RESTORATION/shines-website` into Vercel (team: islamxyz)
- [ ] Set all env vars from `.env.example` in Vercel dashboard
- [ ] Deploy and confirm `*.vercel.app` URL works
- [ ] Push latest code to GitHub `master` (auto-deploy)

### Domain (GoDaddy → Vercel)
- [ ] Add `shines.be` + `www.shines.be` in Vercel Domains
- [ ] Point GoDaddy DNS A/CNAME records to Vercel
- [ ] Confirm HTTPS on `https://shines.be`

### Email (info@shines.be)
- [ ] Set up Cloudflare Email Routing OR Google Workspace inbox
- [ ] Verify `shines.be` in Resend + add SPF/DKIM DNS records
- [ ] Set `RESEND_API_KEY` + `RESEND_FROM=SHINES <info@shines.be>` in Vercel
- [ ] Test inbound + outbound email

### Google Business Profile (local SEO)
- [ ] Create profile at business.google.com
- [ ] Verify address (postcard/phone)
- [ ] Add photos, hours, services, website URL
- [ ] Set `CONTACT_*`, `MAPS_LINK` env vars in Vercel when address is live

### Search Console & SEO
- [ ] Verify domain via `GOOGLE_SITE_VERIFICATION` env var
- [ ] Submit sitemap: `https://shines.be/sitemap.xml`
- [ ] Request indexing for homepage, pricing, process, contact, main city page
- [ ] Register Bing Webmaster Tools (optional)

### Payments & booking
- [ ] Stripe keys + webhook (if mail-in return shipping is live)
- [ ] Decide: disable booking (`NEXT_PUBLIC_BOOKING_ENABLED=false`) OR add Neon Postgres
- [ ] Set strong `ADMIN_PASSWORD` in Vercel only

### Post-launch
- [ ] Ask customers for Google reviews
- [ ] Publish news articles monthly
- [ ] Add social profile URLs to `src/lib/site.ts` when live

## Code changes (this session)

- Contact email updated to `info@shines.be` in `src/lib/site.ts`, `.env.example`, `public/llms.txt`
- Added `src/lib/site-runtime.ts` — Vercel env overrides for contact, maps, Search Console
- Enhanced JSON-LD: opening hours, phone, full address from env
- Added `docs/LAUNCH.md` — complete launch playbook

## Review

**Blockers before “fully live booking”:** Vercel read-only filesystem — bookings need Neon Postgres or disable booking until migrated.

**Vercel status:** No `shines` project exists yet on team islamxyz — import from GitHub is the first manual step.

**Build:** passes locally after launch prep changes.
