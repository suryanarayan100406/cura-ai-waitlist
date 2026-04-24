"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { BrandLogo } from "@/components/brand-logo";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/features", label: "Features" },
  { href: "/about", label: "About" },
  { href: "/privacy", label: "Privacy" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b border-transparent transition-all duration-300",
          isScrolled &&
            "border-brand-deep/12 bg-[rgba(250,248,243,0.9)] backdrop-blur-xl"
        )}
      >
        <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-10">
          <BrandLogo />

          <nav className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "nav-link text-sm font-medium tracking-wide text-ink",
                  pathname === link.href && "text-brand-deep"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Link
              href="/waitlist"
              className="inline-flex h-11 items-center rounded-full bg-brand-deep px-5 text-sm font-semibold text-cream transition-transform hover:-translate-y-0.5 hover:bg-brand-bright"
            >
              Join Waitlist
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-deep/20 bg-cream text-brand-deep md:hidden"
            aria-label="Toggle menu"
            onClick={() => setIsMobileOpen((prev) => !prev)}
          >
            {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMobileOpen ? (
          <motion.div
            initial={{ y: -24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -24, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-40 bg-cream pt-24 md:hidden"
          >
            <div className="flex h-full flex-col px-6 pb-10">
              <div className="space-y-5 pt-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block border-b border-brand-deep/10 pb-4 font-display text-4xl italic text-brand-deep"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="mt-auto">
                <Link
                  href="/waitlist"
                  className="inline-flex h-12 w-full items-center justify-center rounded-full bg-brand-deep text-base font-semibold text-cream"
                >
                  Join Waitlist
                </Link>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
