import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Suspense } from "react";
import { SiteEffects } from "@/components/SiteEffects";
import { Preloader } from "@/components/Preloader";
import { PageTransition } from "@/components/PageTransition";
import { JsonLd } from "@/components/JsonLd";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { GA_MEASUREMENT_ID, isGaEnabled } from "@/lib/analytics";
import { SITE_URL } from "@/lib/paths";

const SITE_DESCRIPTION =
  "PHNTM designs, builds, and runs the biggest live moments in entertainment.";

export const metadata: Metadata = {
  title: {
    default: "PHNTM",
    template: "%s · PHNTM",
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "PHNTM — An Experience Company",
    description: SITE_DESCRIPTION,
    type: "website",
    siteName: "PHNTM",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "PHNTM — An Experience Company",
    description: SITE_DESCRIPTION,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "PHNTM",
  alternateName: "PHNTM Experience Company",
  url: SITE_URL,
  logo: `${SITE_URL}/brand/logo-primary-black.svg`,
  description: SITE_DESCRIPTION,
  email: "hello@phntm.com",
  sameAs: [
    "https://www.instagram.com/phntm/",
    "https://www.linkedin.com/company/phntmla",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@phntm.com",
    contactType: "sales",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "PHNTM",
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  publisher: {
    "@type": "Organization",
    name: "PHNTM",
    url: SITE_URL,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="reveal-ready" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <JsonLd data={[organizationJsonLd, websiteJsonLd]} />
        {isGaEnabled() ? (
          <Suspense fallback={null}>
            <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />
          </Suspense>
        ) : null}
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
