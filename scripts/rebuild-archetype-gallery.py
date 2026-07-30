from __future__ import annotations

from pathlib import Path

import pypdfium2 as pdfium
from PIL import Image, ImageDraw


ROOT = Path(__file__).resolve().parents[1]
SOURCE_ROOT = ROOT / "public" / "projects" / "archetype" / "gallery"
OUTPUT_ROOT = SOURCE_ROOT / "web"
CONTACT_SHEET = ROOT / "tmp" / "pdfs" / "archetype-contact-sheet.jpg"
IMAGE_SUFFIXES = {".jpg", ".jpeg", ".png", ".webp"}


def numeric_key(path: Path) -> tuple[int, str]:
    try:
        return int(path.stem), path.name
    except ValueError:
        return 10_000, path.name


def load_source(path: Path) -> Image.Image:
    if path.suffix.lower() == ".pdf":
        document = pdfium.PdfDocument(path)
        if len(document) != 1:
            raise ValueError(f"{path.name} must contain exactly one page")
        page = document[0]
        return page.render(scale=3, rev_byteorder=True).to_pil().convert("RGB")

    with Image.open(path) as source:
        return source.convert("RGB")


def make_contact_sheet(items: list[tuple[Path, str]]) -> None:
    thumb_width = 360
    thumb_height = 300
    label_height = 34
    gap = 16
    columns = 3
    cards: list[Image.Image] = []

    for path, label in items:
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

    CONTACT_SHEET.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(CONTACT_SHEET, "JPEG", quality=90, optimize=True)


def main() -> None:
    sources = sorted(
        (
            path
            for path in SOURCE_ROOT.iterdir()
            if path.is_file()
            and (
                path.suffix.lower() in IMAGE_SUFFIXES
                or path.suffix.lower() == ".pdf"
            )
        ),
        key=numeric_key,
    )

    OUTPUT_ROOT.mkdir(parents=True, exist_ok=True)
    rendered: list[tuple[Path, str]] = []

    for source in sources:
        image = load_source(source)
        original_size = image.size
        image.thumbnail((2000, 2000), Image.Resampling.LANCZOS)
        destination = OUTPUT_ROOT / f"slide-{int(source.stem):02d}.webp"
        image.save(destination, "WEBP", quality=88, method=6)
        rendered.append((destination, source.name))
        print(
            f"{source.name}: {original_size[0]}x{original_size[1]} -> "
            f"{destination.name}: {image.width}x{image.height}",
        )

    make_contact_sheet(rendered)
    print(f"Wrote {len(rendered)} gallery slides")
    print(f"Contact sheet: {CONTACT_SHEET}")


if __name__ == "__main__":
    main()
