"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionHead } from "@/components/ui/section-head";
import { experiences, homeContent, siteConfig, type Experience } from "@/data";

/** "Jul 2026 - Present" → "JUL 2026 → NOW". */
export function formatPeriod(period: string) {
  return period.replace(/\s*-\s*/g, " → ").replace(/present/i, "Now");
}

const grid =
  "grid grid-cols-[1fr_auto] md:grid-cols-[260px_minmax(0,1fr)_minmax(0,420px)]";
const col = "px-5 py-5 md:border-r-2 md:border-ink md:px-6";

export function ExperienceSection() {
  const log = homeContent.log;
  const rows = log.entries
    .map((title) => experiences.find((e) => e.title === title))
    .filter((e): e is Experience => Boolean(e))
    .slice(0, siteConfig.homepage.experiencesLimit);

  return (
    <section id="experience" aria-label={log.title}>
      <SectionHead index={log.index} title={log.title} note={log.note} />

      <div
        className={`${grid} label hidden border-b-2 border-ink text-accent md:grid`}
      >
        <span className={col}>{log.columns.when}</span>
        <span className={col}>{log.columns.role}</span>
        <span className={`${col} md:border-r-0`}>{log.columns.where}</span>
      </div>

      <ol>
        {rows.map((exp, i) => (
          <motion.li
            key={exp.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className={`${grid} border-b-2 border-ink text-[clamp(17px,1.5vw,20px)] font-bold uppercase tracking-[-0.02em] transition-colors hover:bg-ink hover:text-concrete`}
          >
            <span className={`${col} label order-2 text-right md:order-none md:text-left md:text-[20px] md:normal-case md:tracking-[-0.02em]`}>
              {formatPeriod(exp.period).toUpperCase()}
            </span>
            <span className={`${col} col-span-2 order-3 pt-0 md:order-none md:col-span-1 md:pt-5`}>
              {exp.title}
            </span>
            <span className={`${col} order-1 md:order-none md:border-r-0`}>
              {exp.organization}
            </span>
          </motion.li>
        ))}
      </ol>

      <Link
        href={log.more.href}
        className="label flex items-center justify-end gap-3 border-b-2 border-ink px-5 py-5 transition-colors hover:bg-accent md:px-8"
      >
        {log.more.label}
        <ArrowRight className="size-4" aria-hidden />
      </Link>
    </section>
  );
}
