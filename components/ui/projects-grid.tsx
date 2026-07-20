"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BentoCard } from "@/components/ui/bento-card";
import { ProjectModal } from "@/components/ui/project-modal";
import { ArrowUpRight, Filter } from "lucide-react";
import Image from "next/image";
import { projectCategories, type Project } from "@/data";

const categoryColors = {
  backend: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  frontend: "bg-green-500/20 text-green-400 border-green-500/30",
  fullstack: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  web3: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  other: "bg-gray-500/20 text-gray-400 border-gray-500/30",
};

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (project: Project) => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="h-full"
    >
      <BentoCard
        colSpan={1}
        rowSpan={1}
        delay={0}
        className="h-full cursor-pointer"
      >
        <button
          type="button"
          onClick={() => onOpen(project)}
          aria-label={`View details for ${project.title}`}
          className="flex flex-col h-full w-full text-left rounded-lg"
        >
          {/* Project Image */}
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4 bg-(--background)">
            <div className="absolute inset-0 bg-linear-to-br from-purple-500/20 via-pink-500/20 to-orange-500/20" />
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Category Badge */}
            <div
              className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium border capitalize ${categoryColors[project.category]}`}
            >
              {project.category}
            </div>
          </div>

          {/* Project Info */}
          <div className="flex-1 flex flex-col">
            <h3 className="text-lg font-semibold mb-2 flex items-start gap-2 group-hover:text-(--accent) transition-colors">
              <span className="line-clamp-1">{project.title}</span>
              <ArrowUpRight className="w-4 h-4 shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>

            <p className="text-(--muted) text-sm line-clamp-3 mb-4">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-auto">
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
        </button>
      </BentoCard>
    </motion.div>
  );
}

/**
 * Filterable project card grid with the shared detail modal.
 * Used by the homepage section (curated slice, no filters) and the
 * /projects page (full list, filters on).
 */
export function ProjectsGrid({
  items,
  showFilters = false,
}: {
  items: Project[];
  showFilters?: boolean;
}) {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects =
    activeFilter === "all"
      ? items
      : items.filter((project) => project.category === activeFilter);

  return (
    <>
      {showFilters && (
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
                  ({items.filter((p) => p.category === category.id).length})
                </span>
              )}
            </button>
          ))}
        </motion.div>
      )}

      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              onOpen={setSelectedProject}
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

      {/* Detail modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
