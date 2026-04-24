"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import {
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Activity,
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  BrainCircuit,
  HeartPulse,
  ShieldCheck,
  Star,
  Stethoscope,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { AnimatedSection } from "@/components/animated-section";
import { SiteFrame } from "@/components/layout/site-frame";
import { InlineWaitlistCta } from "@/components/waitlist/inline-waitlist-cta";
import { WaitlistForm } from "@/components/waitlist/waitlist-form";
import {
  FEATURES,
  HOW_IT_WORKS_STEPS,
  PROBLEM_SCENARIOS,
  TRUST_ITEMS,
} from "@/lib/content";
import { BASE_WAITLIST_COUNT } from "@/lib/waitlist-schema";

const HeroHeartScene = dynamic(() => import("@/components/three/hero-heart-scene"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full animate-pulse rounded-3xl bg-brand-deep/10" />
  ),
});

const SolutionPhoneScene = dynamic(
  () => import("@/components/three/solution-phone-scene"),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full animate-pulse rounded-3xl bg-brand-deep/10" />
    ),
  }
);

const scenarioIcons = [AlertTriangle, Activity, BrainCircuit];

function StatChip({ label }: { label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.7 });
  const [countedNumber, setCountedNumber] = useState<number | null>(null);

  const parsed = useMemo(() => {
    const match = label.match(/\d+/);
    if (!match) {
      return null;
    }

    return {
      value: Number(match[0]),
      index: match.index ?? 0,
      length: match[0].length,
      hasPlus: label.includes("+"),
    };
  }, [label]);

  useEffect(() => {
    if (!parsed || !isInView) {
      return;
    }

    const duration = 900;
    const startedAt = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startedAt;
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCountedNumber(Math.max(1, Math.round(parsed.value * eased)));

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }, [parsed, isInView]);

  const renderedText = useMemo(() => {
    if (!parsed || countedNumber === null) {
      return label;
    }

    const withSymbol = `${countedNumber}${parsed.hasPlus ? "+" : ""}`;
    return `${label.slice(0, parsed.index)}${withSymbol}${label.slice(
      parsed.index + parsed.length
    )}`;
  }, [countedNumber, label, parsed]);

  return (
    <div
      ref={ref}
      className="inline-flex rounded-full border border-brand-bright/40 bg-brand-bright/15 px-3 py-1 text-xs font-semibold text-brand-deep"
    >
      {renderedText}
    </div>
  );
}

