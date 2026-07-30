import { readdir, readFile, rm, stat } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const workspaceRoot = process.cwd();
const publicRoot = path.resolve(workspaceRoot, "public");
const sourceRoots = [
  path.resolve(workspaceRoot, "app"),
  path.resolve(workspaceRoot, "content"),
];

const sourceExtensions = new Set([
  ".css",
  ".html",
  ".js",
  ".jsx",
  ".json",
  ".md",
  ".mjs",
  ".ts",
  ".tsx",
]);

const removableExtensions = new Set([
  ".avif",
  ".docx",
  ".gif",
  ".ico",
  ".jpeg",
  ".jpg",
  ".json",
  ".mp4",
  ".pdf",
  ".png",
  ".svg",
  ".webp",
]);

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(entryPath)));
    } else if (entry.isFile()) {
      files.push(entryPath);
    }
  }

  return files;
}

function getExpectedValue(name) {
  const prefix = `--${name}=`;
  const argument = process.argv.find((item) => item.startsWith(prefix));
  return argument ? Number(argument.slice(prefix.length)) : undefined;
}

const sourceFiles = (
  await Promise.all(sourceRoots.map((root) => walk(root)))
)
  .flat()
  .filter((file) => sourceExtensions.has(path.extname(file).toLowerCase()));

const sourceText = (
  await Promise.all(sourceFiles.map((file) => readFile(file, "utf8")))
).join("\n");

const publicFiles = (await walk(publicRoot)).filter((file) =>
  removableExtensions.has(path.extname(file).toLowerCase()),
);

const unusedFiles = [];
for (const file of publicFiles) {
  const absolutePath = path.resolve(file);
  if (!absolutePath.startsWith(`${publicRoot}${path.sep}`)) {
    throw new Error(`Refusing to inspect path outside public/: ${absolutePath}`);
  }

  const relativeUrl = `/${path
    .relative(publicRoot, absolutePath)
    .split(path.sep)
    .join("/")}`;
  const encodedUrl = encodeURI(relativeUrl);

  if (!sourceText.includes(relativeUrl) && !sourceText.includes(encodedUrl)) {
    unusedFiles.push({
      absolutePath,
      relativeUrl,
      bytes: (await stat(absolutePath)).size,
    });
  }
}

unusedFiles.sort((left, right) => right.bytes - left.bytes);
const unusedBytes = unusedFiles.reduce((total, file) => total + file.bytes, 0);
const expectedCount = getExpectedValue("expect-count");
const expectedBytes = getExpectedValue("expect-bytes");
const apply = process.argv.includes("--apply");

console.log(
  `${apply ? "Removing" : "Would remove"} ${unusedFiles.length} unused public assets (${unusedBytes} bytes).`,
);
for (const file of unusedFiles) {
  console.log(`${file.bytes}\t${file.relativeUrl}`);
}

if (!apply) {
  console.log("Dry run only. Pass --apply with expected count and byte totals.");
  process.exit(0);
}

if (
  expectedCount === undefined ||
  expectedBytes === undefined ||
  expectedCount !== unusedFiles.length ||
  expectedBytes !== unusedBytes
) {
  throw new Error(
    `Reviewed set changed; refusing deletion. Expected ${expectedCount} files / ${expectedBytes} bytes, found ${unusedFiles.length} files / ${unusedBytes} bytes.`,
  );
}

for (const file of unusedFiles) {
  await rm(file.absolutePath);
}

console.log(`Removed ${unusedFiles.length} unused public assets.`);
