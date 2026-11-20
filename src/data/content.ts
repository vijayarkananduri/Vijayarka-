export type ResearchItem = {
  slug: string;
  title: string;
  kind: string;
  date: string;
  summary: string;
  limitation: string;
  doi: string;
  url: string;
  related?: string;
};

export const research: ResearchItem[] = [
  {
    slug: 'designing-alive-ui',
    title: 'Designing Alive UI in MAWO: A Case Study on Stimuli-Driven Interface Evolution for Habit Formation',
    kind: 'Zenodo preprint',
    date: '17 Aug 2025',
    summary: 'Introduces Alive UI through MAWO, a habit-tracking case study exploring how a changing visual interface can make progress feel more visible. The paper reports a 45-day self-study and a change in habit completion from 71% to 96%.',
    limitation: 'The reported percentages come from a single-person 45-day case study. Treat them as findings reported by this study, not proof that the approach will improve habit completion generally.',
    doi: '10.5281/zenodo.16889414',
    url: 'https://zenodo.org/records/16889414',
    related: 'mawo',
  },
  {
    slug: 'self-narrating-neural-networks',
    title: 'Self-Narrating Neural Networks: Real-Time Natural Language Explanations During Machine Learning Training',
    kind: 'Zenodo preprint',
    date: '10 Oct 2025',
    summary: 'Explores a system where a machine-learning model narrates parts of its training process in natural language, with an ECG-classification proof of concept.',
    limitation: 'The record describes a proof of concept involving two students. The authors note that this small sample is not enough for strong conclusions.',
    doi: '10.5281/zenodo.17310054',
    url: 'https://zenodo.org/records/17310054',
  },
  {
    slug: 'emotion-aware-ai-writing-tools',
    title: 'Designing Emotion-Aware AI Writing Tools: A Research Study on Draftbook',
    kind: 'Zenodo preprint',
    date: '11 Jul 2025',
    summary: 'Examines design ideas for a writing assistant centered on authorial control, unobtrusive feedback, and emotionally sensitive interaction.',
    limitation: 'This is a preprint and its product observations refer to an earlier Draftbook version. Vijayarka confirms the product is working again; the historic notice on the record is not the current product status.',
    doi: '10.5281/zenodo.15865688',
    url: 'https://zenodo.org/records/15865688',
    related: 'draftbook',
  },
];

export const creative = [
  {
    title: "Newton's Law of Love",
    kind: 'Prose poetry · Kindle',
    summary: 'A collection that maps loss and longing through the language of physics.',
    action: 'Read on Kindle',
    url: 'https://www.amazon.in/dp/B0GZVLSZ3Q/',
    symbol: 'N',
    tone: 'plum',
  },
  {
    title: 'The Chemistry of Love',
    kind: 'Prose poetry · Kindle',
    summary: 'Love as a reaction, heartbreak as entropy, and the bonds that remain.',
    action: 'Read on Kindle',
    url: 'https://www.amazon.in/dp/B0GZPYV842/',
    symbol: 'C',
    tone: 'amber',
  },
  {
    title: 'Write It Right, Get It Right',
    kind: 'Free guide',
    summary: 'A practical guide to giving AI clearer instructions, with examples and reusable templates.',
    action: 'Open the guide',
    url: 'https://vijayarka.notion.site/Write-It-Right-Get-It-Right-21725fbad98b8030a46ccc8ba43a132a',
    symbol: 'W',
    tone: 'blue',
  },
  {
    title: 'Ancient Echoes',
    kind: 'Audio fiction · Pocket FM',
    summary: 'An episodic fantasy series set in a world inspired by ancient India.',
    action: 'Listen on Pocket FM',
    url: 'https://pocketfm.onelink.me/2IE7/s6fj1j8m',
    symbol: '◌',
    tone: 'green',
  },
];

export const profiles = {
  github: 'https://github.com/vijayarkananduri',
  linkedin: 'https://www.linkedin.com/in/vijayarka',
  youtube: 'https://www.youtube.com/@VijayarkaNanduri',
  medium: 'https://medium.com/@vijayarka',
  orcid: 'https://orcid.org/0009-0000-2610-5554',
  zenodo: 'https://zenodo.org/search?q=metadata.creators.person_or_org.name%3A%22Nanduri%2C%20Vijayarka%22',
  email: 'vijayarkananduri@gmail.com',
};
