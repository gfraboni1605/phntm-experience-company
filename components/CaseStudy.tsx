import Link from "next/link";
import { Fragment } from "react";
import { CaseStudyFilm } from "@/components/CaseStudyFilm";
import type {
  CaseStudy as CaseStudyData,
  CaseStudyMetaItem,
  Project,
  ProseParagraph,
  ProseRun,
} from "@/data/projects";
import { SCALE_LABEL, projectPath, scalePath } from "@/lib/paths";

function defaultMeta(project: Project): CaseStudyMetaItem[] {
  const items: CaseStudyMetaItem[] = [
    { key: "Client", value: project.client },
    { key: "Scale", value: SCALE_LABEL[project.scale] },
  ];
  if (project.venue) items.push({ key: "Venue", value: project.venue });
  items.push({ key: "Year", value: project.year });
  return items;
}

function renderRun(run: ProseRun, i: number) {
  if (typeof run === "string") return <Fragment key={i}>{run}</Fragment>;
  if (run.type === "hl") {
    return (
      <span className="hl" key={i}>
        {run.text}
      </span>
    );
  }
  return null;
}

function Paragraph({ p }: { p: ProseParagraph }) {
  return (
    <p className={p.size === "big" ? "big" : undefined}>
      {p.runs.map(renderRun)}
    </p>
  );
}

