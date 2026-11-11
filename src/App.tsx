import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import { projects, getProject, Project } from './data/projects';
import { creative, profiles, research } from './data/content';
import { CreativeArtwork, ForgeMark, HeroArtwork, IntroArtwork, ProjectArtwork } from './Artwork';

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
  return <span className="brand-mark"><ForgeMark /></span>;
}

function Header({ path, onPlay, theme, onThemeToggle }: { path: string; onPlay: () => void; theme: 'day' | 'night'; onThemeToggle: () => void }) {
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
        <button className="theme-toggle" type="button" onClick={onThemeToggle} aria-label={`Switch to ${theme === 'day' ? 'night' : 'day'} mode`} aria-pressed={theme === 'night'}>
          <svg className="theme-icon theme-icon-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3.5"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></svg>
          <svg className="theme-icon theme-icon-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.2 15.4A8.7 8.7 0 0 1 8.6 3.8 8.8 8.8 0 1 0 20.2 15.4Z"/><path d="m16.8 4.5.5 1.4 1.4.5-1.4.5-.5 1.4-.5-1.4-1.4-.5 1.4-.5.5-1.4Z"/></svg>
          <span>{theme === 'day' ? 'Night' : 'Day'}</span>
        </button>
      </nav>
    </div>
  </header>;
}

function Doodle({ kind, speed = 0.05 }: { kind: 'arrow' | 'star' | 'clip'; speed?: number }) {
  const d = { arrow: 'M6 52c30 10 66-4 78-38m0 0-4 20m4-20-20 6', star: 'M30 4l6 18 18 2-14 12 5 18-15-10-15 10 5-18L6 24l18-2z', clip: 'M26 12v40a10 10 0 0 0 20 0V16a6 6 0 0 0-12 0v34' }[kind];
  return <svg className={`doodle doodle-${kind}`} data-float={speed} viewBox="0 0 90 70" aria-hidden="true" focusable="false"><path d={d} /></svg>;
}

