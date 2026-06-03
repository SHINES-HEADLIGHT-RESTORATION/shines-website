import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ffmpegPath from "@ffmpeg-installer/ffmpeg";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const input = path.join(root, "public/videos/fordmustangdarknightligthdifference.mp4");
const output = path.join(root, "public/images/hero-poster.jpg");

execFileSync(
  ffmpegPath.path,
  ["-y", "-i", input, "-ss", "0.5", "-vframes", "1", "-q:v", "2", output],
  { stdio: "inherit" },
);

console.log("Wrote", output);
