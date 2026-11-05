// Site Configuration
export const siteConfig = {
  name: "M. Ulinuha As Shiddiqy",

  title:
    "M. Ulinuha As Shiddiqy – Backend + AI Engineer, Smart Contracts on Soroban · Solidity · Move",

  description:
    "Backend + AI engineer from Yogyakarta: backend AI intern at FlyRank AI, freelance full-stack since 2023, backend for a 1,000+ user national tech event — plus smart contracts in Rust on Soroban, Solidity on EVM, and Move on Sui, and the self-hosted infra that runs it all.",

  url: "https://jameshub.fun",

  ogImage: "/opengraph-image",

  keywords: [
    "M Ulinuha As Shiddiqy",
    "Ulinuha",
    "Soroban Smart Contract Developer",
    "Stellar Smart Contract Developer",
    "Rust Smart Contract Developer",
    "SEP-41",
    "Stellar Soroban Rust",
    "Web3 Backend Engineer",
    "Full Stack Engineer",
    "Backend Developer",
    "Web3 Developer",
    "Software Engineer",
    "Blockchain Developer",
    "Smart Contract Developer",
    "Solana Developer",
    "Stellar Developer",
    "Soroban Developer",
    "EVM Developer",
    "dApp Developer",
    "AI Engineer",
    "Backend Engineer",
    "TypeScript Developer",
    "Node.js Developer",
    "Next.js Developer",
    "Rust Developer",
    "Go Developer",
    "Python Developer",
    "Laravel Developer",
    "PostgreSQL",
    "Smart Contracts",
    "Blockchain Infrastructure",
    "SUI Move",
    "Solidity",
    "UGM",
    "Universitas Gadjah Mada",
    "Indonesia Developer",
  ],

  author: {
    name: "M. Ulinuha As Shiddiqy",
    twitter: "@ulinuha",
    github: "Lin1er",
  },

  theme: {
    accentColor: "#FF3D00",
    defaultMode: "light" as const,
  },

  homepage: {
    experiencesLimit: 5,
    projectsLimit: 7,
  },
};

// Animation Configuration
export const animationConfig = {
  // Longest possible intro (slow load hitting maxMs): used as an upper bound.
  preloaderDuration: 10400,
  // Intro timeline (ms). The counter follows the real page load but always
  // runs at least `minMs` (fast loads still get the show) and gives up waiting
  // at `maxMs` (slow loads don't stall at 99%). Once ready it finishes to 100
  // over `finishMs`, then the curtain, each greeting, the last greeting's
  // hold, and the overlay lifting away.
  intro: {
    minMs: 2600,
    maxMs: 6000,
    finishMs: 1000,
    curtainMs: 750,
    greetingMs: 1100,
    holdMs: 1400,
    exitMs: 900,
  },
  scrollRevealOffset: "-100px",
  staggerDelay: 0.08,
};
