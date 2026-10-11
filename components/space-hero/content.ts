export type StopId = 'home' | 'about' | 'experience' | 'work' | 'contact';
export type StopKind = 'knot' | 'crystal' | 'aizawa' | 'deck' | 'beacon';

export interface Stop {
  id: StopId;
  name: string;
  kind: StopKind;
  anchor: [number, number];
  position: { x: number; y: number; z: number; r: number; dist?: number; halo?: number };
  appearWindow: 'first' | 'later' | 'contact';
}

export interface Project {
  name: string;
  tag: string;
  desc: string;
  metrics: string[];
  color: string;
  hex: number;
  img: string;
  live?: string;
  github: string;
}

export const STOPS: Stop[] = [
  { id: 'home', name: 'HOME', kind: 'knot', anchor: [0, 0.02], position: { x: 5.2, y: 0.1, z: -26, r: 4 }, appearWindow: 'first' },
  { id: 'about', name: 'ABOUT', kind: 'crystal', anchor: [0.11, 0.22], position: { x: 4.6, y: -1.2, z: -70, r: 3.9, dist: 24, halo: 0xe27ba6 }, appearWindow: 'first' },
  { id: 'experience', name: 'EXPERIENCE', kind: 'aizawa', anchor: [0.33, 0.43], position: { x: 7, y: 1, z: -150, r: 3.8, dist: 25, halo: 0x5f8fff }, appearWindow: 'later' },
  { id: 'work', name: 'WORK', kind: 'deck', anchor: [0.55, 0.91], position: { x: 6.2, y: -0.4, z: -230, r: 3.9, dist: 17, halo: 0x8fb8ff }, appearWindow: 'later' },
  { id: 'contact', name: 'CONTACT', kind: 'beacon', anchor: [0.98, 1], position: { x: 6.5, y: 0.6, z: -350, r: 3.6, dist: 24, halo: 0x58e0b8 }, appearWindow: 'contact' },
];

export const STAGES = STOPS.map(({ name }) => ({ name }));

export const ABOUT = {
  title: 'EDUCATION',
  institute: 'Thapar Institute of Engineering and Technology',
  degree: 'B. Tech. in Computer Science and Engineering',
  chips: ['Aug 2024 – Jun 2028', 'CGPA: 9.47/10'],
  scholarships: ['Reliance Foundation Scholar 2024', 'Thapar Institute Merit Scholarship'],
} as const;

export const EXPERIENCE_SLIDES = [
  {
    title: 'Intern Trainee', company: 'NatWest', location: '', dates: 'June 2027 – July 2027', tag: 'INCOMING',
    lines: [],
  },
  {
    title: 'Software Development Intern', company: 'CampusPro Technologies Pvt. Ltd.', location: 'Gurugram, Haryana', dates: 'Jun 2026 – Jul 2026', tag: 'Education - sector ERP & Mobile App Platform',
    lines: ['Built frontend enhancements for an Employee Attendance module serving 300+ employees, using HTML and CSS.', 'Supported HRMS integration and database implementation, including testing and validation of attendance workflows.', 'Assisted with deployment activities and technical documentation, collaborating with the engineering team.'],
  },
] as const;

export const CONTACT_COPY = {
  paragraph: "I'm the kind of engineer who reads the error message twice, then the source once. I like knowing why something works, not only that it does. Right now I'm looking for an internship where I can learn from people better than me, own something small and real, and leave it a little better than I found it.",
  closing: 'If you have a problem that deserves careful attention, write to me.',
} as const;

export const PROJECTS: Project[] = [
  { name: 'VeriGate', tag: 'FASTAPI · REACT · POSTGRESQL · PLAYWRIGHT', desc: 'An AI-assisted platform for managing software verification and QA, with a REST API behind a React interface.', metrics: ['70+ REST endpoints', '119 pytest tests', '~100 ms P95'], color: '#c79bff', hex: 0xb98cff, img: '/shots/verigate-landing.webp', live: 'https://verigate-frontend-j0ph.onrender.com/', github: 'https://github.com/muskan-g72/VeriGate' },
  { name: 'Orchestrix', tag: 'FASTAPI · POSTGRESQL · HTTPX · DOCKER', desc: 'A gateway in front of LLM providers that admits, rejects and traces every request.', metrics: ['1 admitted / 9 rejected', '1.92 s avg latency'], color: '#7fb0ff', hex: 0x6ea8ff, img: '/shots/orchestrix-landing.webp', live: 'https://orchestrix-frontend.onrender.com/', github: 'https://github.com/muskan-g72/Orchestrix' },
  { name: 'RateShield', tag: 'FASTAPI · REDIS · LUA · DOCKER', desc: 'An API gateway with Redis-backed rate limiting, load tested with real traffic.', metrics: ['~95 req/s', 'P95 460 ms', '11K+ requests'], color: '#6fe3a6', hex: 0x66e0a0, img: '/shots/rateshield-landing.webp', live: 'https://rateshield-nine.vercel.app/', github: 'https://github.com/muskan-g72/Rateshield' },
  { name: 'TaskForge', tag: 'C++17 · std::thread · Thread pool · Condition variables', desc: 'A concurrent task scheduler in C++17, benchmarked as the worker count scales.', metrics: [], color: '#e9edff', hex: 0xdfe6ff, img: '/shots/taskforge-4workers-io.webp', github: 'https://github.com/muskan-g72/TaskForge' },
];

const email = 'mmuskan_be24@thapar.edu';
export const LINKS = { resume: '/resume.pdf', email: `mailto:${email}`, gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=Hello%20Muskan`, github: 'https://github.com/muskan-g72', repository: 'https://github.com/muskan-g72/portfolio', linkedin: 'https://www.linkedin.com/in/muskan72gulia72' };
