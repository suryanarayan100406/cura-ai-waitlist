import Link from "next/link";

import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  showWordmark?: boolean;
  href?: string;
}

export function BrandLogo({
  className,
  iconClassName,
  textClassName,
  showWordmark = true,
  href = "/",
}: BrandLogoProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 transition-opacity hover:opacity-90",
        className
      )}
      aria-label="Cura AI home"
    >
      <svg
        viewBox="0 0 64 64"
        role="img"
        aria-hidden="true"
        className={cn("size-9", iconClassName)}
      >
        <defs>
          <linearGradient id="cura-heart" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2D6A4F" />
            <stop offset="100%" stopColor="#52B788" />
          </linearGradient>
        </defs>
        <path
          d="M32 56C30.7 56 29.4 55.5 28.4 54.6L11.8 39.3C6.8 34.8 4 30.6 4 24.8C4 15.6 11 9 20.1 9C25.3 9 30.2 11.5 32.9 15.3C35.6 11.5 40.5 9 45.7 9C54.8 9 61.8 15.6 61.8 24.8C61.8 30.6 59 34.8 54 39.3L37.4 54.6C36.6 55.5 35.3 56 34 56H32Z"
          fill="url(#cura-heart)"
        />
        <g stroke="#EAF7F0" strokeWidth="1.5" opacity="0.9">
          <line x1="20" y1="25" x2="31" y2="20" />
          <line x1="31" y1="20" x2="42" y2="24" />
          <line x1="31" y1="20" x2="30" y2="34" />
          <line x1="30" y1="34" x2="44" y2="36" />
          <line x1="20" y1="25" x2="24" y2="37" />
          <line x1="24" y1="37" x2="30" y2="34" />
        </g>
        <g fill="#FAF8F3">
          <circle cx="20" cy="25" r="2" />
          <circle cx="31" cy="20" r="2" />
          <circle cx="42" cy="24" r="2" />
          <circle cx="24" cy="37" r="2" />
          <circle cx="30" cy="34" r="2" />
          <circle cx="44" cy="36" r="2" />
        </g>
      </svg>
      {showWordmark ? (
        <span
          className={cn(
            "font-display text-2xl italic leading-none tracking-tight text-brand-deep",
            textClassName
          )}
        >
          Cura AI
        </span>
      ) : null}
    </Link>
  );
}
