# Bing Webmaster Tools (shines.be)

## Site setup

- **Property:** `https://shines.be/` (imported from Google Search Console — no separate meta-tag verification needed when GSC import succeeds).
- **Dashboard:** [Bing Webmaster Tools](https://www.bing.com/webmasters)

## Sitemap

Submit after import (GSC import may show 0 sitemaps for domain properties):

| Field | Value |
|-------|--------|
| Sitemap URL | `https://shines.be/sitemap.xml` |

**Path in UI:** Sitemaps → Submit sitemap → paste URL → Submit.

## URL submission (optional)

For important new/updated pages: **URL Submission** → submit canonical URLs (same list as Google URL Inspection; see `docs/INDEXING-DAILY.md`).

Bing limits bulk submission; prefer sitemap + IndexNow only if you add that integration later.

## IndexNow (future)

Optional faster pings: add IndexNow key file under `public/` and ping on deploy. Not required when sitemap is submitted and site is verified.

## Verification meta tag (fallback)

If GSC import is unavailable, add in Vercel:

```env
BING_SITE_VERIFICATION=<content from msvalidate.01 meta tag>
```

Next.js reads this via `BING_SITE_VERIFICATION` in root layout metadata (see `src/lib/site-runtime.ts`).
