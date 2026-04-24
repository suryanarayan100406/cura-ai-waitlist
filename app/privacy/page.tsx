import { SiteFrame } from "@/components/layout/site-frame";

const lastUpdated = "April 24, 2026";

export default function PrivacyPage() {
  return (
    <SiteFrame>
      <section className="px-4 pb-24 pt-28 sm:px-6 lg:px-10">
        <article className="mx-auto w-full max-w-4xl rounded-3xl border border-brand-deep/15 bg-white p-7 shadow-sm sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-brand-deep">
            Privacy Policy
          </p>
          <h1 className="mt-3 font-display text-5xl italic leading-tight text-ink">
            Your trust is the product.
          </h1>
          <p className="mt-4 text-sm text-ink-soft">Last updated: {lastUpdated}</p>

          <section className="mt-10 space-y-4">
            <h2 className="font-display text-3xl italic text-brand-deep">
              What we collect and why
            </h2>
            <p className="text-sm leading-relaxed text-ink-soft">
              We collect the information required to provide health record
              organization and analysis services: profile details, uploaded
              prescriptions and reports, family profile metadata, and product
              usage diagnostics needed for reliability and security.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="font-display text-3xl italic text-brand-deep">
              How it is stored
            </h2>
            <p className="text-sm leading-relaxed text-ink-soft">
              Our infrastructure uses Supabase with India-region hosting where
              available and encrypted transport and storage controls. Access is
              role-restricted and logged for security and compliance review.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="font-display text-3xl italic text-brand-deep">
              What we will never do
            </h2>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink-soft">
              <li>Sell your health data to insurers or data brokers</li>
              <li>Use your records to run third-party advertising</li>
              <li>Share your personal data without lawful basis or consent</li>
            </ul>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="font-display text-3xl italic text-brand-deep">
              Your rights
            </h2>
            <p className="text-sm leading-relaxed text-ink-soft">
              You can request data export, deletion, correction, and account
              closure. You may also ask how your data is processed and withdraw
              non-essential processing consent where applicable.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="font-display text-3xl italic text-brand-deep">
              Contact for privacy concerns
            </h2>
            <p className="text-sm leading-relaxed text-ink-soft">
              Email us at hello@curai.health with subject line
              &nbsp;&ldquo;Privacy Request&rdquo;&nbsp;and we will respond as quickly as
              possible.
            </p>
          </section>
        </article>
      </section>
    </SiteFrame>
  );
}
