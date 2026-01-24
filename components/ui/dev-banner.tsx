"use client";

import { useState, useEffect } from "react";
import { Construction, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const BANNER_TIMEOUT = 10000; // 10 detik

export function DevBanner() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, BANNER_TIMEOUT);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 right-0 z-100 bg-yellow-500/10 border-b border-yellow-500/20 backdrop-blur-sm"
      >
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <Construction className="w-5 h-5 text-yellow-500 shrink-0" />
            <div className="text-sm">
              <span className="font-semibold text-yellow-500">
                Under Development
              </span>
              <span className="text-(--muted) hidden sm:inline">
                {" "}
                — This website is currently under development. Some features may
                not work as expected.
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 hover:bg-(--card) rounded-md transition-colors shrink-0"
            aria-label="Close banner"
          >
            <X className="w-4 h-4 text-(--muted)" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
