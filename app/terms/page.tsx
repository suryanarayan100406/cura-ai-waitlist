import { SiteFrame } from "@/components/layout/site-frame";

export default function TermsPage() {
  return (
    <SiteFrame>
      <section className="px-4 pb-24 pt-28 sm:px-6 lg:px-10">
        <article className="mx-auto w-full max-w-4xl rounded-3xl border border-brand-deep/15 bg-white p-7 shadow-sm sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-brand-deep">
            Terms of Service
          </p>
          <h1 className="mt-3 font-display text-5xl italic leading-tight text-ink">
            Clear terms, patient-first intent.
          </h1>

          <section className="mt-10 space-y-4">
            <h2 className="font-display text-3xl italic text-brand-deep">
              Acceptance of terms
            </h2>
            <p className="text-sm leading-relaxed text-ink-soft">
              By using Cura AI, you agree to these terms and any related
              policies. If you disagree, please discontinue use of the platform.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="font-display text-3xl italic text-brand-deep">
              What Cura AI is
            </h2>
            <p className="text-sm leading-relaxed text-ink-soft">
              Cura AI is a health record organization and interpretation aid. It
              is not a regulated medical device and does not issue clinical
              diagnoses.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="font-display text-3xl italic text-brand-deep">
              Medical disclaimer
            </h2>
            <p className="text-sm leading-relaxed text-ink-soft">
              AI summaries and second-opinion style outputs are informational.
              They do not replace licensed medical advice, diagnosis, or
              treatment. Always consult a qualified doctor.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="font-display text-3xl italic text-brand-deep">
              User responsibilities
            </h2>
            <p className="text-sm leading-relaxed text-ink-soft">
              You are responsible for account security, lawful use, and ensuring
              that uploaded data belongs to you or is shared with valid consent.
              Misuse may lead to suspension.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="font-display text-3xl italic text-brand-deep">
              Intellectual property
            </h2>
            <p className="text-sm leading-relaxed text-ink-soft">
              Cura AI branding, software, and content are protected intellectual
              property. You receive a limited, non-transferable right to use the
              service according to these terms.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="font-display text-3xl italic text-brand-deep">
              Termination
            </h2>
            <p className="text-sm leading-relaxed text-ink-soft">
              We may suspend or terminate access for violations, abuse, or legal
              requirements. You may stop using Cura AI at any time.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="font-display text-3xl italic text-brand-deep">
              Governing law
            </h2>
            <p className="text-sm leading-relaxed text-ink-soft">
              These terms are governed by the laws of India. Jurisdiction and
              dispute resolution processes apply under applicable Indian law.
            </p>
          </section>
        </article>
      </section>
    </SiteFrame>
  );
}
