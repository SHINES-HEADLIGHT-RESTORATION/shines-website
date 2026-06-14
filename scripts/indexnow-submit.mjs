// Submit canonical URLs to IndexNow (Bing + Yandex instant indexing).
//
// IndexNow notifies participating search engines (Bing, Yandex, others) the
// moment content changes — it does NOT feed Google. Run after a deploy:
//   node scripts/indexnow-submit.mjs
//
// The key file must be live at KEY_LOCATION before submitting.

const HOST = "shines.be";
const KEY = "35872794cdee05d5e1bbd8ac117d5bc7";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP = `https://${HOST}/sitemap.xml`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

async function getSitemapUrls() {
  const res = await fetch(SITEMAP, {
    headers: { "User-Agent": "shines-indexnow" },
  });
  if (!res.ok) throw new Error(`Sitemap fetch failed: ${res.status}`);
  const xml = await res.text();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
    m[1].trim(),
  );
  return [...new Set(locs)];
}

async function verifyKeyFile() {
  const res = await fetch(KEY_LOCATION, { headers: { "User-Agent": "shines-indexnow" } });
  if (!res.ok) {
    throw new Error(
      `Key file not reachable at ${KEY_LOCATION} (HTTP ${res.status}). Deploy first.`,
    );
  }
  const body = (await res.text()).trim();
  if (body !== KEY) {
    throw new Error(`Key file content mismatch at ${KEY_LOCATION}.`);
  }
}

async function main() {
  await verifyKeyFile();

  const urlList = await getSitemapUrls();
  if (urlList.length === 0) throw new Error("No <loc> URLs found in sitemap.");
  console.log(`Submitting ${urlList.length} URLs to IndexNow…`);

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList,
    }),
  });

  const text = await res.text().catch(() => "");
  console.log(`IndexNow response: ${res.status} ${res.statusText}`);
  if (text) console.log(text);

  // 200 = OK, 202 = accepted/validating. Anything else is an error.
  if (res.status !== 200 && res.status !== 202) {
    process.exitCode = 1;
    return;
  }
  console.log(
    "Done. Check Bing Webmaster Tools → IndexNow for processing status.",
  );
}

main().catch((err) => {
  console.error(String(err?.message ?? err));
  process.exitCode = 1;
});
