export type ProjectTheme = {
  bg: string;
  accentFrom: string;
  accentTo: string;
  accentSolid: string;
};

export type ArchitectureGraph = {
  nodes: Array<{ id: string; label: string; x: number; y: number }>;
  edges: Array<{ from: string; to: string }>;
};

export type ProjectScreenshot = {
  id: string;
  label: string;
  caption: string;
  src?: string;
};

export type Project = {
  slug: string;
  order: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  highlight: string;
  stack: string[];
  features: string[];
  theme: ProjectTheme;
  github: string;
  live?: string;
  coldStart?: boolean;
  screenshots: ProjectScreenshot[];
  problem: string;
  approach: string;
  decision: string;
  proof: string;
  proofVisual?: string[];
  results: string[];
  learned: string;
  engineeringTruth: string;
  architecture: ArchitectureGraph;
};

export type TopologyAnnotation = {
  title: string;
  body: string[];
  usedIn: string;
};

export type TopologyNode = {
  id: string;
  label: string;
  x: number;
  y: number;
  z: number;
  annotation?: TopologyAnnotation;
};

export type CommandItem = {
  group: "Navigation" | "Projects" | "Actions";
  id: string;
  label: string;
  href: string;
  external?: boolean;
};

export type SiteContent = {
  name: string;
  displayName: string;
  role: string;
  schoolShort: string;
  school: string;
  yearMark: string;
  location: string;
  headline: string;
  headlineEmphasis: string;
  status: string;
  previously: string;
  about: string[];
  education: {
    school: string;
    degree: string;
    years: string;
    cgpa: string;
  };
  scholarships: Array<{ label: string; value: string }>;
  experience: {
    dates: string;
    title: string;
    company: string;
    location: string;
    project: string;
    bulletsPrimary: string[];
    bulletsMore: string[];
    certificateHref: string;
    certificateLabel: string;
  };
  skills: Record<string, string[]>;
  exploring: string;
  contact: {
    headline: string;
    support: string;
    email: string;
    linkedin: string;
    linkedinLabel: string;
    github: string;
    githubLabel: string;
    phone: string;
  };
  resumeHref: string;
  nav: Array<{ label: string; href: string }>;
  commands: CommandItem[];
  topology: TopologyNode[];
  topologyEdges: Array<[string, string]>;
  projects: Project[];
};
