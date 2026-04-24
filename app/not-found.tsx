import Link from "next/link";

import { BrandLogo } from "@/components/brand-logo";

export default function NotFound() {
  return (
    <main className="bg-grid-soft flex min-h-screen items-center justify-center px-4 py-20 sm:px-6 lg:px-10">
      <div className="w-full max-w-xl rounded-3xl border border-brand-deep/15 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto w-max">
          <BrandLogo />
        </div>
        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-brand-deep/70">
          404
        </p>
        <h1 className="mt-2 font-display text-5xl italic text-ink">Page not found</h1>
        <p className="mt-4 text-sm text-ink-soft">
          The page you are looking for does not exist. Let us get you back to
          your family health command center.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-full bg-brand-deep px-5 text-sm font-semibold text-cream"
          >
            Go Home
          </Link>
          <Link
            href="/waitlist"
            className="inline-flex h-11 items-center justify-center rounded-full border border-brand-deep/25 px-5 text-sm font-semibold text-brand-deep"
          >
            Join Waitlist
          </Link>
        </div>
      </div>
    </main>
  );
}
