# Google Search Console — daily indexing batch

## Reality check

| Item | Detail |
|------|--------|
| Sitemap | `https://shines.be/sitemap.xml` — **already submitted**; Google discovers all 2,954 locale URLs from here + hreflang |
| Manual limit | ~**10** “Indexering aanvragen” per day (quota message: *Quotum overschreden*) |
| Full manual queue | ~**2945** URLs left → **~295 days** at 10/day if you do everything |
| Indexing API | **Not valid** for this site (JobPosting/BroadcastEvent only) — see [SEO-CANONICAL-AND-INDEXING.md](./SEO-CANONICAL-AND-INDEXING.md) |

Manual requests are a **nudge** for important URLs. They are **not** required for every locale variant.

## Recommended strategy: **priority queue first**

Use **`tasks/indexing-priority-queue.txt`** (not the raw sitemap order).

Order: finish homepage locales → **contact** → **pricing** → **process** → **book** → **about** → locations / Europe / news (bulk).

## Each day (~10 minutes)

1. Open [Search Console](https://search.google.com/search-console) → property **shines.be**.
2. Open **`tasks/indexing-today.txt`** (regenerate after each session — see below).
3. For each URL: **URL-inspectie** → paste URL → **Indexering aanvragen**.
4. Append results to **`tasks/indexing-progress.log`**:
   - `YYYY-MM-DD SUCCESS <url>`
   - `YYYY-MM-DD FAIL <url> <reason>`
5. If quota hits: add `YYYY-MM-DD QUOTA_HIT stopped at <url>` and stop until tomorrow.

## Regenerate tomorrow’s batch (PowerShell)

From repo root:

```powershell
$root = "tasks"
$done = @("https://shines.be/")
Get-Content "$root/indexing-progress.log" | ForEach-Object {
  if ($_ -match 'SUCCESS (https://\S+)') { $script:done += $Matches[1] }
}
$remaining = Get-Content "$root/indexing-priority-queue.txt" | Where-Object { $done -notcontains $_ }
$remaining | Set-Content "$root/indexing-session-remaining.txt"
$remaining[0..9] | Set-Content "$root/indexing-today.txt"
"Next 10:"; Get-Content "$root/indexing-today.txt"
```

## Canonical / duplicate pages (do once)

Already in code: `www` → `shines.be`, self-referencing locale canonicals. **Redeploy production** if not deployed yet.

In GSC: **Instellingen → Crawlen** → preferred host should match **https://shines.be** (non-www).

## Files

| File | Purpose |
|------|---------|
| `tasks/indexing-urls.txt` | Full 2,954 URLs from sitemap |
| `tasks/indexing-priority-queue.txt` | Smart order for manual requests |
| `tasks/indexing-today.txt` | Next 10 URLs for today |
| `tasks/indexing-session-remaining.txt` | All not yet SUCCESS |
| `tasks/indexing-progress.log` | Audit log |
