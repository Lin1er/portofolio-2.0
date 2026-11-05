"use client";

import { motion } from "framer-motion";

interface SectionHeadProps {
  index: string;
  title: string;
  note?: string;
}

/** Brutalist section header: orange index, giant title that rises into view. */
export function SectionHead({ index, title, note }: SectionHeadProps) {
  return (
    <div className="flex flex-col gap-6 border-b-2 border-ink px-5 pb-7 pt-16 md:flex-row md:items-end md:justify-between md:px-8">
      <div className="flex flex-col gap-4">
        <span className="label text-accent">{index}</span>
        <h2 className="overflow-hidden text-[clamp(64px,8.4vw,120px)] font-bold leading-[0.9] tracking-[-0.07em]">
          <motion.span
            className="block"
            initial={{ y: "100%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {title}
          </motion.span>
        </h2>
      </div>
      {note && <span className="label">{note}</span>}
    </div>
  );
}