function SlamBook() {
  const [f, setF] = useState({ name: '', word: '', ask: 'A project', msg: '' });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setF((v) => ({ ...v, [k]: e.target.value }));
  const body = `Slam book entry\n\nName: ${f.name}\nOne word for your work: ${f.word}\nI’d like to ask about: ${f.ask}\n\n${f.msg}`;
  const href = `mailto:${profiles.email}?subject=${encodeURIComponent(`Slam book: ${f.name || 'a visitor'}`)}&body=${encodeURIComponent(body)}`;
  const mine = [['Name', 'Vijayarka Nanduri'], ['Known for', 'research, software and stories'], ['Can’t stop thinking about', 'interfaces that grow with the person using them'], ['House rule', 'private by default, a human on the other side'], ['Right now', `${projects.length} projects deep, still making more`]];
  return <section id="slam-book" className="slam" data-reveal>
    <article className="slam-page slam-mine"><span className="tape" aria-hidden="true" />
      <p className="eyebrow mono">SLAM BOOK / PAGE 01</p><h2>My page, <em>filled in.</em></h2>
      <dl>{mine.map(([q, a]) => <div key={q}><dt>{q}</dt><dd>{a}</dd></div>)}</dl>
    </article>
    <article className="slam-page slam-yours"><span className="tape tape-b" aria-hidden="true" />
      <p className="eyebrow mono">SLAM BOOK / PAGE 02</p><h2>Now <em>yours.</em></h2>
      <label><span>Your name</span><input value={f.name} onChange={set('name')} placeholder="Write it here" autoComplete="name" /></label>
      <label><span>One word for my work</span><input value={f.word} onChange={set('word')} placeholder="Honest is fine" /></label>
      <label><span>I’d like to ask about</span><select value={f.ask} onChange={set('ask')}><option>A project</option><option>Research</option><option>A collaboration</option><option>Something else</option></select></label>
      <label><span>Leave a line</span><textarea rows={3} value={f.msg} onChange={set('msg')} placeholder="A question, a hello, an idea…" /></label>
      <a className="button button-primary slam-send" href={href}>Sign the slam book <span>↗</span></a>
      <p className="slam-hint">This opens your email app with the page already filled in. No form, no tracking.</p>
    </article>
  </section>;
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
  const [reducedMotion, setReducedMotion] = useState(false);
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
    document.getElementById('main-content')?.setAttribute('inert', '');
    return () => { window.clearTimeout(focusTimer); window.removeEventListener('keydown', onKey); document.body.classList.remove('intro-open'); document.getElementById('main-content')?.removeAttribute('inert'); previousFocus.current?.focus(); };
  }, [open, onClose]);
  useEffect(() => {
    if (!open || !playing || reducedMotion || scene >= scenes.length - 1) return;
    const timer = window.setTimeout(() => setScene((value) => Math.min(value + 1, scenes.length - 1)), 6000);
    return () => window.clearTimeout(timer);
  }, [open, playing, reducedMotion, scene, scenes.length]);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => { setReducedMotion(media.matches); if (media.matches) setPlaying(false); };
    update();
    media.addEventListener?.('change', update);
    return () => media.removeEventListener?.('change', update);
  }, []);
  useEffect(() => { if (scene >= scenes.length - 1) setPlaying(false); }, [scene, scenes.length]);
  useEffect(() => {
    if (!open) return;
    const media = window.matchMedia('(max-width: 780px) and (orientation: portrait)');
    const update = () => setIsPortrait(media.matches);
    update();
    media.addEventListener?.('change', update);
    return () => media.removeEventListener?.('change', update);
  }, [open]);
  useEffect(() => { if (!open) { setScene(0); setPlaying(!reducedMotion); } }, [open, reducedMotion]);
  if (!open) return null;
  const next = () => { setPlaying(false); setScene((value) => Math.min(value + 1, scenes.length - 1)); };
  const previous = () => { setPlaying(false); setScene((value) => Math.max(value - 1, 0)); };
  const current = scenes[scene];
  return <div className="intro-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section ref={dialogRef} className="intro-dialog" role="dialog" aria-modal="true" aria-label="Vijayarka Nanduri visual introduction">
      <div className="intro-screen" data-scene={scene} aria-live="polite">
        <div className="intro-topline"><span>FIELD NOTES / A SHORT INTRODUCTION</span><span>00:{String(scene * 6).padStart(2, '0')} / 00:24</span><button className="intro-skip" onClick={onClose}>Skip intro <b>×</b></button></div>
        <div className="intro-art-wrap"><IntroArtwork scene={scene} /></div>
        <div key={scene} className="intro-scene"><p className="eyebrow mono">{current.kicker}</p><h2>{current.headline}</h2><p className="intro-copy">{current.copy}</p></div>
        {isPortrait && <p className="rotate-note">A wider view works best in landscape <small>or keep watching here</small></p>}
        {scene === scenes.length - 1 && <div className="intro-end-actions"><a className="button button-light" href={withBasePath("/projects/")} onClick={onClose}>Explore projects <span>↗</span></a><a className="button button-glass" href={withBasePath("/research/")} onClick={onClose}>Read research</a><a className="button button-glass" href={withBasePath("/contact/")} onClick={onClose}>Get in touch</a></div>}
        <div className="intro-controls">
          <button className="round-control" onClick={previous} aria-label="Previous scene" disabled={scene === 0}>←</button>
          <div className="scene-progress" role="group" aria-label={`Scene ${scene + 1} of ${scenes.length}`}>{scenes.map((_, index) => <button key={index} type="button" className={scene === index ? 'active' : ''} aria-label={`Go to scene ${index + 1}`} aria-current={scene === index ? 'step' : undefined} onClick={() => { setScene(index); setPlaying(false); }} />)}</div>
          {scene < scenes.length - 1 ? <button className="round-control" onClick={next} aria-label="Next scene">→</button> : <button className="round-control" onClick={() => { setScene(0); setPlaying(!reducedMotion); }} aria-label="Replay intro">↻</button>}
          <button className="intro-pause" onClick={() => { if (scene === scenes.length - 1) { setScene(0); setPlaying(!reducedMotion); } else setPlaying((value) => !value); }} aria-label={playing ? 'Pause intro' : scene === scenes.length - 1 ? 'Replay intro' : 'Play intro'}>{playing ? 'PAUSE' : scene === scenes.length - 1 ? 'REPLAY' : 'PLAY'}</button>
        </div>
      </div>
      <button className="intro-close" onClick={onClose} aria-label="Close introduction">×</button>
      <p className="intro-caption">A short visual introduction · Sound off · Always skippable</p>
    </section>
  </div>;
}

