import Link from "next/link";
import { Header } from "@/components/Header";
import { MobileNav } from "@/components/MobileNav";
import { Footer } from "@/components/Footer";
import { WorkCard } from "@/components/WorkCard";
import { projectsForScale, type Scale } from "@/data/projects";
import { SCALE_LABEL } from "@/lib/paths";

const SCALE_COPY: Record<
  Scale,
  { headline: string; lede: string; eyebrowRight: string }
> = {
  moments: {
    headline: "Moments.",
    lede: "One night that has to land: a launch, a show, a reveal. Designed, built, and run end to end.",
    eyebrowRight: "One night. No second take.",
  },
  platforms: {
    headline: "Platforms.",
    lede: "A moment worth repeating, turned into a property you own and we operate to last.",
    eyebrowRight: "Built to repeat.",
  },
  venues: {
    headline: "Venues.",
    lede: "When the experience is the building, we run the technology behind it so every night delivers for years.",
    eyebrowRight: "The building is the show.",
  },
};

export function ScaleIndexPage({ scale }: { scale: Scale }) {
  const items = projectsForScale(scale);
  const copy = SCALE_COPY[scale];

  return (
    <>
      <Header />
      <MobileNav />
      <main>
        <section className="wrap work-intro section--tight">
          <div className="eyebrow" data-reveal>
            <span>{SCALE_LABEL[scale]}</span>
            <span className="rule"></span>
            <span>{copy.eyebrowRight}</span>
          </div>
          <h1 data-reveal style={{ marginTop: "clamp(22px,3vw,34px)" }}>
            {copy.headline}
          </h1>
          <p
            className="lede"
            data-reveal
            data-reveal-d="1"
            style={{ maxWidth: "none" }}
          >
            {copy.lede}
          </p>
        </section>

        <section
          className="wrap"
          style={{ paddingBottom: "clamp(36px,5vw,72px)" }}
        >
          <div className="filterbar">
            <div className="filterbar__chips">
              <Link className="chip" href="/work">
                All
              </Link>
              <Link
                className="chip"
                href="/moments"
                aria-current={scale === "moments" ? "page" : undefined}
              >
                Moments
              </Link>
              <Link
                className="chip"
                href="/platforms"
                aria-current={scale === "platforms" ? "page" : undefined}
              >
                Platforms
              </Link>
              <Link
                className="chip"
                href="/venues"
                aria-current={scale === "venues" ? "page" : undefined}
              >
                Venues
              </Link>
            </div>
            <div className="filterbar__count">
              <b>{String(items.length).padStart(2, "0")}</b> Projects
            </div>
          </div>

          <div className="index-grid">
            {items.map((p, i) => (
              <WorkCard key={p.slug} project={p} index={i + 1} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
