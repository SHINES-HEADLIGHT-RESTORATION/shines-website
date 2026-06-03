import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pngToIco from "png-to-ico";
import sharp from "sharp";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const svg = path.join(root, "public/images/shineslogowithbackground.svg");
const appDir = path.join(root, "src/app");

const sizes = [
  { name: "icon.png", size: 32 },
  { name: "apple-icon.png", size: 180 },
];

for (const { name, size } of sizes) {
  await sharp(svg).resize(size, size).png().toFile(path.join(appDir, name));
}

const ico16 = await sharp(svg).resize(16, 16).png().toBuffer();
const ico32 = await sharp(svg).resize(32, 32).png().toBuffer();
const ico48 = await sharp(svg).resize(48, 48).png().toBuffer();
const tmpDir = path.join(root, ".tmp-favicon");
fs.mkdirSync(tmpDir, { recursive: true });
fs.writeFileSync(path.join(tmpDir, "16.png"), ico16);
fs.writeFileSync(path.join(tmpDir, "32.png"), ico32);
fs.writeFileSync(path.join(tmpDir, "48.png"), ico48);
const ico = await pngToIco([
  path.join(tmpDir, "16.png"),
  path.join(tmpDir, "32.png"),
  path.join(tmpDir, "48.png"),
]);
fs.writeFileSync(path.join(appDir, "favicon.ico"), ico);
fs.rmSync(tmpDir, { recursive: true, force: true });

console.log("Favicons written to src/app/");