function PageShell({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <main id="main-content" tabIndex={-1} className={`page page-${className}`}>{children}</main>;
}

function PageIntro({ index, title, subtitle, accent }: { index: string; title: React.ReactNode; subtitle: string; accent: string }) {
  return <header className="page-intro" data-reveal style={{ '--room': `var(--room-${accent})` } as CSSProperties}>
    <p className="eyebrow mono"><span className="eyebrow-mark" /> ROOM {index} <span className="eyebrow-divider">/</span> {accent.toUpperCase()}</p>
    <h1>{title}</h1><p className="page-lede">{subtitle}</p>
  </header>;
}

function VisualTile({ project, large = false }: { project: Project; large?: boolean }) {
  return <div className={`visual-tile visual-${project.palette} ${large ? 'visual-large' : ''}`} aria-hidden="true">
    <ProjectArtwork project={project} large={large} />
    <span className="tile-label">{project.platform}</span><span className="tile-index">{String(project.sort).padStart(2, '0')}</span>
  </div>;
}

function Status({ status }: { status: Project['status'] }) {
  return <span className={`status status-${status.toLowerCase().replaceAll(' ', '-')}`}><i />{status}</span>;
}

function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return <article data-reveal className={`project-card ${featured ? 'project-featured' : ''}`} style={{ '--tone': `var(--tone-${project.palette})` } as CSSProperties}>
    <span className="tape" aria-hidden="true" /><a href={withBasePath(`/projects/${project.slug}/`)} className="project-card-link" aria-label={`View ${project.title} project`} onPointerMove={(event) => {
      if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const bounds = event.currentTarget.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - .5;
      const y = (event.clientY - bounds.top) / bounds.height - .5;
      event.currentTarget.style.setProperty('--tilt-x', `${-y * 3.5}deg`);
      event.currentTarget.style.setProperty('--tilt-y', `${x * 4.5}deg`);
    }} onPointerLeave={(event) => { event.currentTarget.style.removeProperty('--tilt-x'); event.currentTarget.style.removeProperty('--tilt-y'); }}>
      <VisualTile project={project} large={featured} />
      <div className="project-card-body">
        {project.slug !== 'nslv-19' && <div className="card-meta"><span className="mono">{project.category}</span><Status status={project.status} /></div>}
        {project.eyebrow && <p className="card-eyebrow">{project.eyebrow}</p>}<h3>{project.title}<span className="card-arrow">↗</span></h3><p className="card-summary">{project.summary}</p>
        <div className="card-foot"><span>{project.platform}</span><span className="text-link">Read the case study <b>↗</b></span></div>
      </div>
    </a>
  </article>;
}

