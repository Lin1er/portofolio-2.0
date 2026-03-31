export interface Testimonial {
  name: string;
  role: string;
  company: string;
  image?: string;
  content: string;
  rating: number; // 1-5
}

export const testimonials: Testimonial[] = [
  {
    name: "Workshop Participant",
    role: "Developer",
    company: "SUI Move Workshop",
    content:
      "The SUI Move workshop was incredibly well-organized. Ulinuha explained complex blockchain concepts in a way that was easy to understand. Highly recommended for anyone looking to get into Web3 development!",
    rating: 5,
  },
  {
    name: "Client Project",
    role: "School Administrator",
    company: "Pondok Darussalamah",
    content:
      "The management system developed for our Islamic boarding school has significantly improved our operational efficiency. The student permit tracking and parent notification features work flawlessly.",
    rating: 5,
  },
  {
    name: "Team Member",
    role: "Frontend Developer",
    company: "Technocorner UGM",
    content:
      "Working with Ulinuha on the Technocorner backend was a great experience. His code is clean, well-documented, and the API design made frontend integration smooth and straightforward.",
    rating: 5,
  },
];
