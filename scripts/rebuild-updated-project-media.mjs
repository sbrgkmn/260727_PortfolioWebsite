import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const supportedExtensions = new Set([
  ".avif",
  ".gif",
  ".jpeg",
  ".jpg",
  ".png",
  ".webp",
]);

function numericStemOrder(a, b) {
  return Number.parseInt(path.parse(a).name, 10) -
    Number.parseInt(path.parse(b).name, 10);
}

function spiromorphOrder(filename) {
  const stem = path.parse(filename).name;
  const sourceMatch = stem.match(/^source-(\d+)$/);

  if (sourceMatch) {
    return [0, Number.parseInt(sourceMatch[1], 10)];
  }

  return [1, Number.parseInt(stem, 10) || Number.MAX_SAFE_INTEGER];
}

async function sourceImages(directory) {
  return (await readdir(directory, { withFileTypes: true }))
    .filter(
      (entry) =>
        entry.isFile() &&
        supportedExtensions.has(path.extname(entry.name).toLowerCase()),
    )
    .map((entry) => entry.name);
}

async function renderImage(source, destination, animated) {
  const image = sharp(source, {
    animated,
    limitInputPixels: false,
  }).resize({
    width: animated ? 1800 : 2000,
    height: animated ? 1800 : 2000,
    fit: "inside",
    withoutEnlargement: true,
  });

  if (animated) {
    await image
      .webp({ effort: 5, loop: 0, quality: 76 })
      .toFile(destination);
    return;
  }

  await image.webp({ effort: 5, quality: 86 }).toFile(destination);
}

async function rebuildCalyx() {
  const sourceRoot = path.join(
    root,
    "public",
    "projects",
    "calyx",
    "gallery",
  );
  const outputRoot = path.join(sourceRoot, "web");
  const filenames = (await sourceImages(sourceRoot)).sort(numericStemOrder);

  await mkdir(outputRoot, { recursive: true });

  for (const filename of filenames) {
    const destination = path.join(
      outputRoot,
      `slide-${path.parse(filename).name.padStart(2, "0")}.webp`,
    );
    await renderImage(path.join(sourceRoot, filename), destination, false);
    console.log(`calyx: ${filename} -> ${path.basename(destination)}`);
  }
}

async function rebuildSpiromorphs() {
  const sourceRoot = path.join(
    root,
    "public",
    "projects",
    "spiromorphs",
    "gallery",
    "source-site",
  );
  const outputRoot = path.join(sourceRoot, "web");
  const filenames = (await sourceImages(sourceRoot)).sort((a, b) => {
    const [aGroup, aNumber] = spiromorphOrder(a);
    const [bGroup, bNumber] = spiromorphOrder(b);
    return aGroup - bGroup || aNumber - bNumber;
  });

  await mkdir(outputRoot, { recursive: true });

  for (const filename of filenames) {
    const animated = path.extname(filename).toLowerCase() === ".gif";
    const destination = path.join(
      outputRoot,
      `${path.parse(filename).name}.webp`,
    );
    await renderImage(
      path.join(sourceRoot, filename),
      destination,
      animated,
    );
    console.log(
      `spiromorphs: ${filename} -> ${path.basename(destination)}`,
    );
  }
}

await rebuildCalyx();
await rebuildSpiromorphs();
