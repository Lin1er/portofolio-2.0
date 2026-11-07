// Copy for the homepage (brutalist v4 design). Components read every string
// from here; lists that already exist elsewhere (projects, experiences,
// socials) are referenced by title instead of being duplicated.

export interface HomeStat {
  value: string;
  label: string;
  highlight?: boolean;
}

export interface HomeNote {
  title: string;
  body: string;
}

export interface HomeTool {
  name: string;
  category: string;
  highlight?: boolean;
}

export const homeContent = {
  topbar: {
    logo: "LIN1ER",
    role: "Backend + AI Engineer",
    location: "Yogyakarta — 7°47′S 110°22′E",
    status: "Open to work",
    menu: "Menu",
  },

  hero: {
    nameMain: "ULINUH",
    nameAccent: "A",
    index: "[00] — Who",
    headline: "I build backends that hold up — and contracts that have to.",
    body: "Backend AI engineering intern at FlyRank AI. Freelance full-stack since 2023. On the side: smart contracts in Rust, Solidity and Move, plus the self-hosted infra that runs it all. IT student at Universitas Gadjah Mada.",
    photo: "/assets/herog.jpg",
    photoCaption: "Fig. 01 — The author",
    primaryCta: { label: "See the work", href: "#projects" },
    secondaryCta: { label: "Résumé.pdf" },
  },

  stats: [
    { value: "03+", label: "Years shipping for clients" },
    { value: "1K+", label: "Event users on my backend" },
    { value: "220", label: "Tests on one codebase", highlight: true },
    { value: "04", label: "Backend / AI / Web3 / Infra" },
  ] satisfies HomeStat[],

  ticker: [
    "Backend",
    "AI",
    "Web3",
    "Infra",
    "FlyRank AI",
    "Freelance since 2023",
    "1,000+ event users",
    "220 tests",
  ],

  log: {
    index: "[01] — Changelog",
    title: "LOG.",
    note: "Newest first",
    columns: { when: "When", role: "Role", where: "Where" },
    // Titles from `experiences`, in display order.
    entries: [
      "Backend AI Engineering Intern",
      "Smart Contract Engineer (Soroban)",
      "Freelance Full-Stack Developer",
      "Workshop Instructor - SUI Move",
      "Bachelor of Information Technology",
    ],
    more: { label: "Full history", href: "/experiences" },
  },

  work: {
    index: "[02] — Selected builds",
    title: "SHIPPED.",
    note: "Hover a row",
    // Titles from `projects`, in display order: backend & AI first.
    entries: [
      "Technocorner",
      "ClearContract",
      "Tove Heritage",
      "RoastWager",
      "SuiStorage AI",
      "Sterish",
      "FindIT",
    ],
    alsoLabel: "Also",
    also: "FlyRank AI — backend AI (2026 → now)  /  Freelance clients since 2023",
    disclaimer: "On-chain work: testnet, for now.",
    more: { label: "All projects", href: "/projects" },
    categoryLabels: {
      backend: "Backend",
      frontend: "Frontend",
      fullstack: "Full-stack",
      web3: "Web3",
      other: "Other",
    } as Record<string, string>,
  },

  manifesto: {
    index: "[03] — Manifesto",
    text: "I like systems where getting it wrong is expensive — APIs under load, AI pipelines, and money on-chain.",
    notes: [
      {
        title: "Spec first",
        body: "Invariants and edge cases on paper before any code.",
      },
      {
        title: "Break it myself",
        body: "Self-audited my own Soroban workspace: 2 HIGH + 5 MEDIUM fixed, each with a regression test.",
      },
      {
        title: "Own the whole stack",
        body: "APIs, indexers, SDKs and the servers they run on — my own hardware, my own on-call.",
      },
      {
        title: "Still learning",
        body: "The on-chain work is testnet so far. The tests are there for when it isn’t.",
      },
    ] satisfies HomeNote[],
  },

  tools: {
    index: "[04] — Stack",
    title: "TOOLS.",
    note: "No logos, just names",
    items: [
      { name: "Node.js / Bun", category: "Backend", highlight: true },
      { name: "Python / Go", category: "Backend" },
      { name: "Hono", category: "Backend" },
      { name: "Postgres", category: "Data" },
      { name: "TypeScript", category: "Lang" },
      { name: "Next.js", category: "Frontend" },
      { name: "Docker", category: "Infra" },
      { name: "Caddy + CF Tunnel", category: "Infra" },
      { name: "Rust", category: "Lang" },
      { name: "Solidity", category: "Contracts" },
      { name: "Soroban", category: "Contracts", highlight: true },
      { name: "Sui Move", category: "Contracts" },
      { name: "Foundry", category: "Tooling" },
      { name: "Anchor", category: "Tooling" },
      { name: "Stellar SDK", category: "Tooling" },
      { name: "viem / wagmi", category: "Client" },
    ] satisfies HomeTool[],
  },

  contact: {
    index: "[05] — Contact",
    headline: "SAY HI.",
    hoverHeadline: "HIRE ME.",
    emailLabel: "Email — replies within a day",
    form: {
      title: "Or drop a message here",
      name: { label: "Name", placeholder: "Your name" },
      email: { label: "Email", placeholder: "you@company.com" },
      message: { label: "Message", placeholder: "What are we building?" },
      submit: "Send message",
      sending: "Sending…",
      success: "Message sent successfully. I'll get back to you soon.",
      error: "Failed to send message. Try again, or email me directly.",
    },
  },

  footer: {
    builtIn: "Built in Yogyakarta — deployed on my own hardware",
    backToTop: "Back to top",
  },

  intro: {
    tag: "[ Booting portfolio.wasm ]",
    version: "V4 — 2026",
    name: "LIN1ER",
    // Caption shown while the counter is below each threshold (percent).
    captions: [
      { until: 35, text: "Compiling…" },
      { until: 75, text: "Spinning up API / AI / chain…" },
      { until: 100, text: "Running 220 tests…" },
      { until: Infinity, text: "220 / 220 tests passed." },
    ],
    greetings: ["HALO.", "HELLO."],
    skip: "Skip",
  },
};
