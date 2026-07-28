from __future__ import annotations

import argparse
from pathlib import Path

import pypdfium2 as pdfium
from PIL import Image, ImageDraw
from pypdf import PdfReader


SELECTIONS = {
    "steambot": ("Research_Portfolio.pdf", [23, 24, 25, 26]),
    "gothic-diffusion": ("Research_Portfolio.pdf", [40, 41, 42]),
    "occa": ("Research_Portfolio.pdf", [43, 44]),
    "spiromorphs": ("Research_Portfolio.pdf", [45]),
    "calyx": ("Research_Portfolio.pdf", [48, 49]),
    "archetype": ("Service_Portfolio.pdf", [14, 15, 16, 17, 18, 19]),
    "archive-previous-work": (
        "Research_Portfolio.pdf",
        [50, 51, 52, 53],
    ),
    "gothic-suprematist-machine": (
        "Teaching_Portfolio.pdf",
        list(range(4, 12)),
    ),
    "morphogenetic-typologies": (
        "Teaching_Portfolio.pdf",
        list(range(18, 24)),
    ),
    "prototype": ("Teaching_Portfolio.pdf", list(range(24, 34))),
    "ai-x-architecture": ("Teaching_Portfolio.pdf", list(range(34, 38))),
    "computational-practice": (
        "Teaching_Portfolio.pdf",
        list(range(38, 50)),
    ),
    "archive-previous-teaching": (
        "Teaching_Portfolio.pdf",
        list(range(12, 18)),
    ),
}


def render_page(pdf: pdfium.PdfDocument, page_number: int, output: Path) -> None:
    page = pdf[page_number - 1]
    bitmap = page.render(scale=1.5, rev_byteorder=True)
    image = bitmap.to_pil().convert("RGB")
    output.parent.mkdir(parents=True, exist_ok=True)
    image.save(output, "WEBP", quality=84, method=6)


def make_contact_sheet(images: list[Path], output: Path, label: str) -> None:
    thumb_width = 420
    label_height = 42
    padding = 12
    columns = 2
    thumbs: list[Image.Image] = []

    for path in images:
        image = Image.open(path).convert("RGB")
        height = round(image.height * (thumb_width / image.width))
        thumbs.append(image.resize((thumb_width, height), Image.Resampling.LANCZOS))

    row_heights = []
    for index in range(0, len(thumbs), columns):
        row_heights.append(
            max(image.height for image in thumbs[index : index + columns])
        )

    width = padding + columns * (thumb_width + padding)
    height = label_height + padding + sum(value + padding for value in row_heights)
    sheet = Image.new("RGB", (width, height), "#f4f3ef")
    draw = ImageDraw.Draw(sheet)
    draw.text((padding, 12), label, fill="#171714")

    y = label_height
    for index, image in enumerate(thumbs):
        row = index // columns
        column = index % columns
        x = padding + column * (thumb_width + padding)
        if column == 0 and row > 0:
            y += row_heights[row - 1] + padding
        sheet.paste(image, (x, y))

    output.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(output, "JPEG", quality=88, optimize=True)


def extract_selection(
    project_root: Path,
    source_root: Path,
    slug: str,
    source_name: str,
    pages: list[int],
) -> None:
    source_path = source_root / source_name
    if not source_path.exists():
        raise FileNotFoundError(source_path)

    public_dir = project_root / "public" / "projects" / slug
    media_dir = public_dir / "media"
    content_dir = project_root / "content" / "projects" / slug
    qa_dir = project_root / "tmp" / "pdfs" / "qa"
    media_dir.mkdir(parents=True, exist_ok=True)
    content_dir.mkdir(parents=True, exist_ok=True)

    reader = PdfReader(source_path)
    pdf = pdfium.PdfDocument(source_path)
    rendered: list[Path] = []
    text_parts = [
        f"Source: {source_name}",
        f"Selected PDF pages: {', '.join(str(page) for page in pages)}",
        "",
    ]

    for page_number in pages:
        output = media_dir / f"source-p{page_number:02}.webp"
        render_page(pdf, page_number, output)
        rendered.append(output)
        page_text = reader.pages[page_number - 1].extract_text() or ""
        text_parts.extend(
            [
                f"===== PDF PAGE {page_number} =====",
                page_text.strip(),
                "",
            ]
        )

    extract_path = content_dir / "source-extract.txt"
    extract_path.write_text("\n".join(text_parts), encoding="utf-8")

    cover_path = public_dir / "cover.webp"
    if not (public_dir / "cover.jpg").exists() and not cover_path.exists():
        Image.open(rendered[0]).save(cover_path, "WEBP", quality=88, method=6)

    make_contact_sheet(rendered, qa_dir / f"{slug}.jpg", slug)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--project-root",
        type=Path,
        default=Path.cwd(),
    )
    parser.add_argument(
        "--source-root",
        type=Path,
        default=Path.cwd() / "source-material" / "pdfs",
    )
    args = parser.parse_args()

    project_root = args.project_root.resolve()
    source_root = args.source_root.resolve()
    for slug, (source_name, pages) in SELECTIONS.items():
        print(f"Extracting {slug} from {source_name}: {pages}")
        extract_selection(project_root, source_root, slug, source_name, pages)


if __name__ == "__main__":
    main()
