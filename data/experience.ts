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
  // Education
    {
    type: "work",
    title: "Workshop Instructor - SUI Move",
    organization: "Tech Community",
    period: "2025",
    description:
      "Conducted a workshop teaching the fundamentals of SUI Move programming language and blockchain development on the SUI network.",
    icon: "briefcase",
    image: "/experiences/WorkShop-SUI.JPG",
  },
  {
    type: "education",
    title: "Bachelor of Information Technology",
    organization: "Universitas Gadjah Mada",
    period: "2025 - Present",
    description:
      "Currently pursuing a Bachelor's degree in Information Technology with focus on software development, backend systems, IoT, and decentralized technologies.",
    icon: "graduation",
  },
    {
    type: "achievement",
    title: "Silver Medal - NASFIA Research Competition",
    organization: "Indonesian Scientific Society",
    period: "2024",
    description:
      "Received a silver medal for innovative research demonstrating expertise in scientific research, IoT development (ESP32 & Arduino IDE), and critical thinking. 3-month competition.",
    icon: "award",
  },
  {
    type: "education",
    title: "Senior High School",
    organization: "MAN Insan Cendekia East Lampung",
    period: "2022 - 2025",
    description:
      "Graduated from one of Indonesia's top Islamic boarding schools with excellent academic achievements and active participation in various competitions and organizations.",
    icon: "graduation",
  },
  {
    type: "education",
    title: "Junior High School",
    organization: "Muhammadiyah Ahmad Dahlan Metro",
    period: "2019 - 2022",
    description:
      "Completed junior high school education while developing early interest in technology and programming.",
    icon: "graduation",
  },

  // Achievements

  {
    type: "achievement",
    title: "Second Champion - Computer Science",
    organization: "MIPA Expo - University of Lampung",
    period: "2023",
    description:
      "Won second place in a provincial-scale computer science competition, testing theoretical and practical understanding through problem-solving and critical thinking.",
    icon: "award",
  },


  // Work Experience
  {
    type: "work",
    title: "Freelance Fullstack Developer",
    organization: "Self-employed",
    period: "2023 - Present",
    description:
      "Designed and deployed full-stack web applications using Laravel, React, and Node.js. Built dormitory management system and e-library application for clients.",
    icon: "briefcase",
  },

  // Organizational Experience
  {
    type: "organization",
    title: "Batch Leader - Estersena (Batch 4)",
    organization: "MAN Insan Cendekia East Lampung",
    period: "2023 - 2025",
    description:
      "Led and coordinated more than 75 classmates in academic and non-academic activities. Acted as a communication bridge between internal students and external communities.",
    icon: "users",
  },
  {
    type: "organization",
    title: "Chairman of Commission A",
    organization: "Mahkamah Permusyawaratan Siswa (MPS)",
    period: "2023 - 2025",
    description:
      "Formulated and implemented commission work programs focusing on student welfare and aspirations at MAN Insan Cendekia East Lampung.",
    icon: "users",
  },
  {
    type: "organization",
    title: "Vice Pradana - Scouts",
    organization: "MAN Insan Cendekia East Lampung",
    period: "2023 - 2025",
    description:
      "Responsible for planning and implementing scouting programs, including field activities and training sessions.",
    icon: "users",
  },

  // Milestones
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
