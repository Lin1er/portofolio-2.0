"use client";

import { motion } from "framer-motion";
import { BentoCard } from "@/components/ui/bento-card";
import {
  Briefcase,
  GraduationCap,
  Award,
  Calendar,
  Notebook,
} from "lucide-react";
import Link from "next/link";
import { experiences as experienceData, siteConfig } from "@/data";

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

// Only show limited experiences on homepage
const displayedExperiences = experiences.slice(
  0,
  siteConfig.homepage.experiencesLimit,
);

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20 px-6 bg-(--card)/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-(--muted) max-w-2xl">
            Education, experience, and milestones that shaped my path as a
            developer.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-(--border) transform md:-translate-x-1/2" />

          <div className="space-y-8">
            {displayedExperiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row gap-4 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-(--accent) rounded-full transform -translate-x-1/2 border-4 border-(--background)" />

                {/* Content */}
                <div
                  className={`ml-8 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pl-8" : "md:pr-8 md:text-right"}`}
                >
                  <BentoCard delay={index * 0.1}>
                    <div
                      className={`flex items-start gap-4 ${index % 2 === 0 ? "" : "md:flex-row-reverse"}`}
                    >
                      <div className="w-12 h-12 rounded-full bg-(--accent)/10 flex items-center justify-center shrink-0">
                        <exp.icon className="w-6 h-6 text-(--accent)" />
                      </div>
                      <div className={index % 2 === 0 ? "" : "md:text-right"}>
                        <span className="text-sm text-(--accent) font-medium">
                          {exp.period}
                        </span>
                        <h3 className="text-lg font-semibold mt-1">
                          {exp.title}
                        </h3>
                        <p className="text-(--muted) text-sm">
                          {exp.organization}
                        </p>
                        <p className="text-(--muted) text-sm mt-2">
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  </BentoCard>
                </div>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 text-center"
            >
              <Link
                href="experiences"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-(--card) border border-(--border) rounded-full hover:border-(--accent) transition-colors"
              >
                <Notebook className="w-5 h-5" />
                View More My Experiences
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