function MobileFeatureAccordion() {
  const [openFeature, setOpenFeature] = useState(FEATURES[0]?.id);

  return (
    <div className="space-y-3 lg:hidden">
      {FEATURES.map((feature) => {
        const isOpen = openFeature === feature.id;
        return (
          <div
            key={feature.id}
            className="overflow-hidden rounded-2xl border border-brand-deep/15 bg-white"
          >
            <button
              type="button"
              onClick={() => setOpenFeature((prev) => (prev === feature.id ? "" : feature.id))}
              className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left"
            >
              <span className="font-display text-xl italic text-brand-deep">
                {feature.title}
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-deep/70">
                {isOpen ? "Hide" : "Open"}
              </span>
            </button>

            <motion.div
              initial={false}
              animate={{
                height: isOpen ? "auto" : 0,
                opacity: isOpen ? 1 : 0,
              }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="px-4"
            >
              <p className="pb-2 text-sm font-medium text-ink">{feature.problem}</p>
              <p className="pb-3 text-sm leading-relaxed text-ink-soft">{feature.how}</p>
              <div className="pb-4">
                <StatChip label={feature.stat} />
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

export function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const solutionRef = useRef<HTMLElement>(null);
  const flowRef = useRef<HTMLElement>(null);
  const [activeFeature, setActiveFeature] = useState(0);
  const [heroProgress, setHeroProgress] = useState(0);
  const [solutionProgress, setSolutionProgress] = useState(0);
  const [loadHero3D, setLoadHero3D] = useState(false);
  const [loadSolution3D, setLoadSolution3D] = useState(false);

  const heroScroll = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const solutionScroll = useScroll({
    target: solutionRef,
    offset: ["start end", "end start"],
  });

  const flowScroll = useScroll({
    target: flowRef,
    offset: ["start end", "end center"],
  });

  const isSolutionInView = useInView(solutionRef, {
    once: true,
    amount: 0.15,
  });

  const arrowOpacity = useTransform(heroScroll.scrollYProgress, [0, 0.25], [1, 0]);

  useMotionValueEvent(heroScroll.scrollYProgress, "change", (value) => {
    setHeroProgress(Math.min(1, Math.max(0, value * 1.45)));
  });

  useMotionValueEvent(solutionScroll.scrollYProgress, "change", (value) => {
    setSolutionProgress(Math.min(1, Math.max(0, value)));
  });

  useEffect(() => {
    let timeoutId: number | undefined;
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    if (w.requestIdleCallback) {
      const callbackId = w.requestIdleCallback(() => setLoadHero3D(true));
      return () => {
        if (w.cancelIdleCallback) {
          w.cancelIdleCallback(callbackId);
        }
      };
    }

    timeoutId = window.setTimeout(() => setLoadHero3D(true), 900);
    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (isSolutionInView) {
      setLoadSolution3D(true);
    }
  }, [isSolutionInView]);

  return (
    <SiteFrame>
      <section
        ref={heroRef}
        className="bg-grid-soft relative overflow-hidden px-4 pb-12 pt-28 sm:px-6 lg:px-10"
      >
        <div className="pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full bg-brand-bright/30 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 bottom-16 h-72 w-72 rounded-full bg-brand-deep/20 blur-3xl" />

        <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <AnimatedSection className="space-y-7">
            <p className="inline-flex w-max rounded-full border border-brand-deep/20 bg-white/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-brand-deep">
              AI-Powered Family Health Management for India
            </p>

            <h1 className="max-w-2xl font-display text-[2.25rem] italic leading-[1.04] text-ink sm:text-6xl">
              Your family&apos;s health history lives in a shoebox. It
              <span className="text-brand-deep"> shouldn&apos;t.</span>
            </h1>

            <p className="max-w-xl text-[1.05rem] leading-relaxed text-ink-soft sm:text-[1.18rem]">
              Every Indian family has crumpled prescriptions, forgotten lab
              reports, and medicines nobody remembers starting. When something
              goes wrong, you scramble. Cura AI changes that.
            </p>

            <InlineWaitlistCta />

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div className="flex -space-x-2">
                {["A", "R", "N"].map((initial) => (
                  <span
                    key={initial}
                    className="inline-flex size-9 items-center justify-center rounded-full border-2 border-cream bg-brand-deep text-xs font-semibold text-cream"
                  >
                    {initial}
                  </span>
                ))}
              </div>
              <p className="text-sm text-ink-soft">2,400+ families already joined</p>
              <div className="flex items-center gap-1 text-amber-500">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="size-4 fill-current" />
                ))}
              </div>
            </div>
          </AnimatedSection>

          <div className="relative h-[60vw] min-h-[320px] max-h-[560px] w-full sm:h-[56vh] lg:h-[68vh]">
            {loadHero3D ? (
              <HeroHeartScene progress={heroProgress} />
            ) : (
              <div className="h-full w-full rounded-3xl bg-brand-deep/10" />
            )}
          </div>
        </div>

        <motion.div
          style={{ opacity: arrowOpacity }}
          className="mt-10 flex justify-center lg:mt-4"
        >
          <div className="inline-flex animate-bounce flex-col items-center text-brand-deep">
            <ArrowDown className="size-5" />
            <span className="mt-1 text-xs uppercase tracking-[0.18em]">Scroll</span>
          </div>
        </motion.div>
      </section>

      <AnimatedSection className="bg-ink px-4 py-20 text-cream sm:px-6 lg:px-10" id="problem">
        <div className="mx-auto w-full max-w-7xl">
          <h2 className="max-w-4xl font-display text-4xl italic leading-tight text-cream sm:text-5xl">
            This is what managing health looks like for most Indian families.
          </h2>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {PROBLEM_SCENARIOS.map((scenario, index) => {
              const ScenarioIcon = scenarioIcons[index];
              return (
                <motion.article
                  key={scenario.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                  className="rounded-2xl border border-cream/15 bg-cream/5 p-6"
                >
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                    className="mb-4 inline-flex size-11 items-center justify-center rounded-xl bg-brand-bright/20 text-brand-bright"
                  >
                    <ScenarioIcon className="size-5" />
                  </motion.div>

                  <h3 className="font-display text-2xl italic">{scenario.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-cream/80">{scenario.text}</p>
                  <p className="mt-4 text-sm font-semibold text-brand-bright">
                    Cura AI solves this.
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      <section ref={solutionRef} id="solution" className="px-4 py-20 sm:px-6 lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <AnimatedSection className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-brand-deep">
              The Solution
            </p>
            <h2 className="mt-3 font-display text-4xl italic leading-tight text-ink sm:text-5xl">
              One intelligent health layer for your whole family.
            </h2>
            <p className="mt-4 text-lg text-ink-soft">
              Scroll through the full product experience and see how each feature
              removes one real-world family health pain point.
            </p>
          </AnimatedSection>

          <MobileFeatureAccordion />

          <div className="hidden gap-8 lg:grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="sticky top-28 h-[74vh]">
              {loadSolution3D ? (
                <SolutionPhoneScene
                  activeIndex={activeFeature}
                  progress={solutionProgress}
                  labels={FEATURES.map((feature) => feature.visual)}
                />
              ) : (
                <div className="h-full w-full rounded-3xl bg-brand-deep/10" />
              )}
            </div>

            <div className="space-y-14">
              {FEATURES.map((feature, index) => (
                <motion.article
                  key={feature.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5 }}
                  onViewportEnter={() => setActiveFeature(index)}
                  className="rounded-3xl border border-brand-deep/15 bg-white p-7 shadow-sm"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-deep/70">
                    Feature {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 font-display text-3xl italic text-brand-deep">
                    {feature.title}
                  </h3>
                  <p className="mt-4 text-sm font-semibold text-ink">{feature.problem}</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{feature.how}</p>
                  <div className="mt-4">
                    <StatChip label={feature.stat} />
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <AnimatedSection
        ref={flowRef}
        id="how-it-works"
        className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-10"
      >
        <div className="mx-auto w-full max-w-5xl text-center">
          <h2 className="font-display text-4xl italic text-ink sm:text-5xl">
            How it works in 3 steps
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-soft">
            Simple enough for your family. Powerful enough for your doctor.
          </p>

          <div className="relative mx-auto mt-14 max-w-3xl space-y-10">
            <svg
              className="pointer-events-none absolute left-1/2 top-12 hidden h-[72%] -translate-x-1/2 lg:block"
              viewBox="0 0 20 440"
              fill="none"
            >
              <motion.path
                d="M10 0 L10 440"
                stroke="#52B788"
                strokeWidth="2.5"
                style={{ pathLength: flowScroll.scrollYProgress }}
              />
            </svg>

            {HOW_IT_WORKS_STEPS.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative rounded-3xl border border-brand-deep/15 bg-white px-6 py-7 text-left shadow-sm"
              >
                <span className="inline-flex size-12 items-center justify-center rounded-full bg-brand-deep text-lg font-bold text-cream">
                  {index + 1}
                </span>
                <h3 className="mt-4 font-display text-3xl italic text-brand-deep">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{step.text}</p>

                {index < HOW_IT_WORKS_STEPS.length - 1 ? (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    whileInView={{ width: 80, opacity: 1 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 0.45, delay: 0.15 }}
                    className="mt-5 inline-flex items-center gap-2 text-brand-deep"
                  >
                    <span className="h-px flex-1 bg-brand-deep" />
                    <ArrowRight className="size-4" />
                  </motion.div>
                ) : null}
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="bg-brand-bright/16 px-4 py-20 sm:px-6 lg:px-10" id="trust">
        <div className="mx-auto w-full max-w-7xl">
          <h2 className="font-display text-4xl italic text-brand-deep sm:text-5xl">
            Your health data belongs to you. Always.
          </h2>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TRUST_ITEMS.map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45 }}
                className="rounded-2xl border border-brand-deep/15 bg-white p-5"
              >
                <ShieldCheck className="size-5 text-brand-deep" />
                <p className="mt-3 text-sm font-medium leading-relaxed text-ink-soft">
                  {item}
                </p>
              </motion.div>
            ))}
          </div>

          <p className="mt-8 max-w-3xl rounded-2xl border border-brand-deep/15 bg-white/80 p-5 text-sm text-ink-soft">
            We are building toward ABDM and ABHA integration so your records work
            with India&apos;s national health system.
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection className="bg-cream px-4 pb-24 pt-20 sm:px-6 lg:px-10" id="waitlist">
        <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-coral">
              Primary CTA
            </p>
            <h2 className="mt-3 max-w-xl font-display text-5xl italic leading-tight text-ink">
              Be the family that&apos;s prepared.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
              Join the waitlist. Get early access, a founding member badge, and
              help us build this for every Indian family.
            </p>

            <div className="mt-8 grid gap-3 text-sm text-ink-soft sm:grid-cols-2">
              <div className="flex items-center gap-2 rounded-xl border border-brand-deep/15 bg-white px-3 py-2">
                <HeartPulse className="size-4 text-brand-deep" />
                <span>Family-first emergency readiness</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-brand-deep/15 bg-white px-3 py-2">
                <Stethoscope className="size-4 text-brand-deep" />
                <span>Doctor-friendly history sharing</span>
              </div>
            </div>

            <p className="mt-6 text-sm text-ink-soft">
              Trusted by {BASE_WAITLIST_COUNT.toLocaleString("en-IN")}+ families
              even before launch.
            </p>
          </div>

          <WaitlistForm source="homepage-main" />
        </div>
      </AnimatedSection>

      <section className="px-4 pb-24 sm:px-6 lg:px-10">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between rounded-3xl bg-brand-deep px-6 py-8 text-cream">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-cream/70">
              Need details first?
            </p>
            <p className="mt-1 font-display text-3xl italic">
              Explore every feature in depth.
            </p>
          </div>
          <Link
            href="/features"
            className="inline-flex h-11 items-center rounded-full bg-cream px-5 text-sm font-semibold text-brand-deep"
          >
            View Features
          </Link>
        </div>
      </section>
    </SiteFrame>
  );
}
