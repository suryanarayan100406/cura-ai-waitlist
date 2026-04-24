import Link from "next/link";

import { BrandLogo } from "@/components/brand-logo";
import { SiteFrame } from "@/components/layout/site-frame";

interface ThankYouPageProps {
  searchParams?: {
    emailSent?: string | string[];
    email?: string | string[];
    source?: string | string[];
  };
}

function firstValue(value: string | string[] | undefined): string | undefined {
  if (!value) {
    return undefined;
  }
  return Array.isArray(value) ? value[0] : value;
}

function isTruthyFlag(value: string | undefined): boolean {
  return value === "1" || value === "true" || value === "yes";
}

export default function ThankYouPage({ searchParams }: ThankYouPageProps) {
  const emailSent = isTruthyFlag(firstValue(searchParams?.emailSent));
  const email = firstValue(searchParams?.email);

  return (
    <SiteFrame>
      <section className="bg-grid-soft px-4 pb-24 pt-28 sm:px-6 lg:px-10">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
          <div className="mb-6">
            <BrandLogo />
          </div>

          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-deep">
            Thank you
          </p>
          <h1 className="mt-3 font-display text-5xl italic leading-tight text-ink sm:text-6xl">
            You&apos;re on the waitlist.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
            {emailSent
              ? "We sent a confirmation email. Keep an eye on your inbox for early-access updates."
              : "Your signup is confirmed. Keep an eye on your inbox for early-access updates."}
          </p>

          {email ? (
            <p className="mt-4 rounded-full border border-brand-deep/15 bg-white px-4 py-2 text-sm text-ink-soft">
              Confirmation sent to <span className="font-semibold text-ink">{email}</span>
            </p>
          ) : null}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/waitlist"
              className="inline-flex h-11 items-center justify-center rounded-full bg-brand-deep px-5 text-sm font-semibold text-cream"
            >
              Back to Waitlist
            </Link>
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center rounded-full border border-brand-deep/20 px-5 text-sm font-semibold text-brand-deep"
            >
              Go Home
            </Link>
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}
