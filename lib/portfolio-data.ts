// ============================================================================
// portfolio-data.ts — the single source of truth for all site content.
// Edit the values below to update the portfolio; no React code changes needed.
//
// NOTE: keep this file free of JSX/React components — it is imported by
// Server Components and must stay serializable. Icons are referenced by
// string name (see `SocialIconName` / `SkillIconName`) and resolved to
// components inside the UI layer (components/icons.tsx).
// ============================================================================

export type SocialIconName = "github" | "linkedin" | "mail";

export interface SocialLink {
  label: string;
  href: string;
  icon: SocialIconName;
}

export interface Education {
  school: string;
  degree: string;
  period: string;
  details?: string;
}

export interface Club {
  name: string;
  role?: string;
  period?: string;
  description?: string;
}

export interface ExperienceItem {
  company: string;
  /** Company website — the company name becomes a link when set. */
  url?: string;
  role: string;
  period: string;
  location?: string;
  highlights: string[];
}

export interface Course {
  /** Course code, e.g. "CS 61A". */
  code: string;
  name: string;
}

export interface Project {
  name: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
}

/**
 * A blog topic. Tag a post with `topic: <label>` in its frontmatter
 * (case-insensitive, e.g. `topic: tech`).
 */
export interface Topic {
  label: string;
  /** Optional one-liner shown when readers filter by this topic. */
  note?: string;
}

export interface PortfolioData {
  name: string;
  initials: string;
  tagline: string;
  location: string;
  email: string;
  resumeUrl: string;
  about: {
    /** Path to a portrait in /public (e.g. "/profile.jpg"), or null to show a placeholder. */
    photo: string | null;
    bio: string[];
  };
  education: {
    schools: Education[];
    coursework: Course[];
    clubs: Club[];
  };
  experience: ExperienceItem[];
  projects: Project[];
  topics: Topic[];
  socials: SocialLink[];
}

