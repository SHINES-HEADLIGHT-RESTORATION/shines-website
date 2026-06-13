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
- [ ] Continue indexing — **2026-06-07 batch done (10/10)**; next: `tasks/indexing-today.txt` (~2924 left); see [docs/INDEXING-DAILY.md](../docs/INDEXING-DAILY.md)
- [x] Fix canonical (code): www→apex redirect + self-referencing locale canonicals, **deploy to production** to take effect
- [ ] Register Bing Webmaster Tools (optional)

### SEO indexing fix — GSC 265 not indexed, 4 reasons (2026-06-13)
Evidence (live HTTP tests):
- **Page with redirect (62):** `www.`/`http://` host variants → 308 to apex. **Correct behavior, not a code bug.** Lever: don't link to www/http.
- **Duplicate without user-selected canonical (1):** caused by inconsistent canonicals below.
- **Discovered – currently not indexed (201):** new-site crawl budget + 14 near-duplicate `?locale=` URLs per page + canonical confusion. Improves with consistent canonicals + fewer dup URLs + time/authority. Not an instant fix.
- **Crawled – currently not indexed (1):** quality/time.

Real defects (fixable in code):
- Canonicals inconsistent: contact/europe/vakgebieden/about/pricing/process/news bare URLs canonical → `?locale=en-BE` (≠ sitemap `<loc>`); `/book` has **no canonical** → falls back to homepage; locations pages are correctly self-canonical.
- Sitemap `<loc>` = 216 bare paths, but most pages aren't self-canonical to bare → sitemap URLs declared non-canonical.

Plan (centralized, minimal):
- [ ] `src/lib/seo/alternates.ts`: canonical = **bare absolute path** (no `?locale=`), normalize home to `https://shines.be` (match sitemap). Keep hreflang languages.
- [ ] `src/app/book/page.tsx`: add self-canonical `/book`.
- [ ] Confirm hardcoded-canonical pages (locations, choose-country-region) stay consistent.
- [ ] `npm run build`; verify canonicals locally.
- [ ] Commit only edited files; deploy to production.
- [ ] Re-test live (every sitemap URL self-canonical to bare); in GSC use **Validate fix**; continue daily indexing.

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
