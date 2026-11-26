"use client";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Loads only Framer Motion's DOM animation features (~15 kB instead of ~35 kB).
 * Components must use `m.div` (not `motion.div`); `strict` throws in development if they don't.
 * `reducedMotion="user"` respects the visitor's "reduce motion" OS setting.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
