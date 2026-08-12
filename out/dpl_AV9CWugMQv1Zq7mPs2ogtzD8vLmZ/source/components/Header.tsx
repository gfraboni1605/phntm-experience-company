import Link from "next/link";

type Variant = "default" | "dark";

export function Header({ variant = "default" }: { variant?: Variant }) {
  const logo =
    variant === "dark"
      ? "/brand/logo-primary-white.svg"
      : "/brand/logo-primary-black.svg";
  return (
    <header className="site-head">
      <div className="site-head__in">
        <Link className="brand" href="/" aria-label="PHNTM home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} alt="PHNTM" />
        </Link>
        <nav className="site-nav">
          <Link href="/work?scale=moments">Moments</Link>
          <Link className="muted" href="/work?scale=platforms">Platforms</Link>
          <Link className="muted" href="/work?scale=venues">Venues</Link>
          <Link className="muted" href="/about">About</Link>
        </nav>
        <div className="head-tools">
          <Link className="nav-contact" href="/contact">Contact</Link>
          <button
            className="menu-btn"
            data-menu-open
            aria-label="Open menu"
            type="button"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="3" y1="8" x2="21" y2="8" />
              <line x1="3" y1="16" x2="21" y2="16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
