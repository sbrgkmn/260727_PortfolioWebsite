# Project content structure

Every approved website entry has its own folder under `content/projects`.

- `project.json` is the curated, editable website copy.
- `gallery.json` controls the cropped website images, order, captions, and alt
  text.
- `source-extract.txt` is the unedited text extracted from the relevant PDF
  pages for reference.
- Matching web media lives under `public/projects/<same-slug>/`.
- `cover.jpg` or `cover.webp` is the listing image.
- `thumbnail.webp` is an optional single-image listing crop. The active image
  is selected with `coverImage` in `project.json`.
- `gallery/*.webp` files are the cropped images displayed on the project page.
- `media/source-pNN.webp` files are web-ready renders of the selected source
  portfolio pages, preserved for reference and future recropping.

After revising a `project.json` file, save it and rebuild or restart the local
site. Do not change the `slug` unless the folder name and website links are
updated at the same time.

Run `python scripts/crop_pdf_media.py` after changing the curated crop map in
that script. It regenerates the gallery images and each `gallery.json`.

The approved top-level entries come from `list of works for website.docx`.
Items not named there must not be added as standalone website entries.
