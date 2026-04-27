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
  // Example project (uncomment and customize to add your own projects)
  // {
  //   title: "DeFi Dashboard",
  //   description:
  //     "A comprehensive dashboard for tracking DeFi positions across multiple chains. Built with React, Next.js, and Web3 integrations.",
  //   image: "/projects/defi-dashboard.png",
  //   tags: ["Next.js", "TypeScript", "Web3", "TailwindCSS"],
  //   github: "https://github.com/yourusername/defi-dashboard",
  //   live: "https://defi-dashboard.vercel.app",
  //   featured: true,
  //   status: "completed",
  //   category: "web3",
  // },
  {
    title: "RoastWager - Full-Stack Web3 Developer",
    description:
      "Opinion + betting dApp built on Monad with a full on-chain/off-chain pipeline. Implemented smart contract flows (create, vote, resolve, claim), event-driven backend indexer, and a fast Next.js frontend with optimistic UI and wallet integration.",
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
    featured: true,
    status: "completed",
    category: "web3",
  },
  {
    title: "ClearContract - Full-Stack Developer",
    description:
      "AI-powered legal-tech platform that simplifies complex contracts into easy-to-understand insights. Built with Next.js and Google Gemini AI to automatically detect 'red flags' and hidden clauses. Features include PDF text extraction, dynamic bilingual support (EN/ID), and a responsive SaaS-grade UI.",
    image: "/assets/clearcontract.png", // Nanti sesuaikan sama nama file screenshot lo
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Google Gemini API",
      "shadcn/ui",
      "PDF.js",
    ],
    live: "https://clearcontract-safety.vercel.app", // Ganti pake link Vercel/Netlify lo
    featured: true,
    status: "completed",
    category: "fullstack",
  },
  {
    title: "Technocorner - Backend Developer",
    description:
      "National technology event platform serving 1000+ participants. Built scalable REST APIs handling user registration, team management, and competition data. Achieved 99.9% uptime during peak registration periods with optimized database queries.",
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
    title: "FindIT - Backend Developer",
    description:
      "Competition platform for UGM's flagship IT event. Developed secure authentication system, submission handling for 500+ teams, and real-time judging dashboard. Reduced API response time by 40% through query optimization.",
    image: "/assets/find-it.png",
    tags: ["Node.js", "TypeScript", "Express", "PostgreSQL", "JWT", "REST API"],
    live: "https://find-it.id",
    featured: true,
    status: "completed",
    category: "backend",
  },
  {
    title: "Owlighting Garage",
    description:
      "Modern automotive lighting service website with 50+ product showcases. Features interactive before/after comparison sliders, WhatsApp integration for bookings, and optimized for mobile-first experience with 95+ Lighthouse score.",
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
      "Terminal-based productivity app designed for keyboard-centric developers. Features task management, calendar sync, and quick notes with SQLite persistence. Auto-launches on TTY login for seamless workflow integration.",
    image:
      "https://github.com/Lin1er/Productivity-Booster/blob/main/public/screenshoot.png?raw=true",
    tags: ["Go", "Bubble Tea", "SQLite", "TUI", "CLI"],
    github: "https://github.com/Lin1er/Productivity-Booster",
    featured: true,
    status: "in-progress",
    category: "other",
  },
  {
    title: "Boarding School Management System",
    description:
      "Comprehensive boarding school system managing 200+ students. Features QR-based permit verification, real-time parent notifications, and role-based access for 4 user types. Reduced manual permit processing time by 80%.",
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
      "Digital library system with 1000+ book catalog, barcode scanning for quick checkout, and automated overdue notifications. Multi-user support with granular permissions for admins, staff, and 500+ registered members.",
    image:
      "https://github.com/Lin1er/metadata/blob/master/pictures/screenshoot-Elibrary.png?raw=true",
    tags: ["Laravel 11", "MySQL", "TailwindCSS", "JavaScript", "Vite"],
    github: "https://github.com/Lin1er/Elibrary",
    featured: false,
    status: "completed",
    category: "fullstack",
  },
  {
    title: "Portfolio Website",
    description:
      "This very website you're looking at! Built with modern technologies featuring smooth animations, dark/light mode, and responsive design.",
    image: "/assets/screenshoot.png",
    tags: ["Next.js", "Framer Motion", "TailwindCSS", "TypeScript"],
    github: "https://github.com/Lin1er/portofolio-2.0",
    live: "https://ulinuha.vercel.app",
    featured: false,
    status: "completed",
    category: "frontend",
  },
];
