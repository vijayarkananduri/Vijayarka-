import { getProject, projects } from './data/projects';
import { research } from './data/content';

export type PageMeta = { title: string; description: string; section: string; image?: string };

const fallback: PageMeta = {
  title: 'Vijayarka Nanduri — Research, Software & Creative Work',
  description: 'Meet Vijayarka Nanduri, an independent researcher, builder, and writer exploring adaptive interfaces, human-centered AI, software, and creative work.',
  section: 'Home',
  image: '/social-card.png?v=2',
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
  if (path === '/projects/') return { title: 'Projects by Vijayarka Nanduri | Apps & Experiments', description: 'Browse apps, web tools, Android projects, and experiments by Vijayarka Nanduri.', section: 'Projects', image: '/social-card.png?v=2' };
  if (path.startsWith('/projects/')) {
    const project = getProject(path.split('/')[2]);
    if (project) return { title: `${project.title} — Projects by Vijayarka Nanduri`, description: shortDescription(project.summary), section: 'Projects', image: '/social-card.png?v=2' };
  }
  if (path === '/research/') return { title: 'Research by Vijayarka Nanduri | HCI, Alive UI & AI', description: 'Research preprints and case studies by Vijayarka Nanduri on adaptive interfaces, human-computer interaction, and AI.', section: 'Research', image: '/social-card.png?v=2' };
  if (path.startsWith('/research/')) {
    const item = research.find((paper) => paper.slug === path.split('/')[2]);
    if (item) {
      const shortTitles: Record<string, string> = {
        'designing-alive-ui': 'Alive UI & MAWO Research — Vijayarka Nanduri',
        'self-narrating-neural-networks': 'Self-Narrating Neural Networks — Vijayarka Nanduri',
        'emotion-aware-ai-writing-tools': 'Emotion-Aware AI Writing Tools — Vijayarka Nanduri',
      };
      return { title: shortTitles[item.slug] ?? `${item.title} — Vijayarka Nanduri`, description: shortDescription(item.summary), section: 'Research', image: '/social-card.png?v=2' };
    }
  }
  if (path === '/creative/') return { title: 'Creative Work by Vijayarka Nanduri | Books & Games', description: 'Books, writing, games, and audio fiction by Vijayarka Nanduri.', section: 'Creative', image: '/social-card.png?v=2' };
  if (path === '/about/') return { title: 'About Vijayarka Nanduri | Research & Creative Work', description: 'Meet Vijayarka Nanduri: independent researcher, product builder, and writer exploring human-centered software.', section: 'About', image: '/social-card.png?v=2' };
  if (path === '/contact/') return { title: 'Contact Vijayarka Nanduri | Collaboration & Ideas', description: 'Get in touch with Vijayarka Nanduri about research, projects, and creative collaboration.', section: 'Contact', image: '/social-card.png?v=2' };
  return fallback;
}

export function routeExists(rawPath: string): boolean {
  const path = rawPath.endsWith('/') ? rawPath : `${rawPath}/`;
  if (['/', '/projects/', '/research/', '/creative/', '/about/', '/contact/'].includes(path)) return true;
  if (path.startsWith('/projects/')) return projects.some((project) => path === `/projects/${project.slug}/`);
  if (path.startsWith('/research/')) return research.some((item) => path === `/research/${item.slug}/`);
  return false;
}
