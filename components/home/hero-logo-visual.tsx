"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const floatingCards = [
  { label: "Prescription scan digitized", position: "top-6 right-6" },
  { label: "Family health timeline ready", position: "left-4 bottom-16" },
  { label: "Vitals stabilized", position: "right-10 bottom-8" },
] as const;

export function HeroLogoVisual() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[2rem] border border-brand-deep/15 bg-gradient-to-br from-white to-brand-bright/10 shadow-[0_16px_40px_rgba(26,23,20,0.12)]">
      <div className="absolute -left-14 -top-14 h-44 w-44 rounded-full bg-brand-bright/25 blur-3xl" />
      <div className="absolute -bottom-16 right-0 h-56 w-56 rounded-full bg-brand-deep/25 blur-3xl" />

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Image
          src="/cura-logo.png"
          alt="Cura AI heart logo"
          width={430}
          height={430}
          priority
          sizes="(max-width: 1024px) 55vw, 430px"
          className="h-auto w-[74%] min-w-[210px] max-w-[430px] object-contain drop-shadow-[0_18px_26px_rgba(45,106,79,0.26)] sm:w-[62%]"
        />
      </motion.div>

      {floatingCards.map((card, index) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: [0, -6, 0] }}
          transition={{
            opacity: { delay: 0.25 + index * 0.12, duration: 0.45 },
            y: {
              duration: 3 + index * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.22,
            },
          }}
          className={`glass-card absolute ${card.position} hidden max-w-[200px] rounded-xl px-3 py-2 text-xs font-medium text-ink shadow-md sm:block`}
        >
          {card.label}
        </motion.div>
      ))}
    </div>
  );
}
