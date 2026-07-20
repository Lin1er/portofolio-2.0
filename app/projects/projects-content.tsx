"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { projects } from "@/data";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ProjectsGrid } from "@/components/ui/projects-grid";

export function ProjectsPageContent() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-(--muted) hover:text-(--foreground) transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              All <span className="gradient-text">Projects</span>
            </h1>
            <p className="text-(--muted) text-lg max-w-2xl">
              The complete list - backend systems, full-stack apps, AI
              products, and multi-chain dApps. Filter by category and click
              any card for the full story.
            </p>
          </motion.div>

          <ProjectsGrid items={projects} showFilters />

          {/* Stats Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            <div className="text-center p-6 bg-(--card) border border-(--border) rounded-2xl">
              <div className="text-3xl font-bold text-(--accent)">
                {projects.length}
              </div>
              <div className="text-sm text-(--muted) mt-1">Total Projects</div>
            </div>
            <div className="text-center p-6 bg-(--card) border border-(--border) rounded-2xl">
              <div className="text-3xl font-bold text-orange-500">
                {projects.filter((p) => p.category === "web3").length}
              </div>
              <div className="text-sm text-(--muted) mt-1">Web3 dApps</div>
            </div>
            <div className="text-center p-6 bg-(--card) border border-(--border) rounded-2xl">
              <div className="text-3xl font-bold text-purple-500">
                {projects.filter((p) => p.category === "fullstack").length}
              </div>
              <div className="text-sm text-(--muted) mt-1">Full-Stack Apps</div>
            </div>
            <div className="text-center p-6 bg-(--card) border border-(--border) rounded-2xl">
              <div className="text-3xl font-bold text-blue-500">
                {projects.filter((p) => p.category === "backend").length}
              </div>
              <div className="text-sm text-(--muted) mt-1">Backend Systems</div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
