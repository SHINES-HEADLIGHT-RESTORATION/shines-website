import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ffmpegPath from "@ffmpeg-installer/ffmpeg";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const ffmpeg = ffmpegPath.path;
const videosDir = path.join(root, "public/videos");

const input = path.join(
  root,
  "tst/sources/fordmustangdarknightligthdifference_update.mp4",
);
if (!fs.existsSync(input)) {
  console.error(
    "Missing source: tst/sources/fordmustangdarknightligthdifference_update.mp4",
  );
  process.exit(1);
}

console.log(`Source: ${path.basename(input)}\n`);

/** 2s closed GOP — faststart MP4 streams via range requests. */
const GOP_ARGS = [
  "-force_key_frames", "expr:gte(t,n_forced*2)",
  "-g", "60", "-keyint_min", "60", "-sc_threshold", "0",
  "-bf", "0",
  "-vsync", "cfr",
];

const mp4Outputs = [
  {
    file: "hero-mobile.mp4",
    args: [
      "-y", "-i", input, "-an",
      "-vf", "scale=-2:720:flags=lanczos,fps=30",
      "-c:v", "libx264", "-profile:v", "main", "-pix_fmt", "yuv420p",
      "-crf", "24", "-maxrate", "1500k", "-bufsize", "3000k",
      "-tune", "film", "-movflags", "+faststart",
      ...GOP_ARGS,
    ],
  },
  {
    file: "hero-desktop.mp4",
    args: [
      "-y", "-i", input, "-an",
      "-vf", "scale=-2:1080:flags=lanczos,fps=30",
      "-c:v", "libx264", "-profile:v", "high", "-pix_fmt", "yuv420p",
      "-crf", "20", "-maxrate", "4000k", "-bufsize", "8000k",
      "-tune", "film", "-movflags", "+faststart",
      ...GOP_ARGS,
    ],
  },
];

for (const { file, args } of mp4Outputs) {
  const out = path.join(videosDir, file);
  console.log(`Encoding ${file}…`);
  execFileSync(ffmpeg, [...args, out], { stdio: "inherit" });
  console.log(`  → ${file} (${(fs.statSync(out).size / (1024 * 1024)).toFixed(2)} MB)\n`);
}

console.log("Done. Bump HERO_ASSET_VERSION in src/lib/hero-media.ts after re-encode.");
