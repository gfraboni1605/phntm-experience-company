"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Phase = "idle" | "covering" | "covered" | "uncovering";
type Direction = "up" | "down" | "left" | "right";

// Each destination has its own curtain direction so the section reveal
// has a consistent gesture regardless of where you came from.
function directionFor(pathname: string): Direction {
  if (pathname === "/" || pathname === "") return "up";
  if (pathname.startsWith("/work")) return "right";
  if (pathname.startsWith("/about")) return "left";
  if (pathname.startsWith("/contact")) return "down";
  return "down";
}

// Curtain page transition.
// - Intercepts anchor clicks (so every existing <Link> picks this up for free).
// - Phase "covering": dark sheet sweeps in from the direction matching the destination.
// - Once covered, `router.push` swaps the page behind the curtain.
// - Phase "uncovering": curtain continues past the opposite edge, revealing the new page.
export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const [direction, setDirection] = useState<Direction>("down");
  const pendingHrefRef = useRef<string | null>(null);
  const pendingPathRef = useRef<string | null>(null);

  // 1) Intercept anchor clicks in CAPTURE phase so we run before Next.js Link's
  //    onClick (which calls preventDefault + router.push in bubble phase).
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (e.button !== 0) return;

      const anchor =
        (e.target as HTMLElement | null)?.closest?.("a") ?? null;
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;
      if (anchor.hasAttribute("data-copy-email")) return;

      const href = anchor.getAttribute("href");
      if (!href) return;
      if (
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("#") ||
        /^https?:\/\//i.test(href)
      ) {
        return;
      }

      let url: URL;
      try {
        url = new URL(href, window.location.origin);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return; // same-page anchor scroll

      // preventDefault only — Next.js Link's onClick bails when defaultPrevented,
      // so no double-push. We deliberately do NOT stopPropagation: SiteEffects'
      // bubble-phase listener needs to fire on link clicks inside the open mobile
      // nav so it can call closeNav() (which clears document.body.style.overflow).
      // Without that, navigating from inside the mobile nav leaves the body locked.
      e.preventDefault();
      pendingHrefRef.current = href;
      pendingPathRef.current = url.pathname;
      setDirection(directionFor(url.pathname));
      setPhase("covering");
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // 2) After the curtain covers, kick the actual navigation and move to "covered".
  useEffect(() => {
    if (phase !== "covering") return;
    const t = window.setTimeout(() => {
      const href = pendingHrefRef.current;
      if (href) router.push(href);
      setPhase("covered");
    }, 200);
    return () => window.clearTimeout(t);
  }, [phase, router]);

  // 3) Hold the covered state for a beat so the P mark can flash, then uncover.
  useEffect(() => {
    if (phase !== "covered") return;
    if (pathname !== pendingPathRef.current) return;
    const t = window.setTimeout(() => setPhase("uncovering"), 280);
    return () => window.clearTimeout(t);
  }, [phase, pathname]);

  // 4) After the uncover animation, clear state.
  useEffect(() => {
    if (phase !== "uncovering") return;
    const t = window.setTimeout(() => {
      pendingHrefRef.current = null;
      pendingPathRef.current = null;
      setPhase("idle");
    }, 260);
    return () => window.clearTimeout(t);
  }, [phase]);

  if (phase === "idle") return null;

  return (
    <div
      className={`page-transition page-transition--${phase} page-transition--${direction}`}
      aria-hidden="true"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="page-transition__mark"
        src="/brand/mark-white.svg"
        alt=""
      />
    </div>
  );
}
