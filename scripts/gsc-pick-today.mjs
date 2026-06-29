import fs from "node:fs";
import path from "node:path";

const tasksDir = path.join(process.cwd(), "tst/tasks");
const done = new Set();

for (const line of fs
  .readFileSync(path.join(tasksDir, "indexing-progress.log"), "utf8")
  .split(/\r?\n/)) {
  const m = line.match(/SUCCESS (https:\/\/\S+)/);
  if (m) done.add(m[1]);
}

const priority = fs
  .readFileSync(path.join(tasksDir, "indexing-priority-queue.txt"), "utf8")
  .trim()
  .split(/\r?\n/);

const must = ["https://shines.be/", "https://shines.be/choose-country-region"].filter(
  (u) => !done.has(u),
);
const remaining = priority.filter((u) => !done.has(u));
const picked = [...new Set([...must, ...remaining])].slice(0, 10);

fs.writeFileSync(path.join(tasksDir, "indexing-today.txt"), `${picked.join("\n")}\n`);

for (const [i, u] of picked.entries()) {
  console.log(`${i + 1}. ${u}`);
}
