"use client";

import { LazyMotion, MotionConfig } from "framer-motion";

// Animation features download after the page is interactive, not in the first bundle.
const loadFeatures = () => import("@/lib/motion-features").then((mod) => mod.default);
import type { ReactNode } from "react";

/**
 * Loads only Framer Motion's DOM animation features (~15 kB instead of ~35 kB).
 * Components must use `m.div` (not `motion.div`); `strict` throws in development if they don't.
 * `reducedMotion="user"` respects the visitor's "reduce motion" OS setting.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
