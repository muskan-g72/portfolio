import type { SiteContent } from "./types";

export const content: SiteContent = {
  name: "Muskan",
  displayName: "MUSKAN",
  role: "Software Engineer",
  schoolShort: "Thapar",
  school: "Thapar Institute of Engineering and Technology",
  yearMark: "2026",
  location: "Based in India",
  headline:
    "I build software that holds up under load — from the interface to the infrastructure.",
  headlineEmphasis: "holds up under load",
  status: "Open to SWE internships",
  previously:
    "Previously: Software Development Intern · CampusPro Technologies · 2026",
  about: [
    "I like systems where correctness matters — concurrency, rate limits, budgets and verification — and I enjoy building the interfaces people actually use to operate them.",
    "I recently interned at CampusPro Technologies, working on the design and development of an Employee Attendance Module, including HRMS integration, database implementation and testing.",
  ],
  education: {
    school: "Thapar Institute of Engineering and Technology",
    degree: "B.Tech in Computer Science and Engineering",
    years: "2024–2028",
    cgpa: "9.47 / 10",
  },
  scholarships: [
    { label: "Scholar", value: "Reliance Foundation Scholar 2024" },
    { label: "Merit", value: "Thapar Merit Scholarship" },
    { label: "Distinction", value: "CBSE XII School Topper — 96.8%" },
  ],
  experience: {
    dates: "June 2026 — July 2026",
    title: "Software Development Intern",
    company: "CampusPro Technologies Pvt. Ltd.",
    location: "Gurugram",
    project:
      "Developing Employee Attendance Module, Integration and Implementation",
    bulletsPrimary: [
      "Requirement analysis for the Employee Attendance Module.",
      "Module design and development across the feature surface.",
      "HRMS integration for attendance workflows.",
    ],
    bulletsMore: [
      "Database implementation for the module.",
      "Testing and validation of the attendance flows.",
      "Deployment support during implementation.",
      "Technical documentation for the module.",
      "Implementation activities with the product team.",
    ],
  },
  skills: {
    Languages: ["Python", "C/C++", "TypeScript", "JavaScript", "SQL", "HTML", "CSS"],
    Application: ["React", "FastAPI", "Django", "REST", "JWT"],
    Infrastructure: ["PostgreSQL", "MySQL", "Redis", "Docker", "Linux", "Git"],
    Testing: ["pytest", "CTest", "ThreadSanitizer", "Locust", "Playwright"],
  },
  exploring: "AI infrastructure · distributed systems · developer tooling",
  contact: {
    headline: "Let's build something.",
    support: "Open to Software Engineering internships.",
    email: "mmuskan_be24@thapar.edu",
    linkedin: "https://www.linkedin.com/in/muskan72gulia72",
    linkedinLabel: "linkedin.com/in/muskan72gulia72",
    github: "https://github.com/muskan-g72",
    githubLabel: "github.com/muskan-g72",
    phone: "+91-9812463664",
  },
  resumeHref: "/resume.pdf",
  nav: [
    { label: "Work", href: "/#work" },
    { label: "Experience", href: "/#experience" },
    { label: "Playground", href: "/#playground" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/#contact" },
  ],
  commands: [
    { group: "Navigation", id: "work", label: "Work", href: "/#work" },
    {
      group: "Navigation",
      id: "experience",
      label: "Experience",
      href: "/#experience",
    },
    {
      group: "Navigation",
      id: "playground",
      label: "Playground",
      href: "/#playground",
    },
    { group: "Navigation", id: "about", label: "About", href: "/#about" },
    { group: "Navigation", id: "contact", label: "Contact", href: "/#contact" },
    {
      group: "Projects",
      id: "verigate",
      label: "VeriGate",
      href: "/work/verigate",
    },
    {
      group: "Projects",
      id: "orchestrix",
      label: "Orchestrix",
      href: "/work/orchestrix",
    },
    {
      group: "Projects",
      id: "rateshield",
      label: "RateShield",
      href: "/work/rateshield",
    },
    {
      group: "Projects",
      id: "taskforge",
      label: "TaskForge",
      href: "/work/taskforge",
    },
    {
      group: "Actions",
      id: "resume",
      label: "Download Resume",
      href: "/resume.pdf",
    },
    {
      group: "Actions",
      id: "github",
      label: "GitHub",
      href: "https://github.com/muskan-g72",
      external: true,
    },
    {
      group: "Actions",
      id: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/muskan72gulia72",
      external: true,
    },
    {
      group: "Actions",
      id: "email",
      label: "Email",
      href: "mailto:mmuskan_be24@thapar.edu",
    },
  ],
  topology: [
    {
      id: "browser",
      label: "Browser",
      x: 920,
      y: 35,
      z: 0.1,
      annotation: {
        title: "Browser",
        body: ["Where operators start.", "UI is the first honest surface."],
        usedIn: "VeriGate · RateShield · Orchestrix",
      },
    },
    {
      id: "ui",
      label: "UI",
      x: 960,
      y: 75,
      z: -0.1,
      annotation: {
        title: "UI",
        body: ["Dashboards for evidence, keys, budgets and runs."],
        usedIn: "VeriGate · RateShield · Orchestrix",
      },
    },
    {
      id: "api",
      label: "API",
      x: 1010,
      y: 115,
      z: 0.1,
      annotation: {
        title: "API",
        body: ["Authenticated HTTP surface.", "Structured requests in, traces out."],
        usedIn: "RateShield · Orchestrix · VeriGate",
      },
    },
    {
      id: "auth",
      label: "Auth",
      x: 940,
      y: 185,
      z: -0.2,
      annotation: {
        title: "Auth",
        body: ["JWT, API keys, virtual keys.", "Identity before work is admitted."],
        usedIn: "RateShield · Orchestrix",
      },
    },
    {
      id: "ratelimit",
      label: "Rate Limit",
      x: 1080,
      y: 195,
      z: 0.2,
      annotation: {
        title: "Rate Limit",
        body: [
          "Lua-scripted Redis sliding window.",
          "Configurable per-user quotas.",
        ],
        usedIn: "RateShield",
      },
    },
    {
      id: "budget",
      label: "Budget",
      x: 1000,
      y: 265,
      z: 0,
      annotation: {
        title: "Budget",
        body: ["Atomic reservation.", "PostgreSQL conditional update."],
        usedIn: "Orchestrix",
      },
    },
    {
      id: "executor",
      label: "Executor",
      x: 1075,
      y: 350,
      z: -0.2,
      annotation: {
        title: "Executor",
        body: ["Task pipeline, thread pool, backpressure."],
        usedIn: "Orchestrix · TaskForge",
      },
    },
    {
      id: "provider",
      label: "Provider / DB",
      x: 1105,
      y: 435,
      z: -0.4,
      annotation: {
        title: "Provider / DB",
        body: ["LLMs, PostgreSQL, Redis.", "The systems work is delegated to."],
        usedIn: "Orchestrix · RateShield · VeriGate",
      },
    },
    {
      id: "campuspro",
      label: "campuspro",
      x: 890,
      y: 395,
      z: 0.5,
      annotation: {
        title: "campuspro",
        body: [
          "Employee Attendance Module.",
          "Design, HRMS integration, database, testing.",
        ],
        usedIn: "CampusPro Technologies · 2026",
      },
    },
    {
      id: "trace",
      label: "Trace",
      x: 955,
      y: 475,
      z: 0.2,
      annotation: {
        title: "Trace",
        body: ["Verification → Evidence → Release."],
        usedIn: "VeriGate",
      },
    },
    {
      id: "response",
      label: "Response",
      x: 1045,
      y: 535,
      z: 0,
      annotation: {
        title: "Response",
        body: ["Result, report, or rejection — with a reason."],
        usedIn: "Every system",
      },
    },
  ],
  topologyEdges: [
    ["browser", "ui"],
    ["ui", "api"],
    ["api", "auth"],
    ["api", "ratelimit"],
    ["auth", "budget"],
    ["ratelimit", "budget"],
    ["budget", "executor"],
    ["executor", "provider"],
    ["executor", "trace"],
    ["provider", "response"],
    ["trace", "response"],
    ["api", "campuspro"],
  ],
  projects: [
    {
      slug: "verigate",
      order: "01",
      name: "VeriGate",
      category: "Developer Tools",
      tagline: "Every test tells a story. Make yours undeniable.",
      description:
        "Verification command centre connecting tests, evidence, issues and release decisions in one traceable workspace for engineering and QA teams.",
      highlight:
        "One workspace from test evidence to GitHub PR verification and an audit-ready report.",
      stack: [
        "FastAPI",
        "Python",
        "SQLAlchemy",
        "Alembic",
        "Pydantic v2",
        "PostgreSQL",
        "React 19",
        "Vite",
        "React Router 7",
        "Playwright",
        "Pytest",
      ],
      features: [
        "Verification dashboard",
        "AI failure root-cause analysis via LLM diagnostics",
        "Exportable audit-ready reports in PDF and JSON",
        "GitHub PR verification",
        "HMAC signature checks",
        "Commit status checks",
        "Playwright automated browser testing",
      ],
      theme: {
        bg: "#07060a",
        accentFrom: "#8b5cf6",
        accentTo: "#ec4899",
        accentSolid: "#b57cff",
      },
      github: "https://github.com/muskan-g72/VeriGate",
      live: "https://verigate-frontend-j0ph.onrender.com/",
      coldStart: true,
      screenshots: [
        {
          id: "landing",
          label: "Landing",
          caption: "Product entry — verification as a release gate.",
          src: "/screenshots/verigate-landing.svg",
        },
        {
          id: "dashboard",
          label: "Dashboard",
          caption: "Verification dashboard: runs, evidence, release posture.",
          src: "/screenshots/verigate-dashboard.svg",
        },
        {
          id: "runs",
          label: "Runs",
          caption: "Test evidence collected per run.",
          src: "/screenshots/verigate-runs.svg",
        },
        {
          id: "pr",
          label: "PR verification",
          caption: "GitHub PR verification, HMAC and commit status checks.",
          src: "/screenshots/verigate-pr.svg",
        },
        {
          id: "report",
          label: "Report",
          caption: "Audit-ready export in PDF and JSON.",
          src: "/screenshots/verigate-report.svg",
        },
      ],
      problem:
        "Test results, failure context, issues and release decisions often live in different tools, so a run can pass in one place and still be unverifiable as a release artifact.",
      approach:
        "I built a verification command centre that binds tests, evidence, issues and release decisions into one traceable workspace for engineering and QA.",
      decision:
        "Treat verification as a trace — from Playwright and pytest evidence through GitHub PR checks — rather than a dashboard of disconnected statuses.",
      proof:
        "The system covers dashboarding, LLM-assisted failure diagnostics, HMAC and commit status checks, and exportable PDF/JSON reports. Quantitative production metrics are not published yet.",
      results: ["Metrics coming soon."],
      learned:
        "A verification product is only as strong as the chain between evidence and the release decision. Next, I would tighten how diagnostics stay grounded in collected traces.",
      engineeringTruth:
        "A verification workspace for tests, evidence and release decisions — not a replacement for CI, issue trackers or GitHub itself.",
      architecture: {
        nodes: [
          { id: "ui", label: "Dashboard", x: 80, y: 80 },
          { id: "api", label: "FastAPI", x: 260, y: 80 },
          { id: "db", label: "PostgreSQL", x: 440, y: 80 },
          { id: "tests", label: "Pytest / Playwright", x: 80, y: 200 },
          { id: "gh", label: "GitHub PR", x: 260, y: 200 },
          { id: "report", label: "PDF / JSON", x: 440, y: 200 },
        ],
        edges: [
          { from: "ui", to: "api" },
          { from: "api", to: "db" },
          { from: "tests", to: "api" },
          { from: "api", to: "gh" },
          { from: "api", to: "report" },
        ],
      },
    },
    {
      slug: "orchestrix",
      order: "02",
      name: "Orchestrix",
      category: "AI Infrastructure",
      tagline: "AI execution you can audit.",
      description: "AI gateway and workflow orchestration platform.",
      highlight:
        "Atomic budget reservation with PostgreSQL conditional updates — 10 simultaneous requests, 1 admitted, 9 rejected, zero oversubscription.",
      stack: ["FastAPI", "PostgreSQL", "SQLAlchemy", "HTTPX", "Docker", "Groq", "Gemini"],
      features: [
        "Authenticated virtual keys",
        "Provider abstraction",
        "Structured output validation",
        "Execution tracing",
        "Groq → Gemini fallback",
        "Bounded one-cycle repair",
        "YAML-defined skills",
        "Validated tool execution",
      ],
      theme: {
        bg: "#0b0a1a",
        accentFrom: "#6c5ce7",
        accentTo: "#22d3ee",
        accentSolid: "#7dd3ee",
      },
      github: "https://github.com/muskan-g72/Orchestrix",
      live: "https://orchestrix-frontend.onrender.com/",
      coldStart: true,
      screenshots: [
        {
          id: "gateway",
          label: "Gateway",
          caption: "Authenticated entry: virtual keys before execution.",
          src: "/screenshots/orchestrix-landing.svg",
        },
        {
          id: "budget",
          label: "Budget",
          caption: "Atomic reservation before the executor runs.",
          src: "/screenshots/orchestrix-budget.svg",
        },
        {
          id: "trace",
          label: "Trace",
          caption: "Auditable execution path through providers and repair.",
          src: "/screenshots/orchestrix-trace.svg",
        },
      ],
      problem:
        "LLM execution is easy to start and hard to bound: concurrent requests can oversubscribe budget, providers fail, and outputs drift from the contract.",
      approach:
        "I built an AI gateway that admits work only after auth and an atomic budget reservation, then runs a predeclared pipeline with provider fallback, validation and tracing.",
      decision:
        "Reserve budget with a PostgreSQL conditional UPDATE so admission is serialized in the database, not in application memory.",
      proof:
        "Under a 10-request race, 1 request is admitted and 9 are rejected with zero oversubscription. Locust against real LLM providers measured 1.92 s average latency (including upstream provider time from Groq/Gemini), P95 2.9 s, and 0% request failures.",
      proofVisual: [
        "10 simultaneous requests",
        "1 admitted",
        "9 rejected",
        "zero oversubscription",
      ],
      results: [
        "1.92 s average latency (includes upstream provider time from Groq/Gemini)",
        "P95: 2.9 s",
        "0% request failures",
      ],
      learned:
        "If the budget check is not atomic, concurrent traffic will invent capacity that does not exist. Next, I would extend reservation traces so every rejection is as inspectable as an admission.",
      engineeringTruth:
        "No autonomous planner or agent framework. Every request follows predeclared, auditable code paths.",
      architecture: {
        nodes: [
          { id: "auth", label: "Auth / Virtual Key", x: 70, y: 40 },
          { id: "budget", label: "Budget / UPDATE", x: 70, y: 110 },
          { id: "exec", label: "Executor", x: 70, y: 180 },
          { id: "groq", label: "Groq", x: 280, y: 140 },
          { id: "gemini", label: "Gemini", x: 280, y: 220 },
          { id: "val", label: "Validator", x: 490, y: 180 },
          { id: "trace", label: "Trace / PG", x: 490, y: 80 },
        ],
        edges: [
          { from: "auth", to: "budget" },
          { from: "budget", to: "exec" },
          { from: "exec", to: "groq" },
          { from: "groq", to: "gemini" },
          { from: "groq", to: "val" },
          { from: "gemini", to: "val" },
          { from: "val", to: "trace" },
        ],
      },
    },
    {
      slug: "rateshield",
      order: "03",
      name: "RateShield",
      category: "API Infrastructure",
      tagline: "Let good traffic through. Stop the rest.",
      description: "API gateway with authentication and rate limiting.",
      highlight:
        "Lua-scripted Redis sliding-window rate limiting with configurable per-user quotas.",
      stack: [
        "FastAPI",
        "Redis",
        "PostgreSQL",
        "SQLAlchemy",
        "Docker",
        "JWT",
        "React",
        "Render",
      ],
      features: [
        "JWT authentication",
        "API keys",
        "Alembic migrations",
        "Password hashing",
        "API key hashing",
        "Structured logging middleware",
        "React dashboard",
        "API key management",
        "Request analytics",
        "Subscription plans",
        "System health",
      ],
      theme: {
        bg: "#0b1a14",
        accentFrom: "#3ddc84",
        accentTo: "#ff7a59",
        accentSolid: "#3ddc84",
      },
      github: "https://github.com/muskan-g72/Rateshield",
      live: "https://rateshield-nine.vercel.app/",
      screenshots: [
        {
          id: "dashboard",
          label: "Dashboard",
          caption: "Keys, quotas and request posture in one operator surface.",
          src: "/screenshots/rateshield-dashboard.svg",
        },
        {
          id: "landing",
          label: "Landing",
          caption: "Gateway entry — authenticate, then bound traffic.",
          src: "/screenshots/rateshield-landing.svg",
        },
        {
          id: "keys",
          label: "API keys",
          caption: "API key issuance for authenticated clients.",
          src: "/screenshots/rateshield-keys.svg",
        },
      ],
      problem:
        "An API that authenticates but does not bound traffic will fail open under burst — and a limiter that is not atomic will leak extra requests.",
      approach:
        "I built a gateway that authenticates with JWT and API keys, then enforces per-user quotas in Redis before work continues to the application.",
      decision:
        "Implement the sliding window as a Lua script in Redis so read, increment and reject happen in one server-side step.",
      proof:
        "Locust against the deployed stack: ~95 req/s, 204 ms average latency, P95 460 ms, 0% failures, 11K+ requests. Deployed on Render, Vercel, Neon PostgreSQL and Upstash Redis.",
      results: [
        "~95 req/s",
        "204 ms average latency",
        "P95: 460 ms",
        "0% failures",
        "11K+ Locust requests",
      ],
      learned:
        "The limiter has to live next to the counter. Next, I would make quota changes as observable as 429s, so operators can see policy and traffic in the same trace.",
      engineeringTruth:
        "An authenticated API gateway with per-user sliding-window quotas — not a global edge mesh or a full API management suite.",
      architecture: {
        nodes: [
          { id: "client", label: "Client", x: 60, y: 120 },
          { id: "gw", label: "Gateway", x: 220, y: 120 },
          { id: "jwt", label: "JWT / Keys", x: 380, y: 50 },
          { id: "redis", label: "Redis Lua", x: 380, y: 190 },
          { id: "pg", label: "PostgreSQL", x: 540, y: 120 },
        ],
        edges: [
          { from: "client", to: "gw" },
          { from: "gw", to: "jwt" },
          { from: "gw", to: "redis" },
          { from: "gw", to: "pg" },
        ],
      },
    },
    {
      slug: "taskforge",
      order: "04",
      name: "TaskForge",
      category: "Concurrency / Systems",
      tagline: "A scheduler that stays honest under contention.",
      description: "Concurrent task scheduler.",
      highlight:
        "Bounded queue, fixed-size pool, backpressure and drain shutdown — measured at 63 jobs/s (1 worker) and 481 jobs/s (8 workers).",
      stack: [
        "C++17",
        "CMake",
        "std::thread",
        "std::mutex",
        "std::condition_variable",
        "CTest",
        "ThreadSanitizer",
      ],
      features: [
        "Bounded queue",
        "Fixed-size thread pool",
        "Backpressure handling",
        "Graceful drain shutdown",
        "Configurable retry policies",
        "Timeout detection",
        "Dead-letter queue",
        "Structured JSON logging",
        "Runtime metrics",
      ],
      theme: {
        bg: "#0a0a0c",
        accentFrom: "#ece9e1",
        accentTo: "#8d8b86",
        accentSolid: "#ece9e1",
      },
      github: "https://github.com/muskan-g72/TaskForge",
      screenshots: [
        {
          id: "runtime",
          label: "Runtime",
          caption: "Pool, queue, retry, timeout, dead-letter.",
          src: "/screenshots/taskforge-runtime.svg",
        },
        {
          id: "proof",
          label: "Proof",
          caption: "Throughput under 1 and 8 workers; TSan and CTest.",
          src: "/screenshots/taskforge-proof.svg",
        },
      ],
      problem:
        "A thread pool that accepts unbounded work will look fast until contention, shutdown, or a stuck job makes the runtime dishonest.",
      approach:
        "I wrote a C++17 scheduler with a bounded queue, fixed-size pool, backpressure, retries, timeouts, a dead-letter queue and structured JSON logs.",
      decision:
        "Make admission, execution and shutdown explicit: when the queue is full, producers feel backpressure; on stop, in-flight work drains instead of disappearing.",
      proof:
        "Measured 63 jobs/s with 1 worker and 481 jobs/s with 8 workers. Thread-safety validated with ThreadSanitizer. Core modules covered by CTest.",
      proofVisual: ["1 worker → 63 jobs/s", "8 workers → 481 jobs/s"],
      results: [
        "1 worker → 63 jobs/s",
        "8 workers → 481 jobs/s",
        "Thread-safety validated with ThreadSanitizer",
        "Core modules covered by CTest",
      ],
      learned:
        "Throughput numbers are incomplete without drain and failure paths. Next, I would expose queue delay next to jobs/s so contention is visible before it becomes a stall.",
      engineeringTruth:
        "A single-process concurrent scheduler — not a distributed job cluster or a language runtime.",
      architecture: {
        nodes: [
          { id: "in", label: "Submit", x: 60, y: 120 },
          { id: "q", label: "Bounded queue", x: 230, y: 120 },
          { id: "pool", label: "Thread pool", x: 420, y: 120 },
          { id: "retry", label: "Retry / timeout", x: 230, y: 220 },
          { id: "dlq", label: "Dead-letter", x: 420, y: 220 },
        ],
        edges: [
          { from: "in", to: "q" },
          { from: "q", to: "pool" },
          { from: "pool", to: "retry" },
          { from: "retry", to: "q" },
          { from: "retry", to: "dlq" },
        ],
      },
    },
  ],
};

export const projectsBySlug = Object.fromEntries(
  content.projects.map((project) => [project.slug, project]),
);

export function getProject(slug: string) {
  return projectsBySlug[slug];
}

export function adjacentProjects(slug: string) {
  const index = content.projects.findIndex((project) => project.slug === slug);
  return {
    prev: index > 0 ? content.projects[index - 1] : content.projects.at(-1),
    next:
      index < content.projects.length - 1
        ? content.projects[index + 1]
        : content.projects[0],
  };
}
