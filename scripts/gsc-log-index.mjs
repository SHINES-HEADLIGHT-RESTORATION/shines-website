/**
 * Append GSC indexing results to progress log.
 * Usage: node scripts/gsc-log-index.mjs SUCCESS "https://shines.be/contact"
 */
import fs from "node:fs";
import path from "node:path";

const [, , status, url, ...rest] = process.argv;
if (!status || !url) {
  console.error("Usage: node scripts/gsc-log-index.mjs SUCCESS|FAIL|QUOTA_HIT <url> [reason]");
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const reason = rest.length ? ` ${rest.join(" ")}` : "";
const line = `${today} ${status} ${url}${reason}\n`;
const logPath = path.join(process.cwd(), "tst/tasks/indexing-progress.log");
fs.appendFileSync(logPath, line);
console.log(`Logged: ${line.trim()}`);
