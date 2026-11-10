export type ProjectCategory = 'Web & PWA' | 'Android' | 'Experiment';
export type ProjectStatus = 'Live' | 'Public project' | 'Research' | 'In development';

export type Project = {
  slug: string;
  title: string;
  eyebrow: string;
  category: ProjectCategory;
  platform: string;
  status: ProjectStatus;
  summary: string;
  story: string;
  features: string[];
  palette: string;
  externalUrl?: string;
  externalLabel?: string;
  repoUrl?: string;
  paperUrl?: string;
  privacyNote?: string;
  featured?: boolean;
  sort: number;
};

export const projects: Project[] = [
  {
    slug: 'mawo', title: 'MAWO', eyebrow: 'Your progress, made visible', category: 'Web & PWA', platform: 'Web · PWA · Android project', status: 'Live',
    summary: 'A habit tracker built around progress you can feel: the interface changes as your routines grow.',
    story: 'MAWO is the clearest working expression of Alive UI, Vijayarka’s idea that software can reflect a person’s effort instead of remaining visually static. The project brings habit planning and a changing visual world together.',
    features: ['Adaptive visual phases', 'Daily habits and one-time tasks', 'Progress and milestones'], palette: 'green',
    externalUrl: 'https://themawo.netlify.app/', externalLabel: 'Open MAWO', repoUrl: 'https://github.com/vijayarkananduri/theMAWO', paperUrl: 'https://zenodo.org/records/16889414', featured: true, sort: 1,
  },
  {
    slug: 'khata', title: 'Khata', eyebrow: 'Everyday money, in balance', category: 'Android', platform: 'Android · Kotlin', status: 'Live',
    summary: 'A calm personal ledger for everyday spending, designed to keep your entries on your phone.',
    story: 'Khata makes it easy to record income, spending, and budgets without connecting a bank account. Its product site describes local-first use, exportable records, home-screen widgets, and gentle repeat-purchase reminders.',
    features: ['Spending, income and budgets', 'Calendar and year heatmap', 'Widgets and optional restock nudges'], palette: 'amber',
    externalUrl: 'https://vijayarkananduri.github.io/khata/', externalLabel: 'Explore Khata', repoUrl: 'https://github.com/vijayarkananduri/khata', featured: true, sort: 2,
    privacyNote: 'The project documentation describes local-first storage and no bank linking. Check the current release documentation for exact behavior.',
  },
  {
    slug: 'metabasis', title: 'Metabasis', eyebrow: 'A step instrument that changes as you move', category: 'Android', platform: 'Android · Kotlin', status: 'Public project',
    summary: 'A private step-counting app shaped like a small tactile instrument, turning movement into a visual journey.',
    story: 'Metabasis explores how an everyday utility can have character. Its instrument-inspired interface represents step progress through stages, LEDs, and a calendar-like history.',
    features: ['Hardware step-sensor support', 'Stage-based progress display', 'Step history and visual themes'], palette: 'blue',
    repoUrl: 'https://github.com/vijayarkananduri/metabasis', featured: true, sort: 3,
    privacyNote: 'The repository describes on-device tracking. Sensor behavior varies by Android device; its README notes an approximate fallback on some devices.',
  },
  {
    slug: 'almara', title: 'Almara', eyebrow: 'Remember when, not where', category: 'Android', platform: 'Android · Kotlin', status: 'Live',
    summary: 'A file organizer that helps you find things by time, type, or source without rearranging the originals.',
    story: 'Inspired by the everyday phrase “almara sedha karo” (“tidy the cupboard”), Almara gives a phone’s files a searchable, calendar-shaped home while leaving the original files in place.',
    features: ['Calendar heatmap and day view', 'Search and virtual folders', 'Android download and user guide'], palette: 'plum',
    externalUrl: 'https://vijayarkananduri.github.io/Almara/', externalLabel: 'Explore Almara', repoUrl: 'https://github.com/vijayarkananduri/Almara', featured: true, sort: 4,
    privacyNote: 'Project materials describe local indexing and no network permission. Verify the release manifest and current behavior before relying on a privacy claim.',
  },
  {
    slug: 'examflow', title: 'ExamFlow', eyebrow: 'Make the semester feel manageable', category: 'Web & PWA', platform: 'Browser · JavaScript', status: 'Public project',
    summary: 'A private study planner that turns syllabi and exam dates into a focused day-by-day plan.',
    story: 'ExamFlow brings syllabi, topics, revision, and exam dates into one study workspace. Its repository describes local browser storage and a responsive interface; the public app URL should be confirmed before adding a launch action.',
    features: ['Syllabus and topic planning', 'Exam-aware daily recommendations', 'Study sessions and progress'], palette: 'blue',
    repoUrl: 'https://github.com/vijayarkananduri/examflow', externalLabel: 'View project source', sort: 5,
  },
  {
    slug: 'centrum-os', title: 'Centrum OS', eyebrow: 'Return to focus', category: 'Experiment', platform: 'Linux · Shell', status: 'Public project',
    summary: 'A personal terminal workspace for focus sessions, an agenda, notes, and project shortcuts.',
    story: 'Centrum OS experiments with a context-aware command-line environment. The repository labels it v0.1 beta and describes a local-first approach; treat it as an early-stage tool rather than a stable operating-system distribution.',
    features: ['Focus sessions and agenda', 'Project history and quick access', 'Local notes and themes'], palette: 'dark',
    repoUrl: 'https://github.com/vijayarkananduri/centrum-os', externalUrl: 'https://github.com/vijayarkananduri/centrum-os', externalLabel: 'Explore the repository', sort: 7,
  },
  {
    slug: 'draftbook', title: 'Draftbook', eyebrow: 'Write without losing your thread', category: 'Web & PWA', platform: 'Web app · AI writing', status: 'Live',
    summary: 'A writing assistant designed to offer quiet, thoughtful feedback without taking over the writer’s voice.',
    story: 'Draftbook explores an assistant that stays in the background while a writer works. Vijayarka confirms that the product is working again; the linked research preprint describes an earlier version, so it should not be used as a current service-status notice.',
    features: ['Writing-first workspace', 'Low-interruption suggestions', 'Research on emotion-aware writing tools'], palette: 'amber',
    externalUrl: 'https://draftb00k.netlify.app/', externalLabel: 'Open Draftbook', paperUrl: 'https://zenodo.org/records/15865688', featured: true, sort: 8,
  },
  {
    slug: 'tenet', title: 'Tenet', eyebrow: 'A journal that changes with the moment', category: 'Web & PWA', platform: 'Web app', status: 'Live',
    summary: 'A personal journal concept that pairs emotional reflection with a changing visual environment.',
    story: 'Tenet is presented on the portfolio as an emotion-tracking journal with an interface that shifts around the user’s reflections. Review the live product’s privacy notice and data behavior before making more specific claims.',
    features: ['Emotion-focused journaling', 'Responsive color and atmosphere', 'Private-feeling writing space'], palette: 'plum',
    externalUrl: 'https://tenett.netlify.app/', externalLabel: 'Open Tenet', sort: 9,
  },
  {
    slug: 'designrx', title: 'DesignRx', eyebrow: 'A second opinion on your interface', category: 'Web & PWA', platform: 'Web tool · AI-assisted', status: 'Live',
    summary: 'A design-audit experiment that helps developers think about the feeling their interface creates.',
    story: 'DesignRx is described on the portfolio as an AI-assisted tool that reads frontend code and offers design feedback. Its current capabilities and data handling should be checked on the live product.',
    features: ['Website design review', 'Tone and interaction feedback', 'Actionable suggestions'], palette: 'green',
    externalUrl: 'https://thedesignrx.netlify.app/', externalLabel: 'Open DesignRx', sort: 10,
  },
  {
    slug: 'echo', title: 'Echo', eyebrow: 'The dark answers back', category: 'Experiment', platform: 'Browser game · JavaScript', status: 'Live',
    summary: 'A sound-first horror game where sonar reveals the dark but also gives away your position.',
    story: 'Echo builds tension through listening. The player uses a sonar pulse to understand a dark space, balancing orientation against the risk of alerting what is nearby.',
    features: ['Sound-led exploration', 'Sonar-based visibility', 'Short-form browser play'], palette: 'dark',
    externalUrl: 'https://vijayarka.itch.io/echo', externalLabel: 'Play Echo', sort: 11,
  },
  {
    slug: 'ek-indian-bacha', title: 'Ek Indian Bacha', eyebrow: 'A student-life satire', category: 'Experiment', platform: 'Browser game', status: 'Live',
    summary: 'A playful satire about the Indian student experience, with Hinglish dialogue and branching outcomes.',
    story: 'This browser game uses familiar school and family pressures as a starting point for humor and choice. The portfolio describes a hidden Arts ending and a “Rishtedaar Meter.”',
    features: ['Hinglish dialogue', 'Choice-led scenes', 'A hidden alternate ending'], palette: 'amber',
    externalUrl: 'https://ekindianbacha.netlify.app/', externalLabel: 'Play the game', sort: 12,
  },
  {
    slug: 'logbook', title: 'Logbook', eyebrow: 'A small second brain, kept local', category: 'Web & PWA', platform: 'Web app', status: 'Live',
    summary: 'A lightweight place for thoughts and links, organized with a local tagging workflow.',
    story: 'Logbook is described on the portfolio as a private second brain that uses a hand-written tagging engine. Confirm current storage and privacy behavior in the live app before making absolute data claims.',
    features: ['Capture notes, links and ideas', 'Automatic category suggestions', 'Browser-local workflow'], palette: 'green',
    externalUrl: 'https://thelogbook.netlify.app/', externalLabel: 'Open Logbook', sort: 13,
  },
  {
    slug: 'writers-assistant', title: "Writer's Assistant", eyebrow: 'A toolbox for getting words moving', category: 'Web & PWA', platform: 'AI writing tool', status: 'Public project',
    summary: 'A multi-mode writing helper for creative, academic, business, and everyday writing tasks.',
    story: 'The portfolio describes six writing modes. The currently maintained product/download destination needs to be confirmed, so use the source link as the action until a direct live URL is verified.',
    features: ['Creative and storytelling modes', 'Academic, business and grammar support', 'Focus-oriented writing assistance'], palette: 'blue',
    externalUrl: 'https://linktr.ee/theaibay', externalLabel: 'Find the current tool', sort: 14,
  },
  {
    slug: 'tailored-poems', title: 'Tailored Poems', eyebrow: 'A few lines shaped around a feeling', category: 'Android', platform: 'Android · generative writing', status: 'Public project',
    summary: 'A poem-generation concept that starts with an emotion or occasion and shapes a personal response.',
    story: 'Tailored Poems explores emotion-led creative generation for occasions such as love, farewell, or celebration. The portfolio currently points to a Linktree, so a direct current download link should be added when confirmed.',
    features: ['Emotion and occasion prompts', 'Personalized poem output', 'Android app experiment'], palette: 'amber',
    externalUrl: 'https://linktr.ee/theaibay', externalLabel: 'Find the current app', sort: 15,
  },
  {
    slug: 'sylph', title: 'Sylph', eyebrow: 'Weather with a little atmosphere', category: 'Android', platform: 'Android · Flutter', status: 'Public project',
    summary: 'A weather and air-quality app with animated conditions and practical “leaving now” outfit suggestions.',
    story: 'The public repository describes weather and air-quality data, animated backgrounds, unit switching, and locally stored search history. Check live API credentials and service availability before promising current forecasts.',
    features: ['Weather and air quality', 'Atmosphere that responds to conditions', 'Outfit recommendations'], palette: 'blue',
    repoUrl: 'https://github.com/vijayarkananduri/Sylph', externalUrl: 'https://github.com/vijayarkananduri/Sylph', externalLabel: 'Explore Sylph', sort: 16,
  },
];

export const getProject = (slug: string) => projects.find((project) => project.slug === slug);
