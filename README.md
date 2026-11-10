# Vijayarka Nanduri — Online Studio

A responsive personal website for Vijayarka Nanduri: research, software, projects, creative work, and contact. It is built with React, TypeScript, and Vite, then rendered to static HTML so the public pages remain useful to crawlers and visitors before JavaScript runs.

## Run locally

Requirements: Node.js 20 or newer and npm 10 or newer.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. To make a production build locally:

```bash
SITE_ORIGIN="https://your-final-domain.example" npm run build
npm run preview
```

The complete static site is written to `dist/`. `SITE_ORIGIN` should be the final HTTPS origin; it is used for canonical links, social metadata, `sitemap.xml`, and `robots.txt`. For GitHub Pages, the workflow supplies the repository Pages URL as `SITE_ORIGIN`.

## Netlify

The included `netlify.toml` already uses `npm run build` and publishes `dist/`. In Netlify:

1. Import the GitHub repository, or drag-and-drop the built `dist/` folder.
2. If importing the repository, set the build command to `npm run build` and publish directory to `dist` (the file already declares both).
3. Add `SITE_ORIGIN` with the final HTTPS site URL under Site configuration → Environment variables.
4. Trigger a deploy and inspect a normal page, a project detail page, `sitemap.xml`, `robots.txt`, and the branded 404.

## GitHub Pages

GitHub Pages deploys automatically from `main` through `.github/workflows/deploy-pages.yml`. This repository is published at `https://vijayarkananduri.github.io/Vijayarka-/`; the Vite base path, internal routes, canonical metadata, sitemap, and robots file are configured for that project subpath. The included `public/.nojekyll` keeps generated folders available.

## Content updates

- `src/data/projects.ts` contains project descriptions, categories, statuses, actions, and source links.
- `src/data/content.ts` contains research summaries, creative works, and approved public profile links.
- `site-routes.json` is the portable public route list used to prerender HTML and generate the sitemap.
- `src/seo.ts` defines unique titles, descriptions, and route existence.
- `scripts/prerender.mjs` creates content-bearing pages, metadata, structured data, sitemap, robots, and `404.html`.
- `src/styles/tokens.css` and `src/styles/site.css` define the design system.

## Before launch: factual review

This package intentionally follows the PRD’s evidence rules. Re-check every external destination immediately before launch, especially the current Draftbook URL, ExamFlow’s deployed app destination, Android releases, and creative links. Draftbook is shown as working/live because that status was supplied by the owner. MAWO’s 71%→96% figure is labeled as a single-person 45-day self-study finding; the self-narrating neural-network record is labeled as a two-student proof of concept; Zenodo records are labeled preprints rather than peer-reviewed papers.

Private or unannounced projects are intentionally absent from the public bundle. Future work is not presented as launched. Do not add unreleased work to navigation, metadata, sitemap, trailer, or project data until the owner confirms a public release.

The contact area uses the public email and profile links supplied by the research task. Confirm that those contact details are still approved before production. The site itself has no analytics, tracking scripts, accounts, backend, database, or contact form; the mailto link opens the visitor’s email client.

## Assets and licensing

The site uses bundled fonts from the `@fontsource` packages and original CSS/SVG decorative artwork. No product screenshot is represented by the abstract visual tiles. If owner-approved screenshots, portraits, book covers, or video are added later, include only assets with clear rights and add useful alt text or a transcript/caption path.

## External handoff

This folder is ready to connect to a GitHub repository and a Netlify site. The included ZIP is a portable source/build handoff; it does not contain credentials and does not publish or push to an unspecified external account.
