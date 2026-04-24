import { ArrowRight, BadgeCheck, Sparkles } from "lucide-react";

import { AnimatedSection } from "@/components/animated-section";
import { SiteFrame } from "@/components/layout/site-frame";
import { FaqAccordion } from "@/components/waitlist/faq-accordion";
import { WaitlistForm } from "@/components/waitlist/waitlist-form";
import {
  FOUNDING_MEMBER_BENEFITS,
  PROBLEM_SCENARIOS,
  WAITLIST_FAQ,
  WAITLIST_TESTIMONIALS,
} from "@/lib/content";

export default function WaitlistPage() {
  return (
    <SiteFrame>
      <section className="bg-grid-soft px-4 pb-16 pt-28 sm:px-6 lg:px-10">
        <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <AnimatedSection>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-coral">
              Founding Waitlist
            </p>
            <h1 className="mt-3 max-w-3xl font-display text-5xl italic leading-tight text-ink sm:text-6xl">
              Be the family that is prepared.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
              Join the waitlist to get early access and shape the product with us.
            </p>

            <div className="mt-8 space-y-3">
              {PROBLEM_SCENARIOS.map((scenario) => (
                <div
                  key={scenario.title}
                  className="flex items-start gap-2 rounded-xl border border-brand-deep/15 bg-white px-4 py-3"
                >
                  <ArrowRight className="mt-0.5 size-4 shrink-0 text-brand-deep" />
                  <p className="text-sm text-ink-soft">
                    <span className="font-semibold text-ink">{scenario.title}: </span>
                    {scenario.text.split(".")[0]}.
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <WaitlistForm source="waitlist-page-hero" />
        </div>
      </section>

      <AnimatedSection className="px-4 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <h2 className="font-display text-4xl italic text-ink sm:text-5xl">
            What you get as a founding member
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {FOUNDING_MEMBER_BENEFITS.map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-3 rounded-2xl border border-brand-deep/15 bg-white p-4"
              >
                <BadgeCheck className="size-5 text-brand-deep" />
                <p className="text-sm text-ink-soft">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="px-4 py-8 sm:px-6 lg:px-10">
        <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1fr_0.95fr]">
          <div>
            <h2 className="font-display text-4xl italic text-ink">Frequently asked questions</h2>
            <p className="mt-3 max-w-lg text-sm text-ink-soft">
              Common questions on product scope, privacy, launch access, and
              pricing.
            </p>
          </div>
          <FaqAccordion items={WAITLIST_FAQ} />
        </div>
      </AnimatedSection>

      <AnimatedSection className="px-4 py-10 sm:px-6 lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <h2 className="font-display text-4xl italic text-ink">What families are saying</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {WAITLIST_TESTIMONIALS.map((item) => (
              <article
                key={item.initials}
                className="rounded-2xl border border-brand-deep/15 bg-white p-5"
              >
                <div className="inline-flex size-10 items-center justify-center rounded-full bg-brand-deep text-sm font-semibold text-cream">
                  {item.initials}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-brand-deep/70">
                  {item.role}
                </p>
              </article>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="px-4 pb-24 pt-8 sm:px-6 lg:px-10">
        <div className="mx-auto grid w-full max-w-7xl gap-8 rounded-3xl bg-brand-deep px-6 py-8 text-cream lg:grid-cols-[1fr_0.95fr] lg:items-start lg:px-8">
          <div>
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-cream/70">
              <Sparkles className="size-4" />
              Final Step
            </p>
            <h2 className="mt-3 font-display text-5xl italic leading-tight">
              Join before public launch.
            </h2>
            <p className="mt-4 max-w-lg text-sm text-cream/80">
              Founding members get access first, influence key workflows, and
              help us build the most trusted family health memory system in India.
            </p>
          </div>

          <WaitlistForm source="waitlist-page-bottom" className="bg-cream text-ink" />
        </div>
      </AnimatedSection>
    </SiteFrame>
  );
}
