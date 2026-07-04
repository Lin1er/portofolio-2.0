"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { animationConfig } from "@/data";

const SESSION_KEY = "preloader-shown";

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only block the first visit of a session; repeat visits fade the
    // overlay out immediately instead of replaying the full loader.
    const alreadyShown = sessionStorage.getItem(SESSION_KEY);
    if (!alreadyShown) sessionStorage.setItem(SESSION_KEY, "1");
    const timer = setTimeout(
      () => setIsLoading(false),
      alreadyShown ? 0 : animationConfig.preloaderDuration,
    );

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-(--background) flex items-center justify-center"
        >
          <div className="flex flex-col items-center gap-8">
            {/* Animated logo/text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold gradient-text"
            >
              Lin1er
            </motion.div>

            {/* Loading bar */}
            <div className="w-48 h-1 bg-(--border) rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  duration: animationConfig.preloaderDuration / 1000 - 0.2,
                  ease: "easeInOut",
                }}
                className="h-full bg-(--accent) rounded-full"
              />
            </div>

            {/* Loading dots */}
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                  className="w-2 h-2 bg-(--accent) rounded-full"
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
