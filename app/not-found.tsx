import Link from "next/link";
import { Header } from "@/components/Header";
import { MobileNav } from "@/components/MobileNav";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <MobileNav />
      <main>
        <section className="wrap section--tight" style={{ paddingBottom: "clamp(48px,8vw,96px)" }}>
          <div className="eyebrow" data-reveal>
            <span>404</span>
            <span className="rule"></span>
            <span>Not found</span>
          </div>
          <h1 data-reveal style={{ marginTop: "clamp(22px,3vw,34px)" }}>
            This page doesn’t exist.
          </h1>
          <p className="lede" data-reveal data-reveal-d="1">
            The link may be old, or the moment moved. Try the work, or head home.
          </p>
          <div
            style={{
              marginTop: "clamp(28px,4vw,44px)",
              display: "flex",
              flexWrap: "wrap",
              gap: "18px 28px",
            }}
            data-reveal
            data-reveal-d="1"
          >
            <Link className="alink" href="/">
              Home <span className="arw">→</span>
            </Link>
            <Link className="alink" href="/work">
              All work <span className="arw">→</span>
            </Link>
            <Link className="alink" href="/moments">
              Moments <span className="arw">→</span>
            </Link>
            <Link className="alink" href="/contact">
              Contact <span className="arw">→</span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
