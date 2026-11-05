"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { Ticker } from "@/components/ui/ticker";
import { homeContent } from "@/data";

const tape =
  "border-y-2 border-ink py-3 text-[clamp(22px,2.6vw,36px)] font-bold tracking-[-0.03em]";

export function AboutSection() {
  const m = homeContent.manifesto;
  const words = m.text.split(" ");

  return (
    <section
      id="about"
      aria-label={m.index}
      className="relative overflow-hidden bg-ink text-concrete"
    >
      {/* Two crossing tapes */}
      <div aria-hidden className="absolute -left-[5%] top-14 w-[110%] -rotate-[4deg]">
        <Ticker items={homeContent.ticker} className={`${tape} bg-ink text-accent`} />
      </div>
      <div aria-hidden className="absolute -left-[5%] top-10 w-[110%] rotate-[3deg]">
        <Ticker
          items={homeContent.ticker}
          reverse
          duration={34}
          className={`${tape} bg-accent text-ink`}
        />
      </div>

      <div className="flex flex-col gap-10 px-5 pb-24 pt-[200px] md:px-8">
        <span className="label text-accent">{m.index}</span>
        <p className="max-w-[1376px] text-[clamp(40px,6.1vw,88px)] font-bold uppercase leading-[0.94] tracking-[-0.05em]">
          {words.map((word, i) => (
            <Fragment key={`${word}-${i}`}>
              <motion.span
                className="inline-block"
                initial={{ opacity: 0.12 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                {word}
              </motion.span>{" "}
            </Fragment>
          ))}
        </p>
        <ul className="grid gap-8 border-t-2 border-concrete/20 pt-6 md:grid-cols-2 lg:grid-cols-4">
          {m.notes.map((note) => (
            <li key={note.title} className="flex flex-col gap-2.5 pr-6">
              <span className="label text-[12px] text-accent">{note.title}</span>
              <span className="max-w-[320px] leading-relaxed text-ash">
                {note.body}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
