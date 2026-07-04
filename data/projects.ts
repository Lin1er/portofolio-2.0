export interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  github?: string;
  live?: string;
  featured?: boolean;
  status: "completed" | "in-progress" | "on-hold";
  category: "backend" | "frontend" | "fullstack" | "web3" | "other";
}

export const projectCategories = [
  { id: "all", label: "All Projects" },
  { id: "backend", label: "Backend" },
  { id: "frontend", label: "Frontend" },
  { id: "fullstack", label: "Full-Stack" },
  { id: "web3", label: "Web3" },
  { id: "other", label: "Other" },
] as const;

export const projects: Project[] = [
  {
    title: "RoastWager",
    description:
      "Built a full-stack prediction and opinion market dApp on Monad with an end-to-end on-chain/off-chain architecture. Implemented smart contract flows (create, vote, resolve, claim), an event-driven indexer, wallet integration, and optimistic UI patterns for fast user interactions.",
    image: "/assets/roastwager.jpeg",
    tags: [
      "Solidity",
      "Foundry",
      "Next.js",
      "TypeScript",
      "Hono",
      "Supabase",
      "wagmi",
      "RainbowKit",
      "viem",
    ],
    github: "https://github.com/Lin1er/RoastWager",
    live: "https://roast-wager.vercel.app",
    featured: true,
    status: "completed",
    category: "web3",
  },

  {
    title: "Wall of 0gents",
    description:
      "Contributed to an AI-agent financialization platform on 0G Mainnet where intelligent NFTs can be fractionalized into ERC-20 shares and generate inference revenue. Worked on backend services and Solidity smart contracts, achieving 99/99 passing test cases.",
    image: "/assets/wall-of-0gents.png",
    tags: [
      "Solidity",
      "0G Chain",
      "ERC-7857",
      "x402",
      "Node.js",
      "TypeScript",
      "Smart Contracts",
      "Foundry",
    ],
    github: "https://github.com/Lexirieru/wall-of-0gents",
    live: "https://wall-of-0gents.vercel.app",
    featured: true,
    status: "completed",
    category: "web3",
  },

  {
    title: "Tredie",
    description:
      "Built backend services for a Solana-based perpetual market protocol where new markets auto-spawn from trending topics on X and Telegram. Implemented trend polling pipelines, automated market creation, transaction builders, and webhook indexers for decoding Anchor events.",
    image: "/assets/tredie.png",
    tags: [
      "Solana",
      "Rust",
      "Anchor",
      "Node.js",
      "TypeScript",
      "Express",
      "Privy",
      "Helius",
    ],
    github: "https://github.com/AncungAulia/tredie",
    live: "https://tredie.vercel.app",
    featured: true,
    status: "completed",
    category: "web3",
  },

  {
    title: "SuiStorage AI",
    description:
      "Built a verifiable marketplace for AI training data on Sui — dataset quality is cryptographically attested inside a Nautilus TEE, access is enforced by Move smart contracts, and files live on Walrus decentralized storage. Live on Sui testnet with seeded datasets and a working end-to-end purchase flow.",
    image: "/assets/suistorage.jpg",
    tags: [
      "Sui",
      "Move",
      "Nautilus TEE",
      "Walrus",
      "Next.js",
      "TypeScript",
    ],
    featured: true,
    status: "completed",
    category: "web3",
  },

  {
    title: "Tends",
    description:
      "Contributed to an AI-agent-managed real-world-asset portfolio platform on Mantle — users deposit and an autonomous agent rebalances RWA portfolios. Shipped as a live MVP with deployed contracts on Mantle Sepolia and an agent-driven trading backend.",
    image: "/assets/tends-rwa.jpg",
    tags: [
      "Mantle",
      "Solidity",
      "AI Agents",
      "Next.js",
      "TypeScript",
      "Foundry",
    ],
    github: "https://github.com/AncungAulia/tends",
    live: "https://tends.fun",
    featured: true,
    status: "completed",
    category: "web3",
  },

  {
    title: "ClearContract",
    description:
      "Built an AI-powered legal-tech platform that transforms complex contracts into simplified insights. Implemented PDF parsing, bilingual support (EN/ID), and LLM-based clause analysis to identify hidden risks and contract red flags.",
    image: "/assets/clearcontract.png",
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Google Gemini API",
      "shadcn/ui",
      "PDF.js",
    ],
    github: "https://github.com/lin1er/Contract-Analyzer",
    live: "https://clearcontract-safety.vercel.app",
    featured: true,
    status: "completed",
    category: "fullstack",
  },

  {
    title: "Technocorner",
    description:
      "Built backend systems for a national-scale technology event platform serving 1000+ participants. Developed scalable APIs for registration, team management, and competition workflows with optimized database performance during traffic spikes.",
    image: "/assets/technocorner.png",
    tags: [
      "Node.js",
      "Bun",
      "TypeScript",
      "Elysia.js",
      "PostgreSQL",
      "JWT",
      "REST API",
    ],
    live: "https://technocorner.id",
    featured: true,
    status: "completed",
    category: "backend",
  },

  {
    title: "FindIT",
    description:
      "Developed backend systems for UGM’s flagship IT competition platform, including authentication, submission workflows, and judging infrastructure. Optimized database queries to improve API performance and platform responsiveness.",
    image: "/assets/find-it.png",
    tags: [
      "Node.js",
      "TypeScript",
      "Express",
      "PostgreSQL",
      "JWT",
      "REST API",
    ],
    live: "https://find-it.id",
    featured: true,
    status: "completed",
    category: "backend",
  },

  {
    title: "GW Platform",
    description:
      "Building a self-hosted Google Workspace management platform: TOTP MFA, JWT auth, role-based access control, audit logging, and a pluggable directory-engine abstraction over the Google Admin API. Deployed on a homeserver with Docker Compose, Caddy, and automated backups.",
    image: "/assets/gw-platform.jpg",
    tags: [
      "FastAPI",
      "Python",
      "PostgreSQL",
      "Next.js",
      "Docker",
      "RBAC",
    ],
    featured: true,
    status: "in-progress",
    category: "fullstack",
  },

  {
    title: "Owlighting Garage",
    description:
      "Designed and developed a modern automotive service website with interactive product showcases, WhatsApp booking integration, and mobile-first performance optimization.",
    image:
      "https://github.com/Lin1er/owlighting-garage/blob/main/public/screenshoot.png?raw=true",
    tags: [
      "Next.js 16",
      "TypeScript",
      "React 19",
      "Framer Motion",
      "TailwindCSS",
      "Vercel",
    ],
    github: "https://github.com/Lin1er/owlighting-garage",
    live: "https://owlighting-garage.vercel.app",
    featured: true,
    status: "completed",
    category: "frontend",
  },

  {
    title: "ProdBooster",
    description:
      "Building a terminal-native productivity system for keyboard-first developers, featuring task management, quick notes, calendar utilities, and SQLite persistence in a distraction-free TUI experience.",
    image:
      "https://github.com/Lin1er/Productivity-Booster/blob/main/public/screenshoot.png?raw=true",
    tags: ["Go", "Bubble Tea", "SQLite", "TUI", "CLI"],
    github: "https://github.com/Lin1er/Productivity-Booster",
    featured: true,
    status: "in-progress",
    category: "other",
  },

  {
    title: "FT-VISION",
    description:
      "Building a privacy-first room-occupancy detection system for co-working spaces: YOLOv8 person detection over CCTV or webcam feeds with rolling-median smoothing and per-zone occupancy classification. Privacy by design — people are blurred in every preview and raw frames are never stored.",
    image: "/assets/ft-vision.jpg",
    tags: [
      "Python",
      "YOLOv8",
      "OpenCV",
      "Computer Vision",
    ],
    featured: false,
    status: "in-progress",
    category: "other",
  },

  {
    title: "Boarding School Management System",
    description:
      "Built a full-stack boarding school management platform supporting 200+ students with QR-based permissions, role-based access control, and parent-facing notifications to streamline operational workflows.",
    image:
      "https://github.com/Lin1er/metadata/blob/master/pictures/screenshoot.png?raw=true",
    tags: [
      "Laravel 11",
      "PHP",
      "MySQL",
      "Redis",
      "Docker",
      "TailwindCSS",
      "Android App",
    ],
    featured: false,
    status: "in-progress",
    category: "fullstack",
  },

  {
    title: "eLibrary",
    description:
      "Built a digital library management platform featuring catalog management, barcode-based borrowing, overdue notifications, and role-based access control for administrators, staff, and members.",
    image:
      "https://github.com/Lin1er/metadata/blob/master/pictures/screenshoot-Elibrary.png?raw=true",
    tags: [
      "Laravel 11",
      "MySQL",
      "TailwindCSS",
      "JavaScript",
      "Vite",
    ],
    github: "https://github.com/Lin1er/Elibrary",
    featured: false,
    status: "completed",
    category: "fullstack",
  },

  {
    title: "Portfolio Website",
    description:
      "Personal portfolio built with modern web technologies to showcase projects, technical experience, and engineering journey through a responsive and performance-focused interface.",
    image: "/assets/screenshoot.png",
    tags: [
      "Next.js",
      "Framer Motion",
      "TailwindCSS",
      "TypeScript",
    ],
    github: "https://github.com/Lin1er/portofolio-2.0",
    live: "https://ulinuha.vercel.app",
    featured: false,
    status: "completed",
    category: "frontend",
  },
];
