# Vijayarka- — The Living Portfolio

A lightweight, static portfolio world for Vijayarka Nanduri. It uses plain HTML, CSS and JavaScript so it can run directly from GitHub Pages or Netlify without a build step.

## Run locally

Open `index.html` in a browser, or serve the repository with any static server:

```bash
python3 -m http.server 8080
```

## Publish with GitHub Pages

In the repository settings, open **Pages**, choose **Deploy from a branch**, select `main` and the `/ (root)` folder, then save. The site is available at:

`https://vijayarkananduri.github.io/Vijayarka-/`

## Publish with Netlify

Use **Add new site → Import an existing project**, select this repository, leave the build command empty, and set the publish directory to `.`.

The site stores the visitor’s name, class, XP, quests and visited locations only in the visitor’s own browser `localStorage`. No backend or build service is required.