export function CaseStudy({
  project,
  caseStudy,
  next,
}: {
  project: Project;
  caseStudy: CaseStudyData;
  next: Project;
}) {
  const heroTitle = caseStudy.title ?? project.name;
  const eyebrowRight =
    caseStudy.eyebrowRight ?? project.venue ?? project.scope;
  const metaItems = caseStudy.meta ?? defaultMeta(project);
  const heroSrc = caseStudy.heroImage ?? project.heroImage;
  const heroAlt = caseStudy.heroImageAlt ?? project.heroImageAlt ?? "";
  const heroPosition =
    caseStudy.heroImagePosition ?? project.heroImagePosition;

  return (
    <main>
      {/* HEAD */}
      <section className="wrap cs-head section--tight">
        <Link className="cs-back" href={scalePath(project.scale)}>
          ← {SCALE_LABEL[project.scale]}
        </Link>
        <div className="eyebrow cs-head__eyebrow" data-reveal>
          <span>{SCALE_LABEL[project.scale]}</span>
          <span className="rule"></span>
          <span>{eyebrowRight}</span>
        </div>
        <h1 className="cs-title" data-reveal>
          {heroTitle}.
        </h1>
        <p className="cs-lede" data-reveal data-reveal-d="1">
          {caseStudy.lede}
        </p>

        {caseStudy.when && (
          <div className="plat-when" data-reveal data-reveal-d="1">
            {caseStudy.when.map((w, wi) => (
              <span key={wi}>
                <span className="g">{w.label}</span>
                {w.value}
              </span>
            ))}
          </div>
        )}

        {caseStudy.cta && (
          <div className="plat-cta" data-reveal data-reveal-d="1">
            {caseStudy.cta.primary && (
              <a
                className="btn"
                href={caseStudy.cta.primary.href}
                target={/^https?:\/\//i.test(caseStudy.cta.primary.href) ? "_blank" : undefined}
                rel={/^https?:\/\//i.test(caseStudy.cta.primary.href) ? "noopener noreferrer" : undefined}
              >
                {caseStudy.cta.primary.label}{" "}
                <span aria-hidden="true">↗</span>
              </a>
            )}
            {caseStudy.cta.secondary && (
              <a
                className="btn btn--ghost"
                href={caseStudy.cta.secondary.href}
                target={/^https?:\/\//i.test(caseStudy.cta.secondary.href) ? "_blank" : undefined}
                rel={/^https?:\/\//i.test(caseStudy.cta.secondary.href) ? "noopener noreferrer" : undefined}
              >
                {caseStudy.cta.secondary.label}
              </a>
            )}
          </div>
        )}

        <div className="cs-hero" data-reveal data-reveal-d="2">
          <div
            className={`media${caseStudy.heroFullBleed ? " media--full" : ""}`}
            style={
              caseStudy.heroAspectRatio && !caseStudy.heroFullBleed
                ? { aspectRatio: caseStudy.heroAspectRatio }
                : undefined
            }
          >
            {heroSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={heroSrc}
                alt={heroAlt}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                style={
                  heroPosition ? { objectPosition: heroPosition } : undefined
                }
              />
            ) : (
              <div className="media__ph">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="reg" src="/brand/registration-ink.svg" alt="" loading="lazy" decoding="async" />
                <div className="t">
                  <b>{project.name}</b>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="cs-meta" data-reveal>
          {metaItems.map((m) => (
            <div className="m" key={m.key}>
              <span className="k">{m.key}</span>
              <span className="v">{m.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SECTIONS */}
      {caseStudy.sections.map((section, i) => {
        switch (section.kind) {
          case "block":
            return (
              <section
                className={
                  i === caseStudy.sections.length - 1
                    ? "wrap section--tight"
                    : "wrap section"
                }
                key={i}
              >
                <div className="cs-block" data-reveal>
                  <div className="cs-block__lbl">{section.label}</div>
                  <div className="cs-block__prose">
                    {section.prose.map((p, pi) => (
                      <Paragraph p={p} key={pi} />
                    ))}
                  </div>
                </div>
              </section>
            );

          case "film":
            return (
              <section className="wrap cs-film" key={i}>
                {section.label && (
                  <div className="cs-vlabel" data-reveal>
                    <span>{section.label.left}</span>
                    <span className="rule"></span>
                    <span>{section.label.right}</span>
                  </div>
                )}
                <CaseStudyFilm
                  videoId={section.videoId}
                  hash={section.hash}
                  title={section.title}
                />
              </section>
            );

          case "bleed":
            return (
              <figure
                className={`cs-bleed${
                  section.variant === "tall" ? " cs-bleed--tall" : ""
                }`}
                data-reveal
                key={i}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={section.src}
                  alt={section.alt}
                  loading="lazy"
                  decoding="async"
                  style={
                    section.position
                      ? { objectPosition: section.position }
                      : undefined
                  }
                />
              </figure>
            );

          case "split":
            return (
              <section className="wrap section--tight" key={i}>
                <div className="cs-split" data-reveal>
                  <div className="media tall">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={section.tall.src} alt={section.tall.alt} loading="lazy" decoding="async" />
                  </div>
                  <div className="media wide">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={section.wide.src} alt={section.wide.alt} loading="lazy" decoding="async" />
                  </div>
                </div>
              </section>
            );

          case "duo":
            return (
              <section className="wrap section--tight" key={i}>
                {section.label && (
                  <div className="cs-vlabel" data-reveal>
                    <span>{section.label.left}</span>
                    <span className="rule"></span>
                    <span>{section.label.right}</span>
                  </div>
                )}
                <div className="cs-duo" data-reveal>
                  <div className={`media ${section.variant}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={section.left.src} alt={section.left.alt} loading="lazy" decoding="async" />
                  </div>
                  <div className={`media ${section.variant}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={section.right.src} alt={section.right.alt} loading="lazy" decoding="async" />
                  </div>
                </div>
              </section>
            );

          case "trio":
            return (
              <section className="wrap section--tight" key={i}>
                <div className="cs-trio" data-reveal>
                  {section.items.map((item, ii) => (
                    <div className="media" key={ii}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
                    </div>
                  ))}
                </div>
              </section>
            );

          case "vrow":
            return (
              <section className="wrap section--tight" key={i}>
                {section.label && (
                  <div className="cs-vlabel" data-reveal>
                    <span>{section.label.left}</span>
                    <span className="rule"></span>
                    <span>{section.label.right}</span>
                  </div>
                )}
                <div className="cs-vrow" data-reveal>
                  <CaseStudyFilm
                    videoId={section.film.videoId}
                    hash={section.film.hash}
                    title={section.film.title}
                  />
                  <div className="vphoto">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={section.photo.src} alt={section.photo.alt} loading="lazy" decoding="async" />
                  </div>
                </div>
              </section>
            );

          case "feature":
            return (
              <section className="wrap section--tight" key={i}>
                <div
                  className={`cs-feature${section.flip ? " cs-feature--flip" : ""}`}
                  data-reveal
                >
                  <div className="media tall">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={section.tall.src} alt={section.tall.alt} loading="lazy" decoding="async" />
                  </div>
                  <div className="fill">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={section.fill.src} alt={section.fill.alt} loading="lazy" decoding="async" />
                  </div>
                </div>
              </section>
            );

          case "stat":
            return (
              <section className="wrap section" key={i}>
                <div className="cs-stat" data-reveal>
                  <div className="num">
                    {section.num}
                    {section.unit && <span className="u">{section.unit}</span>}
                  </div>
                  <div className="cap">{section.caption}</div>
                </div>
              </section>
            );

          case "poster": {
            const img = (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={section.src} alt={section.alt} loading="lazy" decoding="async" />
            );
            return (
              <section className="wrap section--tight" key={i}>
                {section.label && (
                  <div className="seclabel" data-reveal>
                    <span>{section.label.left}</span>
                    <span className="r">{section.label.right}</span>
                  </div>
                )}
                <div className="plat-poster" data-reveal>
                  {section.href ? (
                    <a
                      href={section.href}
                      target={/^https?:\/\//i.test(section.href) ? "_blank" : undefined}
                      rel={/^https?:\/\//i.test(section.href) ? "noopener noreferrer" : undefined}
                    >
                      {img}
                    </a>
                  ) : (
                    img
                  )}
                </div>
              </section>
            );
          }

          case "statement":
            return (
              <section className="band band-dark why" key={i}>
                <div
                  className="wrap"
                  style={{ position: "relative", zIndex: 2 }}
                >
                  {section.label && (
                    <div className="eyebrow why__eyebrow" data-reveal>
                      <span>{section.label.left}</span>
                      <span
                        className="rule"
                        style={{ background: "var(--night-hair)" }}
                      ></span>
                      <span>{section.label.right}</span>
                    </div>
                  )}
                  <h2 data-reveal style={{ maxWidth: "20ch" }}>
                    {section.heading}
                  </h2>
                  {section.sub && (
                    <p className="sub" data-reveal data-reveal-d="1">
                      {section.sub}
                    </p>
                  )}
                </div>
              </section>
            );

          case "ctaBand":
            return (
              <section className="band band-dark plat-band" key={i}>
                <div className="pat"></div>
                <div className="plat-band__in">
                  <h2 data-reveal>{section.heading}</h2>
                  {section.sub && (
                    <p
                      className="plat-band__sub"
                      data-reveal
                      data-reveal-d="1"
                    >
                      {section.sub}
                    </p>
                  )}
                  {(section.primary || section.secondary) && (
                    <div
                      className="plat-cta"
                      style={{ justifyContent: "center" }}
                      data-reveal
                      data-reveal-d="1"
                    >
                      {section.primary && (
                        <a
                          className="btn"
                          href={section.primary.href}
                          target={/^https?:\/\//i.test(section.primary.href) ? "_blank" : undefined}
                          rel={/^https?:\/\//i.test(section.primary.href) ? "noopener noreferrer" : undefined}
                          style={{
                            background: "var(--night-ink)",
                            borderColor: "var(--night-ink)",
                            color: "var(--night)",
                          }}
                        >
                          {section.primary.label}{" "}
                          <span aria-hidden="true">↗</span>
                        </a>
                      )}
                      {section.secondary && (
                        <a
                          className="btn btn--ghost"
                          href={section.secondary.href}
                          target={/^https?:\/\//i.test(section.secondary.href) ? "_blank" : undefined}
                          rel={/^https?:\/\//i.test(section.secondary.href) ? "noopener noreferrer" : undefined}
                          style={{
                            color: "var(--night-ink)",
                            borderColor: "var(--night-ink)",
                          }}
                        >
                          {section.secondary.label}
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </section>
            );

          default:
            return null;
        }
      })}

      {/* NEXT — two-column: label + project name on the left, thumbnail on the right */}
      <section
        className="wrap section--tight"
        style={{ paddingBottom: "clamp(36px,5vw,72px)" }}
      >
        <div className="wd-next">
          <Link href={projectPath(next)} data-reveal>
            <div className="lbl">Next project</div>
            <div className="wd-next__proj">
              {next.name} <span className="arw">→</span>
            </div>
          </Link>
          <Link
            className="wd-next__media media"
            href={projectPath(next)}
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
        <div style={{ marginTop: "clamp(28px,4vw,44px)" }} data-reveal>
          <Link className="alink" href={scalePath(project.scale)}>
            See all {SCALE_LABEL[project.scale].toLowerCase()}{" "}
            <span className="arw">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
