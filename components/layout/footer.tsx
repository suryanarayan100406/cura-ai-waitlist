import Link from "next/link";
import type { ReactNode } from "react";

import { BrandLogo } from "@/components/brand-logo";

function SocialIcon({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex size-4 items-center justify-center">{children}</span>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-4 lg:px-10">
        <div className="space-y-4">
          <BrandLogo
            textClassName="text-cream"
            iconClassName="drop-shadow-[0_2px_10px_rgba(82,183,136,0.35)]"
            className="w-max"
          />
          <p className="max-w-xs text-sm text-cream/80">
            Building AI-powered family health memory for India, so no family
            scrambles in a medical moment.
          </p>
          <div className="flex items-center gap-3 pt-1">
            <Link
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex size-9 items-center justify-center rounded-full border border-cream/20 text-cream/80 transition hover:border-cream/50 hover:text-cream"
              aria-label="Cura AI on X"
            >
              <SocialIcon>
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.9 2h3.3l-7.2 8.2L23.5 22h-6.7l-5.2-6.8L5.6 22H2.3l7.8-9L2 2h6.9l4.7 6.2L18.9 2Zm-1.2 18h1.8L7.8 3.9H5.9L17.7 20Z" />
                </svg>
              </SocialIcon>
            </Link>
            <Link
              href="https://www.linkedin.com/company/cura--ai"
              target="_blank"
              rel="noreferrer"
              className="inline-flex size-9 items-center justify-center rounded-full border border-cream/20 text-cream/80 transition hover:border-cream/50 hover:text-cream"
              aria-label="Cura AI on LinkedIn"
            >
              <SocialIcon>
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M6.8 8.7H3.4V20h3.4V8.7ZM5.1 3.2a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM20.6 13.5c0-3.5-1.9-5.1-4.4-5.1-2 0-2.9 1.1-3.4 1.9v-1.6H9.4c0 1.1 0 11.3 0 11.3h3.4v-6.3c0-.3 0-.7.1-1 .3-.7 1-1.4 2.1-1.4 1.5 0 2.1 1.1 2.1 2.8v5.9h3.4v-6.5Z" />
                </svg>
              </SocialIcon>
            </Link>
            <Link
              href="https://www.instagram.com/cura.aii"
              target="_blank"
              rel="noreferrer"
              className="inline-flex size-9 items-center justify-center rounded-full border border-cream/20 text-cream/80 transition hover:border-cream/50 hover:text-cream"
              aria-label="Cura AI on Instagram"
            >
              <SocialIcon>
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect
                    x="3.5"
                    y="3.5"
                    width="17"
                    height="17"
                    rx="5"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" />
                </svg>
              </SocialIcon>
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-cream/70">
            Product
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-cream/85">
            <li>
              <Link href="/features" className="hover:text-cream">
                Features
              </Link>
            </li>
            <li>
              <Link href="/#how-it-works" className="hover:text-cream">
                How It Works
              </Link>
            </li>
            <li>
              <Link href="/waitlist" className="hover:text-cream">
                Waitlist
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-cream/70">
            Company
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-cream/85">
            <li>
              <Link href="/about" className="hover:text-cream">
                About
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-cream">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-cream">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-cream/70">
            Contact
          </h3>
          <div className="mt-4 space-y-3 text-sm text-cream/85">
            <a href="mailto:hello@curai.health" className="block hover:text-cream">
              hello@curai.health
            </a>
            <p>Built in India, for India 🇮🇳</p>
          </div>
        </div>
      </div>

      <div className="border-t border-cream/10 px-4 py-4 sm:px-6 lg:px-10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 text-xs text-cream/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Cura AI. All rights reserved.</p>
          <p>No ads. No selling your data. Just health.</p>
        </div>
      </div>
    </footer>
  );
}
