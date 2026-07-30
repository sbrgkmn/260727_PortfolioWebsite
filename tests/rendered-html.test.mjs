import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const workSlugs = [
  "steambot",
  "gothic-diffusion",
  "occa",
  "spiromorphs",
  "calyx",
  "archetype",
  "cbi",
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

async function loadCarouselSlides() {
  const slidesUrl = new URL(
    "../content/carousel/slides.json",
    import.meta.url,
  );
  return JSON.parse(await readFile(slidesUrl, "utf8"));
}

test("renders only the approved work and teaching index", async () => {
  const response = await render("/");
  const html = await response.text();
  const carouselSlides = await loadCarouselSlides();

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  assert.doesNotMatch(html, /href="\/work\/prompt-to-geometry"/i);

  for (const slug of workSlugs) {
    assert.match(html, new RegExp(`/work/${slug}`));
  }

  assert.match(html, /href="\/work\/archive-previous-work"/);
  assert.match(html, /class="project-carousel"/);
  assert.equal(
    (html.match(/class="project-carousel__slide/g) ?? []).length,
    carouselSlides.length,
  );
  assert.equal(
    (html.match(/class="landing-disclosure"/g) ?? []).length,
    5,
  );
  assert.doesNotMatch(html, /class="landing-disclosure" open/);
  assert.match(html, />Pause<\/button>/);
  assert.doesNotMatch(html, /\d+ entries|selected grants and proposals/i);

  const selectedWorkSlugs = [
    ...html.matchAll(
      /<a class="catalog-row" href="\/work\/([^"]+)"/g,
    ),
  ].map((match) => match[1]);
  assert.deepEqual(
    selectedWorkSlugs,
    [
      "steambot",
      "gothic-diffusion",
      "archetype",
      "cbi",
      "occa",
      "spiromorphs",
      "calyx",
      "archive-previous-work",
    ],
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
  assert.match(html, /href="\/grants\/prompt-to-geometry"/);
  assert.match(html, /href="\/grants\/safranbolu-house-typologies"/);
  assert.match(html, /href="\/grants\/muqarnas-design-tools"/);
  assert.match(html, /href="\/CV_Sabri_Gokmen_2026\.docx"/);
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

  assert.equal(
    (
      html.match(
        /class="catalog-row(?: catalog-row--static)? grant-entry"/g,
      ) ?? []
    ).length,
    grantSlugs.length,
  );
});

test("renders work and teaching detail routes", async () => {
  const workResponse = await render("/work/steambot");
  const cbiResponse = await render("/work/cbi");
  const teachingResponse = await render("/teaching/prototype");
  const workHtml = await workResponse.text();
  const cbiHtml = await cbiResponse.text();
  const teachingHtml = await teachingResponse.text();

  assert.equal(workResponse.status, 200);
  assert.match(workHtml, /SteamBot/);
  assert.match(workHtml, /class="project-slideshow/);
  assert.equal(cbiResponse.status, 200);
  assert.match(cbiHtml, /Central Bank of Iraq \(CBI\)/);
  assert.equal((cbiHtml.match(/<figure\b/g) ?? []).length, 12);
  assert.match(cbiHtml, /src="\/projects\/CBI\/1\.jpg"/);
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
  assert.match(
    html,
    /class="project-detail project-detail--work project-detail--indexed"/,
  );
  assert.match(html, /<dt>Year<\/dt><dd>2024<\/dd>/);
  assert.doesNotMatch(html, /class="project-gallery/);
  assert.match(html, /href="\/work\/archive-previous-work"/);
});

test("renders the previous-work archive as a static four-by-four gallery", async () => {
  const response = await render("/work/archive-previous-work");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /<h1>Previous Work<\/h1>/);
  assert.match(html, /class="project-gallery project-gallery--archive"/);
  assert.equal((html.match(/<figure>/g) ?? []).length, 16);
  assert.doesNotMatch(html, /class="project-hero"/);
  assert.doesNotMatch(html, /\d+ projects|\d+ cropped images/i);
  assert.match(html, /href="\/#work"/);
});

test("includes every configured project and carousel image", async () => {
  for (const slug of [
    ...workSlugs,
    ...teachingSlugs,
    ...previousWorkSlugs,
    "archive-previous-work",
  ]) {
    const projectJsonUrl = new URL(
      `../content/projects/${slug}/project.json`,
      import.meta.url,
    );
    const galleryJsonUrl = new URL(
      `../content/projects/${slug}/gallery.json`,
      import.meta.url,
    );
    const project = JSON.parse(await readFile(projectJsonUrl, "utf8"));
    const gallery = JSON.parse(await readFile(galleryJsonUrl, "utf8"));

    await access(new URL(`../public${project.coverImage}`, import.meta.url));
    for (const item of gallery) {
      await access(new URL(`../public${item.src}`, import.meta.url));
    }
  }

  const carouselSlides = await loadCarouselSlides();
  for (const slide of carouselSlides) {
    await access(new URL(`../public${slide.src}`, import.meta.url));
  }

  await access(
    new URL("../content/publications/publications.json", import.meta.url),
  );
  await access(new URL("../content/grants/grants.json", import.meta.url));
  await access(
    new URL("../public/CV_Sabri_Gokmen_2026.docx", import.meta.url),
  );
});
