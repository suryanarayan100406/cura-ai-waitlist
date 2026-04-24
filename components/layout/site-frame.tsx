import type { ReactNode } from "react";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

interface SiteFrameProps {
  children: ReactNode;
  hideFooter?: boolean;
}

export function SiteFrame({ children, hideFooter = false }: SiteFrameProps) {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <Navbar />
      <main>{children}</main>
      {hideFooter ? null : <Footer />}
    </div>
  );
}
