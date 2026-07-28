from __future__ import annotations

import argparse
import json
from dataclasses import dataclass
from pathlib import Path

import pypdfium2 as pdfium
from PIL import Image, ImageDraw


@dataclass(frozen=True)
class Crop:
    page: int
    box: tuple[float, float, float, float]
    name: str
    alt: str
    caption: str


PROJECT_CROPS: dict[str, tuple[str, list[Crop]]] = {
    "steambot": (
        "Research_Portfolio.pdf",
        [
            Crop(24, (0.52, 0.05, 0.97, 0.59), "workflow", "SteamBot robotic steam-bending workflow and fabrication studies", "Robotic steam-bending workflow and fabrication studies"),
            Crop(25, (0.03, 0.09, 0.50, 0.90), "robotic-cell", "SteamBot timber member positioned in the robotic fabrication cell", "Timber forming in the robotic fabrication cell"),
            Crop(26, (0.51, 0.05, 0.98, 0.91), "prototypes", "SteamBot bent-timber prototypes and connection tests", "Bent-timber prototypes and connection tests"),
        ],
    ),
    "gothic-diffusion": (
        "Research_Portfolio.pdf",
        [
            Crop(40, (0.50, 0.07, 0.98, 0.91), "generated-rosettes", "Gothic Diffusion generated rose-window studies", "Generated Gothic rose-window studies"),
            Crop(41, (0.03, 0.07, 0.98, 0.91), "dataset-and-training", "Gothic Diffusion dataset, training, and generated image comparisons", "Dataset, training, and generated image comparisons"),
            Crop(42, (0.03, 0.08, 0.98, 0.91), "exhibition", "Gothic Diffusion exhibition installation and projection", "Exhibition installation and projection"),
        ],
    ),
    "occa": (
        "Research_Portfolio.pdf",
        [
            Crop(43, (0.50, 0.07, 0.98, 0.91), "installation", "Occa suspended installation in the gallery", "Suspended Occa installation"),
            Crop(44, (0.52, 0.05, 0.98, 0.92), "detail", "Occa installation detail showing folded sheet components", "Folded sheet components and suspended assembly"),
            Crop(44, (0.03, 0.06, 0.51, 0.92), "fabrication", "Occa parametric geometry and fabrication diagrams", "Parametric geometry and fabrication diagrams"),
        ],
    ),
    "spiromorphs": (
        "Research_Portfolio.pdf",
        [
            Crop(45, (0.38, 0.06, 0.98, 0.91), "generative-series", "Spiromorphs generative drawing series", "Generative drawing series"),
        ],
    ),
    "calyx": (
        "Research_Portfolio.pdf",
        [
            Crop(48, (0.50, 0.06, 0.98, 0.91), "installation", "Calyx branching installation in the gallery", "Calyx installation"),
            Crop(49, (0.03, 0.06, 0.50, 0.92), "assembly", "Calyx assembly and fabrication detail", "Assembly and fabrication detail"),
            Crop(49, (0.51, 0.06, 0.98, 0.92), "geometry", "Calyx branching geometry and component diagram", "Branching geometry and component diagram"),
        ],
    ),
    "archetype": (
        "Service_Portfolio.pdf",
        [
            Crop(14, (0.50, 0.05, 0.98, 0.92), "poster", "Archetype exhibition poster", "Exhibition poster"),
            Crop(15, (0.03, 0.06, 0.98, 0.92), "events", "Archetype exhibition events and gallery views", "Exhibition events and gallery views"),
            Crop(16, (0.03, 0.06, 0.98, 0.92), "booklet", "Archetype publication and booklet design", "Publication and booklet design"),
            Crop(17, (0.03, 0.06, 0.98, 0.92), "publication", "Archetype publication spreads", "Publication spreads"),
            Crop(19, (0.03, 0.06, 0.98, 0.92), "student-work", "Archetype student exhibition projects", "Student exhibition projects"),
        ],
    ),
    "archive-previous-work": (
        "Research_Portfolio.pdf",
        [
            Crop(50, (0.035, 0.07, 0.466, 0.455), "gyroid", "Gyroid installation", "Gyroid"),
            Crop(50, (0.537, 0.07, 0.966, 0.455), "vitalized-geometry", "Vitalized Geometry installation", "Vitalized Geometry"),
            Crop(50, (0.035, 0.51, 0.466, 0.90), "minimabox", "MinimaBOX pavilion proposal", "MinimaBOX"),
            Crop(50, (0.537, 0.51, 0.966, 0.90), "morphogenetic-vaults", "Morphogenetic Vaults studies", "Morphogenetic Vaults"),
            Crop(51, (0.035, 0.07, 0.466, 0.455), "tangle-jungle", "Tangle Jungle installation", "Tangle Jungle"),
            Crop(51, (0.537, 0.07, 0.966, 0.455), "ver-sacrum", "Ver Sacrum installation", "Ver Sacrum"),
            Crop(51, (0.035, 0.51, 0.466, 0.90), "opulent-grove", "Opulent Grove pavilion proposal", "Opulent Grove"),
            Crop(51, (0.537, 0.51, 0.966, 0.90), "skin-pavilion", "Skin Pavilion installation", "Skin Pavilion"),
            Crop(52, (0.035, 0.07, 0.466, 0.455), "manifold", "Manifold sculpture competition proposal", "Manifold"),
            Crop(52, (0.537, 0.07, 0.966, 0.455), "bursa-sports-facility", "Bursa Ataturk Sports Facility competition proposal", "Bursa Ataturk Sports Facility Competition"),
            Crop(52, (0.035, 0.51, 0.466, 0.90), "olivelo-park", "Olivelo Park competition proposal", "Olivelo Park"),
            Crop(52, (0.537, 0.51, 0.966, 0.90), "urban-park-furniture", "Furniture Design for Urban Parks competition proposal", "Furniture Design for Urban Parks Competition"),
            Crop(53, (0.035, 0.07, 0.466, 0.455), "caretta-hospital", "Iztuzu Caretta Caretta Hospital competition proposal", "Iztuzu Caretta Caretta Hospital Competition"),
            Crop(53, (0.537, 0.07, 0.966, 0.455), "rotonda-mosque", "Rotonda Mosque competition proposal", "Rotonda Mosque"),
            Crop(53, (0.035, 0.51, 0.466, 0.90), "didem-madak-tomb", "Tomb for Didem Madak competition proposal", "Tomb for Didem Madak"),
            Crop(53, (0.537, 0.51, 0.966, 0.90), "wuppertal-replacement-building", "Replacement Building for University of Wuppertal competition proposal", "Replacement Building for University of Wuppertal"),
        ],
    ),
    "gothic-suprematist-machine": (
        "Teaching_Portfolio.pdf",
        [
            Crop(5, (0.03, 0.07, 0.98, 0.92), "studio-process", "Gothic Suprematist Machine studio process and diagrams", "Studio process and diagrams"),
            Crop(6, (0.03, 0.07, 0.98, 0.92), "student-work-01", "Gothic Suprematist Machine student work", "Selected student work"),
            Crop(8, (0.03, 0.07, 0.98, 0.92), "student-work-02", "Gothic Suprematist Machine models and drawings", "Models and drawings"),
            Crop(10, (0.03, 0.07, 0.98, 0.92), "student-work-03", "Gothic Suprematist Machine digital and physical studies", "Digital and physical studies"),
            Crop(11, (0.03, 0.07, 0.98, 0.92), "student-work-04", "Gothic Suprematist Machine final projects", "Final projects"),
        ],
    ),
    "morphogenetic-typologies": (
        "Teaching_Portfolio.pdf",
        [
            Crop(19, (0.03, 0.07, 0.98, 0.92), "process", "Morphogenetic Typologies computational process", "Computational process"),
            Crop(20, (0.03, 0.07, 0.98, 0.92), "student-work-01", "Morphogenetic Typologies student studies", "Selected student studies"),
            Crop(21, (0.03, 0.07, 0.98, 0.92), "student-work-02", "Morphogenetic Typologies generated forms", "Generated forms"),
            Crop(23, (0.03, 0.07, 0.98, 0.92), "student-work-03", "Morphogenetic Typologies final student work", "Final student work"),
        ],
    ),
    "prototype": (
        "Teaching_Portfolio.pdf",
        [
            Crop(25, (0.03, 0.07, 0.98, 0.92), "process", "Prototype studio process and early studies", "Studio process and early studies"),
            Crop(26, (0.03, 0.07, 0.98, 0.92), "models-01", "Prototype studio physical models", "Physical models"),
            Crop(28, (0.03, 0.07, 0.98, 0.92), "models-02", "Prototype studio material studies", "Material studies"),
            Crop(31, (0.03, 0.07, 0.98, 0.92), "student-work-01", "Prototype studio student work", "Selected student work"),
            Crop(33, (0.03, 0.07, 0.98, 0.92), "student-work-02", "Prototype studio final projects", "Final projects"),
        ],
    ),
    "ai-x-architecture": (
        "Teaching_Portfolio.pdf",
        [
            Crop(35, (0.03, 0.07, 0.98, 0.92), "workflow", "AI x Architecture generative design workflow", "Generative design workflow"),
            Crop(36, (0.03, 0.07, 0.98, 0.92), "student-work-01", "AI x Architecture student work", "Selected student work"),
            Crop(37, (0.03, 0.07, 0.98, 0.92), "student-work-02", "AI x Architecture final projects", "Final projects"),
        ],
    ),
    "computational-practice": (
        "Teaching_Portfolio.pdf",
        [
            Crop(39, (0.03, 0.07, 0.98, 0.92), "exercise-01", "Computational Practice parametric exercise", "Parametric exercise"),
            Crop(40, (0.03, 0.07, 0.98, 0.92), "exercise-02", "Computational Practice geometric studies", "Geometric studies"),
            Crop(43, (0.03, 0.07, 0.98, 0.92), "exercise-03", "Computational Practice fabrication studies", "Fabrication studies"),
            Crop(45, (0.03, 0.07, 0.98, 0.92), "exercise-04", "Computational Practice student work", "Selected student work"),
            Crop(47, (0.03, 0.07, 0.98, 0.92), "exercise-05", "Computational Practice computational models", "Computational models"),
            Crop(49, (0.03, 0.07, 0.98, 0.92), "exercise-06", "Computational Practice final projects", "Final projects"),
        ],
    ),
    "archive-previous-teaching": (
        "Teaching_Portfolio.pdf",
        [
            Crop(13, (0.03, 0.07, 0.98, 0.92), "teaching-01", "Previous teaching studio projects", "Previous teaching studio projects"),
            Crop(14, (0.03, 0.07, 0.98, 0.92), "teaching-02", "Previous computational design teaching", "Previous computational design teaching"),
            Crop(16, (0.03, 0.07, 0.98, 0.92), "teaching-03", "Previous fabrication and design teaching", "Previous fabrication and design teaching"),
            Crop(17, (0.03, 0.07, 0.98, 0.92), "teaching-04", "Previous student work", "Previous student work"),
        ],
    ),
}


