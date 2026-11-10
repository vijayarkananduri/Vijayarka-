import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import { projects, getProject, Project } from './data/projects';
import { creative, profiles, research } from './data/content';

const navItems = [
  { label: 'Projects', href: '/projects/' },
  { label: 'Research', href: '/research/' },
  { label: 'Creative', href: '/creative/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
];

const basePath = import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL.replace(/\/$/, '');
const withBasePath = (path: string) => path.startsWith('/') ? `${basePath}${path}` : path;
const normalizePath = (path: string) => {
  const route = basePath && (path === basePath || path.startsWith(`${basePath}/`)) ? path.slice(basePath.length) || '/' : path;
  return route === '/' ? '/' : `/${route.split('/').filter(Boolean).join('/')}/`;
};

function Mark() {
  return <span className="brand-mark" aria-hidden="true"><i /><i /><b>V</b></span>;
}

function Header({ path, onPlay }: { path: string; onPlay: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const closeMenuRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  useEffect(() => setMenuOpen(false), [path]);
  useEffect(() => {
    if (!menuOpen) return;
    const focusables = () => Array.from(menuRef.current?.querySelectorAll<HTMLElement>('a[href], button:not(:disabled)') ?? []);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setMenuOpen(false); return; }
      if (event.key !== 'Tab') return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    closeMenuRef.current?.focus();
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); menuToggleRef.current?.focus(); };
  }, [menuOpen]);
  return <header className="site-header">
    <div className="header-inner">
      <a className="brand-lockup" href={withBasePath("/")} aria-label="Vijayarka Nanduri home"><Mark /><span className="brand-name">Vijayarka<span> Nanduri</span></span></a>
      <button ref={menuToggleRef} className="mobile-menu-toggle" aria-expanded={menuOpen} aria-controls="main-navigation" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} onClick={() => setMenuOpen((open) => !open)}><span /><span /></button>
      <nav ref={menuRef} id="main-navigation" className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
        <button ref={closeMenuRef} className="mobile-menu-close" onClick={() => setMenuOpen(false)}>Close menu <span aria-hidden="true">×</span></button>
        {navItems.map((item) => <a key={item.href} href={withBasePath(item.href)} aria-current={path.startsWith(item.href) ? 'page' : undefined}>{item.label}</a>)}
        <button className="nav-play" onClick={onPlay}><span className="play-dot" /> Play intro</button>
      </nav>
    </div>
  </header>;
}

