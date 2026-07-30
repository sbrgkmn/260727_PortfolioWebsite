import aiXArchitecture from "./projects/ai-x-architecture/project.json";
import aiXArchitectureGallery from "./projects/ai-x-architecture/gallery.json";
import archetype from "./projects/archetype/project.json";
import archetypeGallery from "./projects/archetype/gallery.json";
import archivePreviousTeaching from "./projects/archive-previous-teaching/project.json";
import archivePreviousTeachingGallery from "./projects/archive-previous-teaching/gallery.json";
import archivePreviousWork from "./projects/archive-previous-work/project.json";
import archivePreviousWorkGallery from "./projects/archive-previous-work/gallery.json";
import bursaSportsFacility from "./projects/bursa-sports-facility/project.json";
import bursaSportsFacilityGallery from "./projects/bursa-sports-facility/gallery.json";
import calyx from "./projects/calyx/project.json";
import calyxGallery from "./projects/calyx/gallery.json";
import carettaHospital from "./projects/caretta-hospital/project.json";
import carettaHospitalGallery from "./projects/caretta-hospital/gallery.json";
import cbi from "./projects/cbi/project.json";
import cbiGallery from "./projects/cbi/gallery.json";
import computationalPractice from "./projects/computational-practice/project.json";
import computationalPracticeGallery from "./projects/computational-practice/gallery.json";
import didemMadakTomb from "./projects/didem-madak-tomb/project.json";
import didemMadakTombGallery from "./projects/didem-madak-tomb/gallery.json";
import gothicDiffusion from "./projects/gothic-diffusion/project.json";
import gothicDiffusionGallery from "./projects/gothic-diffusion/gallery.json";
import gothicSuprematistMachine from "./projects/gothic-suprematist-machine/project.json";
import gothicSuprematistMachineGallery from "./projects/gothic-suprematist-machine/gallery.json";
import gyroid from "./projects/gyroid/project.json";
import gyroidGallery from "./projects/gyroid/gallery.json";
import manifold from "./projects/manifold/project.json";
import manifoldGallery from "./projects/manifold/gallery.json";
import minimabox from "./projects/minimabox/project.json";
import minimaboxGallery from "./projects/minimabox/gallery.json";
import morphogeneticVaults from "./projects/morphogenetic-vaults/project.json";
import morphogeneticVaultsGallery from "./projects/morphogenetic-vaults/gallery.json";
import morphogeneticTypologies from "./projects/morphogenetic-typologies/project.json";
import morphogeneticTypologiesGallery from "./projects/morphogenetic-typologies/gallery.json";
import occa from "./projects/occa/project.json";
import occaGallery from "./projects/occa/gallery.json";
import oliveloPark from "./projects/olivelo-park/project.json";
import oliveloParkGallery from "./projects/olivelo-park/gallery.json";
import opulentGrove from "./projects/opulent-grove/project.json";
import opulentGroveGallery from "./projects/opulent-grove/gallery.json";
import prototype from "./projects/prototype/project.json";
import prototypeGallery from "./projects/prototype/gallery.json";
import rotondaMosque from "./projects/rotonda-mosque/project.json";
import rotondaMosqueGallery from "./projects/rotonda-mosque/gallery.json";
import skinPavilion from "./projects/skin-pavilion/project.json";
import skinPavilionGallery from "./projects/skin-pavilion/gallery.json";
import spiromorphs from "./projects/spiromorphs/project.json";
import spiromorphsGallery from "./projects/spiromorphs/gallery.json";
import steambot from "./projects/steambot/project.json";
import steambotGallery from "./projects/steambot/gallery.json";
import tangleJungle from "./projects/tangle-jungle/project.json";
import tangleJungleGallery from "./projects/tangle-jungle/gallery.json";
import urbanParkFurniture from "./projects/urban-park-furniture/project.json";
import urbanParkFurnitureGallery from "./projects/urban-park-furniture/gallery.json";
import verSacrum from "./projects/ver-sacrum/project.json";
import verSacrumGallery from "./projects/ver-sacrum/gallery.json";
import vitalizedGeometry from "./projects/vitalized-geometry/project.json";
import vitalizedGeometryGallery from "./projects/vitalized-geometry/gallery.json";
import wuppertalReplacementBuilding from "./projects/wuppertal-replacement-building/project.json";
import wuppertalReplacementBuildingGallery from "./projects/wuppertal-replacement-building/gallery.json";
import publicationRecords from "./publications/publications.json";
import featuredPublicationRecords from "./publications/featured.json";
import grantRecords from "./grants/grants.json";
import featuredGrantRecords from "./grants/featured.json";

