"use client";

import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      {/* Background Grid */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 text-center max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* 404 Number */}
          <h1 className="text-[150px] md:text-[200px] font-bold leading-none gradient-text">
            404
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Page Not Found
          </h2>
          <p className="text-(--muted) mb-8">
            Oops! The page you&apos;re looking for doesn&apos;t exist or has
            been moved. Let&apos;s get you back on track.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-(--accent) text-(--accent-foreground) rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-(--card) border border-(--border) rounded-full font-medium hover:border-(--accent) transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </motion.div>

        {/* Fun Element */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-sm text-(--muted)"
        >
          Lost in the void? Maybe try checking out my{" "}
          <Link href="/#projects" className="text-(--accent) hover:underline">
            projects
          </Link>{" "}
          instead!
        </motion.p>
      </div>
    </main>
  );
}
