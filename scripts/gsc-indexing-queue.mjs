/**
 * Build Google Search Console manual indexing queues from the live sitemap.
 * IndexNow handles Bing; this is for GSC URL Inspection (~10/day quota).
 *
 *   node scripts/gsc-indexing-queue.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SITEMAP = "https://shines.be/sitemap.xml";
const OUT_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "tst", "tasks");
const BATCH_SIZE = 10;

/** Locales with real translations — worth manual GSC requests (see docs/SEO-CANONICAL-AND-INDEXING.md). */
const TRANSLATED_LOCALES = ["nl-BE", "fr-BE", "nl-NL", "fr-FR", "de-DE", "fr-LU"];

const TIER_PATHS = [
  "/",
  "/contact",
  "/pricing",
  "/headlight-restoration-process",
  "/book",
  "/about",
  "/choose-country-region",
  "/news",
  "/locations",
  "/europe",
  "/vakgebieden",
];

function normalizeUrl(raw) {
  const url = new URL(raw);
  url.hash = "";
  if (url.pathname !== "/" && url.pathname.endsWith("/")) {
    url.pathname = url.pathname.slice(0, -1);
  }
  return url.toString().replace(/\/$/, "") === "https://shines.be"
    ? "https://shines.be/"
    : url.toString();
}

function withLocale(baseUrl, locale) {
  const url = new URL(baseUrl);
  url.search = "";
  url.searchParams.set("locale", locale);
  return url.toString();
}

function expandUrl(baseUrl) {
  const urls = [normalizeUrl(baseUrl)];
  for (const locale of TRANSLATED_LOCALES) {
    urls.push(withLocale(baseUrl, locale));
  }
  return urls;
}

function tierScore(pathname) {
  const bare = pathname === "" ? "/" : pathname;
  const tier = TIER_PATHS.indexOf(bare);
  if (tier >= 0) return tier;
  if (bare.startsWith("/news/")) return 100;
  if (bare.startsWith("/locations/")) return 200;
  if (bare.startsWith("/europe/")) return 300;
  if (bare.startsWith("/vakgebieden/")) return 400;
  return 500;
}

async function fetchSitemapLocs() {
  const res = await fetch(SITEMAP, { headers: { "User-Agent": "shines-gsc-queue" } });
  if (!res.ok) throw new Error(`Sitemap fetch failed: ${res.status}`);
  const xml = await res.text();
  return [...new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim()))];
}

function readDoneUrls(logPath) {
  if (!fs.existsSync(logPath)) return new Set();
  const done = new Set();
  for (const line of fs.readFileSync(logPath, "utf8").split(/\r?\n/)) {
    const match = line.match(/SUCCESS (https:\/\/\S+)/);
    if (match) done.add(normalizeUrl(match[1]));
  }
  return done;
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const locs = await fetchSitemapLocs();
  const allExpanded = locs.flatMap((loc) => expandUrl(loc));

  const priority = [...new Set(allExpanded)].sort((a, b) => {
    const pathA = new URL(a).pathname;
    const pathB = new URL(b).pathname;
    const scoreA = tierScore(pathA);
    const scoreB = tierScore(pathB);
    if (scoreA !== scoreB) return scoreA - scoreB;
    const localeA = new URL(a).searchParams.get("locale") ?? "";
    const localeB = new URL(b).searchParams.get("locale") ?? "";
    if (localeA !== localeB) return localeA.localeCompare(localeB);
    return a.localeCompare(b);
  });

  const progressLog = path.join(OUT_DIR, "indexing-progress.log");
  const done = readDoneUrls(progressLog);
  const remaining = priority.filter((url) => !done.has(normalizeUrl(url)));

  fs.writeFileSync(path.join(OUT_DIR, "indexing-urls.txt"), locs.join("\n") + "\n");
  fs.writeFileSync(path.join(OUT_DIR, "indexing-priority-queue.txt"), priority.join("\n") + "\n");
  fs.writeFileSync(
    path.join(OUT_DIR, "indexing-session-remaining.txt"),
    remaining.join("\n") + (remaining.length ? "\n" : ""),
  );

  const today = remaining.slice(0, BATCH_SIZE);
  fs.writeFileSync(
    path.join(OUT_DIR, "indexing-today.txt"),
    today.join("\n") + (today.length ? "\n" : ""),
  );

  const todayStr = new Date().toISOString().slice(0, 10);
  if (today.length && !fs.existsSync(progressLog)) {
    fs.writeFileSync(
      progressLog,
      `# GSC manual indexing log — append: ${todayStr} SUCCESS|FAIL|QUOTA_HIT <url>\n`,
    );
  }

  console.log(`Sitemap URLs: ${locs.length}`);
  console.log(`Expanded (bare + translated locales): ${priority.length}`);
  console.log(`Already SUCCESS: ${done.size}`);
  console.log(`Remaining: ${remaining.length}`);
  console.log(`\nToday's batch (${today.length}):`);
  today.forEach((url, i) => console.log(`  ${i + 1}. ${url}`));
  console.log(`\nFiles written to ${OUT_DIR}`);
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exitCode = 1;
});
