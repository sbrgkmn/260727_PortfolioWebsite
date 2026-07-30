from __future__ import annotations

import argparse
import json
from pathlib import Path

from PIL import Image, ImageDraw


ROOT = Path(__file__).resolve().parents[1]
TEACHING_ROOT = ROOT / "public" / "teaching"
CONTENT_ROOT = ROOT / "content" / "projects"

PROJECTS = {
    "gothic-suprematist-machine": {
        "title": "Gothic Suprematist Machine",
        "slides": [
            (5, "Maggie Orta"),
            (6, "Maggie Orta"),
            (7, "Joseph Long + Balinase Kaonga"),
            (8, "Joseph Long + Balinase Kaonga"),
            (9, "Tom Wileman"),
            (10, "Tianna O’Hare + Erik Pate"),
            (11, "Final review"),
        ],
    },
    "morphogenetic-typologies": {
        "title": "Morphogenetic Typologies",
        "slides": [
            (19, "Ayesha Akhter + Vashti Williams"),
            (20, "Ethan Bolton + Marco Ramirez"),
            (21, "Vitoria Muchiutti + Bryan Vargas Elvira"),
            (22, "Max Rodriguez + Jack Wier"),
            (23, "Final review"),
        ],
    },
    "prototype": {
        "title": "Prototype",
        "slides": [
            (
                25,
                "Mackenzie Dolle + Hunter Shaffer + Michael Wallace + Hadley Melton",
            ),
            (
                26,
                "Olivia Dreyfus + Mo Pirela + Kaylie Vong + Iterland Wells; "
                "Jameson Jensen + David Kushnir + Christian Richter + Agnes Rodts",
            ),
            (27, "Prototype studio cohort"),
            (
                28,
                "Fabrizio Farfan + Sabrina Coffaro + Paige Reed + Rishika Turlapaty; "
                "Jameson Jensen + David Kushnir + Christian Richter + Agnes Rodts",
            ),
            (
                29,
                "Daniel Ragona + Eva Monson + Ian Rudert + Christina Aliatimi; "
                "Mackenzie Dolle + Hunter Shaffer + Michael Wallace + Hadley Melton",
            ),
            (30, "Midterm review"),
            (31, "Hadley Melton + Jair Rincon Padilla"),
            (32, "Jameson Jensen + David Kushnir"),
            (33, "Mackenzie Dolle + Jair Rincon Padilla"),
        ],
    },
    "ai-x-architecture": {
        "title": "AI x Architecture",
        "slides": [
            (35, "Balinase Kaonga + David Mba"),
            (36, "Koutar Baddy + Marco Ramirez-Alvarez"),
            (37, "Brianna Harbit"),
        ],
    },
    "computational-practice": {
        "title": "Computational Practice",
        "slides": [
            (
                39,
                "Mattie Smith + Jonah Jones; Watson Davenport + Carter Bestafka",
            ),
            (40, "Sene Cherry + Gabriella Ciceron + Nick Vuchev"),
            (
                41,
                "Danielle Heckler + Robert Tomazic; Kennedy Reid + Karmyn Sessoms",
            ),
            (
                42,
                "Hannah Grace Coker + Emily Fox; Evan Acome + Kim Truong",
            ),
            (43, "Sene Cherry + Gabriella Ciceron; AJ Jackson + Ania Suber"),
            (
                44,
                "Carter Bestafka + Jonathan Mathis + Nick Vuchev; "
                "Ethan Elmer + Wills Sims + Leo Rossi",
            ),
            (
                45,
                "Sundus Abu Reyal + Koutar Baddy + Jenny Shima; "
                "Navya Agrawal + Samantha Lopez Boza + Carolina Moreira + "
                "Paula Sanchez Barrera",
            ),
            (
                46,
                "Abby Mitchell + Charlie Pyle + Ryan Ragona; "
                "Ayesha Akhter + Valery Badawy + Sally Hunley",
            ),
            (
                47,
                "Taylor Beard + Kayla Evans + Cora Hunt; "
                "AJ Jackson + Ania Suber + J’Anna Worth",
            ),
            (48, "Final review"),
            (49, "Final review"),
        ],
    },
}

PREVIOUS_TEACHING_ARCHIVE = [
    ("Morphing Skins, 2025.png", "Morphing Skins — UNC Charlotte, 2025"),
    (
        "High Resolution, Kadir Has University, 2020.png",
        "High Resolution — Kadir Has University, 2020",
    ),
    (
        "Ornament is Prime!, 2019.png",
        "Ornament is Prime! — Kadir Has University, 2019",
    ),
    (
        "Ornament is Prime!, 2019_3.png",
        "Ornament is Prime! — Kadir Has University, 2019",
    ),
    (
        "Ornament is Prime!, 2019_4.png",
        "Ornament is Prime! — Kadir Has University, 2019",
    ),
    (
        "Ornament is Prime!,Kadir Has University, 2019_2.png",
        "Ornament is Prime! — Kadir Has University, 2019",
    ),
    ("Protohaus, 2019.png", "Protohaus — 2019"),
    (
        "Parametric Survey, Gatech, 2017.png",
        "Parametric Survey — Georgia Tech, 2017",
    ),
    ("Digital Craft, Gatech, 2016.png", "Digital Craft — Georgia Tech, 2016"),
    ("Digital Craft, Gatech, 2016_2.png", "Digital Craft — Georgia Tech, 2016"),
    ("Matter Matters, Gatech, 2016.png", "Matter Matters — Georgia Tech, 2016"),
    (
        "Matter Matters, Gatech, 2016_2.png",
        "Matter Matters — Georgia Tech, 2016",
    ),
    (
        "Matter Matters, Gatech, 2016_3.png",
        "Matter Matters — Georgia Tech, 2016",
    ),
    (
        "Parametric Envelopes, Gatech, 2015.png",
        "Parametric Envelopes — Georgia Tech, 2015",
    ),
    (
        "Parametric Envelopes, Gatech, 2015_2.png",
        "Parametric Envelopes — Georgia Tech, 2015",
    ),
    ("Polychromy, 2013.png", "Polychromy — 2013"),
    ("Polychromy, 2013_2.png", "Polychromy — 2013"),
    ("Studio on Beauty, 2012.png", "Studio on Beauty — 2012"),
    ("Studio on Beauty, 2012_2.png", "Studio on Beauty — 2012"),
    ("Studio on Beauty, 2012_3.png", "Studio on Beauty — 2012"),
]

