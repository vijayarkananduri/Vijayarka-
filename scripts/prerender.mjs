import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const origin = (process.env.SITE_ORIGIN || 'https://vijayarka.netlify.app').replace(/\/$/, '');
const routeList = JSON.parse(await readFile(path.join(root, 'site-routes.json'), 'utf8')).routes;
const template = await readFile(path.join(root, 'dist/index.html'), 'utf8');
const serverEntry = pathToFileURL(path.join(root, 'dist/ssr/entry-server.js')).href;
const { renderPage } = await import(serverEntry);

function escapeHtml(value = '') {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
}
function replaceMeta(html, selector, tag) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`<meta\\s+[^>]*${escaped}[^>]*>`, 'i');
  return pattern.test(html) ? html.replace(pattern, `${tag}\n    `) : html.replace('</head>', `    ${tag}\n  </head>`);
}
function buildHtml(route, rendered, isNotFound = false) {
  const meta = rendered.meta;
  const canonical = `${origin}${route}`;
  const image = `${origin}${meta.image || '/social-card.svg'}`;
  let html = template.replace('<div id="root"></div>', `<div id="root">${rendered.html}</div>`);
  html = html.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(meta.title)}</title>`);
  html = replaceMeta(html, 'name="description"', `<meta name="description" content="${escapeHtml(meta.description)}" />`);
  html = replaceMeta(html, 'name="keywords"', `<meta name="keywords" content="${escapeHtml(`${meta.section}, Vijayarka Nanduri, HCI, adaptive interfaces, human-centered AI`)}" />`);
  html = replaceMeta(html, 'property="og:type"', '<meta property="og:type" content="website" />');
  html = replaceMeta(html, 'property="og:site_name"', '<meta property="og:site_name" content="Vijayarka Nanduri" />');
  html = replaceMeta(html, 'property="og:title"', `<meta property="og:title" content="${escapeHtml(meta.title)}" />`);
  html = replaceMeta(html, 'property="og:description"', `<meta property="og:description" content="${escapeHtml(meta.description)}" />`);
  html = replaceMeta(html, 'property="og:image"', `<meta property="og:image" content="${escapeHtml(image)}" />`);
  html = replaceMeta(html, 'name="twitter:card"', '<meta name="twitter:card" content="summary_large_image" />');
  html = replaceMeta(html, 'name="twitter:title"', `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`);
  html = replaceMeta(html, 'name="twitter:description"', `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`);
  html = replaceMeta(html, 'name="twitter:image"', `<meta name="twitter:image" content="${escapeHtml(image)}" />`);
  if (isNotFound) {
    html = html.replace('</head>', '    <meta name="robots" content="noindex, nofollow" />\n  </head>');
  } else {
    html = html.replace('</head>', `    <meta property="og:url" content="${escapeHtml(canonical)}" />\n    <link rel="canonical" href="${escapeHtml(canonical)}" />\n  </head>`);
  }
  if (!isNotFound && (route === '/' || route === '/about/')) {
    const structuredData = {
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'WebSite', '@id': `${origin}/#website`, name: 'Vijayarka Nanduri — Online Studio', url: `${origin}/`, inLanguage: 'en' },
        { '@type': 'Person', '@id': `${origin}/about/#person`, name: 'Vijayarka Nanduri', url: `${origin}/about/`, jobTitle: 'Researcher, builder, and writer', sameAs: ['https://github.com/vijayarkananduri', 'https://www.linkedin.com/in/vijayarka', 'https://www.youtube.com/@VijayarkaNanduri', 'https://medium.com/@vijayarka', 'https://orcid.org/0009-0000-2610-5554'], knowsAbout: ['Human-computer interaction', 'Adaptive interfaces', 'Human-centered AI', 'Software development', 'Creative technology'] },
      ],
    };
    const jsonLd = JSON.stringify(structuredData).replace(/</g, '\\u003c');
    html = html.replace('</head>', `    <script type="application/ld+json">${jsonLd}</script>\n  </head>`);
  }
  return html;
}

const sitemapUrls = [];
for (const entry of routeList) {
  const rawRoute = typeof entry === 'string' ? entry : entry.path;
  const route = rawRoute.endsWith('/') ? rawRoute : `${rawRoute}/`;
  const rendered = renderPage(route);
  if (!rendered.exists) {
    throw new Error(`Route in site-routes.json has no rendered page: ${route}`);
  }
  const relative = route === '/' ? 'index.html' : `${route.slice(1)}index.html`;
  const destination = path.join(root, 'dist', relative);
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, buildHtml(route, rendered), 'utf8');
  sitemapUrls.push(`${origin}${route}`);
}

const notFound = renderPage('/__not-found__/');
await writeFile(path.join(root, 'dist/404.html'), buildHtml('/404.html', notFound, true), 'utf8');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls.map((url) => `  <url><loc>${escapeHtml(url)}</loc></url>`).join('\n')}\n</urlset>\n`;
await writeFile(path.join(root, 'dist/sitemap.xml'), sitemap, 'utf8');
await writeFile(path.join(root, 'dist/robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`, 'utf8');
await rm(path.join(root, 'dist/manus-routes.json'), { force: true });
await rm(path.join(root, 'dist/ssr'), { recursive: true, force: true });
console.log(`Prerendered ${sitemapUrls.length} routes to dist/ (SITE_ORIGIN=${origin})`);
