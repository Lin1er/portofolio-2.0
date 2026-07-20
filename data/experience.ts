export interface Experience {
  type: "education" | "work" | "achievement" | "organization";
  title: string;
  organization: string;
  period: string;
  description: string;
  icon: "graduation" | "briefcase" | "award" | "calendar" | "users";
  image?: string; // Optional image URL
}

export const experiences: Experience[] = [
  // Work Experience
  {
    type: "work",
    title: "Backend AI Engineering Intern",
    organization: "FlyRank AI",
    period: "Jul 2026 - Present",
    description:
      "Selected for the Backend AI Engineering Cohort, focused on building backend AI systems, APIs, automation workflows, and real-world AI capstone projects.",
    icon: "briefcase",
  },

  {
    type: "work",
    title: "Freelance Full-Stack Developer",
    organization: "Self-employed",
    period: "2023 - Present",
    description:
      "Designed and developed full-stack web applications for clients using modern web technologies including React, Laravel, Node.js, and databases. Delivered scalable systems such as dormitory management platforms and digital library solutions.",
    icon: "briefcase",
  },

  {
    type: "work",
    title: "Workshop Instructor - SUI Move",
    organization: "Tech Community",
    period: "2025",
    description:
      "Led a technical workshop introducing SUI Move smart contract development, covering blockchain fundamentals, on-chain programming concepts, and practical development on the SUI ecosystem.",
    icon: "briefcase",
    image: "/experiences/WorkShop-SUI.JPG",
  },

  // Education
  {
    type: "education",
    title: "Bachelor of Information Technology",
    organization: "Universitas Gadjah Mada",
    period: "2025 - Present",
    description:
      "Pursuing a Bachelor's degree in Information Technology with interests in software engineering, backend systems, AI, Web3, and distributed technologies.",
    icon: "graduation",
  },

  {
    type: "education",
    title: "Senior High School",
    organization: "MAN Insan Cendekia East Lampung",
    period: "2022 - 2025",
    description:
      "Graduated from one of Indonesia’s selective boarding schools, actively participating in leadership, research, and technology competitions.",
    icon: "graduation",
  },

  // Achievements
  {
    type: "achievement",
    title: "Silver Medal - NASFIA Research Competition",
    organization: "Indonesian Scientific Society",
    period: "2024",
    description:
      "Awarded a silver medal for an applied research project involving IoT systems using ESP32 and Arduino, demonstrating problem-solving, research methodology, and technical implementation skills.",
    icon: "award",
  },

  {
    type: "achievement",
    title: "2nd Place - Computer Science Competition",
    organization: "MIPA Expo, University of Lampung",
    period: "2023",
    description:
      "Achieved second place in a provincial-level computer science competition focused on analytical problem-solving, algorithms, and computational thinking.",
    icon: "award",
  },

  // Organizational Experience
  {
    type: "organization",
    title: "Batch Leader - Estersena (Batch 4)",
    organization: "MAN Insan Cendekia East Lampung",
    period: "2023 - 2025",
    description:
      "Led and coordinated a cohort of 75+ students across academic and extracurricular activities while serving as a communication bridge between students and external stakeholders.",
    icon: "users",
  },

  {
    type: "organization",
    title: "Chairman of Commission A",
    organization: "Mahkamah Permusyawaratan Siswa (MPS)",
    period: "2023 - 2025",
    description:
      "Directed programs related to student welfare and advocacy, helping formulate initiatives and represent student aspirations institutionally.",
    icon: "users",
  },

  {
    type: "organization",
    title: "Vice Pradana - Scouts",
    organization: "MAN Insan Cendekia East Lampung",
    period: "2023 - 2025",
    description:
      "Coordinated scouting activities, leadership programs, and outdoor training while supporting event planning and execution.",
    icon: "users",
  },

  // Milestones
  {
    type: "work",
    title: "Started Software Development Journey",
    organization: "Self-Taught",
    period: "2022",
    description:
      "Began exploring software development through self-learning, building projects, experimenting with web technologies, and contributing to practical implementations.",
    icon: "calendar",
  },
];
