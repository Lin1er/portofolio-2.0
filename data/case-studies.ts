// Deep case studies for selected projects. Each entry is keyed to a project by
// `projectTitle` (must match a `Project.title`) and surfaced at /projects/<slug>.
// Content is sourced only from the project's own public repo + shipped app —
// no invented metrics, audits, or outcomes.

export interface CaseStudyArchitectureNode {
  label: string;
  tech: string;
  role: string;
}

export interface CaseStudyStackRow {
  layer: string;
  tech: string;
}

export interface CaseStudyLink {
  label: string;
  href: string;
}

export interface CaseStudy {
  slug: string;
  projectTitle: string;
  headline: string;
  summary: string;
  problem: string;
  build: string;
  architecture: CaseStudyArchitectureNode[];
  highlights: string[];
  stack: CaseStudyStackRow[];
  network?: string;
  contractAddress?: string;
  links: CaseStudyLink[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "roastwager",
    projectTitle: "RoastWager",
    headline: "A prediction market where the smart contract is the source of truth",
    summary:
      "RoastWager is a full-stack opinion-and-prediction market dApp on Monad. Users post an opinion, stake tokens on a side, and claim rewards once the market resolves — with the contract holding the truth and an event-driven backend keeping the UI fast and consistent.",
    problem:
      "A trustless prediction market has to keep the money and the outcome on-chain, but reading a chain directly from the browser is slow and inconsistent for a social feed. The challenge was to make create → vote → resolve → claim fully on-chain while still delivering an instant, feed-like experience.",
    build:
      "I split the system into three roles: the smart contract is the source of truth, the backend is the synchronization engine, and the frontend owns the user experience. An event-driven listener tails the contract's events on Monad and mirrors them into a database, so the UI reads a consistent API instead of querying the chain on every render.",
    architecture: [
      {
        label: "Smart contract",
        tech: "Solidity + Foundry",
        role: "Source of truth. Exposes createWager, vote, resolve, and claim, and emits WagerCreated / Voted / Resolved / Claimed events. Refunds automatically when one side has no bettors or both pools are equal.",
      },
      {
        label: "Backend listener",
        tech: "Node.js + Hono + viem + Supabase",
        role: "Synchronization engine. Reads Monad chain events, syncs them into Supabase, and serves a REST API to the frontend. Rate-limited per IP with an auto-reconnecting event listener.",
      },
      {
        label: "Frontend",
        tech: "Next.js + wagmi + RainbowKit",
        role: "User experience. Queries the backend API (not the chain) for UI consistency, with optimistic updates so pending posts appear immediately.",
      },
    ],
    highlights: [
      "IDs are scoped by contract address, so markets stay valid across contract migrations.",
      "Automatic refunds when a side has no bettors, or when both pools hold equal value.",
      "Optimistic UI — pending posts show up instantly, before the transaction confirms.",
      "XP / level system: +10 XP per vote, then +25 XP for winners and +5 XP for losers on resolution.",
      "Blind markets hide pool details while a market is still active.",
    ],
    stack: [
      { layer: "Smart contract", tech: "Solidity, Foundry" },
      { layer: "Backend", tech: "Node.js, Hono, Supabase, viem" },
      { layer: "Frontend", tech: "Next.js, wagmi, RainbowKit" },
      { layer: "Storage & infra", tech: "Supabase (PostgreSQL), Railway, Vercel, Pinata (optional images)" },
    ],
    network: "Monad Testnet",
    contractAddress: "0x09AcB861808f014673dAED424c1ACa4a9462559E",
    links: [
      { label: "Live app", href: "https://roast-wager.vercel.app" },
      { label: "Landing page", href: "https://landing-roast-wager.vercel.app" },
      { label: "Source code", href: "https://github.com/Lin1er/RoastWager" },
    ],
  },
];