PUBLICATION_CROPS = [
    Crop(6, (0.03, 0.12, 0.46, 0.88), "ijac-2026", "International Journal of Architectural Computing article cover", "International Journal of Architectural Computing, 2026"),
    Crop(7, (0.04, 0.18, 0.41, 0.85), "curved-layered-2023", "Curved and Layered Structures journal cover", "Curved and Layered Structures, 2023"),
    Crop(8, (0.06, 0.19, 0.41, 0.83), "nexus-journal-2023", "Nexus Network Journal cover", "Nexus Network Journal, 2023"),
    Crop(9, (0.04, 0.19, 0.42, 0.85), "jocch-2022", "Journal on Computing and Cultural Heritage cover", "Journal on Computing and Cultural Heritage, 2022"),
    Crop(10, (0.04, 0.19, 0.43, 0.84), "cad-2022", "Computer-Aided Design journal cover", "Computer-Aided Design, 2022"),
    Crop(11, (0.05, 0.18, 0.45, 0.86), "environment-planning-b-2020", "Environment and Planning B journal cover", "Environment and Planning B, 2020"),
    Crop(12, (0.05, 0.18, 0.44, 0.86), "leonardo-2020", "Leonardo journal cover", "Leonardo, 2020"),
    Crop(13, (0.04, 0.18, 0.44, 0.83), "metu-jfa-2020", "METU Journal of the Faculty of Architecture cover", "METU JFA, 2020"),
    Crop(15, (0.05, 0.18, 0.44, 0.87), "acadia-2026", "ACADIA 2026 Humanism Recoded conference cover", "ACADIA 2026"),
    Crop(17, (0.05, 0.18, 0.45, 0.88), "acsa-2026", "ACSA 114 conference abstract book cover", "ACSA 114 Annual Meeting, 2026"),
    Crop(19, (0.05, 0.19, 0.43, 0.88), "ncbds-2026", "NCBDS 41 conference program cover", "NCBDS 41, 2026"),
    Crop(18, (0.04, 0.15, 0.44, 0.89), "ecaade-2025", "eCAADe 2025 conference proceedings cover", "eCAADe 2025"),
    Crop(16, (0.04, 0.17, 0.43, 0.87), "nexus-2025", "Nexus 2025 conference book cover", "Nexus 2025"),
    Crop(20, (0.05, 0.17, 0.43, 0.88), "acadia-2014", "ACADIA 2014 Design Agency conference proceedings cover", "ACADIA 2014"),
    Crop(21, (0.05, 0.17, 0.43, 0.84), "caadria-2014", "CAADRIA 2014 conference proceedings cover", "CAADRIA 2014"),
    Crop(22, (0.05, 0.21, 0.44, 0.82), "ecaade-2013", "eCAADe 2013 Computation and Performance conference proceedings cover", "eCAADe 2013"),
]

