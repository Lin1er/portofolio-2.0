"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Github, ExternalLink, Boxes } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import type { CaseStudy, Project } from "@/data";

const linkIcon = (label: string) =>
  label.toLowerCase().includes("source") ? Github : ExternalLink;

export function CaseStudyContent({
  caseStudy,
  project,
}: {
  caseStudy: CaseStudy;
  project?: Project;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20 px-6">
        <article className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-(--muted) hover:text-(--foreground) transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Projects
            </Link>

            <div className="flex flex-wrap items-center gap-2 mb-4">
              {project && (
                <span className="px-2.5 py-1 rounded-full text-xs font-medium border border-(--border) bg-(--card) capitalize">
                  {project.category}
                </span>
              )}
              {caseStudy.network && (
                <span className="px-2.5 py-1 rounded-full text-xs font-medium border border-(--border) bg-(--card)">
                  {caseStudy.network}
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              {caseStudy.projectTitle}
            </h1>
            <p className="text-xl text-(--accent) font-medium mb-4">
              {caseStudy.headline}
            </p>
            <p className="text-(--muted) text-lg leading-relaxed">
              {caseStudy.summary}
            </p>

            {/* Links */}
            <div className="flex flex-wrap gap-3 mt-6">
              {caseStudy.links.map((link) => {
                const Icon = linkIcon(link.label);
                const primary = link.label.toLowerCase().includes("live");
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      primary
                        ? "bg-(--accent) text-(--accent-foreground) hover:opacity-90"
                        : "bg-(--card) border border-(--border) hover:border-(--accent) hover:text-(--accent)"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>

          {/* Cover image */}
          {project?.image && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="relative w-full aspect-video rounded-2xl overflow-hidden border border-(--border) mb-12 bg-(--card)"
            >
              <Image
                src={project.image}
                alt={caseStudy.projectTitle}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </motion.div>
          )}

          {/* The problem */}
          <Section title="The problem" delay={0.15}>
            <p className="text-(--muted) leading-relaxed">{caseStudy.problem}</p>
          </Section>

          {/* What I built */}
          <Section title="What I built" delay={0.2}>
            <p className="text-(--muted) leading-relaxed">{caseStudy.build}</p>
          </Section>

          {/* Architecture */}
          <Section title="Architecture" delay={0.25}>
            <div className="grid gap-4">
              {caseStudy.architecture.map((node) => (
                <div
                  key={node.label}
                  className="p-5 rounded-2xl border border-(--border) bg-(--card)"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Boxes className="w-4 h-4 text-(--accent)" />
                      {node.label}
                    </h3>
                    <span className="text-xs text-(--muted) font-mono">
                      {node.tech}
                    </span>
                  </div>
                  <p className="text-(--muted) text-sm leading-relaxed">
                    {node.role}
                  </p>
                </div>
              ))}
            </div>
          </Section>

          {/* Highlights */}
          <Section title="Engineering highlights" delay={0.3}>
            <ul className="space-y-3">
              {caseStudy.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-(--muted) leading-relaxed">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-(--accent) shrink-0" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </Section>

          {/* Stack */}
          <Section title="Stack" delay={0.35}>
            <div className="rounded-2xl border border-(--border) overflow-hidden">
              {caseStudy.stack.map((row, i) => (
                <div
                  key={row.layer}
                  className={`flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 px-5 py-3 ${
                    i > 0 ? "border-t border-(--border)" : ""
                  }`}
                >
                  <span className="sm:w-40 shrink-0 text-sm font-medium">
                    {row.layer}
                  </span>
                  <span className="text-sm text-(--muted)">{row.tech}</span>
                </div>
              ))}
            </div>

            {caseStudy.contractAddress && (
              <p className="mt-4 text-sm text-(--muted)">
                Deployed contract ({caseStudy.network}):{" "}
                <code className="font-mono text-(--foreground) break-all">
                  {caseStudy.contractAddress}
                </code>
              </p>
            )}
          </Section>
        </article>
      </main>
      <Footer />
    </>
  );
}

function Section({
  title,
  delay,
  children,
}: {
  title: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="mb-12"
    >
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {children}
    </motion.section>
  );
}
