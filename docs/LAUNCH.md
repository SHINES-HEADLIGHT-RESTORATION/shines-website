# SHINES launch guide, shines.be

Complete checklist to go live on **Vercel**, connect **GoDaddy** domain, set up **info@shines.be**, claim **Google Business Profile** for local ranking, and submit for **organic + AI search**.

Your GitHub repo: `https://github.com/SHINES-HEADLIGHT-RESTORATION/shines-website`

Your Vercel team: **islamxyz** (team_jZkRRpS2JPoFqkvmBN7St2c0)

> **Current status:** The site builds successfully. There is **no Vercel project named “shines” yet**, only `ivnix` and `shahada`. You need to import the GitHub repo once (Step 1 below).

---

## Phase 0, Before you start (15 min)

Gather these:

| Item | Example / note |
|------|----------------|
| GoDaddy login | Domain `shines.be` |
| GitHub access | `SHINES-HEADLIGHT-RESTORATION/shines-website` |
| Vercel login | Same account linked to GitHub |
| Workshop address | Street, postal code, city (Belgium) |
| Phone number | Belgian mobile or landline for GBP |
| Gmail (or other inbox) | Destination for forwarded mail |
| Strong admin password | For `/admin` on the live site |

---

## Phase 1, Deploy on Vercel (30 min)

### 1.1 Import the GitHub project

