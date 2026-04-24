"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useMemo } from "react";

import type { FeatureItem } from "@/lib/content";

interface TiltMockupProps {
  feature: FeatureItem;
}

export function TiltMockup({ feature }: TiltMockupProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), {
    stiffness: 200,
    damping: 18,
  });

  const gradient = useMemo(() => {
    const hash = feature.id
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const start = 145 + (hash % 45);
    const end = 165 + (hash % 40);
    return `linear-gradient(145deg, rgba(82,183,136,0.17), rgba(${start},${end},190,0.2))`;
  }, [feature.id]);

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
      }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        x.set(px);
        y.set(py);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="relative h-72 w-full overflow-hidden rounded-3xl border border-brand-deep/20 bg-white shadow-[0_18px_40px_rgba(26,23,20,0.11)]"
    >
      <div className="absolute inset-0" style={{ background: gradient }} />
      <div className="relative z-10 flex h-full flex-col justify-between p-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-deep/70">
            3D Product Mockup
          </p>
          <h4 className="mt-2 font-display text-2xl italic text-brand-deep">
            {feature.title}
          </h4>
          <p className="mt-2 text-sm text-ink-soft">{feature.visual}</p>
        </div>

        <div className="rounded-2xl border border-brand-deep/15 bg-white/80 p-3 backdrop-blur-sm">
          <div className="h-2 rounded-full bg-brand-deep/15" />
          <div className="mt-2 h-2 w-4/5 rounded-full bg-brand-bright/30" />
          <div className="mt-2 h-2 w-3/5 rounded-full bg-brand-deep/10" />
        </div>
      </div>
    </motion.div>
  );
}
