"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

type VimeoPlayer = {
  setMuted: (muted: boolean) => Promise<void>;
  setVolume: (vol: number) => Promise<void>;
  play: () => Promise<void>;
  on: (event: string, cb: () => void) => void;
  off: (event: string, cb?: () => void) => void;
  requestFullscreen: () => Promise<void>;
};

type VimeoCtor = new (iframe: HTMLIFrameElement) => VimeoPlayer;

declare global {
  interface Window {
    Vimeo?: { Player: VimeoCtor };
  }
}

export function Reel({
  videoId,
  hash,
  caption,
}: {
  videoId: string;
  hash?: string;
  caption?: string;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<VimeoPlayer | null>(null);
  const [muted, setMuted] = useState(true);
  const [posterHidden, setPosterHidden] = useState(false);

  useEffect(() => {
    return () => {
      playerRef.current = null;
    };
  }, []);

  // Keep the poster up until Vimeo emits `play` (actual frames on screen),
  // not just `load` on the iframe (player chrome ready, video still buffering).
  // We poll briefly for the Vimeo SDK because <Script strategy="afterInteractive">
  // may resolve a moment after this effect runs.
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    let stopped = false;
    let player: VimeoPlayer | null = null;
    const onPlay = () => setPosterHidden(true);

    const attach = () => {
      if (stopped || playerRef.current) return;
      if (!window.Vimeo?.Player) return;
      player = new window.Vimeo.Player(iframe);
      playerRef.current = player;
      player.on("play", onPlay);
      // iOS Safari ignores URL-param autoplay on cross-origin iframes even when
      // muted+playsinline. Calling play() from JS is accepted because the
      // player is muted. Errors (e.g. Low Power Mode) are silenced.
      player.setMuted(true)
        .then(() => player!.play())
        .catch(() => {});
    };

    attach();
    const interval = window.setInterval(attach, 100);
    // Hard safety: drop the poster after 4s no matter what.
    const fallback = window.setTimeout(() => setPosterHidden(true), 4000);

    return () => {
      stopped = true;
      window.clearInterval(interval);
      window.clearTimeout(fallback);
      try { player?.off("play", onPlay); } catch {}
    };
  }, []);

  const goFullscreen = () => {
    // Prefer Vimeo's Player API — it handles iOS Safari (which blocks the
    // Fullscreen API on arbitrary elements and only allows it on native
    // <video>). Falls back to the DOM Fullscreen API on the wrapper for
    // browsers where the Vimeo path isn't available.
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

  const ensurePlayer = () => {
    if (!playerRef.current && iframeRef.current && window.Vimeo?.Player) {
      playerRef.current = new window.Vimeo.Player(iframeRef.current);
    }
    return playerRef.current;
  };

  const onToggle = () => {
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

  const src = `https://player.vimeo.com/video/${videoId}?${
    hash ? `h=${hash}&` : ""
  }autoplay=1&muted=1&loop=1&playsinline=1&controls=0&title=0&byline=0&portrait=0&dnt=1`;

  return (
    <div
      ref={wrapRef}
      className="reel media media--night"
      data-reveal
      data-reveal-d="2"
    >
      <iframe
        ref={iframeRef}
        className="reel-iframe"
        src={src}
        loading="lazy"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        title="PHNTM Showreel"
      />
      <div
        className={`reel-poster${posterHidden ? " reel-poster--hidden" : ""}`}
        aria-hidden="true"
      />

      {caption && <span className="reel-line">{caption}</span>}
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
        aria-pressed={!muted}
        aria-label={muted ? "Turn sound on" : "Turn sound off"}
        onClick={onToggle}
        type="button"
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
      <Script src="https://player.vimeo.com/api/player.js" strategy="afterInteractive" />
    </div>
  );
}
