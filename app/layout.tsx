import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cura AI | Family Health Management for India",
  description:
    "Cura AI helps Indian families organize prescriptions, reports, and health history in one trusted place. Join the waitlist.",
  metadataBase: new URL("https://curai.health"),
  openGraph: {
    title: "Cura AI",
    description:
      "AI-powered family health management built for India. Join the waitlist.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN">
      <body className={`${instrumentSerif.variable} ${dmSans.variable} font-body`}>
        {children}
      </body>
    </html>
  );
}
