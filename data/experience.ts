export interface Experience {
  type: "education" | "work" | "achievement";
  title: string;
  organization: string;
  period: string;
  description: string;
  icon: "graduation" | "briefcase" | "award" | "calendar";
}

export const experiences: Experience[] = [
  {
    type: "education",
    title: "Information Technology",
    organization: "DTETI - Universitas Gadjah Mada",
    period: "2025 - Present",
    description:
      "Currently in my first year, majoring in Information Technology at Department of Electrical Engineering and Information Technology. Focusing on software engineering while actively participating in tech communities.",
    icon: "graduation",
  },
  {
    type: "work",
    title: "Workshop Instructor - SUI Move",
    organization: "Tech Community",
    period: "2025",
    description:
      "Conducted a workshop teaching the fundamentals of SUI Move programming language and blockchain development on the SUI network.",
    icon: "award",
  },
  {
    type: "work",
    title: "Freelance Fullstack Developer",
    organization: "Self-employed",
    period: "2023 - Present",
    description:
      "Building web applications for various clients using modern technologies like React, Next.js, Node.js, and cloud services.",
    icon: "briefcase",
  },
  {
    type: "work",
    title: "Started Coding Journey",
    organization: "Self-taught",
    period: "2022",
    description:
      "Began learning web development through online resources, building small projects, and contributing to open source.",
    icon: "calendar",
  },
];
