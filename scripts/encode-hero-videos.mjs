import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ffmpegPath from "@ffmpeg-installer/ffmpeg";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const ffmpeg = ffmpegPath.path;
const videosDir = path.join(root, "public/videos");

const sources = [
  path.join(videosDir, "fordmustangdarknightligthdifference.mp4"),
  path.join(videosDir, "fordmustangdarknightligthdifference.h264"),
].filter((p) => fs.existsSync(p));

const input = sources[0];
if (!input) {
  console.error("No hero source found in public/videos/");
  process.exit(1);
}

const outputs = [
  {
    file: "hero-mobile.mp4",
    args: [
      "-y",
      "-i",
      input,
      "-an",
      "-vf",
      "scale=-2:720:flags=lanczos,fps=30",
      "-c:v",
      "libx264",
      "-profile:v",
      "main",
      "-pix_fmt",
      "yuv420p",
      "-crf",
      "28",
      "-maxrate",
      "1100k",
      "-bufsize",
      "2200k",
      "-movflags",
      "+faststart",
    ],
  },
  {
    file: "hero-desktop.mp4",
    args: [
      "-y",
      "-i",
      input,
      "-an",
      "-vf",
      "scale=-2:1080:flags=lanczos,fps=30",
      "-c:v",
      "libx264",
      "-profile:v",
      "high",
      "-pix_fmt",
      "yuv420p",
      "-crf",
      "24",
      "-maxrate",
      "3200k",
      "-bufsize",
      "6400k",
      "-movflags",
      "+faststart",
    ],
  },
];

for (const { file, args } of outputs) {
  const out = path.join(videosDir, file);
  console.log(`Encoding ${file}…`);
  execFileSync(ffmpeg, [...args, out], { stdio: "inherit" });
  const mb = (fs.statSync(out).size / (1024 * 1024)).toFixed(2);
  console.log(`  → ${file} (${mb} MB)\n`);
}

console.log("Done. Use hero-mobile.mp4 + hero-desktop.mp4 on the site.");
