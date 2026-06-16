import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const fontsDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "src/fonts");
const py = process.env.FONTTOOLS_PYTHON ?? "py";
const pyArgs = process.env.FONTTOOLS_PYTHON ? [] : ["-3.13"];

const files = [
  "sf-pro-display-regular.woff",
  "sf-pro-display-medium.woff",
  "sf-pro-display-bold.woff",
];

for (const file of files) {
  const input = path.join(fontsDir, file);
  const output = path.join(fontsDir, file.replace(".woff", ".woff2"));
  execFileSync(py, [...pyArgs, "-m", "fontTools", "ttLib.woff2", "compress", input], {
    stdio: "inherit",
  });
  const before = (fs.statSync(input).size / 1024).toFixed(1);
  const after = (fs.statSync(output).size / 1024).toFixed(1);
  console.log(`${file} → ${path.basename(output)} (${before} KiB → ${after} KiB)`);
}

console.log("Done.");