function Footer() {
  return <footer className="site-footer" id="site-footer">
    <div className="footer-top">
      <div><a className="footer-signature" href={withBasePath("/")}>A little more alive.</a><p>Research, software, and stories—with a human pulse.</p></div>
      <div className="footer-links"><a href={withBasePath("/projects/")}>Projects</a><a href={withBasePath("/research/")}>Research</a><a href={withBasePath("/creative/")}>Creative</a><a href={withBasePath("/about/")}>About</a><a href={withBasePath("/contact/")}>Contact</a></div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Vijayarka Nanduri</span><div className="social-links"><a href={profiles.github} target="_blank" rel="noreferrer">GitHub ↗</a><a href={profiles.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><a href={profiles.youtube} target="_blank" rel="noreferrer">YouTube ↗</a><a href={profiles.orcid} target="_blank" rel="noreferrer">ORCID ↗</a></div></div>
  </footer>;
}

function Intro({ open, onClose }: { open: boolean; onClose: () => void }) {
  const scenes = [
    { kicker: 'A SMALL INTRODUCTION', headline: <>Vijayarka<br />Nanduri<span className="scene-period">.</span></>, copy: 'One curious mind. Several ways to make an idea real.' },
    { kicker: 'RESEARCHER · BUILDER · WRITER', headline: <>Ideas need<br /><em>a form.</em></>, copy: 'Sometimes a paper. Sometimes a tool. Sometimes a story you can step inside.' },
    { kicker: 'ALIVE UI · MAWO', headline: <>What if an<br />interface could <em>grow?</em></>, copy: 'Explore interfaces that make effort visible and change with the person using them.' },
    { kicker: 'TOOLS WITH A HUMAN POINT OF VIEW', headline: <>Useful can<br />still <em>feel.</em></>, copy: 'Private utilities, thoughtful software, playful experiments, and creative work.' },
    { kicker: 'THE ONLINE STUDIO', headline: <>Different rooms.<br /><em>One world.</em></>, copy: 'Choose where you want to wander next.' },
  ];
  const [scene, setScene] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [isPortrait, setIsPortrait] = useState(false);
  const dialogRef = useRef<HTMLElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (!open) return;
    previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const focusTimer = window.setTimeout(() => dialogRef.current?.querySelector<HTMLElement>('.intro-close')?.focus(), 0);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { onClose(); return; }
      if (event.key !== 'Tab') return;
      const focusables = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>('a[href], button:not(:disabled), [tabindex]:not([tabindex="-1"])') ?? []);
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    window.addEventListener('keydown', onKey);
    document.body.classList.add('intro-open');
    return () => { window.clearTimeout(focusTimer); window.removeEventListener('keydown', onKey); document.body.classList.remove('intro-open'); previousFocus.current?.focus(); };
  }, [open, onClose]);
  useEffect(() => {
    if (!open || !playing || scene >= scenes.length - 1) return;
    const timer = window.setTimeout(() => setScene((value) => Math.min(value + 1, scenes.length - 1)), 6500);
    return () => window.clearTimeout(timer);
  }, [open, playing, scene, scenes.length]);
  useEffect(() => {
    if (!open) return;
    const media = window.matchMedia('(max-width: 780px) and (orientation: portrait)');
    const update = () => setIsPortrait(media.matches);
    update();
    media.addEventListener?.('change', update);
    return () => media.removeEventListener?.('change', update);
  }, [open]);
  useEffect(() => { if (!open) { setScene(0); setPlaying(true); } }, [open]);
  if (!open) return null;
  const next = () => { setPlaying(false); setScene((value) => Math.min(value + 1, scenes.length - 1)); };
  const previous = () => { setPlaying(false); setScene((value) => Math.max(value - 1, 0)); };
  const current = scenes[scene];
  return <div className="intro-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section ref={dialogRef} className="intro-dialog" role="dialog" aria-modal="true" aria-label="Vijayarka Nanduri visual introduction">
      <div className="intro-screen" aria-live="polite">
        <div className="intro-screen-glow" />
        <div className="intro-topline"><span>VN / STUDIO CUT</span><span>00:{String((scene + 1) * 6).padStart(2, '0')}</span><button className="intro-skip" onClick={onClose}>Skip intro <b>×</b></button></div>
        <div key={scene} className="intro-scene"><p className="eyebrow mono">{current.kicker}</p><h2>{current.headline}</h2><p className="intro-copy">{current.copy}</p></div>
        {isPortrait && <p className="rotate-note">For the widescreen cut, turn your phone sideways <span>↻</span> <small>or keep watching here</small></p>}
        {scene === scenes.length - 1 && <div className="intro-end-actions"><a className="button button-light" href={withBasePath("/projects/")} onClick={onClose}>Explore projects <span>↗</span></a><a className="button button-glass" href={withBasePath("/research/")} onClick={onClose}>Read research</a><a className="button button-glass" href={withBasePath("/contact/")} onClick={onClose}>Get in touch</a></div>}
        <div className="intro-controls">
          <button className="round-control" onClick={previous} aria-label="Previous scene" disabled={scene === 0}>←</button>
          <div className="scene-progress" role="img" aria-label={`Scene ${scene + 1} of ${scenes.length}`}>{scenes.map((_, index) => <span key={index} className={scene === index ? 'active' : ''} />)}</div>
          {scene < scenes.length - 1 ? <button className="round-control" onClick={next} aria-label="Next scene">→</button> : <button className="round-control" onClick={() => { setScene(0); setPlaying(true); }} aria-label="Replay intro">↻</button>}
          <button className="intro-pause" onClick={() => setPlaying((value) => !value)} aria-label={playing ? 'Pause intro' : 'Play intro'}>{playing ? 'Ⅱ' : '▶'}</button>
        </div>
      </div>
      <button className="intro-close" onClick={onClose} aria-label="Close introduction">×</button>
      <p className="intro-caption">A short visual introduction · Sound off · Always skippable</p>
    </section>
  </div>;
}

