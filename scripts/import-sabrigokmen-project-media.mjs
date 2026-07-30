import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const projects = [
  {
    slug: "spiromorphs",
    sourceUrl: "https://www.sabrigokmen.com/spiromorphs",
  },
  {
    slug: "calyx",
    sourceUrl: "https://www.sabrigokmen.com/calyx",
  },
];

function decodeHtml(value) {
  return value
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'")
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("\\u002F", "/")
    .replaceAll("\\/", "/");
}

function extractImages(html) {
  const records = [];
  const imageTags = [...html.matchAll(/<img\b[^>]*>/g)].map(
    (match) => match[0],
  );

  for (const tag of imageTags) {
    const source = tag.match(/\ssrc="([^"]+)"/)?.[1];
    if (!source?.includes("static.wixstatic.com/media/")) continue;

    const decodedSource = decodeHtml(source);
    const mediaId = decodedSource.match(
      /https:\/\/static\.wixstatic\.com\/media\/([^/]+)/,
    )?.[1];
    if (!mediaId) continue;

    const originalUrl = `https://static.wixstatic.com/media/${mediaId}`;
    if (records.some((record) => record.originalUrl === originalUrl)) continue;

    records.push({
      originalUrl,
      alt: decodeHtml(tag.match(/\salt="([^"]*)"/)?.[1] ?? ""),
    });
  }

  return records;
}

async function downloadProject(project) {
  const pageResponse = await fetch(project.sourceUrl);
  if (!pageResponse.ok) {
    throw new Error(`${project.sourceUrl}: ${pageResponse.status}`);
  }

  const html = await pageResponse.text();
  const images = extractImages(html);
  const destinationRoot = path.join(
    root,
    "public",
    "projects",
    project.slug,
    "gallery",
    "source-site",
  );
  const webRoot = path.join(destinationRoot, "web");
  await fs.mkdir(destinationRoot, { recursive: true });
  await fs.mkdir(webRoot, { recursive: true });

  const manifest = [];
  for (const [index, image] of images.entries()) {
    const extension = path.extname(new URL(image.originalUrl).pathname) || ".jpg";
    const filename = `source-${String(index + 1).padStart(2, "0")}${extension}`;
    const destination = path.join(destinationRoot, filename);
    const webFilename = `source-${String(index + 1).padStart(2, "0")}.webp`;
    const webDestination = path.join(webRoot, webFilename);
    const response = await fetch(image.originalUrl);
    if (!response.ok) {
      throw new Error(`${image.originalUrl}: ${response.status}`);
    }
    await fs.writeFile(destination, new Uint8Array(await response.arrayBuffer()));
    await sharp(destination, {
      animated: extension.toLowerCase() === ".gif",
      limitInputPixels: false,
    })
      .rotate()
      .resize({
        width: 1800,
        height: 1800,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({
        quality: extension.toLowerCase() === ".gif" ? 76 : 86,
        effort: 5,
        loop: 0,
      })
      .toFile(webDestination);
    manifest.push({
      index: index + 1,
      filename,
      webFilename: `web/${webFilename}`,
      sourceUrl: image.originalUrl,
      alt: image.alt,
    });
  }

  await fs.writeFile(
    path.join(destinationRoot, "manifest.json"),
    `${JSON.stringify(
      {
        sourcePage: project.sourceUrl,
        importedAt: new Date().toISOString(),
        images: manifest,
      },
      null,
      2,
    )}\n`,
    "utf8",
  );

  console.log(`${project.slug}: downloaded ${manifest.length} images`);
}

for (const project of projects) {
  await downloadProject(project);
}
