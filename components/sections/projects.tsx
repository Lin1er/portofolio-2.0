"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BentoCard } from "@/components/ui/bento-card";
import {
  ExternalLink,
  Github,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  PauseCircle,
  Filter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { projects, projectCategories, type Project, socialLinks } from "@/data";

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

const categoryColors = {
  backend: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  frontend: "bg-green-500/20 text-green-400 border-green-500/30",
  fullstack: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  web3: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  other: "bg-gray-500/20 text-gray-400 border-gray-500/30",
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const status = statusConfig[project.status];
  const StatusIcon = status.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <BentoCard
        colSpan={1}
        rowSpan={1}
        delay={0}
        className="!overflow-visible hover:z-50 transition-all duration-300"
      >
        <div className="flex flex-col h-full">
          {/* Project Image */}
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4 bg-(--background)">
            <div className="absolute inset-0 bg-linear-to-br from-purple-500/20 via-pink-500/20 to-orange-500/20 flex items-center justify-center">
              {/* <span className="text-4xl">🚀</span> */}
            </div>
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

            {/* Category Badge */}
            <div
              className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium border capitalize ${categoryColors[project.category]}`}
            >
              {project.category}
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
            <div className="relative mb-4 flex-1">
              {/* Static text to maintain layout size, 2 lines on desktop */}
              <p className="text-(--muted) text-sm line-clamp-none md:line-clamp-2 transition-opacity duration-300 md:group-hover:opacity-0">
                {project.description}
              </p>

              {/* Full Description Popup */}
              <div className="hidden md:block absolute top-0 left-0 w-[calc(100%+1.5rem)] z-[99999] opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out origin-top border border-(--border) bg-(--background)/95 backdrop-blur-md p-3 flex flex-col rounded-lg shadow-2xl drop-shadow-2xl -ml-3 -mt-2">
                <p className="text-(--muted) text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs bg-(--background) rounded-md text-(--muted)"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 4 && (
                <span className="px-2 py-1 text-xs bg-(--background) rounded-md text-(--muted)">
                  +{project.tags.length - 4}
                </span>
              )}
            </div>
          </div>
        </div>
      </BentoCard>
    </motion.div>
  );
}

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

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

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 mb-8"
        >
          <Filter className="w-5 h-5 text-(--muted) mr-2 self-center" />
          {projectCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === category.id
                  ? "bg-(--accent) text-(--accent-foreground)"
                  : "bg-(--card) border border-(--border) text-(--muted) hover:border-(--accent) hover:text-(--foreground)"
              }`}
            >
              {category.label}
              {category.id !== "all" && (
                <span className="ml-1.5 text-xs opacity-70">
                  ({projects.filter((p) => p.category === category.id).length})
                </span>
              )}
            </button>
          ))}
        </motion.div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-fr">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-(--muted)">
              No projects found in this category yet.
            </p>
          </motion.div>
        )}

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