function PageShell({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <main className={`page page-${className}`}>{children}</main>;
}

function PageIntro({ index, title, subtitle, accent }: { index: string; title: React.ReactNode; subtitle: string; accent: string }) {
  return <header className="page-intro" style={{ '--room': `var(--room-${accent})` } as CSSProperties}>
    <p className="eyebrow mono"><span className="eyebrow-mark" /> ROOM {index} <span className="eyebrow-divider">/</span> {accent.toUpperCase()}</p>
    <h1>{title}</h1><p className="page-lede">{subtitle}</p>
  </header>;
}

function VisualTile({ project, large = false }: { project: Project; large?: boolean }) {
  return <div className={`visual-tile visual-${project.palette} ${large ? 'visual-large' : ''}`} aria-hidden="true">
    <div className="tile-orbit orbit-one" /><div className="tile-orbit orbit-two" /><div className="tile-disc">{project.monogram}</div>
    <span className="tile-label">{project.platform}</span><span className="tile-index">{String(project.sort).padStart(2, '0')}</span>
    <div className="tile-spark spark-one" /><div className="tile-spark spark-two" />
  </div>;
}

function Status({ status }: { status: Project['status'] }) {
  return <span className={`status status-${status.toLowerCase().replaceAll(' ', '-')}`}><i />{status}</span>;
}

function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return <article className={`project-card ${featured ? 'project-featured' : ''}`} style={{ '--tone': `var(--tone-${project.palette})` } as CSSProperties}>
    <a href={withBasePath(`/projects/${project.slug}/`)} className="project-card-link" aria-label={`View ${project.title} project`}>
      <VisualTile project={project} large={featured} />
      <div className="project-card-body">
        <div className="card-meta"><span className="mono">{project.category}</span><Status status={project.status} /></div>
        <p className="card-eyebrow">{project.eyebrow}</p><h3>{project.title}<span className="card-arrow">↗</span></h3><p className="card-summary">{project.summary}</p>
        <div className="card-foot"><span>{project.platform}</span><span className="text-link">Explore project <b>↗</b></span></div>
      </div>
    </a>
  </article>;
}

