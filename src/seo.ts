import { getProject, projects } from './data/projects';
import { research } from './data/content';

export type PageMeta = { title: string; description: string; section: string; image?: string; keywords?: string[] };

const fallback: PageMeta = {
  title: 'Vijayarka Nanduri | Research, Software & Stories',
  description: 'An independent researcher, builder, and writer making adaptive interfaces, privacy-minded tools, and stories that stay with you.',
  section: 'Home',
  image: '/social-card.png?v=2',
  keywords: ['Vijayarka Nanduri', 'researcher', 'adaptive interfaces', 'human-computer interaction', 'software projects', 'creative writing'],
};

function shortDescription(text: string, max = 150): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const wordBoundary = cut.lastIndexOf(' ');
  return `${cut.slice(0, wordBoundary > 100 ? wordBoundary : max - 1).trimEnd()}…`;
}

export function getPageMeta(rawPath: string): PageMeta {
  const path = rawPath.endsWith('/') ? rawPath : `${rawPath}/`;
  if (path === '/') return fallback;
  if (path === '/projects/') return { title: 'Projects | Apps & Experiments by Vijayarka Nanduri', description: 'Explore 21 apps, Android projects, web tools, and experiments by Vijayarka Nanduri, from adaptive habit tracking to playful software.', section: 'Projects', image: '/social-card.png?v=2', keywords: ['Vijayarka Nanduri', 'Android apps', 'web projects', 'software experiments', 'privacy-minded tools', 'adaptive interfaces'] };
  if (path.startsWith('/projects/')) {
    const project = getProject(path.split('/')[2]);
    if (project) return { title: `${project.title} Project | Vijayarka Nanduri`, description: shortDescription(project.summary), section: 'Projects', image: '/social-card.png?v=2', keywords: [...new Set([project.title, 'Vijayarka Nanduri', project.category, project.platform.split(' · ')[0] || 'software', 'project design'])] };
  }
  if (path === '/research/') return { title: 'Research | HCI, Adaptive Interfaces & AI', description: 'Read three preprints by Vijayarka Nanduri on adaptive interfaces, machine-learning explanations, and emotion-aware writing tools.', section: 'Research', image: '/social-card.png?v=2', keywords: ['Vijayarka Nanduri', 'human-computer interaction', 'adaptive interfaces', 'Alive UI', 'machine learning', 'research preprints'] };
  if (path.startsWith('/research/')) {
    const item = research.find((paper) => paper.slug === path.split('/')[2]);
    if (item) {
      const shortTitles: Record<string, string> = {
        'designing-alive-ui': 'Alive UI in MAWO | Vijayarka Nanduri',
        'self-narrating-neural-networks': 'Self-Narrating Neural Networks | Vijayarka Nanduri',
        'emotion-aware-ai-writing-tools': 'Emotion-Aware Writing Tools | Vijayarka Nanduri',
      };
      return { title: shortTitles[item.slug] ?? `${item.title} | Vijayarka Nanduri`, description: shortDescription(item.summary), section: 'Research', image: '/social-card.png?v=2', keywords: ['Vijayarka Nanduri', 'research preprint', item.kind, 'human-computer interaction', 'adaptive interfaces', 'human-centered AI'] };
    }
  }
  if (path === '/creative/') return { title: 'Creative Work | Poetry, Games & Audio', description: 'Read Vijayarka Nanduri’s prose poetry and writing guide, play browser experiments, and listen to audio fiction.', section: 'Creative', image: '/social-card.png?v=2', keywords: ['Vijayarka Nanduri', 'prose poetry', 'creative writing', 'browser games', 'audio fiction', 'stories'] };
  if (path === '/about/') return { title: 'About Vijayarka Nanduri | Researcher & Writer', description: 'Meet Vijayarka Nanduri, a researcher, builder, and writer working across adaptive interfaces, useful software, and stories.', section: 'About', image: '/social-card.png?v=2', keywords: ['Vijayarka Nanduri', 'researcher', 'software builder', 'writer', 'adaptive interfaces', 'human-centered software'] };
  if (path === '/contact/') return { title: 'Contact Vijayarka Nanduri | Collaboration', description: 'Get in touch about research, software projects, creative work, or a question you are still thinking through.', section: 'Contact', image: '/social-card.png?v=2', keywords: ['Vijayarka Nanduri contact', 'research collaboration', 'software projects', 'creative work', 'HCI'] };
  return fallback;
}

export function routeExists(rawPath: string): boolean {
  const path = rawPath.endsWith('/') ? rawPath : `${rawPath}/`;
  if (['/', '/projects/', '/research/', '/creative/', '/about/', '/contact/'].includes(path)) return true;
  if (path.startsWith('/projects/')) return projects.some((project) => path === `/projects/${project.slug}/`);
  if (path.startsWith('/research/')) return research.some((item) => path === `/research/${item.slug}/`);
  return false;
}
