"use client";

import { motion } from "framer-motion";
import {
  ArrowDown,
  Sparkles,
  Github,
  Linkedin,
  Twitter,
  Instagram,
} from "lucide-react";
import { AnimatedText } from "@/components/ui/animated-text";
import { MagneticButton } from "@/components/ui/magnetic-button";
import Image from "next/image";
import Link from "next/link";
import { personalInfo, socialLinks as socialData } from "@/data";

// Map social links with icons
const iconMap: Record<string, typeof Github> = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Twitter: Twitter,
  Instagram: Instagram,
};

const socialLinks = socialData
  .filter((link) => iconMap[link.name])
  .map((link) => ({
    ...link,
    icon: iconMap[link.name],
  }));

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background Grid */}
      <div className="absolute inset-0 grid-pattern opacity-50" />

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-(--card) border border-(--border) rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4 text-(--accent)" />
              <span className="text-sm text-(--muted)">
                {personalInfo.availability}
              </span>
            </motion.div>

            <AnimatedText
              text={`Hi, I'm ${personalInfo.name}`}
              className="text-4xl md:text-6xl font-bold mb-4"
              delay={0.2}
            />

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-2xl md:text-4xl font-bold gradient-text mb-6"
            >
              {personalInfo.role}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-(--muted) text-lg mb-8 max-w-lg"
            >
              {personalInfo.bio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              <MagneticButton>
                <Link
                  href="#projects"
                  className="px-6 py-3 bg-(--accent) text-(--accent-foreground) rounded-full font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  View My Work
                  <ArrowDown className="w-4 h-4" />
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link
                  href="#contact"
                  className="px-6 py-3 bg-(--card) border border-(--border) rounded-full font-medium hover:border-(--accent) transition-colors items-center flex"
                >
                  Get In Touch
                </Link>
              </MagneticButton>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="flex items-center gap-4"
            >
              <span className="text-sm text-(--muted)">Find me on</span>
              <div className="flex gap-2">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.1 + index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full bg-(--card) border border-(--border) flex items-center justify-center hover:border-(--accent) hover:text-(--accent) transition-colors"
                    aria-label={social.name}
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Image/Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative">
              {/* Decorative ring */}
              <div
                className="absolute inset-0 rounded-full border-2 border-dashed border-(--accent)/30 animate-spin"
                style={{ animationDuration: "20s" }}
              />

              {/* Avatar container */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-(--card) shadow-2xl">
                <div className="w-full h-full bg-linear-to-br from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center">
                  {/* Placeholder - replace with your image */}
                  <span className="text-6xl">👨‍💻</span>
                </div>
                {/* Uncomment and use when you have an image */}
                {/* <Image
                  src="/your-photo.jpg"
                  alt={personalInfo.name}
                  fill
                  className="object-cover"
                  priority
                /> */}
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-4 -right-4 px-4 py-2 bg-(--card) border border-(--border) rounded-full shadow-lg"
              >
                <span className="text-sm font-medium">
                  🎓 {personalInfo.university.split(" - ")[0]}
                </span>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-10 -right-25 px-4 py-2 bg-(--card) border border-(--border) rounded-full shadow-lg"
              >
                <span className="text-sm font-medium">
                  ⛓️ Full Stack Developer
                </span>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-4 -left-4 px-4 py-2 bg-(--card) border border-(--border) rounded-full shadow-lg"
              >
                <span className="text-sm font-medium">⛓️ Web3 Explorer</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-(--muted) rounded-full flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-(--muted) rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
