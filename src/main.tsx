import { createRoot, hydrateRoot } from 'react-dom/client';
import { Site } from './App';
import './styles/tokens.css';
import './styles/site.css';
import './styles/forge.css';
import '@fontsource-variable/caveat';
import '@fontsource-variable/space-grotesk';
import '@fontsource-variable/manrope';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';

const root = document.getElementById('root');
if (root) {
  const app = <Site path={window.location.pathname} />;
  if (root.hasChildNodes()) hydrateRoot(root, app);
  else createRoot(root).render(app);
}
