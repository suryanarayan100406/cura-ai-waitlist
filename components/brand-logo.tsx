import Image from "next/image";
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
      <Image
        src="/cura-logo.png"
        alt="Cura AI logo"
        width={40}
        height={40}
        className={cn("size-9 object-contain", iconClassName)}
      />
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
