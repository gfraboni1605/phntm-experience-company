export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "";

export function isGaEnabled(): boolean {
  return GA_MEASUREMENT_ID.length > 0;
}

export function pageview(url: string, measurementId = GA_MEASUREMENT_ID) {
  if (!measurementId || typeof window === "undefined") return;
  window.gtag?.("config", measurementId, {
    page_path: url,
  });
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}