function Home({ onPlay }: { onPlay: () => void }) {
  const featured = ['mawo', 'khata', 'draftbook', 'echo'].map((slug) => getProject(slug)).filter((project): project is Project => Boolean(project));
  return <PageShell className="home">
    <section className="home-hero">
      <div className="hero-noise" aria-hidden="true" />
      <div className="hero-visual" aria-hidden="true"><div className="hero-aura aura-a" /><div className="hero-aura aura-b" /><div className="hero-glass-object"><span /><i /><b /></div><div className="hero-wire wire-a" /><div className="hero-wire wire-b" /><div className="hero-spark spark-a" /><div className="hero-spark spark-b" /></div>
      <div className="hero-content">
        <p className="eyebrow mono"><span className="live-pulse" /> INDEPENDENTLY CURIOUS · RESEARCH / SOFTWARE / STORY</p>
        <h1>Vijayarka<br /><span>Nanduri</span><i>.</i></h1>
        <p className="hero-tagline">Research, software, and stories—<em>with a human pulse.</em></p>
        <p className="hero-description">I’m a researcher, builder, and writer exploring interfaces that grow with us, tools that respect us, and ideas that find their own form.</p>
        <div className="hero-actions"><a className="button button-primary" href={withBasePath("/projects/")}>Explore the work <span>↗</span></a><button className="button button-outline" onClick={onPlay}><span className="play-icon">▶</span> Play the intro <small>~30 sec</small></button></div>
        <div className="hero-caption"><span>01 — THE FOYER</span><span>SCROLL TO WANDER <b>↓</b></span></div>
      </div>
      <div className="hero-stamp" aria-hidden="true"><span>THOUGHT</span><b>×</b><span>FORM</span><i>✳</i></div>
    </section>

    <section className="intro-strip section-pad">
      <div className="strip-mark" aria-hidden="true"><span /><span /><span /></div>
      <div><p className="eyebrow mono">A PRACTICE IN THREE DIRECTIONS</p><p className="strip-line">Ideas arrive. <em>Then we find the right shape for them.</em></p></div>
      <a href={withBasePath("/about/")} className="circle-link" aria-label="Read about Vijayarka">↗</a>
    </section>

    <section className="home-work section-pad" id="selected-work">
      <div className="section-heading"><div><p className="eyebrow mono">02 / THE WORKSHOP</p><h2>Small worlds.<br /><em>Big feelings.</em></h2></div><p className="section-intro-copy">A few things built around a question, an itch, or a feeling that wouldn’t sit still.</p></div>
      <div className="project-grid home-project-grid">{featured.map((project, i) => <ProjectCard key={project.slug} project={project} featured={i === 0} />)}</div>
      <div className="section-end"><span className="mono">15 PUBLIC PROJECTS · STILL MAKING MORE</span><a className="text-link" href={withBasePath("/projects/")}>Enter the project room <b>↗</b></a></div>
    </section>

    <section className="home-research section-pad">
      <div className="research-orbit" aria-hidden="true"><i /><i /><i /><b>R</b></div>
      <div className="research-tease-copy"><p className="eyebrow mono">03 / THE OBSERVATORY</p><h2>Curiosity, with<br />a <em>paper trail.</em></h2><p>Research notes on interfaces that adapt, creative tools that listen, and machine learning that can explain itself.</p><a className="button button-dark" href={withBasePath("/research/")}>Visit the research room <span>↗</span></a></div>
      <div className="research-tease-list">{research.map((paper, i) => <a className="paper-row" href={withBasePath(`/research/${paper.slug}/`)} key={paper.slug}><span className="paper-index mono">0{i + 1}</span><span><small>{paper.kind}</small><strong>{paper.title}</strong></span><b>↗</b></a>)}</div>
    </section>

    <section className="home-creative section-pad">
      <div className="creative-art"><div className="paper-layer paper-back" /><div className="paper-layer paper-mid" /><div className="paper-book"><span>somewhere<br />between<br /><em>science</em><br />& the heart</span><i>VN</i></div><div className="paper-moon" /><div className="paper-orbit" /></div>
      <div className="creative-copy"><p className="eyebrow mono">04 / THE STORY STUDIO</p><h2>Not everything<br />fits in an <em>interface.</em></h2><p>Poetry, small games, audio fiction, and ideas that had to be written down before they disappeared.</p><a className="button button-paper" href={withBasePath("/creative/")}>Explore the creative room <span>↗</span></a></div>
    </section>

    <section className="home-contact section-pad"><div><p className="eyebrow mono">05 / THE OPEN DOOR</p><h2>Have a good<br /><em>question?</em></h2><p>Research, a project, a story, or just a curious conversation—there’s room for it here.</p><a href={withBasePath("/contact/")} className="button button-primary">Let’s talk <span>↗</span></a></div><div className="contact-graphic" aria-hidden="true"><span>HELLO</span><b>✳</b><i>01</i></div></section>
  </PageShell>;
}

function ProjectsPage() {
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');
  const filters = ['All', 'Web & PWA', 'Android', 'Experiment'];
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const visible = projects.filter((project) => {
    const matchesFilter = filter === 'All' || project.category === filter;
    const searchText = `${project.title} ${project.summary} ${project.platform} ${project.category}`.toLocaleLowerCase();
    return matchesFilter && (!normalizedQuery || searchText.includes(normalizedQuery));
  });
  return <PageShell className="projects" >
    <div className="page-wrap">
      <PageIntro index="01" accent="green" title={<>Made to be<br /><em>lived in.</em></>} subtitle="Apps, tools, experiments, and the occasional strange little idea. Pick a room and have a look around." />
      <div className="catalogue-toolbar"><div className="catalogue-tools"><div className="filters" role="group" aria-label="Filter projects by platform or type">{filters.map((item) => <button key={item} className={`filter-chip ${filter === item ? 'is-active' : ''}`} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}<span>{item === 'All' ? projects.length : projects.filter((p) => p.category === item).length}</span></button>)}</div><label className="project-search"><span className="mono">FIND A PROJECT</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the collection" /></label></div><p className="catalogue-count mono" aria-live="polite">SHOWING {String(visible.length).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</p></div>
      {visible.length ? <div className="project-grid catalogue-grid">{visible.map((project, index) => <ProjectCard key={project.slug} project={project} featured={filter === 'All' && !normalizedQuery && index === 0} />)}</div> : <div className="no-project-results" role="status"><p>No projects match that search.</p><button className="text-link" onClick={() => { setQuery(''); setFilter('All'); }}>Clear search and filters ↗</button></div>}
      <div className="catalogue-note"><span className="note-star">✳</span><p>Some are polished, some are still finding their shape. Each one started with a question worth following.</p></div>
    </div>
  </PageShell>;
}

