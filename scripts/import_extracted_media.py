from pathlib import Path

import pypdfium2 as pdfium
from PIL import Image


PUBLICATION_COVER_SOURCES = {
    "ijac-2026": ("publications", "jaca_24_1.largecover.png"),
    "curved-layered-2023": (
        "publications",
        "ChatGPT Image Jun 13, 2026, 11_41_45 AM.png",
    ),
    "nexus-journal-2023": (
        "publications",
        "ChatGPT Image Jun 13, 2026, 11_43_09 AM.png",
    ),
    "jocch-2022": ("publications", "Screenshot 2026-06-13 105113.png"),
    "cad-2022": (
        "publications",
        "ChatGPT Image Jun 13, 2026, 11_38_22 AM.png",
    ),
    "environment-planning-b-2020": (
        "publications",
        "ChatGPT Image Jun 13, 2026, 11_09_47 AM.png",
    ),
    "leonardo-2020": (
        "publications",
        "ChatGPT Image Jun 13, 2026, 11_15_46 AM.png",
    ),
    "metu-jfa-2020": (
        "publications",
        "ChatGPT Image Jun 13, 2026, 11_24_08 AM.png",
    ),
    "acadia-2026": (
        "extracted",
        "Screenshot 2026-07-02 121143.png",
    ),
    "acsa-2026": (
        "publications",
        "ACSA114-AbstractBook-Cover-618x800.jpg",
    ),
    "ncbds-2026": (
        "publications",
        "2026_0218-_SAP_NCBDS41-Brochure_FINAL 1.pdf",
    ),
    "ecaade-2025": (
        "publications",
        "Screenshot 2026-06-13 123711.png",
    ),
    "nexus-2025": (
        "publications",
        "7_GOKMEN_NEXUS 2025 (1) 1.pdf",
    ),
    "acadia-2014": (
        "publications",
        "Screenshot 2026-06-13 125508.png",
    ),
    "caadria-2014": (
        "publications",
        "ChatGPT Image Jun 13, 2026, 01_01_01 PM.png",
    ),
    "ecaade-2013": ("publications", "largepreview.webp"),
}


PROJECT_SOURCES = {
    "gyroid": "gyroid.jpg",
    "vitalized-geometry": "fghgj8.jpg",
    "minimabox": "jjjh.jpg",
    "morphogenetic-vaults": "dsfdg.jpg",
    "tangle-jungle": "tg3_big image.jpg",
    "ver-sacrum": "fghgj2.jpg",
    "opulent-grove": "3.jpg",
    "skin-pavilion": "Gokmen_S_IMGP9472_edit_s.jpg",
    "manifold": "fdhj.jpg",
    "bursa-sports-facility": "WhatsApp Image 2020-12-20 at 20.05.12.jpeg",
    "olivelo-park": "arge2.jpg",
    "urban-park-furniture": "V1.jpg",
    "caretta-hospital": "p4f24545.jpg",
    "rotonda-mosque": "ex_1.jpg",
    "didem-madak-tomb": "Render_2.jpg",
    "wuppertal-replacement-building": "fghgj24.jpg",
}


def import_publication_covers(root: Path, extracted_root: Path) -> None:
    output_root = root / "public" / "publications"
    output_root.mkdir(parents=True, exist_ok=True)

    for name, (source_group, source_name) in PUBLICATION_COVER_SOURCES.items():
        source_root = (
            output_root if source_group == "publications" else extracted_root
        )
        source = source_root / source_name
        if source.suffix.lower() == ".pdf":
            pdf = pdfium.PdfDocument(source)
            image = pdf[0].render(
                scale=1.8,
                rev_byteorder=True,
            ).to_pil()
        else:
            image = Image.open(source)
        image = image.convert("RGB")
        image.thumbnail((1800, 2400), Image.Resampling.LANCZOS)
        image.save(
            output_root / f"{name}.webp",
            "WEBP",
            quality=88,
            method=6,
        )
        print(f"Imported publication thumbnail: {name}")


def import_previous_project_covers(root: Path, source_root: Path) -> None:
    for slug, source_name in PROJECT_SOURCES.items():
        source = source_root / source_name
        output = root / "public" / "projects" / slug / "cover.webp"
        output.parent.mkdir(parents=True, exist_ok=True)

        image = Image.open(source)
        if image.mode not in {"RGB", "RGBA"}:
            image = image.convert("RGB")
        image.thumbnail((2400, 2400), Image.Resampling.LANCZOS)
        image.save(output, "WEBP", quality=90, method=6)
        print(f"Imported previous project cover: {slug}")


def main() -> None:
    root = Path.cwd()
    source_root = root / "public" / "Extracted Media"
    import_publication_covers(root, source_root)
    import_previous_project_covers(root, source_root)


if __name__ == "__main__":
    main()
