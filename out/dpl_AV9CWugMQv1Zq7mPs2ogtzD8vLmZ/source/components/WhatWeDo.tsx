"use client";

import { useState } from "react";

type Row = {
  n: string;
  nm: string;
  verb: string;
  ds: string;
};

const ROWS: Row[] = [
  {
    n: "01",
    nm: "Vision & Strategy",
    verb: "We create the idea",
    ds: "The core idea, and the strategy that makes it worth doing.",
  },
  {
    n: "02",
    nm: "Experience Design",
    verb: "We design it together",
    ds: "Show design, staging, and content that shapes how the night unfolds and how the room feels.",
  },
  {
    n: "03",
    nm: "Production & Technology",
    verb: "We make it real",
    ds: "We produce the event and build the technology that runs it: staging, displays, and real-time systems.",
  },
  {
    n: "04",
    nm: "Delivery & Operations",
    verb: "We make it work, live",
    ds: "Technical direction and live command, plus the operation that keeps a venue running for years.",
  },
];

export function WhatWeDo() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="caparc">
      {ROWS.map((row, i) => {
        const isOpen = openIndex === i;
        return (
          <button
            key={row.n}
            type="button"
            className="caprow"
            data-reveal
            data-open={isOpen ? "true" : undefined}
            aria-expanded={isOpen}
            onClick={() =>
              setOpenIndex((curr) => (curr === i ? null : i))
            }
          >
            <span className="n">{row.n}</span>
            <span className="nm">{row.nm}</span>
            <span className="verb">{row.verb}</span>
            <span className="ds">{row.ds}</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="caprow__mark"
              src="/brand/registration-ink.svg"
              alt=""
              aria-hidden="true"
            />
          </button>
        );
      })}
    </div>
  );
}