function Home({ onPlay }: { onPlay: () => void }) {
  const featured = ['mawo', 'khata', 'draftbook', 'echo'].map((slug) => getProject(slug)).filter((project): project is Project => Boolean(project));
  return <PageShell className="home">
    <section className="home-hero">
      <div className="hero-noise" aria-hidden="true" />
      <div className="hero-visual" aria-hidden="true"><HeroArtwork /></div>
      <div className="hero-content" data-reveal>
        <p className="eyebrow mono"><span className="live-pulse" /> RESEARCH / BUILD / WRITE</p>
        <h1><span className="hero-signature">Vijayarka</span><span className="hero-surname">NANDURI<i>.</i></span></h1>
        <p className="hero-tagline">I don’t make things.<br /><em>I make you feel things.</em></p>
        <p className="hero-description">I’m a researcher, builder, and writer exploring interfaces that grow with us, tools that respect us, and ideas that find their own form.</p>
        <div className="hero-actions"><a className="button button-primary" href={withBasePath("/projects/")}>See the work <span>↗</span></a><button className="button button-outline" onClick={onPlay}><svg className="play-icon" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 2.2 10 6l-7 3.8z" /></svg> Play the intro <small>~24 sec</small></button></div>
        <div className="hero-caption"><span>01 — THE FOYER</span><span>SCROLL TO WANDER <b>↓</b></span></div>
      </div>
    </section>

    <section className="intro-strip section-pad" data-reveal>
      <div className="strip-mark" aria-hidden="true"><span /><span /><span /></div>
      <div><p className="eyebrow mono">A PRACTICE IN THREE DIRECTIONS</p><p className="strip-line">Ideas arrive. <em>Then we find the right shape for them.</em></p></div>
      <a href={withBasePath("/about/")} className="circle-link" aria-label="Read about Vijayarka">↗</a>
    </section>

    <section className="home-work section-pad" id="selected-work" data-reveal>
      <div className="section-heading"><Doodle kind="arrow" /><div><p className="eyebrow mono">02 / THE WORKSHOP</p><h2>Things I<br /><em>couldn’t leave alone.</em></h2></div><p className="section-intro-copy">A few things built around a question, an itch, or a feeling that wouldn’t sit still.</p></div>
      <div className="project-grid home-project-grid">{featured.map((project, i) => <ProjectCard key={project.slug} project={project} featured={i === 0} />)}</div>
      <div className="section-end"><span className="mono">{projects.length} PROJECTS · STILL MAKING MORE</span><a className="text-link" href={withBasePath("/projects/")}>Enter the project room <b>↗</b></a></div>
    </section>

    <section className="home-research section-pad" data-reveal>
      <div className="research-orbit" aria-hidden="true"><i /><i /><i /><b>R</b></div>
      <div className="research-tease-copy"><p className="eyebrow mono">03 / THE OBSERVATORY</p><h2>Questions I<br /><em>kept following.</em></h2><p>Research notes on interfaces that adapt, creative tools that listen, and machine learning that can explain itself.</p><a className="button button-dark" href={withBasePath("/research/")}>Visit the research room <span>↗</span></a></div>
      <div className="research-tease-list">{research.map((paper, i) => <a className="paper-row" href={withBasePath(`/research/${paper.slug}/`)} key={paper.slug}><span className="paper-index mono">0{i + 1}</span><span><small>{paper.kind}</small><strong>{paper.title}</strong></span><b>↗</b></a>)}</div>
    </section>

    <section className="home-creative section-pad" data-reveal>
      <div className="creative-art"><div className="paper-layer paper-back" /><div className="paper-layer paper-mid" /><div className="paper-book"><span>somewhere<br />between<br /><em>science</em><br />& the heart</span><i>VN</i></div><div className="paper-moon" /><div className="paper-orbit" /></div>
      <div className="creative-copy"><Doodle kind="star" speed={0.08} /><p className="eyebrow mono">04 / THE STORY STUDIO</p><h2>Not everything<br />fits in an <em>interface.</em></h2><p>Poetry, small games, audio fiction, and ideas that had to be written down before they disappeared.</p><a className="button button-paper" href={withBasePath("/creative/")}>Explore the creative room <span>↗</span></a></div>
    </section>

    <section className="home-contact section-pad" data-reveal><div><p className="eyebrow mono">05 / THE OPEN DOOR</p><h2>Have a good<br /><em>question?</em></h2><p>Research, a project, a story, or just a curious conversation—there’s room for it here.</p><a href={withBasePath("/contact/#slam-book")} className="button button-primary">Sign the slam book <span>↗</span></a></div><div className="contact-graphic" aria-hidden="true"><span>HELLO</span><svg viewBox="0 0 28 28"><path d="M5 14h18M14 5v18M7.5 7.5l13 13m0-13-13 13" /></svg><i>01</i></div></section>
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
      <div className="catalogue-note"><span className="note-index mono">NOTE</span><p>Some are polished, some are still finding their shape. Each one started with a question worth following.</p></div>
    </div>
  </PageShell>;
}

