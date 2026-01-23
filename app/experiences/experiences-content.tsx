"use client";

import { motion } from "framer-motion";
import { BentoCard } from "@/components/ui/bento-card";
import {
  Briefcase,
  GraduationCap,
  Award,
  Calendar,
  ArrowLeft,
  Filter,
} from "lucide-react";
import Link from "next/link";
import { experiences as experienceData } from "@/data";
import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

// Map icon strings to actual icons
const iconMap: Record<string, typeof Briefcase> = {
  graduation: GraduationCap,
  briefcase: Briefcase,
  award: Award,
  calendar: Calendar,
};

const experiences = experienceData.map((exp) => ({
  ...exp,
  icon: iconMap[exp.icon] || Briefcase,
}));

const filterOptions = [
  { value: "all", label: "All" },
  { value: "education", label: "Education" },
  { value: "work", label: "Work" },
  { value: "achievement", label: "Achievement" },
];

export function ExperiencesPageContent() {
  const [filter, setFilter] = useState<string>("all");

  const filteredExperiences =
    filter === "all"
      ? experiences
      : experiences.filter((exp) => exp.type === filter);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <Link
              href="/#experience"
              className="inline-flex items-center gap-2 text-(--muted) hover:text-(--foreground) transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              My <span className="gradient-text">Experiences</span>
            </h1>
            <p className="text-(--muted) text-lg max-w-2xl">
              A complete timeline of my journey - education, work experience,
              achievements, and milestones that shaped me as a developer.
            </p>
          </motion.div>

          {/* Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap items-center gap-3 mb-10"
          >
            <Filter className="w-4 h-4 text-(--muted)" />
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setFilter(option.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === option.value
                    ? "bg-(--accent) text-(--accent-foreground)"
                    : "bg-(--card) border border-(--border) text-(--muted) hover:border-(--accent) hover:text-(--foreground)"
                }`}
              >
                {option.label}
              </button>
            ))}
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-(--border)" />

            <div className="space-y-6">
              {filteredExperiences.map((exp, index) => (
                <motion.div
                  key={exp.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-16"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 w-5 h-5 bg-(--accent) rounded-full transform -translate-x-1/2 border-4 border-(--background) z-10" />

                  {/* Type badge */}
                  <div className="absolute left-4 top-8 transform -translate-x-1/2">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        exp.type === "education"
                          ? "bg-blue-500"
                          : exp.type === "work"
                            ? "bg-green-500"
                            : "bg-yellow-500"
                      }`}
                    />
                  </div>

                  <BentoCard delay={0}>
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-(--accent)/10 flex items-center justify-center shrink-0">
                        <exp.icon className="w-7 h-7 text-(--accent)" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <span
                            className={`text-xs px-2 py-1 rounded-full font-medium ${
                              exp.type === "education"
                                ? "bg-blue-500/10 text-blue-500"
                                : exp.type === "work"
                                  ? "bg-green-500/10 text-green-500"
                                  : "bg-yellow-500/10 text-yellow-500"
                            }`}
                          >
                            {exp.type.charAt(0).toUpperCase() +
                              exp.type.slice(1)}
                          </span>
                          <span className="text-sm text-(--accent) font-medium">
                            {exp.period}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold">{exp.title}</h3>
                        <p className="text-(--muted) font-medium">
                          {exp.organization}
                        </p>
                        <p className="text-(--muted) mt-3 leading-relaxed">
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  </BentoCard>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Empty state */}
          {filteredExperiences.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-(--muted)">
                No experiences found for this filter.
              </p>
            </motion.div>
          )}

          {/* Stats Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16 grid grid-cols-3 gap-4"
          >
            <div className="text-center p-6 bg-(--card) border border-(--border) rounded-2xl">
              <div className="text-3xl font-bold gradient-text">
                {experiences.filter((e) => e.type === "education").length}
              </div>
              <div className="text-sm text-(--muted) mt-1">Education</div>
            </div>
            <div className="text-center p-6 bg-(--card) border border-(--border) rounded-2xl">
              <div className="text-3xl font-bold gradient-text">
                {experiences.filter((e) => e.type === "work").length}
              </div>
              <div className="text-sm text-(--muted) mt-1">Work</div>
            </div>
            <div className="text-center p-6 bg-(--card) border border-(--border) rounded-2xl">
              <div className="text-3xl font-bold gradient-text">
                {experiences.filter((e) => e.type === "achievement").length}
              </div>
              <div className="text-sm text-(--muted) mt-1">Achievements</div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
