/**
 * Lists every locale URL from the live sitemap (hreflang alternates).
 * Use with Search Console URL Inspection → "Indexering aanvragen".
 *
 * Generate / refresh:
 *   curl -sL https://www.shines.be/sitemap.xml -o /tmp/sitemap.xml
 *   node scripts/gsc-indexing-queue.mjs /tmp/sitemap.xml
 */
import fs from "node:fs";

const sitemapPath = process.argv[2];
if (!sitemapPath) {
  console.error("Usage: node scripts/gsc-indexing-queue.mjs <path-to-sitemap.xml>");
  process.exit(1);
}

const xml = fs.readFileSync(sitemapPath, "utf8");
const hrefRe = /href="(https:\/\/shines\.be[^"]+)"/g;
const urls = new Set();
let m;
while ((m = hrefRe.exec(xml)) !== null) urls.add(m[1]);

const sorted = [...urls].sort();
const out = new URL("../tasks/indexing-urls.txt", import.meta.url);
fs.writeFileSync(out, sorted.join("\n") + "\n", "utf8");
console.log(`Wrote ${sorted.length} URLs → ${out.pathname}`);