function ProjectDetail({ project }: { project: Project }) {
  const related = projects.filter((item) => item.slug !== project.slug).slice(0, 3);
  const at = projects.findIndex((item) => item.slug === project.slug);
  const prev = projects[(at + projects.length - 1) % projects.length];
  const next = projects[(at + 1) % projects.length];
  const primaryHref = project.externalUrl ?? project.repoUrl;
  const ask = `mailto:${profiles.email}?subject=${encodeURIComponent(`A question about ${project.title}`)}`;
  const actions = <>{primaryHref ? <a className="button button-primary" href={primaryHref} target="_blank" rel="noreferrer">{project.externalLabel ?? (project.externalUrl ? 'Open project' : 'View the source')} <span>↗</span></a> : <a className="button button-primary" href={ask}>Ask about {project.title} <span>↗</span></a>}{project.repoUrl && project.externalUrl && project.repoUrl !== project.externalUrl && <a className="button button-outline" href={project.repoUrl} target="_blank" rel="noreferrer">View source <span>↗</span></a>}{primaryHref && <a className="text-link ask-link" href={ask}>Ask a question <b>↗</b></a>}{project.paperUrl && <a className="detail-paper-link" href={project.paperUrl} target="_blank" rel="noreferrer">Read the related preprint ↗</a>}</>;
  return <PageShell className={`project-detail room-${project.palette}`}>
    <div className="page-wrap">
      <a className="back-link mono" href={withBasePath("/projects/")}>← ALL PROJECTS</a>
      <section className="project-detail-hero" data-reveal style={{ '--tone': `var(--tone-${project.palette})` } as CSSProperties}>
        <div className="project-detail-copy">{project.slug !== 'nslv-19' && <><p className="eyebrow mono">{project.category} <span>/</span> {project.platform}</p><Status status={project.status} /></>}<h1>{project.title}<i>.</i></h1><p className="project-detail-deck">{project.summary}</p>
      <div className="detail-actions">{actions}</div>
        </div>
        <VisualTile project={project} large />
      </section>
      {project.problem && project.build && project.flex && <section className="case-notes" aria-label="Case study">{([['01', 'The itch', project.problem], ['02', 'The build', project.build], ['03', 'The flex', project.flex]] as const).map(([n, t, text], i) => <article key={n} data-reveal className={`case-note note-${i + 1}`}><span className="tape" aria-hidden="true" /><span className="case-no mono">{n}</span><h2>{t}</h2><p>{text}</p></article>)}</section>}
      {project.slug !== 'nslv-19' && <div className="detail-columns" data-reveal><section className="detail-story"><p className="eyebrow mono">IN ONE LINE</p><p className="pull-quote">{project.eyebrow}</p>{!project.problem && project.story && <p className="story-text">{project.story}</p>}{project.privacyNote && <aside className="detail-note"><span className="mono">A NOTE ON THE DETAILS</span><p>{project.privacyNote}</p></aside>}</section>
        <section className="detail-features"><p className="eyebrow mono">A FEW PIECES</p><h2>Inside the <em>room.</em></h2><ul>{project.features.map((feature, i) => <li key={feature}><span className="feature-number mono">0{i + 1}</span>{feature}<span>↗</span></li>)}</ul><p className="detail-disclaimer">Details and links can change. The live project or repository is the best place to check the latest.</p></section></div>}
      {project.slug !== 'nslv-19' && <section className="cta-band" data-reveal><div><p className="eyebrow mono">YOUR TURN</p><h2>See how it <em>holds up.</em></h2></div><div className="cta-actions">{actions}</div></section>}
      <nav className="page-turn" aria-label="More projects"><a href={withBasePath(`/projects/${prev.slug}/`)}><span className="mono">← PREVIOUS PAGE</span><strong>{prev.title}</strong></a><a href={withBasePath(`/projects/${next.slug}/`)}><span className="mono">NEXT PAGE →</span><strong>{next.title}</strong></a></nav>
      <section className="related-projects"><div className="section-heading"><div><p className="eyebrow mono">KEEP WANDERING</p><h2>Another <em>room?</em></h2></div><a className="text-link" href={withBasePath("/projects/")}>All projects ↗</a></div><div className="project-grid">{related.map((item) => <ProjectCard key={item.slug} project={item} />)}</div></section>
    </div>
  </PageShell>;
}

