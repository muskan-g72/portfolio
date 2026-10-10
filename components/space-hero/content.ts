export interface Stage {
  name: string;
  desc: string;
}

export interface Project {
  name: string;
  tag: string;
  desc: string;
  metrics: string[];
  color: string;
  hex: number;
  img: string;
}

/* Strings are copied from muskan-space.html (REFERENCE) without edits. */
export const STAGES: Stage[] = [
  { name: 'HOME', desc: '' },
  { name: 'WORK', desc: 'Selected projects, each with the numbers behind it.' },
  { name: 'EXPERIENCE', desc: 'Where I have worked and what I built there.' },
  { name: 'ABOUT', desc: 'Background, education and what I am aiming for next.' },
  { name: 'CONTACT', desc: 'Open to SWE internships. The résumé is one click away.' }
];

/* Only change vs REFERENCE: image paths are root-absolute ('/shots/...') so they resolve in Next.js. */
export const PROJECTS: Project[] = [
  { name: 'VeriGate', tag: 'FASTAPI · REACT · PYTEST', desc: 'An AI-assisted platform for managing software verification and QA, with a REST API behind a React interface.', metrics: ['70+ REST endpoints', '119 pytest tests', '~100 ms P95'], color: '#c79bff', hex: 0xb98cff, img: '/shots/verigate-landing.webp' },
  { name: 'Orchestrix', tag: 'FASTAPI · LLM GATEWAY', desc: 'A gateway in front of LLM providers that admits, rejects and traces every request.', metrics: ['1 admitted / 9 rejected', '1.92 s avg latency', '0% failures'], color: '#7fb0ff', hex: 0x6ea8ff, img: '/shots/orchestrix-landing.webp' },
  { name: 'RateShield', tag: 'FASTAPI · REDIS', desc: 'An API gateway with Redis-backed rate limiting, load tested with real traffic.', metrics: ['~95 req/s', 'P95 460 ms', '11K+ requests, 0% failures'], color: '#6fe3a6', hex: 0x66e0a0, img: '/shots/rateshield-landing.webp' },
  { name: 'TaskForge', tag: 'C++17 · CONCURRENCY', desc: 'A concurrent task scheduler in C++17, benchmarked as the worker count scales.', metrics: ['63 → 481 jobs/s', '1 → 8 workers', 'mean of 5 runs'], color: '#e9edff', hex: 0xdfe6ff, img: '/shots/taskforge-4workers-io.webp' }
];

/* Taken from the resume PDF (hyperlink annotations on page 1). */
export const LINKS = {
  resume: '/resume.pdf',
  email: 'mailto:mmuskan_be24@thapar.edu',
  github: 'https://github.com/muskan-g72',
  linkedin: 'https://www.linkedin.com/in/muskan72gulia72'
};