function ProjectDetail({ project }: { project: Project }) {
  const related = projects.filter((item) => item.slug !== project.slug).slice(0, 3);
  return <PageShell className={`project-detail room-${project.palette}`}>
    <div className="page-wrap">
      <a className="back-link mono" href={withBasePath("/projects/")}>← ALL PROJECTS</a>
      <section className="project-detail-hero" style={{ '--tone': `var(--tone-${project.palette})` } as CSSProperties}>
        <div className="project-detail-copy"><p className="eyebrow mono">{project.category} <span>/</span> {project.platform}</p><Status status={project.status} /><h1>{project.title}<i>.</i></h1><p className="project-detail-deck">{project.summary}</p>
          <div className="detail-actions">{project.externalUrl ? <a className="button button-primary" href={project.externalUrl} target="_blank" rel="noreferrer">{project.externalLabel ?? 'Visit project'} <span>↗</span></a> : <a className="button button-primary" href={`mailto:${profiles.email}?subject=${encodeURIComponent(`A question about ${project.title}`)}`}>Ask about this project <span>↗</span></a>}
          {project.repoUrl && project.repoUrl !== project.externalUrl && <a className="button button-outline" href={project.repoUrl} target="_blank" rel="noreferrer">View source <span>↗</span></a>}
          {project.paperUrl && <a className="detail-paper-link" href={project.paperUrl} target="_blank" rel="noreferrer">Read the related preprint ↗</a>}</div>
        </div>
        <VisualTile project={project} large />
      </section>
      <div className="detail-columns"><section className="detail-story"><p className="eyebrow mono">THE IDEA</p><h2>What it’s <em>about.</em></h2><p>{project.story}</p>{project.privacyNote && <aside className="detail-note"><span className="mono">A NOTE ON THE DETAILS</span><p>{project.privacyNote}</p></aside>}</section>
        <section className="detail-features"><p className="eyebrow mono">A FEW PIECES</p><h2>Inside the <em>room.</em></h2><ul>{project.features.map((feature, i) => <li key={feature}><span className="feature-number mono">0{i + 1}</span>{feature}<span>↗</span></li>)}</ul><p className="detail-disclaimer">Project details and links can change. The linked project page or repository is the best place to check the latest release information.</p></section></div>
      <section className="related-projects"><div className="section-heading"><div><p className="eyebrow mono">KEEP WANDERING</p><h2>Another <em>room?</em></h2></div><a className="text-link" href={withBasePath("/projects/")}>All projects ↗</a></div><div className="project-grid">{related.map((item) => <ProjectCard key={item.slug} project={item} />)}</div></section>
    </div>
  </PageShell>;
}

function ResearchPage() {
  return <PageShell className="research">
    <div className="page-wrap"><PageIntro index="02" accent="blue" title={<>Questions worth<br /><em>staying with.</em></>} subtitle="Research in progress, ideas in public, and the honest limits of what a study can tell us." />
      <div className="research-page-intro"><span className="research-seal">R<span>·</span></span><p>These Zenodo records are preprints. Read the original record for the full paper; summaries here are a guide, not a substitute.</p></div>
      <div className="research-list">{research.map((paper, i) => <article className="research-item" key={paper.slug}><div className="research-item-index mono">0{i + 1}<span>—</span>{paper.date}</div><div className="research-item-content"><div className="research-tags"><span>{paper.kind}</span><span>DOI {paper.doi}</span></div><h2><a href={withBasePath(`/research/${paper.slug}/`)}>{paper.title}<span>↗</span></a></h2><p>{paper.summary}</p><div className="research-limit"><span>THE LIMITS</span><p>{paper.limitation}</p></div><a className="text-link" href={paper.url} target="_blank" rel="noreferrer">Open the Zenodo record <b>↗</b></a></div></article>)}</div>
      <div className="research-footnote"><p className="mono">A NOTE ON THE WORD “PUBLISHED”</p><p>These works are publicly archived preprints. This site does not present them as peer-reviewed journal papers.</p></div>
    </div>
  </PageShell>;
}

