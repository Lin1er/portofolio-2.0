// Site Configuration
export const siteConfig = {
  name: "M. Ulinuha As Shidiqy",
  title: "M. Ulinuha As Shidiqy | Fullstack Developer & Web3 Enthusiast",
  description:
    "A passionate fullstack developer with 3+ years of experience building modern web applications. Currently exploring Web3 and blockchain technology. Based in Yogyakarta, Indonesia.",
  url: "https://ulinuha.dev", // Change to your actual domain
  ogImage: "/og-image.png",
  keywords: [
    "developer",
    "fullstack developer",
    "web3 developer",
    "blockchain",
    "react developer",
    "nextjs",
    "portfolio",
    "software engineer",
    "frontend developer",
    "backend developer",
    "yogyakarta",
    "indonesia",
    "sui move",
  ],
  author: {
    name: "M. Ulinuha As Shidiqy",
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