1. Open [vercel.com/new](https://vercel.com/new).
2. Select team **islamxyz**.
3. Import **SHINES-HEADLIGHT-RESTORATION/shines-website**.
4. Framework preset: **Next.js** (auto-detected).
5. **Do not deploy yet**, add environment variables first (Step 1.2).

### 1.2 Vercel environment variables

In **Project → Settings → Environment Variables**, add these for **Production** (and Preview if you want):

| Variable | Value | Required |
|----------|-------|----------|
| `NEXT_PUBLIC_SITE_URL` | `https://shines.be` | Yes |
| `ADMIN_PASSWORD` | Strong unique password | Yes |
| `WORKSHOP_ADDRESS` | Full garage address, e.g. `Industrieweg 12, 8200 Brugge, Belgium` | Yes (mobile pricing) |
| `RESEND_API_KEY` | From [resend.com](https://resend.com) | Yes (mail-in emails) |
| `RESEND_FROM` | `SHINES <info@shines.be>` | Yes |
| `STRIPE_SECRET_KEY` | From Stripe dashboard | When taking return-shipping payments |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret | When using Stripe |
| `GOOGLE_SITE_VERIFICATION` | Meta tag content from Search Console | After Step 5 |
| `CONTACT_STREET` | Workshop street | When address is confirmed |
| `CONTACT_POSTAL_CODE` | e.g. `8200` | When address is confirmed |
| `CONTACT_CITY` | e.g. `Brugge` | When address is confirmed |
| `CONTACT_PHONE` | e.g. `+32 470 12 34 56` | For contact page + Google |
| `MAPS_LINK` | Google Maps share link | After GBP is live |
| `MAPS_EMBED_URL` | Google Maps embed URL | Optional map on contact page |

**Booking warning:** Online booking writes to `data/bookings.json`. Vercel’s filesystem is **read-only** in production, so live bookings will **not persist** until you add a database (Neon Postgres via [Vercel Marketplace](https://vercel.com/marketplace) is the recommended path).

Until the database is connected, either:

- Set `NEXT_PUBLIC_BOOKING_ENABLED=false` and use **email booking only**, or  
- Accept bookings knowing they will fail in production (not recommended).

### 1.3 Deploy

1. Click **Deploy**.
2. Wait for build to finish. You will get a URL like `shines-website-xxx.vercel.app`.
3. Open it and confirm the homepage loads.

### 1.4 Connect GitHub auto-deploy

Vercel enables this by default on import. Every push to `master` redeploys production.

---

## Phase 2, Domain: GoDaddy → Vercel (20 min)

### 2.1 Add domain in Vercel

1. Vercel project → **Settings → Domains**.
2. Add `shines.be` and `www.shines.be`.
3. Vercel shows the DNS records you need.

### 2.2 Configure DNS at GoDaddy

1. GoDaddy → **My Products → shines.be → DNS**.
2. Add/update records as Vercel instructs. Typical setup:

| Type | Name | Value |
|------|------|-------|
| `A` | `@` | `76.76.21.21` (verify current Vercel apex IP in dashboard) |
| `CNAME` | `www` | `cname.vercel-dns.com` |

3. Remove conflicting old `A`/`CNAME` records for `@` and `www`.
4. TTL: 600 seconds (or default).
5. Wait 5–60 minutes for propagation.

### 2.3 Set primary domain

In Vercel Domains, set **shines.be** as primary. Redirect `www` → apex (or vice versa, pick one canonical URL; the site uses `https://shines.be`).

### 2.4 Verify HTTPS

Open `https://shines.be`, padlock should show a valid certificate (automatic on Vercel).

---

## Phase 3, Email: info@shines.be (45 min)

Vercel does **not** host email. You need DNS records for **receiving** and **sending**.

### Recommended: Cloudflare DNS + Email Routing (free receive)

Even with GoDaddy as registrar, you can use Cloudflare for DNS:

1. Add `shines.be` to [Cloudflare](https://dash.cloudflare.com) (free).
2. At GoDaddy, change **nameservers** to Cloudflare’s two NS records.
3. Copy your Vercel website records into Cloudflare DNS.
4. Cloudflare → **Email → Email Routing → Enable**.
5. Add destination address (your Gmail).
6. Create route: `info@shines.be` → your Gmail.

### Send from the website (Resend)

1. [resend.com](https://resend.com) → **Domains** → Add `shines.be`.
2. Add the DNS records Resend shows (DKIM + SPF) in Cloudflare or GoDaddy.
3. Wait for domain verification.
4. Create API key → paste into Vercel as `RESEND_API_KEY`.
5. Set `RESEND_FROM=SHINES <info@shines.be>`.

### SPF (one TXT record on `@`)

Combine providers in a single SPF record. Example when using Resend + Cloudflare Email Routing:

```txt
v=spf1 include:amazonses.com include:_spf.mx.cloudflare.net ~all
```

Use the exact values from Resend and your email provider dashboards.

### DMARC (recommended)

```txt
v=DMARC1; p=none; rua=mailto:info@shines.be
```

### Test

1. Send an email **to** `info@shines.be` from an external account → should arrive in Gmail.
2. Trigger a mail-in status email from admin (or test Resend dashboard) → should arrive **from** `info@shines.be`.

---

## Phase 4, Google Business Profile (local ranking) (60 min)

This is **separate from the website** but critical for “headlight restoration near me” in Belgium.

### 4.1 Create the profile

1. Go to [business.google.com](https://business.google.com).
2. **Add business** → name: **SHINES** (match website branding).
3. Category: **Auto repair shop** or **Car detailing service** (pick closest; headlight restoration fits auto repair).
4. Add **service area** if customers come to you mobile, or **storefront address** if they visit the garage.
5. Phone: same as `CONTACT_PHONE` on the site.
6. Website: `https://shines.be`.

### 4.2 Verification

Google will verify by **postcard**, **phone**, or **email** to the business address. This can take 3–14 days.

- Use your **real workshop address**, must match what you put on the website.
- Do not use a virtual office unless you actually receive mail there.

### 4.3 Complete the profile (do all of this)

- [ ] Logo (use `tst/root-assets/shinesLogo.png` or `public/images/shines-logo-white.png`)
- [ ] Cover photo (workshop or before/after headlight)
- [ ] Business hours (match site: Mon–Fri 9–18, Sat by appointment)
- [ ] Services: headlight restoration, mobile service, mail-in
- [ ] Short description (same facts as homepage, no keyword stuffing)
- [ ] Attributes: parking, appointments, etc.
- [ ] First 5+ photos (before/after, process, workshop)
- [ ] Enable messaging if you will reply quickly

### 4.4 Link website ↔ Google

After verification:

1. Copy your **Google Maps share link** → set as `MAPS_LINK` in Vercel.
2. Optional: **Share → Embed a map** → set as `MAPS_EMBED_URL`.
3. Set `CONTACT_STREET`, `CONTACT_POSTAL_CODE`, `CONTACT_CITY`, `CONTACT_PHONE` in Vercel.
4. Redeploy (automatic on env change, or trigger redeploy).

When you have Google reviews, update `site.stats.rating` and `site.stats.reviewCount` in `src/lib/site.ts` (must match real Google data, do not fake reviews).

### 4.5 NAP consistency

**Name, Address, Phone** must be **identical** on:

- Google Business Profile  
- shines.be contact page  
- Facebook / Instagram (when added)  
- Structured data (JSON-LD, auto from env + site config)

---

## Phase 5, Google Search Console (organic SEO) (20 min)

1. Go to [search.google.com/search-console](https://search.google.com/search-console).
2. **Add property** → Domain or URL prefix: `https://shines.be`.
3. Choose **HTML tag** verification method.
4. Copy the `content="..."` value (not the full tag).
5. Add to Vercel: `GOOGLE_SITE_VERIFICATION=<that value>`.
6. Redeploy → click **Verify** in Search Console.

### Submit sitemap

1. Search Console → **Sitemaps**.
2. Submit: `https://shines.be/sitemap.xml`

The site already exposes:

- `/robots.txt`, allows crawling, blocks `/admin/` and `/api/`
- `/sitemap.xml`, all public pages, Belgium cities, Europe countries, news
- `/llms.txt`, AI crawler summary (already in `public/`)

### Request indexing

For key pages, use **URL Inspection → Request indexing**:

- `https://shines.be/`
- `https://shines.be/pricing`
- `https://shines.be/headlight-restoration-process`
- `https://shines.be/contact`
- Your primary city page, e.g. `https://shines.be/locations/brugge`

---

## Phase 6, Stripe (mail-in return shipping) (optional, 30 min)

Only needed when mail-in customers pay return shipping online.

1. [dashboard.stripe.com](https://dashboard.stripe.com) → create account (Belgium business).
2. Copy **Secret key** → `STRIPE_SECRET_KEY` in Vercel.
3. **Developers → Webhooks → Add endpoint**:
   - URL: `https://shines.be/api/webhooks/stripe`
   - Events: `checkout.session.completed`
4. Copy **Signing secret** → `STRIPE_WEBHOOK_SECRET`.
5. Test with Stripe test mode first, then switch to live keys.

---

## Phase 7, SEO & AI visibility (ongoing)

The site is already built for search:

| Feature | Location |
|---------|----------|
| Unique titles & meta per page | `src/lib/seo/metadata.ts` |
| Multilingual hreflang (EN/NL/FR/DE) | `src/lib/seo/alternates.ts` |
| LocalBusiness + FAQ + WebSite JSON-LD | `src/components/JsonLd.tsx` |
| Belgium city landing pages | `/locations/[city]` |
| Europe country pages | `/europe/[country]` |
| News / topical content | `/news/...` |
| AI summary file | `/llms.txt` |

### Your ongoing SEO tasks

1. **Publish news articles** monthly (oxidation, DIY vs pro, seasonal tips).
2. **Get Google reviews**, ask happy customers after each job.
3. **Add social links** in `src/lib/site.ts` → `social` when accounts are live.
4. **Internal linking**, link city pages from news posts where relevant.
5. **Bing Webmaster Tools**, [bing.com/webmasters](https://www.bing.com/webmasters) (imports from Search Console).
6. **Do not** buy backlinks, fake reviews, or keyword-stuff, Google spam policies apply.

### AI search (ChatGPT, Perplexity, Google AI Overviews)

- Keep `/llms.txt` updated when pricing or services change.
- Use clear H2/H3 headings and FAQ content (already on homepage).
- Ensure facts on site match Google Business Profile exactly.

---

## Phase 8, Go-live checklist

Run through this on production:

- [ ] `https://shines.be` loads with valid SSL
- [ ] `www` redirects to apex (or your chosen canonical)
- [ ] Contact email shows `info@shines.be`
- [ ] Mailto links open correctly
- [ ] `/book` works OR is disabled until database is ready
- [ ] `/admin` requires password; wrong password is rejected
- [ ] `/sitemap.xml` returns URLs
- [ ] `/robots.txt` allows `/` and disallows `/admin/`
- [ ] Search Console verified + sitemap submitted
- [ ] Google Business Profile submitted for verification
- [ ] Resend domain verified; test email sends
- [ ] Inbound email to `info@shines.be` works
- [ ] Mobile travel quote works (needs `WORKSHOP_ADDRESS` or lat/lon)
- [ ] Stripe webhook responds 200 (if enabled)

---

## Phase 9, After launch (database for bookings)

When you are ready for live online booking on Vercel:

1. Vercel Marketplace → install **Neon Postgres**.
2. Replace `src/lib/appointments/store.ts` file-based storage with Postgres (or add a migration layer).
3. Remove `NEXT_PUBLIC_BOOKING_ENABLED=false` if you set it.
4. Test full booking flow on production.

Until then, customers can book via **email** (`info@shines.be`) and phone, the site already supports mailto CTAs everywhere.

---

## Quick reference, who does what

| Task | Where |
|------|-------|
| Website hosting | Vercel |
| Domain registration | GoDaddy |
| Website DNS | GoDaddy or Cloudflare |
| Email receive | Cloudflare Email Routing / Google Workspace |
| Email send (app) | Resend |
| Local map ranking | Google Business Profile |
| Organic search | Google Search Console + content |
| Payments | Stripe |

---

## Support links

- Vercel domains: https://vercel.com/docs/projects/domains
- Resend domain setup: https://resend.com/docs/dashboard/domains/introduction
- Google Business Profile help: https://support.google.com/business
- Google Search Console: https://search.google.com/search-console
