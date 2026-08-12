import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { MobileNav } from "@/components/MobileNav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell us what you're working on. hello@phntm.com",
};

const ICONS = [
  "icon-ppp-white.png",
  "icon-arrows-white.png",
  "icon-globe-white.png",
  "icon-cluster-white.png",
  "icon-star-white.png",
  "icon-portal-white.png",
];

export default function ContactPage() {
  return (
    <div className="contact-page" data-theme="dark">
      <Header variant="dark" />
      <MobileNav variant="dark" />
      <main className="contact band band-dark">
        <div className="contact__in">
          <div className="contact__col">
            <div className="eyebrow" data-reveal>
              <span>Stay connected</span>
              <span className="rule"></span>
            </div>
            <nav className="connect">
              <a
                href="https://www.instagram.com/phntm/"
                target="_blank"
                rel="noopener noreferrer"
                data-reveal
              >
                Instagram
              </a>
              <a
                href="https://www.linkedin.com/company/phntmla"
                target="_blank"
                rel="noopener noreferrer"
                data-reveal
              >
                LinkedIn
              </a>
              <a href="#" data-copy-email="hello@phntm.com" data-reveal>
                Email Us
              </a>
              <Link href="/about#careers" data-reveal>
                Careers
              </Link>
              <a
                href="https://open.spotify.com/user/31m5yidlwkpej4whlmusas66e4om"
                target="_blank"
                rel="noopener noreferrer"
                data-reveal
              >
                Frequencies
              </a>
            </nav>
          </div>
          <div
            className="contact-icons"
            data-reveal
            data-reveal-d="1"
            aria-hidden="true"
          >
            {ICONS.map((icon) => (
              <span key={icon}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/brand/${icon}`} alt="" />
              </span>
            ))}
          </div>
        </div>
      </main>
      <Footer variant="dark" />
    </div>
  );
}
