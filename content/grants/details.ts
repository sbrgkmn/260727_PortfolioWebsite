import type { Project } from "../portfolio";

export type GrantDetailContent = {
  title: string;
  agency: string;
  projectNumber?: string;
  amount?: string;
  role: string;
  team: string[];
  duration: string;
  status: string;
  summary: string;
  body: string[];
  publications: {
    title: string;
    href: string;
  }[];
  media: Project["media"];
};

export const grantDetails: Record<string, GrantDetailContent> = {
  "prompt-to-geometry": {
    title: "Prompt-to-Geometry",
    agency: "Office of Undergraduate Research Summer Program, UNC Charlotte",
    amount: "10,000 USD",
    role: "Mentor",
    team: ["Andrei Vince — Research Fellow", "Aidan Oh — Research Fellow"],
    duration: "10 weeks, May–July 2025",
    status: "Completed",
    summary:
      "Exploring Large Language Models for Generative Python Scripting in Architectural Design",
    body: [
      "Prompt-to-Geometry examines how large language models can support reusable Python scripting and generative architectural design workflows. The research translates natural-language design instructions into code-driven geometric studies, linking prompt development, script iteration, and three-dimensional modeling.",
      "The undergraduate research project compares generated design variations with parametric models and visualizes the relationship between text prompts, computational definitions, and architectural form.",
    ],
    publications: [],
    media: [
      {
        src: "/grants/prompt%20to%20geometry/1.jpg",
        alt: "Collection of AI-generated tower images",
        caption: "Prompt-based design variations",
      },
      {
        src: "/grants/prompt%20to%20geometry/2.jpg",
        alt: "Grid of generated parametric tower variants",
        caption: "Generated geometric variants",
      },
      {
        src: "/grants/prompt%20to%20geometry/3.png",
        alt: "Node-based computational workflow connecting images and geometry",
        caption: "Image-to-geometry workflow",
      },
      {
        src: "/grants/prompt%20to%20geometry/4.gif",
        alt: "Animated AI-generated tower study",
        caption: "AI-generated tower study I",
      },
      {
        src: "/grants/prompt%20to%20geometry/5.gif",
        alt: "Animated variation of an AI-generated tower study",
        caption: "AI-generated tower study II",
      },
      {
        src: "/grants/prompt%20to%20geometry/6.png",
        alt: "Selected architectural images paired with prompt excerpts",
        caption: "Selected designs and prompt excerpts",
      },
      {
        src: "/grants/prompt%20to%20geometry/7.png",
        alt: "Node-based parametric definition for generated geometry",
        caption: "Parametric definition",
      },
      {
        src: "/grants/prompt%20to%20geometry/8.png",
        alt: "Collection of generated architectural massing models",
        caption: "Generated massing collection",
      },
    ],
  },
  "safranbolu-house-typologies": {
    title: "Safranbolu House Typologies",
    agency:
      "TÜBİTAK — The Scientific and Technological Research Council of Turkey",
    amount: "2,196,330.96 TL",
    role: "Project Coordinator, Grant Recipient",
    team: [
      "Taner Arsan — Researcher, Kadir Has University",
      "Füsun E. Alioğlu — Consultant, Kadir Has University",
      "Figen Özen — Consultant, Haliç University",
    ],
    duration: "June 2023–December 2025",
    status: "Completed",
    summary:
      "Computational Methods for the Analysis of Traditional Safranbolu House Plan Typologies Using Generative Adversarial Networks",
    body: [
      "Safranbolu, a UNESCO World Heritage site, contains well-preserved Ottoman houses dating from the eighteenth century. The project addresses the limited computational research on their architectural typologies by developing a structured plan database and artificial-intelligence methods for studying their organization and variation.",
      "The research analyzes architectural concepts including form, symmetry, and proportion through machine-learning workflows. Generative adversarial networks, categorical representations, and clustering methods support both qualitative and quantitative comparisons of house plans, while open datasets and applications extend the work to future interdisciplinary research in artificial intelligence and architectural heritage.",
    ],
    publications: [],
    media: [
      {
        src: "/grants/Safranbolu/1.png",
        alt: "Historic Ottoman houses in Safranbolu",
        caption: "Traditional Safranbolu houses",
      },
      {
        src: "/grants/Safranbolu/2.jpg",
        alt: "Dataset of color-coded Safranbolu house plans",
        caption: "Plan typology dataset",
      },
      {
        src: "/grants/Safranbolu/3.jpg",
        alt: "Archival plans traced and segmented for machine learning",
        caption:
          "Archival plans, traced drawings, segmentation, and attention masks",
      },
      {
        src: "/grants/Safranbolu/4.avif",
        alt: "Generative adversarial network workflow for house plans",
        caption: "Generative adversarial network workflow",
      },
      {
        src: "/grants/Safranbolu/5.png",
        alt: "Clustering results for Safranbolu house plan typologies",
        caption: "Probabilistic clustering of plan typologies",
      },
      {
        src: "/grants/Safranbolu/6.png",
        alt: "Classified examples from the Safranbolu plan dataset",
        caption: "Classified plan samples",
      },
      {
        src: "/grants/Safranbolu/7.png",
        alt: "Representative classified Safranbolu house plans",
        caption: "Representative plan typology classes",
      },
      {
        src: "/grants/Safranbolu/8-web.mp4",
        alt: "Video of an AI-assisted parametric modeling workflow",
        caption: "AI-assisted parametric modeling workflow",
      },
      {
        src: "/grants/Safranbolu/9-web.mp4",
        alt: "Video of a generative scripting workflow",
        caption: "Generative scripting workflow",
      },
      {
        src: "/grants/Safranbolu/10.gif",
        alt: "Generated variations of house plan typologies",
        caption: "Generated plan typology variations",
      },
    ],
  },
  "muqarnas-design-tools": {
    title: "Parametric Muqarnas",
    agency:
      "TÜBİTAK — The Scientific and Technological Research Council of Turkey",
    projectNumber: "218K328",
    amount: "358,020 TL",
    role: "Project Coordinator, Grant Recipient",
    team: [
      "Sema Alaçam — Researcher, Istanbul Technical University",
      "Altan Başık",
      "Yusuf Aykın",
      "Sevgi Altun",
      "Cem Güneş",
    ],
    duration: "October 2019–August 2021",
    status: "Completed",
    summary:
      "Development of Computational Tools for Design Processes of Geometric Pattern-Based Muqarnas",
    body: [
      "This research automates the analysis, design, and modeling of muqarnas elements in Anatolian Seljuk architecture. It combines archival and field research with photogrammetry, point-cloud reconstruction, three-dimensional modeling, and parametric design to identify the geometric rules underlying historical examples.",
      "The project establishes a digital framework for studying architectural heritage across disciplines. Its computational models translate geometric patterns, recursive stacking, symmetry, and branching into reusable design rules that support comparative research, contemporary design exploration, and digital fabrication.",
    ],
    publications: [
      {
        title:
          "Computational Modeling and Analysis of Seljukid Muqarnas in Kayseri",
        href: "https://dl.acm.org/doi/abs/10.1145/3477399",
      },
      {
        title:
          "A Recursive Algorithm for the Generative Study of Seljuk Muqarnas in Kayseri and Sivas",
        href: "https://link.springer.com/article/10.1007/s00004-023-00686-4",
      },
    ],
    media: [
      {
        src: "/grants/muqarnas/1.avif",
        alt: "Taxonomy of selected Anatolian Seljuk muqarnas examples",
        caption: "Taxonomy of selected Anatolian Seljuk muqarnas",
      },
      {
        src: "/grants/muqarnas/2.avif",
        alt: "Geometric pattern analysis of selected muqarnas examples",
        caption: "Geometric taxonomy and pattern analysis",
      },
      {
        src: "/grants/muqarnas/2.jpg",
        alt: "Matrix of parametrically generated muqarnas variations",
        caption: "Parametric muqarnas variations",
      },
      {
        src: "/grants/muqarnas/3.gif",
        alt: "Animated photogrammetric reconstruction of a Seljuk portal muqarnas",
        caption: "Photogrammetric reconstruction of a Seljuk portal muqarnas",
      },
      {
        src: "/grants/muqarnas/4.gif",
        alt: "Animated digital reconstruction of a Seljuk portal muqarnas",
        caption: "Point-cloud and mesh reconstruction",
      },
      {
        src: "/grants/muqarnas/5.jpg",
        alt: "Diagram of the project research methodology",
        caption:
          "Research methodology: digital data, modeling, analysis, and parametric generation",
      },
      {
        src: "/grants/muqarnas/6.jpg",
        alt: "Diagrams of recursive growth rules and muqarnas construction",
        caption: "Recursive growth rules and geometric construction",
      },
      {
        src: "/grants/muqarnas/7.jpg",
        alt: "Axonometric diagram and symmetry analysis of a muqarnas",
        caption: "Axonometric diagram and symmetry analysis",
      },
      {
        src: "/grants/muqarnas/8.jpg",
        alt: "Diagrams of branching morphology axes and connection types",
        caption: "Branching morphology, axes, and connection types",
      },
      {
        src: "/grants/muqarnas/9.gif",
        alt: "Animated recursive generation of a muqarnas form",
        caption: "Recursive generative study I",
      },
      {
        src: "/grants/muqarnas/10.gif",
        alt: "Animated variation of a recursively generated muqarnas form",
        caption: "Recursive generative study II",
      },
    ],
  },
};
