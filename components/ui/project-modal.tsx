"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, Github, ExternalLink, BookOpen } from "lucide-react";
import type { Project } from "@/data";

const categoryColors = {
  backend: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  frontend: "bg-green-500/20 text-green-400 border-green-500/30",
  fullstack: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  web3: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  other: "bg-gray-500/20 text-gray-400 border-gray-500/30",
};

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Close on ESC + lock body scroll while open
  useEffect(() => {
    if (!project) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-6 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-(--card) border border-(--border) rounded-2xl shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-(--background)/80 backdrop-blur-md border border-(--border) hover:border-(--accent) hover:text-(--accent) transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Image */}
            <div className="relative w-full aspect-video bg-(--background) overflow-hidden rounded-t-2xl">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 672px"
                className="object-cover"
              />

              {/* Category badge */}
              <div
                className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium border capitalize ${categoryColors[project.category]}`}
              >
                {project.category}
              </div>
            </div>

            {/* Body */}
            <div className="p-6 md:p-8">
              <h3
                id="project-modal-title"
                className="text-xl md:text-2xl font-semibold mb-3"
              >
                {project.title}
              </h3>

              <p className="text-(--muted) text-sm md:text-base leading-relaxed mb-6 whitespace-pre-line">
                {project.description}
              </p>

              {/* All tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-xs bg-(--background) border border-(--border) rounded-md text-(--muted)"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action buttons */}
              {(project.github || project.live || project.caseStudySlug) && (
                <div className="flex flex-wrap gap-3">
                  {project.caseStudySlug && (
                    <Link
                      href={`/projects/${project.caseStudySlug}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-(--accent) text-(--accent-foreground) hover:opacity-90 transition-opacity text-sm font-medium"
                    >
                      <BookOpen className="w-4 h-4" />
                      Read Case Study
                    </Link>
                  )}
                  {project.github && (
                    <Link
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-(--background) border border-(--border) hover:border-(--accent) hover:text-(--accent) transition-colors text-sm font-medium"
                    >
                      <Github className="w-4 h-4" />
                      View Code
                    </Link>
                  )}
                  {project.live && (
                    <Link
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-(--accent) text-(--accent-foreground) hover:opacity-90 transition-opacity text-sm font-medium"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </Link>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
