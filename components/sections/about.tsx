"use client";

import { motion } from "framer-motion";
import { BentoCard } from "@/components/ui/bento-card";
import { MapPin, Calendar, Rocket } from "lucide-react";
import { personalInfo, funFacts } from "@/data";

export function AboutSection() {
  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-(--muted) max-w-2xl">
            Get to know me better - my journey, passion, and what drives me as a
            developer.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Main intro card */}
          <BentoCard colSpan={2} delay={0.1}>
            <div className="flex flex-col h-full">
              <h3 className="text-xl font-semibold mb-4">Hello there! 👋</h3>
              <p className="text-(--muted) leading-relaxed mb-4">
                {personalInfo.aboutMe.intro}
              </p>
              <p className="text-(--muted) leading-relaxed">
                {personalInfo.aboutMe.passion}
              </p>
            </div>
          </BentoCard>

          {/* Location card */}
          <BentoCard delay={0.2}>
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-12 h-12 rounded-full bg-(--accent)/10 flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-(--accent)" />
              </div>
              <h3 className="font-semibold mb-1">Based in</h3>
              <p className="text-(--muted)">{personalInfo.location}</p>
            </div>
          </BentoCard>

          {/* Experience card */}
          <BentoCard delay={0.3}>
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-12 h-12 rounded-full bg-(--accent)/10 flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-(--accent)" />
              </div>
              <h3 className="font-semibold mb-1">Experience</h3>
              <p className="text-(--muted)">
                {personalInfo.yearsOfExperience}+ Years Coding
              </p>
            </div>
          </BentoCard>

          {/* Current focus card */}
          <BentoCard colSpan={2} delay={0.4}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-(--accent)/10 flex items-center justify-center shrink-0">
                <Rocket className="w-6 h-6 text-(--accent)" />
              </div>
              <div className="sm:mt-5">
                <h3 className="font-semibold mb-2">Current Focus</h3>
                <p className="text-(--muted) leading-relaxed">
                  {personalInfo.aboutMe.currentFocus}
                </p>
              </div>
            </div>
          </BentoCard>

          {/* Fun facts */}
          <BentoCard colSpan={3} delay={0.5}>
            <h3 className="font-semibold mb-4">Fun Facts About Me</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {funFacts.map((fact) => (
                <motion.div
                  key={fact.label}
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center justify-center p-4 bg-(--background) rounded-xl"
                >
                  <span className="text-2xl mb-2">{fact.emoji}</span>
                  <span className="text-sm text-(--muted)">{fact.label}</span>
                </motion.div>
              ))}
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}