THUMBNAIL_CROPS: dict[str, tuple[str, Crop]] = {
    "steambot": (
        "Research_Portfolio.pdf",
        Crop(
            26,
            (0.76, 0.05, 0.97, 0.86),
            "thumbnail",
            "Single SteamBot bent-timber column prototype",
            "SteamBot bent-timber column prototype",
        ),
    ),
    "spiromorphs": (
        "Research_Portfolio.pdf",
        Crop(
            45,
            (0.66, 0.07, 0.815, 0.285),
            "thumbnail",
            "Single red and gold Spiromorph generative artwork",
            "Spiromorph generative artwork",
        ),
    ),
}


def render_page(pdf: pdfium.PdfDocument, page_number: int) -> Image.Image:
    page = pdf[page_number - 1]
    bitmap = page.render(scale=2.0, rev_byteorder=True)
    return bitmap.to_pil().convert("RGB")


def crop_image(image: Image.Image, crop: Crop) -> Image.Image:
    x0, y0, x1, y1 = crop.box
    box = (
        round(x0 * image.width),
        round(y0 * image.height),
        round(x1 * image.width),
        round(y1 * image.height),
    )
    return image.crop(box)


def make_contact_sheet(images: list[tuple[Path, str]], output: Path) -> None:
    thumb_width = 360
    label_height = 38
    gap = 18
    columns = 3
    cards: list[Image.Image] = []

    for path, label in images:
        image = Image.open(path).convert("RGB")
        image.thumbnail((thumb_width, 440), Image.Resampling.LANCZOS)
        card = Image.new(
            "RGB",
            (thumb_width, image.height + label_height),
            "white",
        )
        card.paste(image, ((thumb_width - image.width) // 2, 0))
        ImageDraw.Draw(card).text((6, image.height + 12), label, fill="#111111")
        cards.append(card)

    rows = (len(cards) + columns - 1) // columns
    row_heights = [
        max(card.height for card in cards[row * columns : (row + 1) * columns])
        for row in range(rows)
    ]
    width = columns * thumb_width + (columns + 1) * gap
    height = sum(row_heights) + (rows + 1) * gap
    sheet = Image.new("RGB", (width, height), "#dddddd")

    y = gap
    for row in range(rows):
        x = gap
        for card in cards[row * columns : (row + 1) * columns]:
            sheet.paste(card, (x, y))
            x += thumb_width + gap
        y += row_heights[row] + gap

    output.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(output, "JPEG", quality=90, optimize=True)


def write_project_crops(root: Path, source_root: Path) -> None:
    qa_root = root / "tmp" / "pdfs" / "crops"
    open_pdfs: dict[str, pdfium.PdfDocument] = {}

    for slug, (source_name, crops) in PROJECT_CROPS.items():
        pdf = open_pdfs.setdefault(
            source_name,
            pdfium.PdfDocument(source_root / source_name),
        )
        gallery_dir = root / "public" / "projects" / slug / "gallery"
        gallery_dir.mkdir(parents=True, exist_ok=True)
        gallery: list[dict[str, str | int]] = []
        rendered: list[tuple[Path, str]] = []

        for crop in crops:
            output = gallery_dir / f"{crop.name}.webp"
            crop_image(render_page(pdf, crop.page), crop).save(
                output,
                "WEBP",
                quality=88,
                method=6,
            )
            gallery.append(
                {
                    "src": f"/projects/{slug}/gallery/{output.name}",
                    "alt": crop.alt,
                    "caption": crop.caption,
                    "sourcePage": crop.page,
                }
            )
            rendered.append((output, f"p.{crop.page} · {crop.name}"))

        content_path = root / "content" / "projects" / slug / "gallery.json"
        content_path.write_text(
            json.dumps(gallery, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )
        make_contact_sheet(rendered, qa_root / f"{slug}.jpg")
        print(f"Wrote {len(crops)} gallery crops for {slug}")


def write_publication_crops(root: Path, source_root: Path) -> None:
    pdf = pdfium.PdfDocument(source_root / "Research_Portfolio.pdf")
    output_dir = root / "public" / "publications"
    output_dir.mkdir(parents=True, exist_ok=True)
    rendered: list[tuple[Path, str]] = []

    for crop in PUBLICATION_CROPS:
        output = output_dir / f"{crop.name}.webp"
        crop_image(render_page(pdf, crop.page), crop).save(
            output,
            "WEBP",
            quality=90,
            method=6,
        )
        rendered.append((output, f"p.{crop.page} · {crop.name}"))

    make_contact_sheet(
        rendered,
        root / "tmp" / "pdfs" / "crops" / "publications.jpg",
    )
    print(f"Wrote {len(PUBLICATION_CROPS)} publication covers")


def write_thumbnail_crops(root: Path, source_root: Path) -> None:
    open_pdfs: dict[str, pdfium.PdfDocument] = {}

    for slug, (source_name, crop) in THUMBNAIL_CROPS.items():
        pdf = open_pdfs.setdefault(
            source_name,
            pdfium.PdfDocument(source_root / source_name),
        )
        output = root / "public" / "projects" / slug / "thumbnail.webp"
        crop_image(render_page(pdf, crop.page), crop).save(
            output,
            "WEBP",
            quality=90,
            method=6,
        )
        print(f"Wrote single-image thumbnail for {slug}")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--project-root", type=Path, default=Path.cwd())
    parser.add_argument(
        "--source-root",
        type=Path,
        default=Path.cwd() / "source-material" / "pdfs",
    )
    args = parser.parse_args()
    root = args.project_root.resolve()
    source_root = args.source_root.resolve()

    write_project_crops(root, source_root)
    write_publication_crops(root, source_root)
    write_thumbnail_crops(root, source_root)


if __name__ == "__main__":
    main()
