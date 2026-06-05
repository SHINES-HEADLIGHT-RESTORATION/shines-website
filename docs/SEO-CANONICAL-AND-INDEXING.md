# Canonical URLs, www redirect, and Google indexing

## Canonical host (fixes GSC duplicate warnings)

**Primary:** `https://shines.be` (apex, no `www`)

- Middleware and `next.config.ts` send **301/308** from `www.shines.be` → `shines.be` (path + query preserved).
- Each locale URL (`?locale=nl-BE`, etc.) uses a **self-referencing** `rel=canonical` matching that locale (via `x-shines-locale` from middleware).
- `metadataBase` is set to `https://shines.be` in the root layout.

**Vercel:** In **Project → Settings → Domains**, keep `shines.be` as the primary domain. `www` should redirect to apex (code handles this even if Vercel UI is not set).

After deploy, verify:

```bash
curl -sI https://www.shines.be/ | findstr /i "HTTP location"
# Expect: 308 or 301 and Location: https://shines.be/
```

## Google Indexing API, not for SHINES pages

The [Indexing API](https://developers.google.com/search/apis/indexing-api/v3/using-api) only accepts URLs whose pages contain:

- `JobPosting` structured data, or  
- `BroadcastEvent` embedded in a `VideoObject`

SHINES is a service/marketing site (headlight restoration), not job listings or livestreams. **Submitting normal URLs via this API will not index them**, even with quota approval.

**What to use instead:**

| Method | Purpose |
|--------|---------|
| **Sitemap** (`https://shines.be/sitemap.xml`) | Discovery of all pages + hreflang (already submitted in Search Console) |
| **URL Inspection** | ~10 manual “Indexering aanvragen” per day (see `tasks/indexing-progress.log`) |
| **Canonical + www redirect** | Stops “duplicate without user-selected canonical” for www vs apex |
| **Google Business Profile** | Local “near me” visibility |

If you later add real job-posting pages with valid `JobPosting` JSON-LD, you could use the Indexing API only for those URLs.
