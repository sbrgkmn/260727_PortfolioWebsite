# Portfolio content guide

The approved website index comes from
`source-material/docs/list of works for website.docx`.

## Project folders

Every approved work or teaching entry has two matching folders:

```text
content/projects/project-slug/
├── project.json          Editable website text and metadata
├── gallery.json          Editable cropped-image order, captions, and alt text
└── source-extract.txt    Unedited text from the selected PDF pages

public/projects/project-slug/
├── cover.jpg or cover.webp
├── thumbnail.webp         Optional dedicated listing crop
├── gallery/
│   └── ...               Cropped website images
└── media/
    ├── source-p01.webp
    └── ...
```

Edit `project.json` to revise titles, dates, summaries, body copy, facts, or
tags. Edit `gallery.json` to revise crop captions and alt text, change image
order, or point an entry to a replacement image. The website reads those JSON
files directly.

The `coverImage` value in `project.json` controls the homepage thumbnail. It
may point to `cover.*`, a dedicated `thumbnail.webp`, or a selected gallery
image such as the Archetype poster.

The `source-extract.txt` files preserve the original extracted wording and PDF
page references for comparison. The uncropped `media/source-pNN.webp` files
preserve every selected source spread even though the website displays the
cleaner images in `gallery/`.

## Publications and grants

```text
content/publications/publications.json
content/publications/featured.json
content/publications/source-extract.txt
content/grants/grants.json
content/grants/featured.json
content/grants/source-extract.txt
public/publications/
```

`publications.json` and `grants.json` preserve the full extracted lists.
The publication `featured.json` selects the 16 records shown on the website;
the grant `featured.json` selects eight grants.
The publication feature file also stores thumbnail paths, descriptions, and
the originating PDF page. Its `href` value controls the external article or
proceedings link opened by the complete publication card. The grant feature
file stores public page slugs, summaries, and the year/duration labels shown in
place of award amounts.
Publication thumbnails imported from the dedicated journal and conference
cover files live under `public/publications/`. The text files preserve the
extraction from the revised CV.

## Extracted media and previous work

The 16 previous-work entries each have their own editable
`content/projects/<slug>/project.json` file and a single optimized cover under
`public/projects/<slug>/cover.webp`. Their high-resolution source images and
the publication PDF sources remain in `public/Extracted Media/`.

Run `scripts/import_extracted_media.py` after replacing a source project image
or publication cover. The script rebuilds the optimized project covers and all
16 publication thumbnails while preserving the editable project text.

The About section downloads
`public/Sabri_Gokmen_CV_2026_Revised.docx`. Replace that file with the same
filename when a revised downloadable CV is ready.

## Original source files

The uploaded PDFs and copies of the two Word files are stored outside the
public website under `source-material/`.

Items not named in the approved index must not be added as standalone website
entries. `Prompt-to-Geometry` is excluded from Selected Work, but may still
appear inside the complete Grants or Publications lists when it is part of the
CV record.
