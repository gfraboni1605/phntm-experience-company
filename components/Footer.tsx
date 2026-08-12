import Link from "next/link";

type Variant = "default" | "dark";

export function Footer({ variant = "default" }: { variant?: Variant }) {
  const logo =
    variant === "dark"
      ? "/brand/logo-primary-white.svg"
      : "/brand/logo-primary-black.svg";
  return (
    <footer className="band">
      <div className="site-foot">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="wm" src={logo} alt="PHNTM" />
        <div className="site-foot__meta">
          <span className="copyline">
            <span className="cmark">C</span>2026 PHNTM
          </span>
          <a href="https://www.instagram.com/phntm/" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://www.linkedin.com/company/phntmla" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <Link href="/about#careers">Careers</Link>
          <a href="#" data-copy-email="hello@phntm.com">Get in touch</a>
          <span className="sep"></span>
          <span className="tag">Imagined. Realized.</span>
        </div>
      </div>
    </footer>
  );
}
