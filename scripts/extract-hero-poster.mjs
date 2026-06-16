import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ffmpegPath from "@ffmpeg-installer/ffmpeg";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const input = path.join(
  root,
  "tst/sources/fordmustangdarknightligthdifference_update.mp4",
);

if (!fs.existsSync(input)) {
  console.error("Missing source: tst/sources/fordmustangdarknightligthdifference_update.mp4");
  process.exit(1);
}

const output = path.join(root, "public/images/hero-poster.webp");

execFileSync(
  ffmpegPath.path,
  [
    "-y", "-i", input,
    "-ss", "0.5", "-vframes", "1",
    "-c:v", "libwebp", "-quality", "85",
    output,
  ],
  { stdio: "inherit" },
);

console.log("Wrote", output);
