import Link from "next/link";

export function MobileNav({ variant = "default" }: { variant?: "default" | "dark" }) {
  const logo =
    variant === "dark"
      ? "/brand/logo-primary-white.svg"
      : "/brand/logo-primary-black.svg";
  return (
    <div className="mobile-nav">
      <div className="mobile-nav__top">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} alt="PHNTM" />
        <button
          className="menu-btn"
          data-menu-close
          aria-label="Close menu"
          style={{ display: "inline-flex" }}
          type="button"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="5" y1="5" x2="19" y2="19" />
            <line x1="19" y1="5" x2="5" y2="19" />
          </svg>
        </button>
      </div>
      <nav className="mobile-nav__links">
        <Link href="/work?scale=moments">Moments</Link>
        <Link href="/work?scale=platforms">Platforms</Link>
        <Link href="/work?scale=venues">Venues</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </nav>
      <div className="mobile-nav__foot">
        <span>Imagined. Realized.</span>
        <a href="#" data-copy-email="hello@phntm.com">hello@phntm.com</a>
      </div>
    </div>
  );
}
