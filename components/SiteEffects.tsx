"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

// Mirrors the prototype's site.js — reveal animations, header scroll hairline,
// mobile nav open/close, copy-email toast, and active-nav highlighting.
export function SiteEffects() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    document.documentElement.classList.add("reveal-ready");
    document.documentElement.classList.remove("reveal-done");
  }, []);

  // Reveal animations — recompute when route changes
  useEffect(() => {
    let nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );
    if (!nodes.length) return;

    const check = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight || 800;
      nodes = nodes.filter((n) => {
        const r = n.getBoundingClientRect();
        if (r.top < vh * 0.92 && r.bottom > -40) {
          n.classList.add("is-in");
          return false;
        }
        return true;
      });
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        check();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    check();
    requestAnimationFrame(check);

    const safety = window.setTimeout(() => {
      document.documentElement.classList.add("reveal-done");
      document
        .querySelectorAll<HTMLElement>("[data-reveal]")
        .forEach((n) => n.classList.add("is-in"));
    }, 1100);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.clearTimeout(safety);
    };
  }, [pathname]);

  // Header hairline on scroll
  useEffect(() => {
    const head = document.querySelector(".site-head");
    if (!head) return;
    const update = () => {
      head.classList.toggle("is-scrolled", (window.scrollY || 0) > 6);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [pathname]);

  // Active nav state
  useEffect(() => {
    const scale = (searchParams?.get("scale") || "").toLowerCase();
    let active: string | null = null;
    if (pathname === "/about") active = "/about";
    else if (pathname === "/contact") active = "/contact";
    else if (
      pathname === "/work" &&
      (scale === "moments" || scale === "platforms" || scale === "venues")
    ) {
      active = `scale=${scale}`;
    }
    const links = Array.from(
      document.querySelectorAll<HTMLAnchorElement>(".site-nav a, .nav-contact")
    );
    links.forEach((a) => {
      const href = a.getAttribute("href") || "";
      a.classList.toggle("is-active", !!active && href.indexOf(active) > -1);
    });
  }, [pathname, searchParams]);

  // Mobile nav + copy email + escape
  useEffect(() => {
    const mnav = document.querySelector(".mobile-nav");
    const closeNav = () => {
      mnav?.classList.remove("is-open");
      document.body.style.overflow = "";
    };

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-menu-open]")) {
        mnav?.classList.add("is-open");
        document.body.style.overflow = "hidden";
      } else if (target.closest("[data-menu-close]")) {
        closeNav();
      } else if (target.closest("a[href]") && mnav?.classList.contains("is-open")) {
        closeNav();
      }

      const copyEl = target.closest<HTMLElement>("[data-copy-email]");
      if (copyEl) {
        e.preventDefault();
        const email = copyEl.getAttribute("data-copy-email") || "hello@phntm.com";
        const done = () => showToast(`Copied · ${email}`);
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(email).then(done, () => {
            window.location.href = `mailto:${email}`;
          });
        } else {
          window.location.href = `mailto:${email}`;
        }
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeNav();
    };

    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [pathname]);

  return null;
}

let toastEl: HTMLDivElement | null = null;
let toastTimer: number | null = null;
function showToast(message: string) {
  if (typeof document === "undefined") return;
  if (!toastEl) {
    toastEl = document.createElement("div");
    toastEl.className = "toast";
    document.body.appendChild(toastEl);
  }
  toastEl.textContent = message;
  requestAnimationFrame(() => toastEl?.classList.add("is-on"));
  if (toastTimer) window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toastEl?.classList.remove("is-on");
  }, 2200);
}
