"use client";

import { useEffect, useState } from "react";

type Phase =
  | "initial"
  | "framing"
  | "revealing"
  | "settled"
  | "flashing"
  | "exiting"
  | "done";

export function Preloader() {
  const [phase, setPhase] = useState<Phase>("initial");
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (sessionStorage.getItem("phntm-loaded") === "1") {
      setPhase("done");
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sessionStorage.setItem("phntm-loaded", "1");
      setPhase("done");
      return;
    }

    document.body.style.overflow = "hidden";

    // Eased counter ramp 0 → 100 across ~2.1s
    let counterStart = 0;
    let counterRaf = 0;
    const tickCounter = (ts: number) => {
      if (!counterStart) counterStart = ts;
      const elapsed = ts - counterStart;
      const t = Math.min(1, elapsed / 2100);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.min(100, Math.round(eased * 100)));
      if (t < 1) counterRaf = requestAnimationFrame(tickCounter);
    };
    counterRaf = requestAnimationFrame(tickCounter);

    const t1 = window.setTimeout(() => setPhase("framing"), 100);
    const t2 = window.setTimeout(() => setPhase("revealing"), 280);
    const t3 = window.setTimeout(() => setPhase("settled"), 1280);
    const t4 = window.setTimeout(() => setPhase("flashing"), 2000);
    const t5 = window.setTimeout(() => setPhase("exiting"), 2200);
    const t6 = window.setTimeout(() => {
      setPhase("done");
      document.body.style.overflow = "";
      sessionStorage.setItem("phntm-loaded", "1");
    }, 3100);

    return () => {
      [t1, t2, t3, t4, t5, t6].forEach((id) => window.clearTimeout(id));
      cancelAnimationFrame(counterRaf);
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div className={`preloader preloader--${phase}`} aria-hidden="true">
      <div className="preloader__counter">{String(count).padStart(3, "0")}</div>
      <div className="preloader__corner preloader__corner--tl">PHNTM / 2018</div>
      <div className="preloader__corner preloader__corner--bl">An Experience Company</div>

      <div className="preloader__center">
        <div className="preloader__logo-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="preloader__logo"
            src="/brand/logo-primary-white.svg"
            alt=""
          />
        </div>
        <div className="preloader__eyebrow">Imagined. Realized.</div>
      </div>

      <div className="preloader__flash" />
    </div>
  );
}
