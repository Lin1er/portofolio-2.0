import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { SkillsSection } from "@/components/sections/skills";
import { ProjectsSection } from "@/components/sections/projects";
import { ExperienceSection } from "@/components/sections/experience";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { ContactSection } from "@/components/sections/contact";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { BackToTop } from "@/components/ui/back-to-top";

export default function Home() {
  return (
    <main className="min-h-screen noise">
      <ScrollProgress />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ExperienceSection />
      {/* <TestimonialsSection /> */}
      <ContactSection />
      <Footer />
      <BackToTop />
    </main>
  );
}
