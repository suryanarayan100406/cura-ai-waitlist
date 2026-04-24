import Image from "next/image";

import { AnimatedSection } from "@/components/animated-section";
import { SiteFrame } from "@/components/layout/site-frame";
import { WaitlistForm } from "@/components/waitlist/waitlist-form";
import { TEAM_PLACEHOLDERS } from "@/lib/content";

const placeholderPortrait =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nODAwJyBoZWlnaHQ9JzUwMCcgdmlld0JveD0nMCAwIDgwMCA1MDAnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSdnJyB4MT0nMCcgeTE9JzAnIHgyPScxJyB5Mj0nMSc+PHN0b3Agc3RvcC1jb2xvcj0nIzJENkE0Ricgb2Zmc2V0PScwJy8+PHN0b3Agc3RvcC1jb2xvcj0nIzUyQjc4OCcgb2Zmc2V0PScxJy8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9JzgwMCcgaGVpZ2h0PSc1MDAnIGZpbGw9InVybCgjZykiLz48Y2lyY2xlIGN4PSc0MDAnIGN5PScyNDAnIHI9JzkwJyBmaWxsPSdyZ2JhKDI1MCwyNDgsMjQzLDAuMzUpJy8+PHJlY3QgeD0nMjcwJyB5PSczMzAnIHdpZHRoPScyNjAnIGhlaWdodD0nMTEwJyByeD0nNTUnIGZpbGw9J3JnYmEoMjUwLDI0OCwyNDMsMC4yOCknLz48L3N2Zz4=";

export default function AboutPage() {
  return (
    <SiteFrame>
      <section className="bg-grid-soft px-4 pb-16 pt-28 sm:px-6 lg:px-10">
        <div className="mx-auto w-full max-w-6xl">
          <AnimatedSection className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-brand-deep">
              About Cura AI
            </p>
            <h1 className="mt-3 font-display text-5xl italic leading-tight text-ink sm:text-6xl">
              We built this because we lived it.
            </h1>
          </AnimatedSection>

          <div className="mt-8 grid gap-7 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
            <AnimatedSection className="space-y-5 text-base leading-relaxed text-ink-soft">
              <p>
                Cura AI started from a familiar moment in Indian homes: a sudden
                hospital visit, followed by panic, because nobody could find the
                latest prescription, remember dosages, or explain medical history
                clearly under pressure.
              </p>
              <p>
                Across families, records are fragmented across WhatsApp chats,
                clinic files, pharmacy bills, and memory. We wanted to build a
                system that feels human and practical: one place where every
                report, medicine, and medical decision actually stays connected.
              </p>
              <p>
                We are combining AI with thoughtful product design to make family
                health management less chaotic and more confident, especially for
                those caring for aging parents and children across busy schedules.
              </p>
            </AnimatedSection>

            <AnimatedSection className="rounded-3xl border border-brand-deep/15 bg-white p-4 shadow-sm">
              <Image
                src={placeholderPortrait}
                alt="Cura AI mission placeholder"
                width={800}
                height={500}
                placeholder="blur"
                blurDataURL={placeholderPortrait}
                unoptimized
                className="h-auto w-full rounded-2xl"
              />
              <blockquote className="mt-4 border-l-2 border-brand-bright pl-4 font-display text-2xl italic leading-tight text-brand-deep">
                &ldquo;Every Indian family deserves a doctor-quality understanding of
                their own health.&rdquo;
              </blockquote>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <AnimatedSection className="px-4 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto w-full max-w-6xl text-center">
          <h2 className="font-display text-4xl italic text-brand-deep sm:text-5xl">
            Every Indian family deserves a doctor-quality understanding of their
            own health.
          </h2>
        </div>
      </AnimatedSection>

      <AnimatedSection className="px-4 py-10 sm:px-6 lg:px-10">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="font-display text-4xl italic text-ink">The team</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {TEAM_PLACEHOLDERS.map((member) => (
              <article
                key={member.name}
                className="rounded-2xl border border-brand-deep/15 bg-white p-5 shadow-sm"
              >
                <div className="mb-4 h-44 rounded-xl bg-gradient-to-br from-brand-deep/20 to-brand-bright/25" />
                <h3 className="font-display text-2xl italic text-brand-deep">
                  {member.name}
                </h3>
                <p className="mt-2 text-sm text-ink-soft">{member.title}</p>
              </article>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="px-4 py-12 sm:px-6 lg:px-10">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="font-display text-4xl italic text-ink">Backed by</h2>
          <p className="mt-2 text-sm text-ink-soft">Coming soon</p>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-24 rounded-xl border border-dashed border-brand-deep/25 bg-white"
              />
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="px-4 pb-24 pt-12 sm:px-6 lg:px-10">
        <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1fr_0.95fr]">
          <div>
            <h2 className="font-display text-5xl italic text-ink">
              Join the founding waitlist.
            </h2>
            <p className="mt-4 max-w-lg text-lg text-ink-soft">
              Help us shape Cura AI into the most trusted family health platform
              for India.
            </p>
          </div>
          <WaitlistForm source="about-page" />
        </div>
      </AnimatedSection>
    </SiteFrame>
  );
}
