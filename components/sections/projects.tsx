"use client";

import { motion } from "framer-motion";
import { BentoCard } from "@/components/ui/bento-card";
import {
  ExternalLink,
  Github,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  PauseCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { projects, type Project, socialLinks } from "@/data";

const statusConfig = {
  completed: {
    label: "Completed",
    icon: CheckCircle2,
    className: "bg-green-500/80 text-white border-green-500/20",
  },
  "in-progress": {
    label: "In Progress",
    icon: Clock,
    className: "bg-yellow-500/80 text-white border-yellow-500/20",
  },
  "on-hold": {
    label: "On Hold",
    icon: PauseCircle,
    className: "bg-gray-500/80 text-white border-gray-500/20",
  },
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const status = statusConfig[project.status];
  const StatusIcon = status.icon;

  return (
    <BentoCard colSpan={1} rowSpan={1} delay={index * 0.1}>
      <div className="flex flex-col h-full">
        {/* Project Image */}
        <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4 bg-(--background)">
          <div className="absolute inset-0 bg-linear-to-br from-purple-500/20 via-pink-500/20 to-orange-500/20 flex items-center justify-center">
            {/* <span className="text-4xl">🚀</span> */}
          </div>
          {/* Uncomment when you have images */}
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Status Badge */}
          <div
            className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${status.className}`}
          >
            <StatusIcon className="w-3 h-3" />
            {status.label}
          </div>

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-(--background)/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
            {project.github && (
              <Link
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-(--card) rounded-full hover:bg-(--accent) hover:text-(--accent-foreground) transition-colors"
              >
                <Github className="w-5 h-5" />
              </Link>
            )}
            {project.live && (
              <Link
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-(--card) rounded-full hover:bg-(--accent) hover:text-(--accent-foreground) transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
              </Link>
            )}
          </div>
        </div>

        {/* Project Info */}
        <div className="flex-1 flex flex-col">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2 group-hover:text-(--accent) transition-colors">
            {project.title}
            <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </h3>
          <p className="text-(--muted) text-sm mb-4 flex-1 md:line-clamp-2 md:group-hover:line-clamp-none transition-all duration-300">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs bg-(--background) rounded-md text-(--muted)"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </BentoCard>
  );
}

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
            something new.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-fr">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
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
