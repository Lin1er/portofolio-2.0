"use client";

import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Ticker } from "@/components/ui/ticker";
import { homeContent, personalInfo } from "@/data";

export function HeroSection() {
  const h = homeContent.hero;

  return (
    <section id="top" aria-labelledby="hero-title">
      <h1 id="hero-title" className="sr-only">
        {personalInfo.name} — {personalInfo.role}
      </h1>

      {/* Giant name. Hover inverts it; a light bar sweeps across on a loop. */}
      <div className="group relative isolate overflow-hidden border-b-2 border-ink bg-concrete transition-colors duration-300 hover:bg-ink">
        <div
          aria-hidden
          data-testid="hero-name"
          className="hero-name flex select-none justify-center px-[1vw] pb-[0.6vw] pt-[1.8vw] text-[21vw] font-bold leading-[0.78] tracking-[-0.07em]"
        >
          <span className="transition-colors duration-300 group-hover:text-concrete">
            {h.nameMain}
          </span>
          <span className="text-accent transition-[margin] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:ml-[2.6vw]">
            {h.nameAccent}
          </span>
        </div>
        <div
          aria-hidden
          className="scan-bar pointer-events-none absolute inset-y-0 left-0 w-[12vw] bg-white mix-blend-difference"
        />
      </div>

      <div className="grid border-b-2 border-ink lg:grid-cols-[minmax(0,440px)_minmax(0,1fr)_330px]">
        <figure className="flex flex-col gap-3 border-b-2 border-ink p-5 lg:border-b-0 lg:border-r-2">
          <div className="group relative aspect-[400/440] w-full overflow-hidden border-2 border-ink">
            <Image
              src={h.photo}
              alt={personalInfo.name}
              fill
              priority
              sizes="(min-width: 1024px) 400px, 100vw"
              className="object-cover grayscale contrast-125 transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
            />
          </div>
          <figcaption className="label flex justify-between gap-4 text-[12px]">
            <span>{h.photoCaption}</span>
            <span>{personalInfo.name}</span>
          </figcaption>
        </figure>

        <div className="flex flex-col justify-between gap-10 border-b-2 border-ink px-5 py-8 md:px-8 lg:border-b-0 lg:border-r-2">
          <div className="flex flex-col gap-6">
            <span className="label text-accent">{h.index}</span>
            <p className="max-w-[580px] text-[clamp(36px,4vw,58px)] font-bold uppercase leading-[0.96] tracking-[-0.04em]">
              {h.headline}
            </p>
            <p className="max-w-[520px] text-lg leading-relaxed">{h.body}</p>
          </div>
          <div className="flex flex-wrap gap-4 pb-1.5">
            <a
              href={h.primaryCta.href}
              className="press label inline-flex items-center gap-3 border-2 border-ink bg-accent px-7 py-4 hover:bg-ink hover:text-accent"
            >
              {h.primaryCta.label}
              <ArrowDown className="size-4" aria-hidden />
            </a>
            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="press label inline-flex items-center gap-3 border-2 border-ink bg-concrete px-7 py-4 hover:bg-accent"
            >
              {h.secondaryCta.label}
              <ArrowUpRight className="size-4" aria-hidden />
            </a>
          </div>
        </div>

        <dl className="grid grid-cols-2 lg:grid-cols-1">
          {homeContent.stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col justify-center gap-1 border-ink px-6 py-5 ${
                i < homeContent.stats.length - 2 ? "border-b-2" : ""
              } ${i === homeContent.stats.length - 2 ? "lg:border-b-2" : ""} ${
                i % 2 === 0 ? "border-r-2 lg:border-r-0" : ""
              } ${stat.highlight ? "bg-accent" : ""}`}
            >
              <dt className="label order-2 text-[12px]">{stat.label}</dt>
              <dd className="order-1 text-[clamp(52px,5vw,72px)] font-bold leading-none tracking-[-0.06em]">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <Ticker
        items={homeContent.ticker}
        className="border-b-2 border-ink bg-ink py-3 text-[clamp(28px,3.4vw,48px)] font-bold tracking-[-0.03em] text-accent"
      />
    </section>
  );
}
