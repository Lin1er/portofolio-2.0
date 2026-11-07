export interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  github?: string;
  live?: string;
  featured?: boolean;
  category: "backend" | "frontend" | "fullstack" | "web3" | "other";
  /** Slug of a deep case study at /projects/<slug>, if one exists. */
  caseStudySlug?: string;
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
    title: "Tove Heritage",
    description:
      "Sole author of the Soroban contract workspace behind a platform for fractional ownership of artworks on Stellar. Eleven Rust contracts: a SEP-41 fraction token, a book-build offering escrow, a passkey smart wallet built on OpenZeppelin's CustomAccountInterface with secp256r1 and ed25519 verifiers, KYC gating, an emergency freeze, and admin-gated upgradeability behind an invariant gate. Nine contracts deployed to Stellar testnet, settling in Circle's USDC Stellar Asset Contract. 220 tests, plus CI that verifies canonical WASM determinism and runs an end-to-end smoke against testnet. I also self-audited the workspace and remediated two HIGH and five MEDIUM findings, each with its own regression test. Private repository — walkthrough on request.",
    image: "/assets/tove-heritage.jpg",
    tags: [
      "Stellar",
      "Soroban",
      "Rust",
      "SEP-41",
      "Passkey / WebAuthn",
      "OpenZeppelin",
      "USDC",
      "GitHub Actions",
    ],
    live: "https://toveheritage.org",
    featured: true,
    category: "web3",
  },

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
    category: "web3",
    caseStudySlug: "roastwager",
  },

  {
    title: "SuiStorage AI",
    description:
      "A verifiable marketplace for AI training data on Sui. Six Move modules — dataset, listing, license, access, attestation and admin — enforce who may read what, while dataset quality is cryptographically attested inside a Nautilus TEE and files live on Walrus decentralized storage. Live on Sui testnet with seeded datasets and a working end-to-end purchase flow.",
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
    category: "web3",
  },


  {
    title: "Sterish",
    description:
      "An audited skill marketplace for AI agents on Stellar — an on-chain registry, a multi-stage audit pipeline, and pay-per-use licensing. I built the off-chain half: replaced the mock chain client with real Soroban reads against the registry, wrote an event indexer and a REST API against a frozen spec, and implemented the x402 pay-per-use flow end to end — 402, pay in USDC, license minted, 200. I also own the deployment: Docker Compose, automatic TLS through Caddy, and a Cloudflare Tunnel onto my own hardware. 42 tests, ten of them against live testnet. Contracts written by a teammate.",
    image: "/assets/sterish.jpg",
    tags: [
      "Stellar",
      "Soroban",
      "Python",
      "Rust",
      "x402",
      "USDC",
      "Docker",
      "Caddy",
    ],
    github: "https://github.com/Lin1er/sterish",
    live: "https://sterish.xyz",
    featured: true,
    category: "web3",
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
    category: "backend",
  },

  {
    title: "SoroSense",
    description:
      "A non-custodial stablecoin yield optimizer on Stellar that steers deposits toward audited pools, with a keeper that can freeze an unsafe one. I wrote the Soroban vault contract — deposits and share accounting, NAV views, keeper-driven allocation into yield pools, freeze and pause guards, consent gating, and admin-governed upgradeability — plus the deploy and testnet faucet scripts. Share-inflation is blocked by a virtual offset and covered by its own test. Vault live on Stellar testnet; frontend and backend by teammates. Built for the APAC Stellar Hackathon (DeFi & Ecosystem Composability track).",
    image: "/assets/sorosense.png",
    tags: [
      "Stellar",
      "Soroban",
      "Rust",
      "TypeScript",
    ],
    github: "https://github.com/AncungAulia/sorosense",
    live: "https://app.sorosense.xyz",
    featured: true,
    category: "web3",
  },

  {
    title: "HELM",
    description:
      "An autonomous agent wallet on Sui: grant an AI agent a capped budget, a scope and an expiry, and it trades against real DeepBook orders without per-action approval — bounded by an on-chain Move policy and revocable at any time. Built as three Move packages, including sui-session-keys, a reusable delegated-authority primitive that stands on its own with a TypeScript SDK and two independent consumer examples. Built for Sui Overflow 2026.",
    image: "/assets/helm.png",
    tags: [
      "Sui",
      "Move",
      "DeepBook",
      "Session Keys",
      "Walrus",
      "TypeScript",
    ],
    featured: true,
    category: "web3",
  },

  {
    title: "Sterun",
    description:
      "Race records on Stellar that cannot be sold or handed on — a finish is minted as a non-transferable on-chain record and stays verifiable by anyone, without a wallet. I am the sole author of @sterun/sdk, a TypeScript client over @stellar/stellar-sdk that ships a frozen RaceRecord JSON Schema and needs no signer on the read path. I also wrote most of the backend: a Soroban RPC keeper, an event indexer that survives a rebuild, participant and file routes, and the production deployment. Contracts written by a teammate.",
    image: "/assets/sterun.jpg",
    tags: [
      "Stellar",
      "Stellar SDK",
      "TypeScript",
      "Fastify",
      "PostgreSQL",
      "Docker",
    ],
    github: "https://github.com/AncungAulia/sterun",
    live: "https://sterun.xyz",
    featured: true,
    category: "web3",
  },

  {
    title: "Tredie",
    description:
      "A Solana-based perpetual market protocol where new markets auto-spawn from trending topics on X and Telegram. I worked on stabilising the platform after the backend moved to self-hosting: fixed a Bun idle timeout that was cutting off long admin operations, hardened the admin proxy against non-JSON responses, repaired topic-market rendering and image fallbacks, and removed the access-code gate.",
    image: "/assets/tredie.png",
    tags: [
      "Solana",
      "Node.js",
      "TypeScript",
      "Bun",
      "Express",
      "Privy",
      "Helius",
    ],
    github: "https://github.com/AncungAulia/tredie",
    live: "https://tredie.vercel.app",
    featured: true,
    category: "web3",
  },

  {
    title: "Wall of 0gents",
    description:
      "An AI-agent financialization platform on 0G where intelligent NFTs can be fractionalized into ERC-20 shares and generate inference revenue. I worked on the backend and on mainnet readiness: environment and secret hygiene, guard rails for ephemeral data paths, coherence checks for 0G-Compute, and pinning verified on-chain compute providers. Smart contracts by a teammate.",
    image: "/assets/wall-of-0gents.png",
    tags: [
      "0G Chain",
      "ERC-7857",
      "x402",
      "Node.js",
      "TypeScript",
      "Ops",
    ],
    github: "https://github.com/Lexirieru/wall-of-0gents",
    live: "https://wall-of-0gents.vercel.app",
    featured: true,
    category: "web3",
  },

  {
    title: "Tends",
    description:
      "An AI-agent-managed real-world-asset portfolio platform on Mantle, where users deposit and an autonomous agent rebalances the portfolio. I worked on the chain and agent plumbing: batched contract reads through Multicall3 with an RPC fallback to cut throttling, routed the LLM gateway onto OpenRouter, and fixed deployment sizing on Fly.io after the API was OOM-killed.",
    image: "/assets/tends-rwa.jpg",
    tags: [
      "Mantle",
      "Solidity",
      "AI Agents",
      "Multicall3",
      "TypeScript",
      "Fly.io",
    ],
    github: "https://github.com/AncungAulia/tends",
    live: "https://tends.fun",
    featured: true,
    category: "web3",
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
    category: "backend",
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
    live: "https://jameshub.fun",
    featured: false,
    category: "frontend",
  },
];
