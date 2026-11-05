"use client";

import { SectionHead } from "@/components/ui/section-head";
import { homeContent } from "@/data";

export function SkillsSection() {
  const t = homeContent.tools;

  return (
    <section id="skills" aria-label={t.title}>
      <SectionHead index={t.index} title={t.title} note={t.note} />
      <ul className="grid grid-cols-2 md:grid-cols-4">
        {t.items.map((tool, i) => (
          <li
            key={tool.name}
            className={`group flex flex-col gap-1.5 border-b-2 border-ink px-5 py-5 transition-colors hover:bg-ink hover:text-concrete md:px-6 ${
              tool.highlight ? "bg-accent" : ""
            } ${i % 2 === 0 ? "border-r-2" : ""} ${
              i % 4 === 1 ? "md:border-r-2" : ""
            } ${i % 4 === 2 ? "md:border-r-2" : ""} ${
              i % 4 === 3 ? "md:border-r-0" : ""
            }`}
          >
            <span className="label text-[11px] group-hover:text-accent">
              {String(i + 1).padStart(2, "0")} / {tool.category}
            </span>
            <span className="text-[clamp(22px,2.1vw,30px)] font-bold uppercase tracking-[-0.04em] transition-transform duration-300 group-hover:translate-x-2">
              {tool.name}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
