// Site Configuration
export const siteConfig = {
  name: "M. Ulinuha As Shiddiqy",
  title: "M. Ulinuha As Shiddiqy | Fullstack Developer & Web3 Enthusiast",
  description:
    "Currently pursuing a Bachelor's degree in Information Technology with a deep interest in software development and Web3 ecosystems. Dedicated to transforming ideas into digital solutions with hands-on experience in Laravel, React, and blockchain development.",
  url: "https://ulinuha.dev", // Change to your actual domain
  ogImage: "/og-image.png",
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