export type ProjectLayout = "standard" | "wide" | "portrait";
export type ProjectSection = "work" | "teaching";

type ProjectSource = {
  document: string;
  pages: number[];
};

type ProjectRecord = {
  slug: string;
  section: string;
  title: string;
  year: string;
  subtitle: string;
  layout: string;
  tags: string[];
  coverImage: string;
  coverAlt: string;
  summary: string;
  body: string[];
  facts: string[][];
  source: ProjectSource;
};

export type Project = Omit<
  ProjectRecord,
  "section" | "layout" | "facts"
> & {
  section: ProjectSection;
  layout: ProjectLayout;
  facts: [string, string][];
  media: {
    src: string;
    alt: string;
    caption: string;
    year?: string;
    type?: string;
    institution?: string;
    recognition?: string;
  }[];
};

export type Publication = {
  year: string;
  title: string;
  category: string;
  citation: string;
  venue: string;
  href: string;
  thumbnail: {
    src: string;
    alt: string;
    caption: string;
    sourceDocument: string;
    sourcePage: number;
  };
};

type GrantRecord = {
  group: string;
  title: string;
  agency: string;
  amount: string;
  role: string;
  period: string;
  status: string;
};

export type Grant = Omit<GrantRecord, "amount"> & {
  slug: string;
  periodLabel: string;
  fundingSource: string;
  summary: string;
};

export const selectedWorkLabels: Record<string, string> = {
  "gothic-diffusion": "Exhibition",
  steambot: "Research",
  archetype: "Symposium",
  occa: "Installation",
  spiromorphs: "Generative Art",
  calyx: "Public Art",
  cbi: "Consultancy",
  "archive-previous-work": "Archive",
};

export function getSingleYear(year: string) {
  return year.match(/\d{4}/g)?.at(-1) ?? year;
}

const profileSource = {
  name: "Sabri Gökmen",
  headline:
    "Computational design across morphology, artificial intelligence, and material fabrication.",
  introduction:
    "Architect, computational designer, researcher, and educator based in Charlotte, North Carolina.",
  biography:
    "Sabri Gökmen, PhD, is an architect, computational designer, researcher, and educator whose work connects parametric design, morphology, digital fabrication, generative artificial intelligence, digital heritage, and generative art.",
  location: "Charlotte, NC, USA",
  email: "contact@sabrigokmen.com",
};

export const profile = {
  ...profileSource,
  name: "Sabri Gokmen",
  biography:
    "Sabri Gokmen is a computational designer and researcher with more than 15 years of experience in parametric modeling, generative art, digital fabrication, and software development. Originally trained as an architect, he later became a researcher and completed his PhD in the United States. Along the way, he designed, manufactured, and built numerous public artworks, taught technology-oriented design courses, created a YouTube channel, and developed generative code for his research and art. He currently works in academia, dividing his time among teaching, research, and coding.",
  links: {
    website: "http://www.sabrigokmen.com/",
    phd: "https://smartech.gatech.edu/handle/1853/58649",
    publicArt: "https://www.demiurgedesign.com/calyx",
    research: "https://khas.academia.edu/SabriGokmen",
    youtube:
      "https://www.youtube.com/channel/UCHGjWx-r-g_scgX-kIQc5sw/videos",
    academicProfile: "https://coaa.charlotte.edu/people/sabri-gokmen/",
    linktree: "https://linktr.ee/Sabrgb",
  },
};

function prepareProject(
  record: ProjectRecord,
  gallery: Project["media"],
): Project {
  return {
    ...record,
    title:
      record.slug === "archive-previous-work"
        ? "Previous Work"
        : record.slug === "archive-previous-teaching"
          ? "Previous Teaching"
        : record.title,
    section: record.section as ProjectSection,
    layout: record.layout as ProjectLayout,
    facts: record.facts as [string, string][],
    media: gallery,
  };
}

