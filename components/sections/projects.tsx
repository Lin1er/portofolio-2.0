"use client";

import { motion } from "framer-motion";
import { ProjectsGrid } from "@/components/ui/projects-grid";
import { Github, ArrowRight } from "lucide-react";
import Link from "next/link";
import { projects, siteConfig, socialLinks } from "@/data";

// Curated homepage slice: featured projects, capped by the config limit.
const featuredProjects = projects
  .filter((project) => project.featured)
  .slice(0, siteConfig.homepage.projectsLimit);

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-(--muted) max-w-2xl">
            A selection of projects I&apos;ve worked on. Each one taught me
            something new. Click any card to see the full details.
          </p>
        </motion.div>

        <ProjectsGrid items={featuredProjects} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-(--accent) text-(--accent-foreground) rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            View All Projects
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href={
              socialLinks.find((link) => link.name === "GitHub")?.href || "#"
            }
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-(--card) border border-(--border) rounded-full hover:border-(--accent) transition-colors"
          >
            <Github className="w-5 h-5" />
            View More on GitHub
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
