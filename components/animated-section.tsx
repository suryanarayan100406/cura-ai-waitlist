"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

interface AnimatedSectionProps extends HTMLMotionProps<"section"> {
  children: ReactNode;
  className?: string;
}

export const AnimatedSection = forwardRef<HTMLElement, AnimatedSectionProps>(
  ({ children, className, ...motionProps }, ref) => {
    return (
      <motion.section
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(className)}
        {...motionProps}
      >
        {children}
      </motion.section>
    );
  }
);

AnimatedSection.displayName = "AnimatedSection";
