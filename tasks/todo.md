# Production launch: SHINES shines.be

Master checklist. Full step-by-step instructions: **[docs/LAUNCH.md](../docs/LAUNCH.md)**

## Launch todos

### Vercel & GitHub
- [x] Import `SHINES-HEADLIGHT-RESTORATION/shines-website` into Vercel (team: islamxyz)
- [x] Set core env vars in Vercel (`NEXT_PUBLIC_SITE_URL`, `ADMIN_PASSWORD`, `WORKSHOP_ADDRESS`, `NEXT_PUBLIC_BOOKING_ENABLED`, `RESEND_FROM`)
- [x] Deploy, live at https://shines-islamxyz.vercel.app
- [x] Push latest code to GitHub `master` (commit `0240e60`, auto-deployed)

### Domain (GoDaddy → Vercel)
- [x] Add `shines.be` + `www.shines.be` in Vercel Domains
- [ ] **YOU:** Point GoDaddy DNS, see [docs/DNS-GODADDY.md](../docs/DNS-GODADDY.md) (`A` → `76.76.21.21` for `@` and `www`)
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
- [x] Verify domain in Search Console (domain property `shines.be`, DNS verification, verified owner)
- [x] Submit sitemap: `https://shines.be/sitemap.xml` (submitted 2026-06-03; Google will process periodically)
- [ ] Optional: `GOOGLE_SITE_VERIFICATION` env only if you add a **URL-prefix** property (not needed for domain property)
- [x] Request indexing (daily quota), **10 URLs** submitted 2026-06-03 (`indexing-progress.log`); quota hit; resume tomorrow from line 10
- [ ] Continue indexing, **2026-06-05: 1/10** (fr-BE ok; quota at fr-FR); retry from `tasks/indexing-today.txt`; see [docs/INDEXING-DAILY.md](../docs/INDEXING-DAILY.md)
- [x] Fix canonical (code): www→apex redirect + self-referencing locale canonicals, **deploy to production** to take effect
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
- Added `src/lib/site-runtime.ts`, Vercel env overrides for contact, maps, Search Console
- Enhanced JSON-LD: opening hours, phone, full address from env
- Added `docs/LAUNCH.md`, complete launch playbook

## Review

**Live now:** https://shines-islamxyz.vercel.app (production, latest commit deployed)

**Vercel project:** islamxyz/shines, env vars set; booking disabled via `NEXT_PUBLIC_BOOKING_ENABLED=false`.

**Domain:** `shines.be` added in Vercel, waiting on GoDaddy DNS (`A` → `76.76.21.21`).

**Still manual (needs your accounts):** GoDaddy DNS, Resend API key + domain verify, Google Business Profile, Search Console, email inbox for info@.

**Blockers before live booking:** Neon Postgres or keep booking disabled.
