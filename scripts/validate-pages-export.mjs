import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const workspaceRoot = process.cwd();
const outputRoot = path.join(workspaceRoot, "out");

async function assertFile(relativePath) {
  await access(path.join(outputRoot, ...relativePath.split("/")));
}

async function readProjectRecords() {
  const projectsRoot = path.join(workspaceRoot, "content", "projects");
  const entries = await readdir(projectsRoot, { withFileTypes: true });
  const projects = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const projectPath = path.join(projectsRoot, entry.name, "project.json");
    const project = JSON.parse(await readFile(projectPath, "utf8"));
    projects.push(project);
  }

  return projects;
}

const requiredFiles = [
  "index.html",
  "404.html",
  "favicon.svg",
  "og.png",
  "CV_Sabri_Gokmen_2026.docx",
];

for (const file of requiredFiles) {
  await assertFile(file);
}

for (const project of await readProjectRecords()) {
  await assertFile(`${project.section}/${project.slug}/index.html`);
}

const grants = JSON.parse(
  await readFile(
    path.join(workspaceRoot, "content", "grants", "featured.json"),
    "utf8",
  ),
);
for (const grant of grants) {
  await assertFile(`grants/${grant.slug}/index.html`);
}

const carouselSlides = JSON.parse(
  await readFile(
    path.join(workspaceRoot, "content", "carousel", "slides.json"),
    "utf8",
  ),
);
for (const slide of carouselSlides) {
  await assertFile(decodeURI(slide.src).replace(/^\//, ""));
}

const homeHtml = await readFile(path.join(outputRoot, "index.html"), "utf8");
if (!homeHtml.includes("https://www.sabrigokmen.com")) {
  throw new Error("Static export is missing the production site URL.");
}

console.log(
  `Validated GitHub Pages export: ${requiredFiles.length} core files, ${
    (await readProjectRecords()).length
  } project routes, ${grants.length} grant routes, and ${
    carouselSlides.length
  } carousel images.`,
);
