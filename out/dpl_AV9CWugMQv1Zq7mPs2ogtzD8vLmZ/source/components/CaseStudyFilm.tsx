"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

type VimeoPlayer = {
  setMuted: (muted: boolean) => Promise<void>;
  setVolume: (vol: number) => Promise<void>;
  play: () => Promise<void>;
  requestFullscreen: () => Promise<void>;
};
// window.Vimeo is already declared globally in components/Reel.tsx

export function CaseStudyFilm({
  videoId,
  hash,
  title = "Case study film",
}: {
  videoId: string;
  hash?: string;
  title?: string;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<VimeoPlayer | null>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => () => {
    playerRef.current = null;
  }, []);

  const ensurePlayer = () => {
    if (!playerRef.current && iframeRef.current && window.Vimeo?.Player) {
      playerRef.current = new window.Vimeo.Player(iframeRef.current);
    }
    return playerRef.current;
  };

  const toggleSound = () => {
    const next = !muted;
    setMuted(next);
    const p = ensurePlayer();
    if (!p) return;
    p.setMuted(next).catch(() => {});
    if (!next) {
      p.setVolume(1).catch(() => {});
      p.play().catch(() => {});
    }
  };

  const goFullscreen = () => {
    // Prefer Vimeo's Player API — iOS Safari blocks the Fullscreen API on
    // arbitrary elements and only allows it on native <video>. Vimeo's API
    // handles that internally. Falls back to DOM fullscreen on the wrapper.
    const p = ensurePlayer();
    if (p) {
      p.requestFullscreen().catch(() => goFullscreenFallback());
      return;
    }
    goFullscreenFallback();
  };

  const goFullscreenFallback = () => {
    const el = wrapRef.current;
    if (!el) return;
    const anyEl = el as HTMLElement & {
      webkitRequestFullscreen?: () => Promise<void>;
    };
    const req = el.requestFullscreen || anyEl.webkitRequestFullscreen;
    if (req) req.call(el).catch(() => {});
  };

  const src = `https://player.vimeo.com/video/${videoId}?${
    hash ? `h=${hash}&` : ""
  }autoplay=1&muted=1&loop=1&controls=0&title=0&byline=0&portrait=0&dnt=1`;

  return (
    <div
      ref={wrapRef}
      className="reel media media--night"
      data-reveal
      data-vimeo-player
    >
      <iframe
        ref={iframeRef}
        className="reel-iframe"
        src={src}
        loading="lazy"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        title={title}
      />
      <button
        className="reel-full"
        type="button"
        aria-label="View fullscreen"
        onClick={goFullscreen}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M8 3H5a2 2 0 0 0-2 2v3" />
          <path d="M16 3h3a2 2 0 0 1 2 2v3" />
          <path d="M8 21H5a2 2 0 0 1-2-2v-3" />
          <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
        </svg>
        <span>Fullscreen</span>
      </button>
      <button
        className="reel-sound"
        type="button"
        aria-pressed={!muted}
        aria-label={muted ? "Turn sound on" : "Turn sound off"}
        onClick={toggleSound}
      >
        <svg
          className="ico-off"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M11 5 6 9H2v6h4l5 4V5z" />
          <line x1="22" y1="9" x2="16" y2="15" />
          <line x1="16" y1="9" x2="22" y2="15" />
        </svg>
        <svg
          className="ico-on"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M11 5 6 9H2v6h4l5 4V5z" />
          <path d="M15.5 8.5a5 5 0 0 1 0 7" />
          <path d="M18.5 5.5a9 9 0 0 1 0 13" />
        </svg>
        <span className="off-lbl">Sound off</span>
        <span className="on-lbl">Sound on</span>
      </button>
      <Script
        src="https://player.vimeo.com/api/player.js"
        strategy="afterInteractive"
      />
    </div>
  );
}