export const portfolioData: PortfolioData = {
  // ---- Identity ------------------------------------------------------------
  name: "Jeffrey Wang",
  initials: "JW",
  tagline:
    "Data Science & Economics at UC Berkeley.",
  location: "Berkeley, CA",
  email: "jeffw3558@berkeley.edu",
  // Files in /public are served from the site root — reference them with a
  // leading "/" and no "public" prefix.
  resumeUrl: "/Jeffrey_Wang_Resume.pdf",

  // ---- About & Education ---------------------------------------------------
  about: {
    // Drop your portrait into /public (e.g. public/profile.jpg) and change
    // this to "/profile.jpg". Leave as null to show the placeholder card.
    photo: "/jeff_portfolio.jpg",
    bio: [
      "Hello there! My name is Jeff. I study at UC Berkeley, where I am pursuing a B.A. in Data Science and Economics.",
      "I am interested in software engineering, distributed systems, and cryptography!",
    ],
  },

  // ---- Education -----------------------------------------------------------
  education: {
    schools: [
      {
        school: "University of California, Berkeley",
        degree: "B.A. in Data Science & Economics",
        period: "2023 — 2027",
        details:
          "go bears!",
      },
      {
        school: "Diamond Bar High School",
        period: "2019 — 2023",
        details: "co'23 vice president",
        degree: "High School Diploma"
      },
    ],
    // Each entry renders as "CODE — Name". Codes below are standard Berkeley
    // numbers — double-check they match the courses you actually took.
    coursework: [
      { code: "CS 61A", name: "Structure and Interpretation of Computer Programs" },
      { code: "CS 61B", name: "Data Structures & Algorithms" },
      { code: "CS 70", name: "Discrete Math & Probability Theory" },
      { code: "CS 188", name: "Introduction to Artificial Intelligence" },
      { code: "CS 189", name: "Intro to Machine Learning" },
      { code: "DATA 8", name: "Foundations of Data Science" },
      { code: "DATA 100", name: "Principles of Data Science" },
      { code: "DATA C104", name: "Human Contexts and Ethics of Data" },
      { code: "STAT 134", name: "Concepts of Probability" },
      { code: "STAT 144", name: "Data Mining and Analytics" },
      { code: "MATH 54", name: "Linear Algebra" },
      { code: "MATH 53", name: "Multivariable Calculus" },
    ],
    clubs: [
      {
        name: "Taiwanese American Student Association",
        role: "Senior Advisor",
        period: "2025 — Present",
        description: "sp25: treasurer intern, fa25: fam head, sp26: internal vice president",
      },
      {
        name: "SBC Strategy Consulting",
        role: "Senior Consultant",
        period: "2025 — Present",
        description: "clients: adidas basketball, cme group",
      },
      {
        name: "Sigma Nu Fraternity",
        role: "Beta Psi Chapter",
        period: "2026 — Present",
        description: "-1769",
      },
      {
        name: "Berkeley Residential Life",
        role: "Resident Assistant",
        period: "2024 — 2026",
        description: "positions: blue ra, gold ra; unit 1 deutsch",
      },
     
    ],
  },

  // ---- Experience (most recent first) --------------------------------------
  experience: [
    {
      company: "CME Group",
      url: "https://www.cmegroup.com",
      role: "Artificial Intelligence Research Intern",
      period: "Aug 2025 — May 2026",
      location: "Chicago, IL",
      highlights: [
        "Designed and presented a 'Fantasy Futures' product concept for ESPN and CME Group by scraping market data and designing an educational UX to engage Gen Z/Millennial users.",
        "Conducted quantitative and qualitative research on fantasy and sports-betting partners (ESPN Fantasy, ESPN BET, FanDuel, Dream11), building revenue models, risk assessments, and partnership playbooks to inform CME’s retail strategy.",
      ],
    },
    {
      company: "Broctagon Fintech Group",
      url: "https://www.broctagon.com",
      role: "Software Development Intern",
      period: "May 2025 — July 2025",
      location: "Singapore",
      highlights: [
        "Built a Python-based testing framework for evaluating Amazon Bedrock LLMs (Claude) across financial NLP tasks; implemented dynamic prompt generation, structured output parsing, and automated failure logging",
        "Wrote modular call functions to transmit real-time data to Bedrock models, integrating robust error handling, retry logic, and streaming response support to ensure low-latency performance within a FastAPI backend",
        "Compared Bedrock LLMs through custom benchmarks and prompt tuning, evaluating performance metrics (accuracy, cost, stability) to guide model selection for regulatory and client-facing use cases.",
      ],
    },
    {
      company: "Propulsion AI - Berkeley SkyDeck",
      role: "Backend Developer",
      period: "May 2024 — Aug 2024",
      location: "Berkeley, CA",
      highlights: [
        "Integrated GROBID and LLMs within a FastAPI framework to enhance PDF processing, providing highly structured text that improved the LLM’s overall accuracy and response quality.",
        "Wrote a Python call function to send real-time data to language models (LLMs). Implemented dynamic request construction, robust error handling, and response parsing to ensure efficient, real-time data processing and integration into the application.",
      ],
    },
  ],

  // ---- Projects ------------------------------------------------------------
  projects: [
    {
      name: "Alumni Directory",
      description:
        "Architected a feature-driven graph engine that renders a student org's cabinet as an interactive big/little lineage map, letting users rebuild the tree across 6 organizing features (big/little, position, major, intern class, class year) from a single selector. Modeled a self-referential SQLAlchemy schema with a generic feature-serialization layer powering a Cytoscape.js + dagre top-down visualization with hover-to-trace lineage, live filtering, and click-through member profiles. Shipped a no-code admin CMS so non-technical officers manage 100% of member data with cycle-detection safeguards, backed by a 43-case pytest suite and deployed to production on UC Berkeley OCF.",
      tech: ["Python", "Flask", "SQLAlchemy","JavaScript", "Cytoscape.js", "Tailwind CSS", "pytest","Alpine.js"],
      github: "https://github.com/tasa-berkeley/tasa_website",
      demo: "https://tasa.studentorg.berkeley.edu/alumni",
    },
    {
      name: "Dynamic Social Recovery Protocol",
      description:
        "Engineered a zero-database wallet recovery smart contract storing threshold-encrypted guardian payloads directly on-chain. Integrated ZK-Email TypeScript SDK to validate email DKIM signatures on-chain, eliminating centralized databases.Implemented 48-hour timelock queue using Foundry fuzzing, achieving 100% test coverage across 50k+ simulated attacks",
      tech: ["Solidity", "Foundry", "Typescript", "Node.js", "ZK-Email", "Lit Protocol"],
      github: "https://github.com/jeffw3558/Dynamic-Social-Recovery-Protocol",
    },
    {
      name: "Cloud Native Video Processing & Streaming Platform",
      description:
        "Engineered asynchronous FFmpeg transcoding pipeline using GCP Pub/Sub, cutting video processing latency by 40%. Developed Next.js and Firebase serverless API to stream GCS video assets with sub-200ms latency. Implemented Firebase Auth and Cloud Run service isolation to block 100% of unauthorized upload requests",
      tech: ["Typescript", "Next.js", "Firebase", "Docker", "FFmpeg", "GCP Pub/Sub"],
      github: "https://github.com/jeffw3558/youtube-streaming-platform",
      demo: "google.com",
    },
  ],

  // ---- Blog topics ---------------------------------------------------------
  // These fill the blog's topic filter. Add one here to start a new topic.
  topics: [
    { label: "misc" },
    { label: "tech" },
    { label: "blockchain" },
  ],

  // ---- Socials -------------------------------------------------------------
  socials: [
    {
      label: "GitHub",
      href: "https://github.com/jeffw3558",
      icon: "github",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/jeffreywangg",
      icon: "linkedin",
    },
    {
      label: "Email",
      href: "mailto:jeffw3558@berkeley.edu",
      icon: "mail",
    },
  ],
};
