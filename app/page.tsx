import Link from "next/link";
import { Header } from "@/components/Header";
import { MobileNav } from "@/components/MobileNav";
import { Footer } from "@/components/Footer";
import { Reel } from "@/components/Reel";
import { WorkCard } from "@/components/WorkCard";
import { WhatWeDo } from "@/components/WhatWeDo";
import { projects } from "@/data/projects";

const HOME_FEATURED_SLUGS = [
  "usmnt-wc26-roster-reveal",
  "martin-garrix-world-tour",
  "riot-games-arena",
  "coca-cola-y3000-sphere",
  "renegade",
  "mode-festival",
];

export default function HomePage() {
  const featured = HOME_FEATURED_SLUGS.map(
    (slug) => projects.find((p) => p.slug === slug)!
  );

  return (
    <>
      <Header />
      <MobileNav />
      <main>
        <section className="wrap home-hero section--tight">
          <div className="home-hero__head">
            <h1 data-reveal>An Experience Company.</h1>
            <div className="home-hero__meta" data-reveal data-reveal-d="1">
              Est. 2018
            </div>
          </div>
          <Reel videoId="1099088752" hash="d5befdf3a1" />
        </section>

        <section
          className="wrap section"
          style={{ paddingTop: "clamp(36px,4.5vw,64px)" }}
        >
          <div className="seclabel" data-reveal>
            <span>What we do</span>
            <span className="r">From Idea to Live</span>
          </div>
          <WhatWeDo />
        </section>

        <section
          className="wrap section--tight"
          style={{ paddingBottom: "clamp(40px,6vw,80px)" }}
        >
          <div className="seclabel" data-reveal>
            <span>Select works</span>
            <span className="r">A few we love</span>
          </div>
          <div className="work-grid">
            {featured.map((p, i) => (
              <WorkCard
                key={p.slug}
                project={p}
                index={i + 1}
                delay={i % 2 === 1 ? 1 : 0}
              />
            ))}
          </div>
          <div style={{ marginTop: "clamp(32px,4vw,48px)" }} data-reveal>
            <Link className="alink" href="/work">
              See all work <span className="arw">→</span>
            </Link>
          </div>
        </section>

        <section
          className="wrap section--tight"
          style={{ paddingBottom: "clamp(36px,5vw,72px)" }}
        >
          <div className="seclabel" data-reveal>
            <span>Where we do it</span>
            <span className="r">Three scales</span>
          </div>
          <div className="scalelist">
            <div className="scalerow scalerow--link" data-reveal>
              <span className="n">01</span>
              <span className="nm">
                <Link
                  className="scalerow__link"
                  href="/work?scale=moments"
                  aria-label="See Moments work"
                >
                  Moments
                </Link>
              </span>
              <span className="ds">
                One night that has to land: a launch, a show, a reveal. We design,
                build, and run it end to end, with no second take.
              </span>
              <span className="ex">
                <Link href="/work/coca-cola-y3000-sphere">Coca-Cola Y3000</Link>
                <br />
                <Link href="/work/cartier-met-gala">Cartier · Met Gala</Link>
                <br />
                <Link href="/work/donda-2">Donda 2</Link>
              </span>
            </div>
            <div className="scalerow scalerow--link" data-reveal>
              <span className="n">02</span>
              <span className="nm">
                <Link
                  className="scalerow__link"
                  href="/work?scale=platforms"
                  aria-label="See Platforms work"
                >
                  Platforms
                </Link>
              </span>
              <span className="ds">
                A moment worth repeating, turned into a property you own and we
                operate to last.
              </span>
              <span className="ex">
                <Link href="/work/mode-festival">MODE</Link>
                <br />
                <Link href="/work/tenderfest">TenderFest</Link>
                <br />
                <Link href="/work/camp">CAMP</Link>
              </span>
            </div>
            <div className="scalerow scalerow--link" data-reveal>
              <span className="n">03</span>
              <span className="nm">
                <Link
                  className="scalerow__link"
                  href="/work?scale=venues"
                  aria-label="See Venues work"
                >
                  Venues
                </Link>
              </span>
              <span className="ds">
                When the experience is the building, we run the technology behind
                it, so every night delivers for years.
              </span>
              <span className="ex">
                <Link href="/work/riot-games-arena">Riot Games Arena</Link>
              </span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
