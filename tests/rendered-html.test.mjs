import assert from "node:assert/strict";
import { access, readdir } from "node:fs/promises";
import test from "node:test";

const workSlugs = [
  "steambot",
  "gothic-diffusion",
  "occa",
  "spiromorphs",
  "calyx",
  "archetype",
];

const previousWorkSlugs = [
  "gyroid",
  "vitalized-geometry",
  "minimabox",
  "morphogenetic-vaults",
  "tangle-jungle",
  "ver-sacrum",
  "opulent-grove",
  "skin-pavilion",
  "manifold",
  "bursa-sports-facility",
  "olivelo-park",
  "urban-park-furniture",
  "caretta-hospital",
  "rotonda-mosque",
  "didem-madak-tomb",
  "wuppertal-replacement-building",
];

const teachingSlugs = [
  "prototype",
  "gothic-suprematist-machine",
  "morphogenetic-typologies",
  "ai-x-architecture",
  "computational-practice",
  "archive-previous-teaching",
];

const grantSlugs = [
  "minimal-matter",
  "prompt-to-geometry",
  "steambot",
  "safranbolu-house-typologies",
  "muqarnas-design-tools",
  "digital-design-fabrication-lab",
  "designhub-ist",
  "graft",
];

async function render(pathname) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set(
    "test",
    `${process.pid}-${Date.now()}-${pathname}`,
  );
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders only the approved work and teaching index", async () => {
  const response = await render("/");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  assert.doesNotMatch(html, /href="\/work\/prompt-to-geometry"/i);

  for (const slug of workSlugs) {
    assert.match(html, new RegExp(`/work/${slug}`));
  }

  assert.match(html, /href="\/work\/archive-previous-work"/);
  assert.doesNotMatch(html, /<img\b/);
  assert.doesNotMatch(html, /\d+ entries|selected grants and proposals/i);

  const selectedWorkOrder = [
    "steambot",
    "gothic-diffusion",
    "occa",
    "spiromorphs",
    "calyx",
    "archetype",
    "archive-previous-work",
  ];
  const selectedWorkPositions = selectedWorkOrder.map((slug) =>
    html.indexOf(`href="/work/${slug}"`),
  );
  assert.ok(selectedWorkPositions.every((position) => position >= 0));
  assert.deepEqual(
    selectedWorkPositions,
    selectedWorkPositions.toSorted((a, b) => a - b),
  );

  for (const slug of previousWorkSlugs) {
    assert.doesNotMatch(html, new RegExp(`href="/work/${slug}"`));
  }

  for (const slug of teachingSlugs) {
    assert.match(html, new RegExp(`/teaching/${slug}`));
  }

  assert.equal(
    (html.match(/class="catalog-row publication-entry"/g) ?? []).length,
    16,
  );
  assert.doesNotMatch(
    html,
    /selected journal and conference entries/i,
  );
  assert.match(
    html,
    /href="https:\/\/doi\.org\/10\.1177\/14780771251405440"/,
  );
  assert.match(
    html,
    /href="https:\/\/www\.academia\.edu\/168645669\//,
  );
  assert.match(
    html,
    /href="https:\/\/doi\.org\/10\.1145\/3477399"/,
  );
  assert.match(
    html,
    /href="https:\/\/papers\.cumincad\.org\/data\/works\/att\/ecaade2013_167\.content\.pdf"/,
  );
  assert.doesNotMatch(
    html,
    /<figcaption>International Journal of Architectural Computing, 2026<\/figcaption>/,
  );
  const renderedGrantSlugs = new Set(
    [...html.matchAll(/\/grants\/([a-z0-9-]+)/g)].map(
      (match) => match[1],
    ),
  );
  assert.equal(renderedGrantSlugs.size, 8);
  assert.match(html, /href="\/CV_SabriGokmen_2026\.docx"/);
  assert.match(
    html,
    /href="https:\/\/smartech\.gatech\.edu\/handle\/1853\/58649"/,
  );
  assert.match(
    html,
    /href="https:\/\/www\.youtube\.com\/channel\/UCHGjWx-r-g_scgX-kIQc5sw\/videos"/,
  );
  assert.match(html, /All rights reserved\./);

  const publicationYears = [
    ...html.matchAll(
      /class="catalog-year publication-year">(\d{4})<\/span>/g,
    ),
  ].map((match) => Number(match[1]));
  assert.equal(publicationYears.length, 16);
  assert.deepEqual(
    publicationYears,
    publicationYears.toSorted((a, b) => b - a),
  );
  assert.doesNotMatch(html, /5,000 USD/);
  assert.match(html, /2026–2027/);

  for (const slug of grantSlugs) {
    assert.match(html, new RegExp(`/grants/${slug}`));
  }
});