const records: [ProjectRecord, Project["media"]][] = [
  [steambot, steambotGallery],
  [gothicDiffusion, gothicDiffusionGallery],
  [occa, occaGallery],
  [spiromorphs, spiromorphsGallery],
  [calyx, calyxGallery],
  [archetype, archetypeGallery],
  [cbi, cbiGallery],
  [archivePreviousWork, archivePreviousWorkGallery],
  [gyroid, gyroidGallery],
  [vitalizedGeometry, vitalizedGeometryGallery],
  [minimabox, minimaboxGallery],
  [morphogeneticVaults, morphogeneticVaultsGallery],
  [tangleJungle, tangleJungleGallery],
  [verSacrum, verSacrumGallery],
  [opulentGrove, opulentGroveGallery],
  [skinPavilion, skinPavilionGallery],
  [manifold, manifoldGallery],
  [bursaSportsFacility, bursaSportsFacilityGallery],
  [oliveloPark, oliveloParkGallery],
  [urbanParkFurniture, urbanParkFurnitureGallery],
  [carettaHospital, carettaHospitalGallery],
  [rotondaMosque, rotondaMosqueGallery],
  [didemMadakTomb, didemMadakTombGallery],
  [wuppertalReplacementBuilding, wuppertalReplacementBuildingGallery],
  [prototype, prototypeGallery],
  [gothicSuprematistMachine, gothicSuprematistMachineGallery],
  [morphogeneticTypologies, morphogeneticTypologiesGallery],
  [aiXArchitecture, aiXArchitectureGallery],
  [computationalPractice, computationalPracticeGallery],
  [archivePreviousTeaching, archivePreviousTeachingGallery],
];

export const workProjects = records
  .map(([record, gallery]) => prepareProject(record, gallery))
  .filter((project) => project.section === "work");

export const previousWorkProjects = workProjects.filter((project) =>
  project.tags.includes("Previous Work"),
);

export const featuredWorkProjects = workProjects.filter(
  (project) => !project.tags.includes("Previous Work"),
).sort(
  (a, b) =>
    Number.parseInt(b.year, 10) - Number.parseInt(a.year, 10),
);

export const teachingProjects = records
  .map(([record, gallery]) => prepareProject(record, gallery))
  .filter((project) => project.section === "teaching")
  .sort(
    (a, b) =>
      Number.parseInt(b.year, 10) - Number.parseInt(a.year, 10),
  );

const publicationIndex = new Map(
  publicationRecords.map((publication) => [publication.title, publication]),
);

export const publications: Publication[] = featuredPublicationRecords
  .map((featured) => {
    const publication = publicationIndex.get(featured.title);
    if (!publication) {
      throw new Error(`Unknown featured publication: ${featured.title}`);
    }
    return {
      ...publication,
      venue: featured.venue,
      href: featured.href,
      thumbnail: featured.thumbnail,
    };
  })
  .sort((a, b) => Number.parseInt(b.year, 10) - Number.parseInt(a.year, 10));

const grantIndex = new Map(grantRecords.map((grant) => [grant.title, grant]));

export const grants: Grant[] = featuredGrantRecords.map((featured) => {
  const grant = grantIndex.get(featured.title);
  if (!grant) {
    throw new Error(`Unknown featured grant: ${featured.title}`);
  }
  return {
    group: grant.group,
    title: grant.title,
    agency: grant.agency,
    role: grant.role,
    period: grant.period,
    status: grant.status,
    slug: featured.slug,
    periodLabel: featured.periodLabel,
    fundingSource: featured.fundingSource,
    summary: featured.summary,
  };
}).sort((a, b) => {
  const yearA = Number.parseInt(a.periodLabel.match(/\d{4}/)?.[0] ?? "0", 10);
  const yearB = Number.parseInt(b.periodLabel.match(/\d{4}/)?.[0] ?? "0", 10);
  return yearB - yearA;
});

export function getWorkProject(slug: string) {
  return workProjects.find((project) => project.slug === slug);
}

export function getTeachingProject(slug: string) {
  return teachingProjects.find((project) => project.slug === slug);
}

export function getGrant(slug: string) {
  return grants.find((grant) => grant.slug === slug);
}
