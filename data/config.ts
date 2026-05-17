// Site Configuration
export const siteConfig = {
  name: "M. Ulinuha As Shiddiqy",
  title: "M. Ulinuha As Shiddiqy – Fullstack Developer & Web3 Enthusiast",
  description:
    "M. Ulinuha As Shiddiqy — Fullstack & Web3 Backend Developer building scalable APIs, smart contracts, and dApps across Solana, EVM & 0G. Versatile across the modern stack: TypeScript, Go, Rust, Python, Node.js, Next.js, Laravel, Solidity & SUI Move.",
  url: "https://jameshub.fun", // primary canonical domain
  ogImage: "/opengraph-image", // generated dynamically — see app/opengraph-image.tsx
  keywords: [
    "developer",
    "fullstack developer",
    "web3 developer",
    "blockchain",
    "react developer",
    "laravel developer",
    "nextjs",
    "portfolio",
    "software engineer",
    "frontend developer",
    "backend developer",
    "iot developer",
    "machine learning",
    "golang developer",
    "rust developer",
    "python developer",
    "typescript developer",
    "node.js developer",
    "smart contract developer",
    "dapp developer",
    "web3 backend developer",
    "solana developer",
    "blockchain backend",
    "indonesia",
    "sui move",
    "ugm",
    "gadjah mada",
  ],
  author: {
    name: "M. Ulinuha As Shiddiqy",
    twitter: "@ulinuha",
    github: "Lin1er",
  },
  theme: {
    accentColor: "#6366f1",
    defaultMode: "dark" as const,
  },
  // Homepage limits
  homepage: {
    experiencesLimit: 3,
    projectsLimit: 6,
  },
};

// Animation Configuration
export const animationConfig = {
  preloaderDuration: 2000, // ms
  scrollRevealOffset: "-100px",
  staggerDelay: 0.1,
};
