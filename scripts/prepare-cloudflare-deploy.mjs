import { access, writeFile } from "node:fs/promises";

const clientDirectory = new URL("../dist/client/", import.meta.url);
const requiredWebVideos = [
  new URL("../public/grants/Safranbolu/8-web.mp4", import.meta.url),
  new URL("../public/grants/Safranbolu/9-web.mp4", import.meta.url),
];

await Promise.all(requiredWebVideos.map((video) => access(video)));

const ignoredAssets = [
  "teaching/Teaching_Portfolio.pdf",
  "projects/Research_Portfolio.pdf",
  "grants/Safranbolu/8.mp4",
  "grants/Safranbolu/9.mp4",
];

await writeFile(
  new URL(".assetsignore", clientDirectory),
  `${ignoredAssets.join("\n")}\n`,
  "utf8",
);

console.log(
  "Prepared Cloudflare assets: retained web-optimized videos and excluded oversized source files.",
);