function ResearchPage() {
  return <PageShell className="research">
    <div className="page-wrap"><PageIntro index="02" accent="blue" title={<>Questions worth<br /><em>staying with.</em></>} subtitle="Research in progress, ideas in public, and the honest limits of what a study can tell us." />
      <div className="research-page-intro"><span className="research-seal">R<span>·</span></span><p>These Zenodo records are preprints. Read the original record for the full paper; summaries here are a guide, not a substitute.</p></div>
      <div className="research-list">{research.map((paper, i) => <article data-reveal className="research-item" key={paper.slug}><div className="research-item-index mono">0{i + 1}<span>—</span>{paper.date}</div><div className="research-item-content"><div className="research-tags"><span>{paper.kind}</span><span>DOI {paper.doi}</span></div><h2><a href={withBasePath(`/research/${paper.slug}/`)}>{paper.title}<span>↗</span></a></h2><p>{paper.summary}</p><div className="research-limit"><span>THE LIMITS</span><p>{paper.limitation}</p></div><a className="text-link" href={paper.url} target="_blank" rel="noreferrer">Open the Zenodo record <b>↗</b></a></div></article>)}</div>
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
      <section className="creative-intro-band" data-reveal><div className="creative-cut-paper" aria-hidden="true"><div /><b>between<br />science<br />& feeling</b></div><p>Words, play, and other ways of thinking out loud. Pick up something that catches your eye.</p></section>
      <div className="creative-grid">{creative.map((item, index) => <article data-reveal className={`creative-card creative-${item.tone}`} key={item.title}><div className="creative-card-art"><CreativeArtwork title={item.title} index={index} /></div><div className="creative-card-copy"><p className="eyebrow mono">{item.kind}</p><h2>{item.title}</h2><p>{item.summary}</p><a className="text-link" href={item.url} target="_blank" rel="noreferrer">{item.action} <b>↗</b></a></div></article>)}</div>
      <section className="creative-extra"><div><p className="eyebrow mono">MOVING PICTURES</p><h2>Ideas, but <em>in motion.</em></h2><p>Videos on creative tools, AI, and Alive UI.</p></div><div className="video-list"><a href="https://youtu.be/-kCgiYXG_AA" target="_blank" rel="noreferrer"><span>01 / ALIVE UI</span>Let’s build your own habit tracker <b>↗</b></a><a href="https://youtu.be/LvKgftOAp9w" target="_blank" rel="noreferrer"><span>02 / MAKING</span>I am done with dead apps <b>↗</b></a><a href="https://www.youtube.com/@VijayarkaNanduri" target="_blank" rel="noreferrer"><span>03 / CHANNEL</span>More from Vijayarka <b>↗</b></a></div></section>
    </div>
  </PageShell>;
}

