import type { Metadata } from "next";
import { Suspense } from "react";
import { Header } from "@/components/Header";
import { MobileNav } from "@/components/MobileNav";
import { Footer } from "@/components/Footer";
import { WorkFilter } from "./WorkFilter";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected work across Moments, Platforms, and Venues.",
};

export default function WorkPage() {
  return (
    <>
      <Header />
      <MobileNav />
      <main>
        <section className="wrap work-intro section--tight">
          <div className="eyebrow" data-reveal>
            <span>Selected work</span>
            <span className="rule"></span>
            <span>2018 to 2026</span>
          </div>
          <h1 data-reveal style={{ marginTop: "clamp(22px,3vw,34px)" }}>
            The work.
          </h1>
          <p
            className="lede"
            data-reveal
            data-reveal-d="1"
            style={{ maxWidth: "none" }}
          >
            Moments, platforms, and venues, designed, built, and run end to end.
          </p>
        </section>

        <section
          className="wrap"
          style={{ paddingBottom: "clamp(36px,5vw,72px)" }}
        >
          <Suspense fallback={null}>
            <WorkFilter projects={projects} />
          </Suspense>
        </section>
      </main>
      <Footer />
    </>
  );
}
