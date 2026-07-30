# Landing-page carousel

Store carousel image files in `public/carousel/`.

Edit `slides.json` to add, remove, or reorder slides. Each entry contains:

- `title`: caption shown below the image
- `type`: smaller category label
- `href`: page opened when the slide is selected
- `src`: image path beginning with `/carousel/`
- `alt`: concise image description for accessibility

Removing an entry from `slides.json` removes it from the carousel without
deleting the image file. To add a slide, copy its image into
`public/carousel/` and add a matching entry to `slides.json`.