function ResearchDetail({ slug }: { slug: string }) {
  const paper = research.find((item) => item.slug === slug);
  if (!paper) return <NotFound />;
  return <PageShell className="research">
    <div className="page-wrap"><a className="back-link mono" href={withBasePath("/research/")}>← ALL RESEARCH</a><article className="research-detail"><p className="eyebrow mono">PREPRINT <span>/</span> {paper.date}</p><h1>{paper.title}</h1><p className="research-detail-lede">{paper.summary}</p><a className="button button-research" href={paper.url} target="_blank" rel="noreferrer">Read the Zenodo record <span>↗</span></a><section className="detail-note research-limit-large"><p className="mono">LIMITATIONS & CONTEXT</p><p>{paper.limitation}</p></section><div className="doi-box"><span className="mono">DOI</span><code>{paper.doi}</code><a href={`https://doi.org/${paper.doi}`} target="_blank" rel="noreferrer">Resolve DOI ↗</a></div></article></div>
  </PageShell>;
}

function CreativePage() {
  return <PageShell className="creative-page">
    <div className="page-wrap"><PageIntro index="03" accent="amber" title={<>Some things only<br />make sense as <em>stories.</em></>} subtitle="Books, games, audio, and creative experiments—little exits from the strictly useful." />
      <section className="creative-intro-band"><div className="creative-cut-paper" aria-hidden="true"><div /><span>✳</span><b>between<br />science<br />& feeling</b></div><p>Words, play, and other ways of thinking out loud. Pick up something that catches your eye.</p></section>
      <div className="creative-grid">{creative.map((item, index) => <article className={`creative-card creative-${item.tone}`} key={item.title}><div className="creative-card-art" aria-hidden="true"><span className="creative-card-symbol">{item.symbol}</span><span className="creative-card-index mono">0{index + 1}</span><i /><b /></div><div className="creative-card-copy"><p className="eyebrow mono">{item.kind}</p><h2>{item.title}</h2><p>{item.summary}</p><a className="text-link" href={item.url} target="_blank" rel="noreferrer">{item.action} <b>↗</b></a></div></article>)}</div>
      <section className="creative-extra"><div><p className="eyebrow mono">MOVING PICTURES</p><h2>Ideas, but <em>in motion.</em></h2><p>Videos on creative tools, AI, and Alive UI.</p></div><div className="video-list"><a href="https://youtu.be/-kCgiYXG_AA" target="_blank" rel="noreferrer"><span>01 / ALIVE UI</span>Let’s build your own habit tracker <b>↗</b></a><a href="https://youtu.be/LvKgftOAp9w" target="_blank" rel="noreferrer"><span>02 / MAKING</span>I am done with dead apps <b>↗</b></a><a href="https://www.youtube.com/@VijayarkaNanduri" target="_blank" rel="noreferrer"><span>03 / CHANNEL</span>More from Vijayarka <b>↗</b></a></div></section>
    </div>
  </PageShell>;
}

function AboutPage() {
  return <PageShell className="about-page">
    <div className="page-wrap"><PageIntro index="04" accent="plum" title={<>A mind that likes<br />to make <em>things.</em></>} subtitle="Researcher, builder, writer. The labels are different; the curiosity underneath is the same." />
      <section className="about-statement"><div className="about-mark">VN</div><div><p className="eyebrow mono">THE THROUGH-LINE</p><h2>Think it.<br /><em>Make it felt.</em></h2><p>I’m Vijayarka Nanduri. I work across research, software, and writing, following ideas until they find the form that fits. Sometimes that means a case study about adaptive interfaces. Sometimes it’s a private utility, a strange little game, or a story that starts with science and ends somewhere more human.</p><p>My work keeps returning to a few questions: Can an interface grow with the person using it? Can an AI tool help without taking over? Can software be useful and still leave someone feeling something?</p></div></section>
      <section className="about-pillars"><article><span className="pillar-no mono">01</span><h3>Research</h3><p>Human-computer interaction, adaptive interfaces, and ways to make machine learning easier to understand.</p><a href={withBasePath("/research/")}>Visit Research ↗</a></article><article><span className="pillar-no mono">02</span><h3>Build</h3><p>Apps and experiments that connect a clear purpose to a human-sized experience.</p><a href={withBasePath("/projects/")}>Browse Projects ↗</a></article><article><span className="pillar-no mono">03</span><h3>Create</h3><p>Poetry, stories, games, and other ideas that need room beyond a product screen.</p><a href={withBasePath("/creative/")}>Enter Creative ↗</a></article></section>
      <section className="about-finale"><p className="eyebrow mono">STILL IN PROGRESS, BY DESIGN</p><p>Not a finished map. More like a studio with the lights on.</p><a className="button button-outline" href={withBasePath("/contact/")}>Say hello <span>↗</span></a></section>
    </div>
  </PageShell>;
}

