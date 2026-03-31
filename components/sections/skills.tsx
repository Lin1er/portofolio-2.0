"use client";

import { motion } from "framer-motion";
import { Marquee } from "@/components/ui/marquee";
import { techStackRow1, techStackRow2, techStackRow3 } from "@/data";

function TechBadge({ name, icon }: { name: string; icon: string }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-(--card) border border-(--border) rounded-full hover:border-(--accent) transition-colors">
      <span className="text-lg">{icon}</span>
      <span className="text-sm font-medium whitespace-nowrap">{name}</span>
    </div>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 px-6 bg-(--card)/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-(--muted) max-w-2xl">
            Technologies and tools I use to bring ideas to life.
          </p>
        </motion.div>

        {/* Tech Stack Marquee */}
        <div className="mb-12 space-y-4 -mx-6 md:-mx-12">
          <Marquee direction="left" speed={25}>
            {techStackRow1.map((tech) => (
              <TechBadge key={tech.name} name={tech.name} icon={tech.icon} />
            ))}
          </Marquee>
          <Marquee direction="right" speed={30}>
            {techStackRow2.map((tech) => (
              <TechBadge key={tech.name} name={tech.name} icon={tech.icon} />
            ))}
          </Marquee>
          <Marquee direction="left" speed={20}>
            {techStackRow3.map((tech) => (
              <TechBadge key={tech.name} name={tech.name} icon={tech.icon} />
            ))}
          </Marquee>
        </div>

        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Frontend 
          <BentoCard delay={0.1}>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <span className="text-xl">🎨</span> Frontend
            </h3>
            {skills.frontend.map((skill, index) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                level={skill.level}
                delay={0.2 + index * 0.1}
              />
            ))}
          </BentoCard>

          {/* Backend 
          <BentoCard delay={0.2}>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <span className="text-xl">⚙️</span> Backend
            </h3>
            {skills.backend.map((skill, index) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                level={skill.level}
                delay={0.3 + index * 0.1}
              />
            ))}
          </BentoCard>

          {/* Web3 
          <BentoCard delay={0.3}>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <span className="text-xl">⛓️</span> Web3
            </h3>
            {skills.web3.map((skill, index) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                level={skill.level}
                delay={0.4 + index * 0.1}
              />
            ))}
          </BentoCard>

          {/* Other Skills 
          <BentoCard delay={0.4}>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <span className="text-xl">🛠️</span> Other
            </h3>
            {skills.other.map((skill, index) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                level={skill.level}
                delay={0.5 + index * 0.1}
              />
            ))}
          </BentoCard>
        </div> */}
      </div>
    </section>
  );
}
