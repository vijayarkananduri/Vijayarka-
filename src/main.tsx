import { createRoot, hydrateRoot } from 'react-dom/client';
import { Site } from './App';
import './styles/tokens.css';
import './styles/site.css';
import './styles/forge.css';
import './styles/scrap.css';
import './styles/theme.css';
import '@fontsource-variable/caveat';
import '@fontsource-variable/syne';
import '@fontsource-variable/manrope';
import '@fontsource/dm-mono/400.css';
import '@fontsource/dm-mono/500.css';

const root = document.getElementById('root');
if (root) {
  const app = <Site path={window.location.pathname} />;
  if (root.hasChildNodes()) hydrateRoot(root, app);
  else createRoot(root).render(app);
}
