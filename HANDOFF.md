# Sabri Gökmen Portfolio — Local Handoff

## Reference

- Current demo: https://sabri-portfolio-layout.sgokmen.chatgpt.site
- Visual direction: minimalist, image-forward architecture portfolio inspired
  by the clarity and openness of Young & Ayata.
- Primary sections: Work, Teaching, Publications, About.

## Run locally

Requirements: Node.js 22.13 or newer and npm.

```bash
npm install
npm run dev
```

Open the local URL printed in the terminal.

Production validation:

```bash
npm run build
npm run lint
```

## Important files

- `app/page.tsx` — page content and project records
- `app/globals.css` — layout, typography, color, and responsive behavior
- `app/layout.tsx` — metadata and font setup
- `public/projects/` — project images used by the homepage

## Design principles to preserve

- Use full-color project imagery.
- Keep project titles visible without hover.
- Avoid cards, boxes, gradients, shadows, and excessive rules.
- Use large open margins and an asymmetrical two-column project sequence.
- Keep Teaching and Publications as restrained text indexes.
- Treat research methods such as AI, computation, morphology, and fabrication
  as tags rather than top-level navigation categories.

## Content requiring confirmation

The teaching entries, publication titles and dates, biography, location,
email address, CV link, Instagram link, and some project dates are prototype
content. Confirm or replace these before launch.

## GoDaddy deployment choices

This prototype uses React/Next-style source with a Vinext build configuration.
Before deploying to GoDaddy, choose one of these paths:

1. Convert the presentation-only portfolio to a static build and upload the
   generated HTML, CSS, JavaScript, and image assets through cPanel.
2. Adapt the project for GoDaddy Node.js Hosting and deploy the packaged app.
3. Host the code on a modern application host and keep the domain and DNS at
   GoDaddy.

For a portfolio without logins or a database, the static-build route is the
simplest GoDaddy deployment.