function ContactPage() {
  return <PageShell className="contact-page">
    <div className="page-wrap"><PageIntro index="05" accent="coral" title={<>An open door<br />for a good <em>idea.</em></>} subtitle="A question, a collaboration, or something you’ve been thinking about? Write a line and let’s see where it goes." />
      <div className="contact-grid"><section className="contact-main"><p className="eyebrow mono">THE DIRECT LINE</p><h2>Start with<br /><em>hello.</em></h2><p>Research collaboration, product conversations, creative work, and curious questions are all welcome.</p><a className="email-link" href={`mailto:${profiles.email}`}>{profiles.email}<span>↗</span></a><a className="button button-primary" href={`mailto:${profiles.email}?subject=${encodeURIComponent('Hello, Vijayarka')}`}>Write an email <span>↗</span></a></section><aside className="contact-side"><div className="contact-orbit"><span>OPEN</span><i>↗</i></div><p className="eyebrow mono">ELSEWHERE ON THE INTERNET</p><a href={profiles.linkedin} target="_blank" rel="noreferrer">LinkedIn <span>Professional notes</span><b>↗</b></a><a href={profiles.github} target="_blank" rel="noreferrer">GitHub <span>Projects and source</span><b>↗</b></a><a href={profiles.youtube} target="_blank" rel="noreferrer">YouTube <span>Ideas in motion</span><b>↗</b></a><a href={profiles.orcid} target="_blank" rel="noreferrer">ORCID <span>Research identity</span><b>↗</b></a></aside></div>
      <div className="contact-endnote"><span>NO FORM TO DISAPPEAR INTO.</span><span>JUST A HUMAN ON THE OTHER SIDE.</span></div>
    </div>
  </PageShell>;
}

function NotFound() {
  return <PageShell className="not-found"><div className="page-wrap"><p className="eyebrow mono">404 / WRONG DOOR</p><h1>This room<br /><em>isn’t here.</em></h1><p>Maybe it moved. The rest of the studio is still open.</p><a className="button button-primary" href={withBasePath("/")}>Back to the foyer <span>↗</span></a></div></PageShell>;
}

export function Site({ path }: { path: string }) {
  const normalized = normalizePath(path);
  const [introOpen, setIntroOpen] = useState(false);
  const projectMatch = normalized.match(/^\/projects\/([^/]+)\/$/);
  const researchMatch = normalized.match(/^\/research\/([^/]+)\/$/);
  const project = projectMatch ? getProject(projectMatch[1]) : undefined;
  const known = ['/', '/projects/', '/research/', '/creative/', '/about/', '/contact/'].includes(normalized) || Boolean(project) || Boolean(researchMatch && research.some((paper) => paper.slug === researchMatch[1]));
  let page: React.ReactNode;
  if (normalized === '/') page = <Home onPlay={() => setIntroOpen(true)} />;
  else if (normalized === '/projects/') page = <ProjectsPage />;
  else if (project) page = <ProjectDetail project={project} />;
  else if (normalized === '/research/') page = <ResearchPage />;
  else if (researchMatch) page = <ResearchDetail slug={researchMatch[1]} />;
  else if (normalized === '/creative/') page = <CreativePage />;
  else if (normalized === '/about/') page = <AboutPage />;
  else if (normalized === '/contact/') page = <ContactPage />;
  else page = <NotFound />;

  useEffect(() => {
    const footer = document.querySelector('.site-footer');
    if (footer) footer.setAttribute('data-site', 'vijayarka');
  }, []);

  return <div className="site-root" data-route-known={known}>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <Header path={normalized} onPlay={() => setIntroOpen(true)} />
    <div id="main-content">{page}</div>
    <Footer />
    <Intro open={introOpen} onClose={() => setIntroOpen(false)} />
  </div>;
}
