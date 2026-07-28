from __future__ import annotations

import argparse
import json
import re
from pathlib import Path

from docx import Document


PUBLICATION_GROUPS = [
    (
        "Published journal article",
        [[93], [94, 95], [96], [97], [98], [99], [100], [101]],
    ),
    (
        "Journal article in progress",
        [[103], [104], [105], [106], [107]],
    ),
    (
        "Published conference proceeding",
        [[index] for index in range(111, 122)],
    ),
    (
        "Published conference proceeding",
        [[index] for index in range(123, 128)],
    ),
    (
        "Published conference proceeding in Turkish",
        [[132], [133]],
    ),
    ("Peer-reviewed conference poster", [[135]]),
    (
        "Conference proceeding in progress",
        [[index] for index in range(137, 144)],
    ),
]


def compact(text: str) -> str:
    return " ".join(text.split())


def publication_title(citation: str) -> str:
    match = re.search(r"[“\"]([^”\"]+)[”\"]", citation)
    if match:
        return match.group(1).strip()
    return citation


def publication_year(citation: str) -> str:
    match = re.search(r"\b(20\d{2}|19\d{2})\b", citation)
    return match.group(1) if match else "In progress"


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--cv", type=Path, required=True)
    parser.add_argument("--output-root", type=Path, required=True)
    args = parser.parse_args()

    document = Document(args.cv)
    paragraphs = [compact(paragraph.text) for paragraph in document.paragraphs]
    output_root = args.output_root.resolve()

    publications_dir = output_root / "publications"
    publications_dir.mkdir(parents=True, exist_ok=True)
    publications = []
    for category, groups in PUBLICATION_GROUPS:
        for indices in groups:
            citation = " ".join(
                paragraphs[index] for index in indices if paragraphs[index]
            )
            publications.append(
                {
                    "year": publication_year(citation),
                    "title": publication_title(citation),
                    "category": category,
                    "citation": citation,
                }
            )

    (publications_dir / "publications.json").write_text(
        json.dumps(publications, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    publication_source = [
        "Source: CV_Sabri_Gokmen_2026_Revised.docx",
        "CV sections: PEER-REVIEWED JOURNAL ARTICLES and CONFERENCE PROCEEDINGS",
        "",
    ]
    for category, groups in PUBLICATION_GROUPS:
        publication_source.append(f"===== {category.upper()} =====")
        for indices in groups:
            publication_source.append(
                " ".join(
                    paragraphs[index]
                    for index in indices
                    if paragraphs[index]
                )
            )
            publication_source.append("")
    (publications_dir / "source-extract.txt").write_text(
        "\n".join(publication_source),
        encoding="utf-8",
    )

    grants_dir = output_root / "grants"
    grants_dir.mkdir(parents=True, exist_ok=True)
    grant_source = [
        "Source: CV_Sabri_Gokmen_2026_Revised.docx",
        "CV section: GRANTS",
        "",
    ]
    for index in range(270, 369):
        if paragraphs[index]:
            grant_source.append(f"{index:04}: {paragraphs[index]}")
    (grants_dir / "source-extract.txt").write_text(
        "\n".join(grant_source) + "\n",
        encoding="utf-8",
    )


if __name__ == "__main__":
    main()
