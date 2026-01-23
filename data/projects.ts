export interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  github?: string;
  live?: string;
  featured?: boolean;
}

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
  // },
{
  title: "Owlighting Garage",
  description: "Modern automotive lighting service website featuring BILED retrofit, D2 laser projectors, and custom CNC headlight modifications. Built with interactive galleries, before/after comparison sliders, and booking system for car enthusiasts.",
  image: "https://github.com/Lin1er/owlighting-garage/blob/main/public/screenshoot.png?raw=true",
  tags: ["Next.js 16", "TypeScript", "React 19", "Framer Motion", "TailwindCSS", "Vercel"],
  github: "https://github.com/Lin1er/owlighting-garage",
  live:  "https://owlighting-garage.vercel.app",
  featured: true,
},
{
  title: "ProdBooster",
  description: "Terminal-based productivity app for developers who live in the terminal. Features task management, calendar events, and quick notes with SQLite persistence. Built with Bubble Tea TUI framework and designed to auto-launch on TTY login.",
  image: "https://github.com/Lin1er/Productivity-Booster/blob/main/public/screenshoot.png?raw=true",
  tags: ["Go", "Bubble Tea", "SQLite", "TUI", "CLI"],
  github: "https://github.com/Lin1er/Productivity-Booster",
  featured: true,
},
{
  title: "Pondok Darussalamah Management",
  description: "Comprehensive Islamic boarding school management system handling student permits, parent notifications, and security verification. Features role-based access (Admin, Mustahiq, Wali, Satpam), real-time photo uploads, and Docker deployment ready.",
  image: "https://github.com/Lin1er/metadata/blob/master/pictures/screenshoot.png?raw=true",
  tags: ["Laravel 11", "PHP", "MySQL", "Redis", "Docker", "TailwindCSS", "Android App"],
  featured: false,
},
{
  title: "eLibrary",
  description: "Digital library management system for efficient book cataloging, borrowing, and returns. Includes advanced search, overdue notifications, and multi-user support with role-based permissions for admins, staff, and members.",
  image: "https://github.com/Lin1er/metadata/blob/master/pictures/screenshoot-Elibrary.png?raw=true",
  tags: ["Laravel 11", "MySQL", "TailwindCSS", "JavaScript", "Vite"],
  github: "https://github.com/Lin1er/Elibrary",
  featured: false,
},
  {
    title: "Portfolio Website",
    description:
      "This very website you're looking at! Built with modern technologies.",
    image: "/assets/screenshoot.png",
    tags: ["Next.js", "Framer Motion", "TailwindCSS"],
    github: "https://github.com/yourusername/portfolio",
    live: "#",
    featured: false,
  },
];
