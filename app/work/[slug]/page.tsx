import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { MobileNav } from "@/components/MobileNav";
import { Footer } from "@/components/Footer";
import { CaseStudy } from "@/components/CaseStudy";
import { nextProject, projects, projectsBySlug } from "@/data/projects";

const SCALE_LABEL = {
  moments: "Moments",
  platforms: "Platforms",
  venues: "Venues",
} as const;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = projectsBySlug[slug];
  if (!p) return { title: "Work" };
  return {
    title: p.name,
    description: p.outcome ?? `${p.name} · ${p.scope}`,
    openGraph: {
      title: `${p.name} · PHNTM`,
      description: p.outcome ?? `${p.name} · ${p.scope}`,
      ...(p.heroImage ? { images: [{ url: p.heroImage }] } : {}),
    },
  };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projectsBySlug[slug];
  if (!p) notFound();

  const next = nextProject(slug);
  const did = p.did ?? [];

  // If this project has full case-study content, render the rich layout.
  if (p.caseStudy) {
    return (
      <>
        <Header />
        <MobileNav />
        <CaseStudy project={p} caseStudy={p.caseStudy} next={next} />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <MobileNav />
      <main>
        <section className="wrap section--tight">
          <Link className="wd-back" href="/work">
            ← All work
          </Link>

          <div className="wd-hero" data-variant="a">
            <div className="wd-hero__head">
              <div className="eyebrow wd-hero__eyebrow" data-reveal>
                <span>{SCALE_LABEL[p.scale]}</span>
                <span className="rule"></span>
                <span>{p.venue ?? p.scope}</span>
              </div>
              <h1 className="wd-hero__title" data-reveal>
                {p.name}.
              </h1>
              <div className="wd-hero__metarow" data-reveal data-reveal-d="1">
                <span className="m">
                  <span className="k">Client</span>
                  <span className="v">{p.client}</span>
                </span>
                <span className="m">
                  <span className="k">Scale</span>
                  <span className="v">{SCALE_LABEL[p.scale]}</span>
                </span>
                {p.venue && (
                  <span className="m">
                    <span className="k">Venue</span>
                    <span className="v">{p.venue}</span>
                  </span>
                )}
                <span className="m">
                  <span className="k">Year</span>
                  <span className="v">{p.year}</span>
                </span>
              </div>
              {p.outcome && (
                <p
                  className="wd-hero__outcome lede"
                  data-reveal
                  data-reveal-d="1"
                >
                  {p.outcome}
                </p>
              )}
            </div>

            <div
              className="wd-hero__media media"
              data-reveal
              data-reveal-d="2"
            >
              {p.heroImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.heroImage} alt={p.heroImageAlt ?? ""} loading="lazy" decoding="async" />
              ) : (
                <div className="media__ph">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="reg"
                    src="/brand/registration-ink.svg"
                    alt="" loading="lazy" decoding="async" />
                  <div className="t">
                    <b>{p.name}</b>
                  </div>
                </div>
              )}
              <span className="media__corner">01</span>
              <span className="media__tag">{SCALE_LABEL[p.scale]}</span>
            </div>
          </div>
        </section>

        {did.length > 0 && (
          <section className="wrap section">
            <div className="seclabel" data-reveal>
              <span>What PHNTM did</span>
              <span className="r">Idea to live</span>
            </div>
            <div className="wd-did">
              <h2 data-reveal>
                One company, accountable for the whole moment. From the first
                idea to the last second it was live.
              </h2>
              <div className="wd-did__list">
                {did.map((row, i) => (
                  <div className="wd-did__row" data-reveal key={i}>
                    <span className="ix">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <div className="h">{row.heading}</div>
                      <div className="b">{row.body}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section
          className="wrap section--tight"
          style={{ paddingBottom: "clamp(36px,5vw,72px)" }}
        >
          <div className="seclabel" data-reveal>
            <span>Selected stills</span>
            <span className="r">Index 01 / 03</span>
          </div>
          <div className="wd-mediagrid">
            {[1, 2, 3].map((n, i) => (
              <div
                className="media"
                data-reveal
                data-reveal-d={i === 2 ? "1" : undefined}
                key={n}
              >
                <div className="media__ph">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="reg"
                    src="/brand/registration-ink.svg"
                    alt="" loading="lazy" decoding="async" />
                  <div className="t">
                    <b>{["Wide", "Detail", "Crowd"][i]}</b>,{" "}
                    {["full frame", "content", "the room"][i]}
                  </div>
                </div>
                <span className="media__corner">
                  {String(n).padStart(2, "0")}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section
          className="wrap section--tight"
          style={{ paddingBottom: "clamp(36px,5vw,72px)" }}
        >
          <div className="wd-next">
            <Link href={`/work/${next.slug}`} data-reveal>
              <div className="lbl">Next project</div>
              <div className="wd-next__proj">
                {next.name} <span className="arw">→</span>
              </div>
            </Link>
            <Link
              className="wd-next__media media"
              href={`/work/${next.slug}`}
              data-reveal
              data-reveal-d="1"
            >
              {next.heroImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={next.heroImage} alt={next.heroImageAlt ?? ""} loading="lazy" decoding="async" />
              ) : (
                <div className="media__ph">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="reg"
                    src="/brand/registration-ink.svg"
                    alt="" loading="lazy" decoding="async" />
                  <div className="t">
                    <b>{next.name}</b>
                  </div>
                </div>
              )}
              <span className="media__tag">{SCALE_LABEL[next.scale]}</span>
            </Link>
          </div>
          <div
            style={{ marginTop: "clamp(28px,4vw,44px)" }}
            data-reveal
          >
            <Link className="alink" href="/work">
              See all work <span className="arw">→</span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
