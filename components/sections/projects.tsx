"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionHead } from "@/components/ui/section-head";
import { homeContent, projects, siteConfig, type Project } from "@/data";

/** Case study first, then the live app, then the repo, then the full list. */
export function projectHref(project: Project) {
  if (project.caseStudySlug) return `/projects/${project.caseStudySlug}`;
  return project.live ?? project.github ?? "/projects";
}

function WorkRow({ project, index }: { project: Project; index: number }) {
  const work = homeContent.work;
  const href = projectHref(project);
  const external = href.startsWith("http");
  const [lead, ...rest] = project.tags;

  return (
    <motion.li
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.04 }}
    >
      <Link
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="group relative flex items-center gap-4 overflow-hidden border-b-2 border-ink px-5 py-6 md:gap-6 md:px-8 md:py-8"
      >
        {/* Orange wipe */}
        <span
          aria-hidden
          className="absolute inset-0 origin-left scale-x-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
        />
        <span className="label relative w-8 shrink-0 self-start pt-2 md:w-12">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="relative min-w-0 flex-1 text-[clamp(38px,6.6vw,96px)] font-bold uppercase leading-[0.9] tracking-[-0.06em] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-4 md:group-hover:translate-x-8">
          {project.title}
        </span>

        {/* Preview card pops up on hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute right-[380px] top-1/2 hidden aspect-[4/3] w-[230px] translate-y-[10%] rotate-6 overflow-hidden border-2 border-ink opacity-0 shadow-[6px_6px_0_var(--ink)] transition duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1/2 group-hover:-rotate-3 group-hover:opacity-100 xl:block"
        >
          <Image
            src={project.image}
            alt=""
            fill
            sizes="230px"
            className="object-cover"
          />
        </span>

        <span className="label relative hidden w-[260px] shrink-0 flex-col gap-1 text-[12px] md:flex">
          <span>
            {work.categoryLabels[project.category]}
            {lead ? ` / ${lead}` : ""}
          </span>
          <span>{rest.slice(0, 2).join(" · ")}</span>
        </span>
        <ArrowRight
          aria-hidden
          className="relative size-9 shrink-0 transition-transform duration-500 group-hover:-rotate-45 md:size-12"
          strokeWidth={2.5}
        />
      </Link>
    </motion.li>
  );
}

export function ProjectsSection() {
  const work = homeContent.work;
  const rows = work.entries
    .map((title) => projects.find((p) => p.title === title))
    .filter((p): p is Project => Boolean(p))
    .slice(0, siteConfig.homepage.projectsLimit);

  return (
    <section id="projects" aria-label={work.title}>
      <SectionHead index={work.index} title={work.title} note={work.note} />
      <ol>
        {rows.map((project, i) => (
          <WorkRow key={project.title} project={project} index={i} />
        ))}
      </ol>
      <div className="flex flex-col gap-3 bg-ink px-5 py-5 text-concrete md:flex-row md:items-center md:gap-6 md:px-8">
        <span className="label text-accent">{work.alsoLabel} →</span>
        <span className="text-[15px] font-bold uppercase tracking-[0.04em]">
          {work.also}
        </span>
        <span className="label text-accent md:ml-auto">{work.disclaimer}</span>
        <Link
          href={work.more.href}
          className="label inline-flex items-center gap-2 border-2 border-concrete px-4 py-2 transition-colors hover:bg-accent hover:text-ink"
        >
          {work.more.label}
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