function AboutPage() {
  return <PageShell className="about-page">
    <div className="page-wrap"><PageIntro index="04" accent="plum" title={<>A mind that likes<br />to make <em>things.</em></>} subtitle="Researcher, builder, writer. The labels are different; the curiosity underneath is the same." />
      <section className="about-statement" data-reveal><div className="about-mark"><ForgeMark /></div><div><p className="eyebrow mono">THE THROUGH-LINE</p><h2>Think it.<br /><em>Make it felt.</em></h2><p>I’m Vijayarka Nanduri. I work across research, software, and writing, following ideas until they find the form that fits. Sometimes that means a case study about adaptive interfaces. Sometimes it’s a private utility, a strange little game, or a story that starts with science and ends somewhere more human.</p><p>My work keeps returning to a few questions: Can an interface grow with the person using it? Can an AI tool help without taking over? Can software be useful and still leave someone feeling something?</p></div></section>
      <section className="about-pillars"><article><span className="pillar-no mono">01</span><h3>Research</h3><p>Human-computer interaction, adaptive interfaces, and ways to make machine learning easier to understand.</p><a href={withBasePath("/research/")}>Visit Research ↗</a></article><article><span className="pillar-no mono">02</span><h3>Build</h3><p>Apps and experiments that connect a clear purpose to a human-sized experience.</p><a href={withBasePath("/projects/")}>Browse Projects ↗</a></article><article><span className="pillar-no mono">03</span><h3>Create</h3><p>Poetry, stories, games, and other ideas that need room beyond a product screen.</p><a href={withBasePath("/creative/")}>Enter Creative ↗</a></article></section>
      <section className="about-finale"><p className="eyebrow mono">STILL IN PROGRESS, BY DESIGN</p><p>Not a finished map. More like a studio with the lights on.</p><a className="button button-outline" href={withBasePath("/contact/#slam-book")}>Sign the slam book <span>↗</span></a></section>
    </div>
  </PageShell>;
}

