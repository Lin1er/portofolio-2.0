"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  colSpan?: 1 | 2 | 3;
  rowSpan?: 1 | 2;
  delay?: number;
}

export function BentoCard({
  children,
  className = "",
  colSpan = 1,
  rowSpan = 1,
  delay = 0,
}: BentoCardProps) {
  const colSpanClass = {
    1: "col-span-1",
    2: "col-span-1 md:col-span-2",
    3: "col-span-1 md:col-span-3",
  };

  const rowSpanClass = {
    1: "row-span-1",
    2: "row-span-1 md:row-span-2",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      className={`
        ${colSpanClass[colSpan]}
        ${rowSpanClass[rowSpan]}
        bg-(--card)
        border border-(--border)
        rounded-2xl
        p-6
        hover:border-(--accent)
        transition-colors
        duration-300
        overflow-hidden
        relative
        group
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
