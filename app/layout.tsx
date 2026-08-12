import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Suspense } from "react";
import { SiteEffects } from "@/components/SiteEffects";
import { Preloader } from "@/components/Preloader";
import { PageTransition } from "@/components/PageTransition";

export const metadata: Metadata = {
  title: {
    default: "PHNTM",
    template: "%s · PHNTM",
  },
  description:
    "PHNTM designs, builds, and runs the biggest live moments in entertainment.",
  metadataBase: new URL("https://www.phntm.com"),
  openGraph: {
    title: "PHNTM - An Experience Company",
    description:
      "PHNTM designs, builds, and runs the biggest live moments in entertainment.",
    type: "website",
    siteName: "PHNTM",
  },
  twitter: {
    card: "summary",
    title: "PHNTM - An Experience Company",
    description:
      "PHNTM designs, builds, and runs the biggest live moments in entertainment.",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="reveal-ready" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Preloader />
        {children}
        <Suspense fallback={null}>
          <SiteEffects />
        </Suspense>
        <Suspense fallback={null}>
          <PageTransition />
        </Suspense>
      </body>
    </html>
  );
}
