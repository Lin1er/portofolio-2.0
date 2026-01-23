"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { navItems, personalInfo } from "@/data";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4"
      >
        <nav className="max-w-6xl mx-auto flex items-center justify-between bg-(--card)/80 backdrop-blur-md border border-(--border) rounded-full px-4 md:px-6 py-3">
          <Link href="/" className="font-bold text-xl gradient-text">
            {personalInfo.name}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <MagneticButton key={item.name}>
                <Link
                  href={item.href}
                  className="px-4 py-2 text-sm text-(--muted) hover:text-(--foreground) transition-colors"
                >
                  {item.name}
                </Link>
              </MagneticButton>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* Desktop CTA */}
            <MagneticButton>
              <Link
                href="#contact"
                className="hidden md:flex px-4 py-2 bg-(--accent) text-(--accent-foreground) rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Let&apos;s Talk
              </Link>
            </MagneticButton>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleMenu}
              className="md:hidden w-10 h-10 rounded-full bg-(--card) border border-(--border) flex items-center justify-center hover:border-(--accent) transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMenu}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Mobile Menu */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed top-20 left-4 right-4 bg-(--card) border border-(--border) rounded-2xl p-6 z-50 md:hidden shadow-xl"
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className="block px-4 py-3 text-lg font-medium text-(--foreground) hover:text-(--accent) hover:bg-(--background) rounded-xl transition-colors"
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile CTA */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.05 }}
                  className="mt-4 pt-4 border-t border-(--border)"
                >
                  <Link
                    href="#contact"
                    onClick={closeMenu}
                    className="block w-full px-4 py-3 bg-(--accent) text-(--accent-foreground) rounded-xl text-center font-medium hover:opacity-90 transition-opacity"
                  >
                    Let&apos;s Talk
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