# The high-resolution portfolio spreads use a consistent template. These
# proportional margins remove the student-name header and folio/footer while
# retaining the graphic field at every source resolution.
CROP_LEFT = 0.025
CROP_TOP = 0.05
CROP_RIGHT = 0.025
CROP_BOTTOM = 0.05
OUTPUT_MAX_WIDTH = 2400


def make_contact_sheet(
    paths: list[tuple[Path, str]],
    output: Path,
) -> None:
    thumb_width = 360
    thumb_height = 250
    label_height = 34
    gap = 16
    columns = 3
    cards: list[Image.Image] = []

    for path, label in paths:
        with Image.open(path) as source:
            image = source.convert("RGB")
            image.thumbnail(
                (thumb_width, thumb_height),
                Image.Resampling.LANCZOS,
            )

        card = Image.new(
            "RGB",
            (thumb_width, thumb_height + label_height),
            "white",
        )
        card.paste(
            image,
            (
                (thumb_width - image.width) // 2,
                (thumb_height - image.height) // 2,
            ),
        )
        ImageDraw.Draw(card).text(
            (8, thumb_height + 10),
            label,
            fill="#111111",
        )
        cards.append(card)

    rows = (len(cards) + columns - 1) // columns
    width = columns * thumb_width + (columns + 1) * gap
    height = rows * (thumb_height + label_height) + (rows + 1) * gap
    sheet = Image.new("RGB", (width, height), "#dddddd")

    for index, card in enumerate(cards):
        column = index % columns
        row = index // columns
        x = gap + column * (thumb_width + gap)
        y = gap + row * (thumb_height + label_height + gap)
        sheet.paste(card, (x, y))

    output.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(output, "JPEG", quality=90, optimize=True)


def build_project(slug: str, title: str, slides: list[tuple[int, str]]) -> None:
    project_root = TEACHING_ROOT / slug
    source_root = project_root / "gallery"
    slide_root = project_root / "slides"
    slide_root.mkdir(exist_ok=True)

    gallery = []
    rendered: list[tuple[Path, str]] = []
    for index, (page, caption) in enumerate(slides, start=1):
        source = source_root / f"PACKAGE_TEACHING{page}.jpg"
        destination = slide_root / f"slide-{index:02d}.webp"
        if not source.exists():
            raise FileNotFoundError(source)

        with Image.open(source) as image:
            cropped = image.crop(
                (
                    round(CROP_LEFT * image.width),
                    round(CROP_TOP * image.height),
                    round((1 - CROP_RIGHT) * image.width),
                    round((1 - CROP_BOTTOM) * image.height),
                )
            )
            cropped.thumbnail(
                (OUTPUT_MAX_WIDTH, OUTPUT_MAX_WIDTH),
                Image.Resampling.LANCZOS,
            )
            cropped.save(destination, "WEBP", quality=90, method=6)
        rendered.append((destination, f"p.{page}"))

        gallery.append(
            {
                "src": f"/teaching/{slug}/slides/{destination.name}",
                "alt": f"{title} student work, {caption}",
                "caption": caption,
                "sourcePage": page,
            }
        )

    gallery_path = CONTENT_ROOT / slug / "gallery.json"
    gallery_path.write_text(
        json.dumps(gallery, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )
    make_contact_sheet(
        rendered,
        ROOT / "tmp" / "teaching-gallery" / f"{slug}.jpg",
    )


def build_previous_teaching_archive() -> None:
    slug = "archive-previous-teaching"
    collection_root = TEACHING_ROOT / slug / "media" / "Collection"
    gallery_root = TEACHING_ROOT / slug / "archive-grid"
    gallery_root.mkdir(exist_ok=True)
    gallery = []

    for index, (filename, caption) in enumerate(
        PREVIOUS_TEACHING_ARCHIVE,
        start=1,
    ):
        source = collection_root / filename
        if not source.exists():
            raise FileNotFoundError(source)

        destination = gallery_root / f"archive-{index:02d}.webp"
        with Image.open(source) as image:
            image.thumbnail((1800, 1800), Image.Resampling.LANCZOS)
            if image.mode in {"RGBA", "LA"}:
                rgb_image = Image.new("RGB", image.size, "white")
                rgb_image.paste(image, mask=image.getchannel("A"))
            else:
                rgb_image = image.convert("RGB")
            rgb_image.save(destination, "WEBP", quality=86, method=6)

        gallery.append(
            {
                "src": f"/teaching/{slug}/archive-grid/{destination.name}",
                "alt": f"{caption} student work",
                "caption": caption,
            }
        )

    gallery_path = CONTENT_ROOT / slug / "gallery.json"
    gallery_path.write_text(
        json.dumps(gallery, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )


parser = argparse.ArgumentParser()
parser.add_argument("--include-archive", action="store_true")
args = parser.parse_args()

for project_slug, project in PROJECTS.items():
    build_project(project_slug, project["title"], project["slides"])

if args.include_archive:
    build_previous_teaching_archive()
