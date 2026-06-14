# Canonical URLs, www redirect, and Google indexing

## Canonical host (fixes GSC duplicate warnings)

**Primary:** `https://shines.be` (apex, no `www`)

- Middleware and `next.config.ts` send **301/308** from `www.shines.be` → `shines.be` (path + query preserved).
- `metadataBase` is set to `https://shines.be` in the root layout.

### Canonical policy (hybrid, set in `src/lib/seo/alternates.ts`)

The sitemap lists **bare paths** (`/contact`), so every page must be self-canonical to its bare path. Locale handling:

| URL | Canonical | Why |
|-----|-----------|-----|
| `/contact` (bare) | `/contact` | self — matches sitemap |
| `/contact?locale=nl-BE` / `fr-*` / `de-DE` | self (`?locale=…`) | real translations → indexable language pages |
| `/contact?locale=en-GB` / `es-ES` / `it-IT` / `pt-PT` / `pl-PL` / `en-EU` | `/contact` (bare) | serve identical English → consolidate to bare |

- **hreflang** advertises only real languages: `en`/`x-default` → bare, plus `nl-BE`/`nl-NL`/`fr-BE`/`fr-FR`/`fr-LU`/`de-DE` → `?locale=`. Untranslated locales (es/it/pt/pl) are intentionally omitted.
- Indexing requests should target **bare paths + the nl/fr/de variants** — English-region `?locale=` URLs now consolidate to bare, so submitting them is redundant.

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
| **IndexNow** (Bing/Yandex only) | Instant push of canonical URLs — run `npm run indexnow` after a deploy |
| **Canonical + www redirect** | Stops “duplicate without user-selected canonical” for www vs apex |
| **Google Business Profile** | Local “near me” visibility |

### IndexNow (Bing + Yandex, not Google)

- Key file (must stay live): `public/35872794cdee05d5e1bbd8ac117d5bc7.txt` → served at `https://shines.be/35872794cdee05d5e1bbd8ac117d5bc7.txt`.
- Submit all sitemap canonical URLs: `npm run indexnow` (`scripts/indexnow-submit.mjs`). First run can return `403 SiteVerificationNotCompleted` — retry after a minute.
- Google ignores IndexNow; keep using the sitemap + URL Inspection for Google.

If you later add real job-posting pages with valid `JobPosting` JSON-LD, you could use the Indexing API only for those URLs.
