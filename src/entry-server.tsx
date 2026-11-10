import { renderToString } from 'react-dom/server';
import { Site } from './App';
import { getPageMeta, routeExists } from './seo';

export function renderPage(path: string) {
  return {
    html: renderToString(<Site path={path} />),
    meta: getPageMeta(path),
    exists: routeExists(path),
  };
}
