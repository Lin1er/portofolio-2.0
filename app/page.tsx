import { Topbar } from "@/components/layout/topbar";
import { HeroSection } from "@/components/sections/hero";
import { ExperienceSection } from "@/components/sections/experience";
import { ProjectsSection } from "@/components/sections/projects";
import { AboutSection } from "@/components/sections/about";
import { SkillsSection } from "@/components/sections/skills";
import { ContactSection } from "@/components/sections/contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-concrete text-ink">
      <Topbar />
      <HeroSection />
      <ExperienceSection />
      <ProjectsSection />
      <AboutSection />
      <SkillsSection />
      <ContactSection />
    </main>
  );
}