function ContactPage() {
  return <PageShell className="contact-page">
    <div className="page-wrap"><PageIntro index="05" accent="coral" title={<>An open door<br />for a good <em>idea.</em></>} subtitle="A question, a collaboration, or something you’ve been thinking about? Write a line and let’s see where it goes." />
      <div className="contact-grid" data-reveal><section className="contact-main"><p className="eyebrow mono">THE DIRECT LINE</p><h2>Start with<br /><em>hello.</em></h2><p>Research collaboration, product conversations, creative work, and curious questions are all welcome.</p><a className="email-link" href={`mailto:${profiles.email}`}>{profiles.email}<span>↗</span></a><a className="button button-primary" href={`mailto:${profiles.email}?subject=${encodeURIComponent('Hello, Vijayarka')}`}>Write an email <span>↗</span></a></section><aside className="contact-side"><div className="contact-orbit"><span>OPEN</span><i>↗</i></div><p className="eyebrow mono">ELSEWHERE ON THE INTERNET</p><a href={profiles.linkedin} target="_blank" rel="noreferrer">LinkedIn <span>Professional notes</span><b>↗</b></a><a href={profiles.github} target="_blank" rel="noreferrer">GitHub <span>Projects and source</span><b>↗</b></a><a href={profiles.youtube} target="_blank" rel="noreferrer">YouTube <span>Ideas in motion</span><b>↗</b></a><a href={profiles.orcid} target="_blank" rel="noreferrer">ORCID <span>Research identity</span><b>↗</b></a></aside></div>
      <SlamBook />
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
  const [theme, setTheme] = useState<'day' | 'night'>('day');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const siteRef = useRef<HTMLDivElement>(null);
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
    try { const saved = window.localStorage.getItem('vijayarka-theme'); if (saved === 'day' || saved === 'night') setTheme(saved); } catch { /* Storage can be unavailable in private browsing. */ }
  }, []);

  useEffect(() => {
    document.body.classList.toggle('theme-night', theme === 'night');
    document.documentElement.dataset.theme = theme;
    document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')?.setAttribute('content', theme === 'night' ? '#191714' : '#f3eddf');
    try { window.localStorage.setItem('vijayarka-theme', theme); } catch { /* Keep the toggle usable when storage is unavailable. */ }
  }, [theme]);

  useEffect(() => {
    const update = () => setShowScrollTop(window.scrollY > 420);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    const root = siteRef.current;
    const footer = root?.querySelector('.site-footer');
    if (footer) footer.setAttribute('data-site', 'vijayarka');
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const revealItems = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (!('IntersectionObserver' in window)) { revealItems.forEach((item) => item.classList.add('is-visible')); return; }
    document.body.classList.add('motion-ready');
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      const element = entry.target as HTMLElement;
      if (entry.isIntersecting) element.classList.add('is-visible');
      else if (entry.boundingClientRect.bottom < 0 || entry.boundingClientRect.top > window.innerHeight) element.classList.remove('is-visible');
    }), { threshold: .08, rootMargin: '0px 0px -5% 0px' });
    revealItems.forEach((item) => observer.observe(item));
    return () => { observer.disconnect(); document.body.classList.remove('motion-ready'); };
  }, []);

  useEffect(() => {
    const hero = siteRef.current?.querySelector<HTMLElement>('.home-hero');
    const art = hero?.querySelector<HTMLElement>('.hero-visual');
    if (!hero || !art || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;
    const update = () => {
      frame = 0;
      const scrollDrift = Math.max(-62, Math.min(0, hero.getBoundingClientRect().top * .12));
      art.style.setProperty('--parallax-x', `${pointerX}px`);
      art.style.setProperty('--parallax-y', `${pointerY + scrollDrift}px`);
    };
    const queueUpdate = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    const onPointer = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      const bounds = hero.getBoundingClientRect();
      pointerX = ((event.clientX - bounds.left) / bounds.width - .5) * 14;
      pointerY = ((event.clientY - bounds.top) / bounds.height - .5) * 10;
      queueUpdate();
    };
    const resetPointer = () => { pointerX = 0; pointerY = 0; queueUpdate(); };
    hero.addEventListener('pointermove', onPointer, { passive: true });
    hero.addEventListener('pointerleave', resetPointer, { passive: true });
    window.addEventListener('scroll', queueUpdate, { passive: true });
    update();
    return () => { hero.removeEventListener('pointermove', onPointer); hero.removeEventListener('pointerleave', resetPointer); window.removeEventListener('scroll', queueUpdate); if (frame) window.cancelAnimationFrame(frame); };
  }, []);

  useEffect(() => {
    const items = Array.from(siteRef.current?.querySelectorAll<HTMLElement>('[data-float]') ?? []);
    if (!items.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    const tick = () => { frame = 0; const vh = window.innerHeight; items.forEach((el) => { const r = (el.parentElement ?? el).getBoundingClientRect(); if (r.bottom < -200 || r.top > vh + 200) return; el.style.setProperty('--fy', `${(-(r.top + r.height / 2 - vh / 2) * parseFloat(el.dataset.float || '0')).toFixed(1)}px`); }); };
    const queue = () => { if (!frame) frame = window.requestAnimationFrame(tick); };
    window.addEventListener('scroll', queue, { passive: true }); tick();
    return () => { window.removeEventListener('scroll', queue); if (frame) window.cancelAnimationFrame(frame); };
  }, []);

  return <div ref={siteRef} className="site-root" data-route-known={known} data-theme={theme}>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <Header path={normalized} onPlay={() => setIntroOpen(true)} theme={theme} onThemeToggle={() => setTheme((current) => current === 'day' ? 'night' : 'day')} />
    {page}
    <Footer />
    <Intro open={introOpen} onClose={() => setIntroOpen(false)} />
    <button className={`scroll-top ${showScrollTop ? 'is-visible' : ''}`} type="button" aria-label="Scroll back to top" tabIndex={showScrollTop ? 0 : -1} onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })}>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5m-6 6 6-6 6 6" /></svg><span>Top</span>
    </button>
  </div>;
}
