import type { Metadata } from "next";
import { ExperiencesPageContent } from "./experiences-content";

export const metadata: Metadata = {
  title: "Experiences",
  description:
    "My journey as a developer - education, work experience, achievements, and milestones.",
};

export default function ExperiencesPage() {
  return <ExperiencesPageContent />;
}