test("renders work and teaching detail routes", async () => {
  const workResponse = await render("/work/steambot");
  const teachingResponse = await render("/teaching/prototype");
  const workHtml = await workResponse.text();
  const teachingHtml = await teachingResponse.text();

  assert.equal(workResponse.status, 200);
  assert.match(workHtml, /SteamBot/);
  assert.match(workHtml, /class="project-hero"/);
  assert.equal(teachingResponse.status, 200);
  assert.match(teachingHtml, /Prototype/);
  assert.match(
    teachingHtml,
    /The semester paired two complementary projects/,
  );
  assert.doesNotMatch(teachingHtml, /class="project-hero"/);
});

test("renders grant pages without public award amounts", async () => {
  const response = await render("/grants/minimal-matter");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /Minimal Matter/);
  assert.match(html, /Year \/ duration/);
  assert.match(html, /2026–2027/);
  assert.doesNotMatch(html, /5,000 USD/);
});

test("renders previous work as individual single-image project pages", async () => {
  const response = await render("/work/gyroid");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /Gyroid/);
  assert.match(html, /src="\/projects\/gyroid\/cover\.webp"/);
  assert.doesNotMatch(html, /class="project-gallery/);
  assert.match(html, /href="\/work\/archive-previous-work"/);
});

test("renders the previous-work archive as a static four-by-four gallery", async () => {
  const response = await render("/work/archive-previous-work");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /Archive – Previous Work/);
  assert.match(html, /class="project-gallery project-gallery--archive"/);
  assert.equal((html.match(/<figure>/g) ?? []).length, 16);
  assert.doesNotMatch(html, /class="project-hero"/);
  assert.doesNotMatch(html, /\d+ projects|\d+ cropped images/i);
  assert.match(html, /href="\/#work"/);
});

test("includes a cover, cropped gallery, and source media for every entry", async () => {
  for (const slug of [...workSlugs, ...teachingSlugs]) {
    const projectDir = new URL(`../public/projects/${slug}/`, import.meta.url);
    const files = await readdir(projectDir);
    assert.ok(files.some((file) => /^cover\.(jpg|webp)$/.test(file)));

    const galleryDir = new URL("gallery/", projectDir);
    const gallery = await readdir(galleryDir);
    assert.ok(gallery.some((file) => /\.webp$/.test(file)));

    const mediaDir = new URL("media/", projectDir);
    const media = await readdir(mediaDir);
    assert.ok(media.some((file) => /^source-p\d+\.webp$/.test(file)));
  }

  for (const slug of previousWorkSlugs) {
    await access(
      new URL(`../public/projects/${slug}/cover.webp`, import.meta.url),
    );
    await access(
      new URL(`../content/projects/${slug}/project.json`, import.meta.url),
    );
    await access(
      new URL(`../content/projects/${slug}/gallery.json`, import.meta.url),
    );
  }

  await access(
    new URL("../content/publications/publications.json", import.meta.url),
  );
  await access(new URL("../content/grants/grants.json", import.meta.url));
  await access(
    new URL("../public/projects/steambot/thumbnail.webp", import.meta.url),
  );
  await access(
    new URL("../public/projects/spiromorphs/thumbnail.webp", import.meta.url),
  );
  await access(
    new URL(
      "../public/projects/archetype/gallery/poster.webp",
      import.meta.url,
    ),
  );
  await access(
    new URL("../public/CV_SabriGokmen_2026.docx", import.meta.url),
  );
});
