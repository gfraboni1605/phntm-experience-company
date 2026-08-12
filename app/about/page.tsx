import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { MobileNav } from "@/components/MobileNav";
import { Footer } from "@/components/Footer";
import { WhatWeDo } from "@/components/WhatWeDo";
import { openRoles, partners } from "@/data/projects";

export const metadata: Metadata = {
  title: "About",
  description:
    "An experience company. We make spectacle, aimed at a feeling.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About · PHNTM",
    description:
      "An experience company. We make spectacle, aimed at a feeling.",
    url: "/about",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <MobileNav />
      <main>
        <section className="wrap about-hero section--tight">
          <div className="eyebrow" data-reveal>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="reg only-light"
              src="/brand/registration-ink.svg"
              alt=""
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="reg only-dark"
              src="/brand/registration-white.svg"
              alt=""
            />
            <span>About Us</span>
            <span className="rule"></span>
            <span className="about-cities about-cities--full">
              San Diego / New York / Las Vegas
            </span>
            <span className="about-cities about-cities--short">
              SD / NY / LV
            </span>
          </div>
          <h1 data-reveal>
            <span className="nowrap">We make spectacle,</span>
            <br />
            aimed at a feeling.
          </h1>
          <p className="lede" data-reveal data-reveal-d="1">
            PHNTM is an experience company. We design, build, and run the biggest
            live moments in entertainment: the creative, the technology, and the
            production that make them work.
          </p>
        </section>

        <section className="band band-dark portal-stage">
          <div className="portal-stage__media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="portal"
              src="/brand/portal-centered.svg"
              alt=""
            />
            <div className="portal-stage__scrim"></div>
            <div className="portal-stage__title" data-reveal>
              <span className="l">Imagined.</span>
              <span className="l">Realized.</span>
            </div>
          </div>
        </section>

        <section className="wrap section">
          <div className="seclabel" data-reveal>
            <span>What we do</span>
            <span className="r">From Idea to Live</span>
          </div>
          <WhatWeDo />
        </section>

        <section className="band band-dark">
          <div className="wrap section">
            <div className="seclabel" data-reveal>
              <span>Who we do it with</span>
              <span className="r">Trusted Partners</span>
            </div>
            <div className="pgrid" data-reveal>
              {partners.map((name) => (
                <span key={name}>{name}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="wrap section">
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
                  href="/moments"
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
                <Link href="/moments/coca-cola-y3000-sphere">Coca-Cola Y3000</Link>
                <br />
                <Link href="/moments/cartier-met-gala">Cartier · Met Gala</Link>
                <br />
                <Link href="/moments/donda-2">Donda 2</Link>
              </span>
            </div>
            <div className="scalerow scalerow--link" data-reveal>
              <span className="n">02</span>
              <span className="nm">
                <Link
                  className="scalerow__link"
                  href="/platforms"
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
                <Link href="/platforms/mode-festival">MODE</Link>
                <br />
                <Link href="/platforms/tenderfest">TenderFest</Link>
                <br />
                <Link href="/platforms/camp">CAMP</Link>
              </span>
            </div>
            <div className="scalerow scalerow--link" data-reveal>
              <span className="n">03</span>
              <span className="nm">
                <Link
                  className="scalerow__link"
                  href="/venues"
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
                <Link href="/venues/riot-games-arena">Riot Games Arena</Link>
              </span>
            </div>
          </div>
        </section>

        <section className="band band-dark why">
          <svg
            className="burst"
            viewBox="492 68 556 346"
            fill="none"
            stroke="#f4f1ea"
            strokeWidth="2.2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <g>
              {[
                { i: 5, d: "M621.73,357.1c-22.07-59.19-45.82-114.22-71.2-164.34" },
                { i: 6, d: "M633.81,365.76c-19.88-68.29-40.69-134.51-62.4-198.48" },
                { i: 11, d: "M680.75,398.23c4.48-94.3,18.94-204.5,43.42-317.3" },
                { i: 12, d: "M687.32,400.98c11.67-94.28,36.52-208.68,74.29-320.79" },
                { i: 21, d: "M701.93,325.57c116.89,7.66,238.39,5.57,332.02-19.91" },
                { i: 22, d: "M697.89,303.12c136.05,30.13,248.64,58.31,342.91,30.99" },
                { i: 19, d: "M706.14,361.06c84.84-31.38,192.15-96.8,297.23-110.31" },
                { i: 20, d: "M704.65,344.85c99.94-12.94,212.64-53.48,314.7-64.71" },
                { i: 17, d: "M705.79,384.81c59.01-61.2,143.38-158.95,241.09-202.81" },
                { i: 18, d: "M706.5,374.33c71.28-47.49,167.47-131.59,270.85-157.64" },
                { i: 15, d: "M701.32,398c37.6-81.37,97.49-194.59,175.23-275.8" },
                { i: 16, d: "M704.05,392.64c47.83-72.49,120.01-179.72,208.9-242.9" },
                { i: 13, d: "M692.94,401.99c19.57-92.18,55.59-208.66,107.07-315.17" },
                { i: 14, d: "M697.61,401.06c28.2-87.91,75.96-204.1,140.99-300.13" },
                { i: 0, d: "M551.01,315.01c-16.11-10.72-32.4-19.39-48.7-25.35" },
                { i: 1, d: "M566.18,322.67c-19.71-19.45-40.31-34.75-61.59-44.62" },
                { i: 2, d: "M580.97,330.86c-22.07-29.12-45.65-52.75-70.52-69.26" },
                { i: 3, d: "M595.23,339.44c-23.22-39.24-48.35-72.55-75.2-98.26" },
                { i: 4, d: "M608.85,348.25c-23.2-49.4-48.4-93.31-75.46-130.42" },
                { i: 9, d: "M664.77,388.32c-7.71-88.64-11.09-184.99-10.06-286.25" },
                { i: 10, d: "M673.23,393.94c-1.99-92.37,3.01-196.47,15.11-305.44" },
                { i: 7, d: "M645.04,374.01c-16.72-76.39-33.1-153.48-49.14-231.25" },
                { i: 8, d: "M655.36,381.6c-12.64-83.25-23.18-170.5-31.6-261.03" },
              ].map((p) => (
                <path
                  key={p.i}
                  d={p.d}
                  style={{ ["--i" as string]: p.i } as React.CSSProperties}
                />
              ))}
            </g>
          </svg>
          <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
            <div className="eyebrow why__eyebrow" data-reveal>
              <span>Why we do it</span>
              <span
                className="rule"
                style={{ background: "var(--night-hair)" }}
              ></span>
              <span>Our Point of View</span>
            </div>
            <h2 data-reveal>Live is the last real thing.</h2>
            <p className="sub" data-reveal data-reveal-d="1">
              In a world becoming more generated, filtered, and fake by the day,
              a live moment is the opposite: it happens once, and it can&rsquo;t
              be paused, re-shot, deleted, or edited. One room, one second,
              everyone in it feeling the same thing, and then it&rsquo;s gone.
              No screen in the way. No second take. As the rest of the world
              gets easier to counterfeit, the real thing only gets more
              valuable.
            </p>
          </div>
        </section>

        <section
          id="careers"
          className="wrap section--tight"
          style={{ paddingBottom: "clamp(36px,5vw,72px)", scrollMarginTop: "84px" }}
        >
          <div className="seclabel" data-reveal>
            <span>Open roles</span>
            <span className="r">We&apos;re hiring</span>
          </div>
          <div className="roles">
            {openRoles.map((role) => (
              <a
                className="role-row"
                href={role.mailto}
                data-reveal
                key={role.title}
              >
                <span className="t">{role.title}</span>
                <span className="loc">{role.location}</span>
                <span className="type">{role.type}</span>
                <span className="go">Apply →</span>
              </a>
            ))}
          </div>
        </section>

        <section className="band band-dark cta-band">
          <div className="pat"></div>
          <div className="cta-band__in">
            <h2 data-reveal>Tell us what you&apos;re working on.</h2>
            <div data-reveal data-reveal-d="1">
              <span className="mail" data-copy-email="hello@phntm.com">
                hello@phntm.com
              </span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
