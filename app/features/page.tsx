"use client";

import { motion } from "framer-motion";
import {
  Baby,
  BriefcaseMedical,
  Heart,
  UserRound,
  Users,
} from "lucide-react";

import { SiteFrame } from "@/components/layout/site-frame";
import { TiltMockup } from "@/components/features/tilt-mockup";
import { FEATURES } from "@/lib/content";

const helpIcons = {
  Self: UserRound,
  Parents: Users,
  Elderly: Heart,
  Kids: Baby,
  "Healthcare Professional": BriefcaseMedical,
} as const;

export default function FeaturesPage() {
  return (
    <SiteFrame>
      <section className="bg-grid-soft px-4 pb-16 pt-28 sm:px-6 lg:px-10">
        <div className="mx-auto w-full max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-brand-deep">
            Product Deep-Dive
          </p>
          <h1 className="mt-3 max-w-4xl font-display text-5xl italic leading-tight text-ink sm:text-6xl">
            Every feature is built around a real family health panic moment.
          </h1>
          <p className="mt-5 max-w-3xl text-lg text-ink-soft">
            Cura AI combines intelligent record parsing, timeline reasoning, and
            family-first workflows so health decisions happen with context,
            clarity, and speed.
          </p>
        </div>
      </section>

      <div className="space-y-5 px-4 pb-24 sm:px-6 lg:px-10">
        {FEATURES.map((feature, index) => (
          <motion.section
            key={feature.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.55 }}
            className="mx-auto w-full max-w-6xl rounded-3xl border border-brand-deep/15 bg-white p-6 shadow-sm sm:p-8"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-deep/70">
              Feature {String(index + 1).padStart(2, "0")}
            </p>
            <h2 className="mt-2 font-display text-4xl italic text-brand-deep">
              {feature.title}
            </h2>
            <p className="mt-3 max-w-3xl text-base font-semibold text-ink">
              {feature.problem}
            </p>

            <div className="mt-7 grid gap-8 lg:grid-cols-[1fr_0.92fr] lg:items-center">
              <div>
                <p className="text-base leading-relaxed text-ink-soft">{feature.how}</p>

                <div className="mt-5 inline-flex rounded-full border border-brand-bright/40 bg-brand-bright/15 px-4 py-1 text-xs font-semibold text-brand-deep">
                  {feature.stat}
                </div>

                <div className="mt-6">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-deep/70">
                    Who this helps
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {feature.helps.map((group) => {
                      const HelpIcon =
                        helpIcons[group as keyof typeof helpIcons] ?? UserRound;
                      return (
                        <span
                          key={`${feature.id}-${group}`}
                          className="inline-flex items-center gap-1.5 rounded-full border border-brand-deep/15 bg-cream px-3 py-1 text-xs font-medium text-ink"
                        >
                          <HelpIcon className="size-3.5 text-brand-deep" />
                          {group}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <p className="mt-6 text-xs leading-relaxed text-ink-soft">
                  Technical note: {feature.technicalDetail}
                </p>
              </div>

              <TiltMockup feature={feature} />
            </div>
          </motion.section>
        ))}
      </div>
    </SiteFrame>
  );
}
