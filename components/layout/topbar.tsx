"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { homeContent, navItems } from "@/data";

const cell = "flex items-center border-l-2 border-ink px-5";

/** Sticky grid topbar with a full-screen menu behind "Menu [+]". */
export function Topbar() {
  const [open, setOpen] = useState(false);
  const t = homeContent.topbar;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="label sticky top-0 z-50 flex h-14 border-b-2 border-ink bg-concrete text-ink">
        <Link
          href="/"
          className="flex items-center bg-ink px-5 text-accent md:px-7"
        >
          {t.logo}
        </Link>
        <div className={`${cell} hidden flex-1 md:flex`}>{t.role}</div>
        <div className={`${cell} hidden flex-1 lg:flex`}>{t.location}</div>
        <a href="#contact" className={`${cell} flex-1 gap-2.5 bg-accent`}>
          <span aria-hidden className="blink size-2.5 shrink-0 bg-ink" />
          {t.status}
        </a>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="site-menu"
          className={`${cell} label transition-colors hover:bg-ink hover:text-concrete md:px-7`}
        >
          {t.menu} [{open ? "−" : "+"}]
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="site-menu"
            aria-label="Site"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-x-0 bottom-0 top-14 z-40 flex flex-col overflow-y-auto bg-ink text-concrete"
          >
            {navItems.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline justify-between border-b-2 border-concrete/15 px-5 py-4 text-[clamp(44px,8vw,110px)] font-bold uppercase leading-none tracking-[-0.06em] transition-colors hover:bg-accent hover:text-ink md:px-8"
              >
                <span>{item.name}</span>
                <span className="label">{String(i + 1).padStart(2, "0")}</span>
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
