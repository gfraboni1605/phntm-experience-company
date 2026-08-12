export type Scale = "moments" | "platforms" | "venues";

export type DidRow = {
  heading: string;
  body: string;
};

/* ---------- Rich case-study model ---------- */
// Inline run inside a paragraph. "hl" wraps a highlight span; plain string is regular text.
export type ProseRun = string | { type: "hl"; text: string };

export type ProseParagraph = {
  // "big" renders at the case-study lead size; default is body.
  size?: "big" | "body";
  // Mixed inline runs so a paragraph can include <span class="hl"> highlights.
  runs: ProseRun[];
};

export type CaseStudyBlock = {
  label: string; // e.g. "01, The canvas"
  prose: ProseParagraph[];
};

export type CaseStudyMedia = {
  src: string;
  alt: string;
  caption?: { index: string; text: string }; // for full-bleed
  variant?: "default" | "tall"; // tall = .cs-bleed--tall
  /** Optional CSS object-position (e.g. "center 30%") for the cropped image. */
  position?: string;
};

export type CaseStudySplit = {
  tall: { src: string; alt: string; corner?: string };
  wide: { src: string; alt: string; corner?: string };
};

// Two side-by-side images. Variants control aspect ratio.
// Optional label renders a small `cs-vlabel` eyebrow above the duo.
export type CaseStudyDuo = {
  variant: "h" | "v" | "sq";
  label?: { left: string; right: string };
  left: { src: string; alt: string };
  right: { src: string; alt: string };
};

// Three equal-width images in a row.
export type CaseStudyTrio = {
  items: { src: string; alt: string }[]; // expects 3 entries
};

// A portrait Vimeo reel beside a photo, with an optional small label.
export type CaseStudyVrow = {
  label?: { left: string; right: string };
  film: { videoId: string; hash?: string; title?: string };
  photo: { src: string; alt: string };
};

// A "feature" pair: a tall image (default left, 4:5) + a fill image (right,
// fills the tall column's height). `flip: true` reverses the column order.
export type CaseStudyFeature = {
  flip?: boolean;
  tall: { src: string; alt: string };
  fill: { src: string; alt: string };
};

// A centered poster image, used for Platform case studies (lineup posters, etc.)
// `label` renders an optional `seclabel` above the poster.
export type CaseStudyPoster = {
  label?: { left: string; right: string };
  src: string;
  alt: string;
  href?: string;
};

// A dark CTA band with a heading and one or two CTA buttons.
// Used for Platform case studies to drive to external sites.
export type CaseStudyCtaBand = {
  heading: string;
  /** Optional subtitle paragraph beneath the heading. */
  sub?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
};

// A closing statement on a dark band: small eyebrow, headline, optional sub.
// Uses the about-page `.why` band styling (no burst SVG).
export type CaseStudyStatement = {
  label?: { left: string; right: string };
  heading: string;
  sub?: string;
};

// CTA / link target.
export type CaseStudyLink = { label: string; href: string };

// "When / Where" style label row in the hero (Platforms).
export type CaseStudyWhenItem = { label: string; value: string };

export type CaseStudyFilm = {
  videoId: string;
  hash?: string;
  title?: string;
  /** Optional `cs-vlabel` eyebrow rendered above the film. */
  label?: { left: string; right: string };
};

export type CaseStudyStat = {
  num: string; // e.g. "720K"
  unit?: string; // e.g. "." (red)
  caption: string;
};

// Ordered sections that compose the full case study. Each entry is one of:
// - { kind: "block", ... }       a labeled prose block
// - { kind: "film", ... }        embedded Vimeo film
// - { kind: "bleed", ... }       full-bleed image with optional caption
// - { kind: "split", ... }       tall + wide image pair
// - { kind: "stat", ... }        large numeric statistic
export type CaseStudySection =
  | ({ kind: "block" } & CaseStudyBlock)
  | ({ kind: "film" } & CaseStudyFilm)
  | ({ kind: "bleed" } & CaseStudyMedia)
  | ({ kind: "split" } & CaseStudySplit)
  | ({ kind: "duo" } & CaseStudyDuo)
  | ({ kind: "trio" } & CaseStudyTrio)
  | ({ kind: "vrow" } & CaseStudyVrow)
  | ({ kind: "feature" } & CaseStudyFeature)
  | ({ kind: "poster" } & CaseStudyPoster)
  | ({ kind: "ctaBand" } & CaseStudyCtaBand)
  | ({ kind: "statement" } & CaseStudyStatement)
  | ({ kind: "stat" } & CaseStudyStat);

export type CaseStudyMetaItem = { key: string; value: string };

export type CaseStudy = {
  lede: string;
  /** Optional case-study-specific title (overrides project.name in the H1). */
  title?: string;
  /** Optional override for the right-side eyebrow text (defaults to venue ?? scope). */
  eyebrowRight?: string;
  /** Optional custom meta row. Defaults to Client / Scale / Venue? / Year. */
  meta?: CaseStudyMetaItem[];
  /** Optional CSS aspect-ratio override on the hero media (e.g. "1077/876"). */
  heroAspectRatio?: string;
  /** Optional case-study hero image (defaults to project.heroImage). */
  heroImage?: string;
  /** Optional case-study hero alt text (defaults to project.heroImageAlt). */
  heroImageAlt?: string;
  /** Optional CSS object-position on the hero image (e.g. "center 42%"). */
  heroImagePosition?: string;
  /** Platform-style hero: hero image is shown at natural ratio, no crop. */
  heroFullBleed?: boolean;
  /** Optional "When / Where" label row in the hero (Platforms). */
  when?: CaseStudyWhenItem[];
  /** Optional CTA buttons in the hero (Platforms). */
  cta?: { primary?: CaseStudyLink; secondary?: CaseStudyLink };
  sections: CaseStudySection[];
};

export type Project = {
  slug: string;
  name: string;
  shortName?: string;
  client: string;
  scale: Scale;
  venue?: string;
  year: string;
  yearLabel: string; // e.g. "’24"
  scope: string;
  heroImage?: string;
  heroImageAlt?: string;
  heroImagePosition?: string; // CSS object-position
  outcome?: string;
  did?: DidRow[];
  /** When present, /{scale}/[slug] renders the rich case-study layout */
  caseStudy?: CaseStudy;
};

const DEFAULT_DID: DidRow[] = [
  {
    heading: "Vision & Strategy",
    body: "Found the idea and the strategy that made it worth doing.",
  },
  {
    heading: "Experience Design",
    body: "Translated ambition into a buildable show, content design, spatial and technical architecture.",
  },
  {
    heading: "Technology & Production",
    body: "Production discipline that has delivered since 2018, including real-time and large-format systems.",
  },
  {
    heading: "Live Delivery & Operation",
    body: "Technical direction, system commissioning, and on-site command, run flawlessly, no second take.",
  },
];

// Raw project definitions. Display order is applied below via MOMENTS_ORDER —
// add new entries here in any spot; reorder by editing MOMENTS_ORDER.
const _projectsRaw: Project[] = [
  // ===== MOMENTS =====
  {
    slug: "usmnt-wc26-roster-reveal",
    name: "USMNT WC26 Roster Reveal",
    client: "US Soccer",
    scale: "moments",
    venue: "Brooklyn · Broadcast",
    year: "2026",
    yearLabel: "’26",
    scope: "U.S. Soccer · Broadcast",
    heroImage: "/photos/usmnt-roster-reveal.jpg",
    heroImageAlt: "USMNT WC26 Roster Reveal at the Brooklyn waterfront",
    heroImagePosition: "center 78%",
    outcome:
      "The U.S. men's national team roster for a home World Cup, revealed live to 2.7 million people at once.",
    caseStudy: {
      title: "USMNT World Cup 2026 Roster Reveal",
      lede: "The U.S. men's national team roster for a home World Cup, revealed live to 2.7 million people at once.",
      eyebrowRight: "Live on FOX Sports",
      meta: [
        { key: "Client", value: "US Soccer" },
        { key: "Scale", value: "Moments" },
        { key: "Broadcast", value: "FOX Sports" },
        { key: "Year", value: "2026" },
      ],
      // hero image was shot at 1077:876, preserve the framing
      heroAspectRatio: "1077 / 876",
      heroImage: "/photos/usmnt-roster-reveal-2026/hero.jpg",
      heroImageAlt:
        "USMNT Roster Reveal 2026 stage on the Brooklyn waterfront, fans with phones raised",
      sections: [
        {
          kind: "block",
          label: "01 · The moment",
          prose: [
            {
              size: "big",
              runs: [
                "The 2026 World Cup is on home soil, and the roster reveal was the moment the country met the team.",
              ],
            },
            {
              runs: [
                "US Soccer made it broadcast television: ",
                { type: "hl", text: "live on FOX Sports, presented by Google" },
                ", with a performance by Gunna.",
              ],
            },
          ],
        },
        {
          kind: "film",
          videoId: "1200508901",
          hash: "1503432950",
          title: "USMNT Roster Reveal · film",
        },
        {
          kind: "trio",
          items: [
            {
              src: "/photos/usmnt-roster-reveal-2026/trio-pulisic.jpg",
              alt: "Christian Pulisic reveals his number 10 jersey",
            },
            {
              src: "/photos/usmnt-roster-reveal-2026/trio-reyna.jpg",
              alt: "Gio Reyna reveals his number 7 jersey",
            },
            {
              src: "/photos/usmnt-roster-reveal-2026/trio-dest.jpg",
              alt: "Sergiño Dest reveals his number 2 jersey with the Brooklyn Bridge behind",
            },
          ],
        },
        {
          kind: "block",
          label: "02 · End to end",
          prose: [
            {
              size: "big",
              runs: [
                "M+C Saatchi brought in PHNTM to produce the event and run it on the ground.",
              ],
            },
            {
              runs: [
                "PHNTM handled it end to end: creative production, print, fabrication, AV, and site operations, then integrated directly with US Soccer and FOX Sports to ",
                { type: "hl", text: "take it live to air" },
                ".",
              ],
            },
          ],
        },
        {
          kind: "film",
          videoId: "1200511941",
          hash: "eca03f9ee5",
          title: "USMNT Roster Reveal · recap",
        },
        {
          kind: "duo",
          variant: "v",
          left: {
            src: "/photos/usmnt-roster-reveal-2026/duo-fans.jpg",
            alt: "Two fans in stars-and-stripes kits and scarves at the reveal",
          },
          right: {
            src: "/photos/usmnt-roster-reveal-2026/duo-scarf.jpg",
            alt: "A Roster Reveal 2026 scarf held up against the city skyline",
          },
        },
        {
          kind: "stat",
          num: "2.7M",
          unit: ".",
          caption: "People watched the reveal live, at once.",
        },
      ],
    },
  },
  {
    slug: "fanatics-socials",
    name: "Fanatics Socials",
    client: "Fanatics Live",
    scale: "moments",
    year: "2024",
    yearLabel: "’24",
    scope: "Social · Content",
    heroImage: "/photos/fanatics-live/hero.jpg",
    heroImageAlt: "Fanatics Live, live shopping built for sports fans",
    outcome:
      "From 1,100 followers to over 150,000 in under a year.",
    caseStudy: {
      title: "Fanatics Live Social Campaigns",
      lede: "From 1,100 followers to over 150,000 in under a year.",
      eyebrowRight: "Social · Fanatics Live",
      meta: [
        { key: "Client", value: "Fanatics Live" },
        { key: "Scale", value: "Moments" },
        { key: "Channel", value: "Social" },
        { key: "Year", value: "2024" },
      ],
      sections: [
        {
          kind: "block",
          label: "01 · The challenge",
          prose: [
            {
              size: "big",
              runs: [
                "Fanatics Live was a new name in a crowded space: live shopping built for sports fans.",
              ],
            },
            {
              runs: [
                "The account started at ",
                { type: "hl", text: "1,100 followers" },
                ", with everything still to prove.",
              ],
            },
          ],
        },
        {
          kind: "duo",
          variant: "h",
          left: {
            src: "/photos/fanatics-live/duo-nba.jpg",
            alt: "Vintage NBA trading cards",
          },
          right: {
            src: "/photos/fanatics-live/duo-nfl.jpg",
            alt: "Vintage NFL and multi-sport trading cards",
          },
        },
        {
          kind: "block",
          label: "02 · The model",
          prose: [
            {
              size: "big",
              runs: [
                "PHNTM built a lean team that owned the full pipeline, embedded inside the Fanatics and Fanatics Live marketing team, close enough to operate as one group.",
              ],
            },
            {
              runs: [
                "Build, shoot, edit, post. All in-house, all cut into live moments while they still mattered. In under a year the account went from ",
                { type: "hl", text: "1,100 followers to more than 150,000" },
                ".",
              ],
            },
          ],
        },
        {
          kind: "film",
          videoId: "1200491973",
          hash: "4e2a836566",
          title: "Fanatics Live · social campaign film",
        },
        {
          kind: "bleed",
          src: "/photos/fanatics-live/bleed-phones.jpg",
          alt: "The Fanatics Live app, live shows, bidding, and breaks across four screens",
          caption: {
            index: "04",
            text: "The product: live shows, bidding, and breaks, in one feed.",
          },
        },
        {
          kind: "duo",
          variant: "v",
          left: {
            src: "/photos/fanatics-live/social-1-of-1.jpg",
            alt: "Social post, a collector pulls two 1-of-1 cards live",
          },
          right: {
            src: "/photos/fanatics-live/social-jordan.jpg",
            alt: "Throwback Thursday social post, 1993 Michael Jordan card",
          },
        },
        {
          kind: "block",
          label: "03 · Embedded",
          prose: [
            {
              size: "big",
              runs: [
                "By the end, the work was far enough inside the business that part of the PHNTM team moved in-house at Fanatics.",
              ],
            },
          ],
        },
        {
          kind: "stat",
          num: "150K",
          unit: "+",
          caption:
            "Followers in under a year, up from 1,100 at the start.",
        },
      ],
    },
  },
  {
    slug: "gq-super-bowl-party",
    name: "GQ Super Bowl Party",
    client: "GQ Sports · FARFETCH",
    scale: "moments",
    venue: "Nomad Library · Las Vegas",
    year: "2024",
    yearLabel: "’24",
    scope: "Super Bowl LVIII · Las Vegas",
    heroImage: "/photos/gq-super-bowl.webp",
    heroImageAlt: "GQ Super Bowl Party, DJ set in a library lounge",
    outcome:
      "One party on the most crowded weekend in entertainment, and the right people came.",
    caseStudy: {
      title: "GQ x FARFETCH Super Bowl Party",
      lede: "One party on the most crowded weekend in entertainment, and the right people came.",
      eyebrowRight: "Super Bowl LVIII · Las Vegas",
      meta: [
        { key: "Client", value: "GQ Sports · FARFETCH" },
        { key: "Scale", value: "Moments" },
        { key: "Venue", value: "Nomad Library" },
        { key: "Year", value: "2024" },
      ],
      heroImage: "/photos/gq-super-bowl/hero.jpg",
      heroImageAlt:
        "A guest in black holds a cocktail beside the 1800 ice sculpture in the Nomad Library",
      sections: [
        {
          kind: "block",
          label: "01 · The weekend",
          prose: [
            {
              size: "big",
              runs: [
                "Super Bowl LVIII weekend in Las Vegas is the most competitive few days on the events calendar.",
              ],
            },
            {
              runs: [
                "Every brand throws a party, and all of them fight for the same guests and the same attention. GQ Sports and FARFETCH wanted theirs to be ",
                { type: "hl", text: "the one people actually showed up to." },
                " PHNTM produced it, at the Nomad Library.",
              ],
            },
          ],
        },
        {
          kind: "bleed",
          src: "/photos/gq-super-bowl/bleed-dj.jpg",
          alt: "The DJ booth in the wood-panelled library, the room moving",
          caption: {
            index: "02",
            text: "The Nomad Library, turned into a GQ room for the night.",
          },
        },
        {
          kind: "block",
          label: "02 · What PHNTM ran",
          prose: [
            {
              size: "big",
              runs: [
                "PHNTM ran the whole event: the design and layout, the step-and-repeat, the photo moments, the florals, and the AV.",
              ],
            },
            {
              runs: [
                "All built to ",
                { type: "hl", text: "look like GQ, not just another Vegas party." },
                " Travis Scott, Offset, Vic Mensa, Odell Beckham Jr., and players from across the NFL came through. GQ Sports and Vogue covered it.",
              ],
            },
          ],
        },
        {
          kind: "duo",
          variant: "v",
          left: {
            src: "/photos/gq-super-bowl/duo-ice.jpg",
            alt: "A bartender pours over a carved 1800 ice bottle in the library",
          },
          right: {
            src: "/photos/gq-super-bowl/duo-guests.jpg",
            alt: "Two guests in the room, one in a red jersey, one in cream",
          },
        },
        {
          kind: "bleed",
          src: "/photos/gq-super-bowl/bleed-peace.jpg",
          alt: "Two guests throw up peace signs in the crowd",
          caption: {
            index: "05",
            text: "The right room: athletes, artists, and the people GQ wanted there.",
          },
        },
        {
          kind: "feature",
          tall: {
            src: "/photos/gq-super-bowl/feature-football.jpg",
            alt: "A guest holds a custom flame-pattern NFL football",
          },
          fill: {
            src: "/photos/gq-super-bowl/feature-mac.jpg",
            alt: "Bowls of mac and cheese passed on a tray",
          },
        },
        {
          kind: "stat",
          num: "500",
          unit: ".",
          caption: "Guests in the room, on the most crowded weekend of the year.",
        },
      ],
    },
  },
  {
    slug: "rabbit-r1-launch",
    name: "Rabbit r1 Keynote",
    client: "Rabbit",
    scale: "moments",
    venue: "CES 2024 · Los Angeles",
    year: "2024",
    yearLabel: "’24",
    scope: "CES 2024 · Los Angeles",
    heroImage: "/photos/rabbit-r1.jpg",
    heroImageAlt: "Rabbit r1 device held in hand",
    outcome:
      "A startup's product keynote, watched nearly 15 million times in its first week.",
    caseStudy: {
      lede: "A startup's product keynote, watched nearly 15 million times in its first week.",
      eyebrowRight: "CES 2024 · Los Angeles",
      meta: [
        { key: "Client", value: "Rabbit" },
        { key: "Scale", value: "Moments" },
        { key: "Format", value: "Product Keynote" },
        { key: "Year", value: "2024" },
      ],
      heroImage: "/photos/rabbit-r1/hero.jpg",
      heroImageAlt:
        "Jesse Lyu on stage holding the r1, a giant render and the teenage engineering logo behind him",
      sections: [
        {
          kind: "block",
          label: "01 · The brief",
          prose: [
            {
              size: "big",
              runs: [
                "Rabbit was a small company launching the r1, an AI device, at CES 2024, the most crowded week on the tech calendar.",
              ],
            },
            {
              runs: [
                "It needed a keynote that could stand next to the biggest names in the building. ",
                { type: "hl", text: "PHNTM conceived and produced the whole thing." },
              ],
            },
          ],
        },
        {
          kind: "film",
          videoId: "903551369",
          hash: "e6d2eeabaf",
          title: "Rabbit r1 Keynote, film",
        },
        {
          kind: "bleed",
          src: "/photos/rabbit-r1/bleed-stage-wall.jpg",
          alt: "Jesse Lyu on stage in front of a curved wall of app screens",
          caption: {
            index: "02",
            text: "Built on PHNTM's own LED volume in Los Angeles, the wall as stage and backdrop.",
          },
        },
        {
          kind: "block",
          label: "02 · On the volume",
          prose: [
            {
              size: "big",
              runs: [
                "PHNTM built the keynote on its own LED volume, with the motion graphics and product visuals running across the wall as CEO Jesse Lyu walked through the device.",
              ],
            },
            {
              runs: [
                "A multi-cam shoot with Steadicam kept the long-form program moving, and PHNTM advised on the script and performance to hold attention the whole way through. ",
                { type: "hl", text: "Concept to filmed keynote in 30 days, with a 48-hour post turnaround." },
              ],
            },
          ],
        },
        {
          kind: "duo",
          variant: "h",
          left: {
            src: "/photos/rabbit-r1/duo-device.jpg",
            alt: "The orange Rabbit r1 held in hand, its boot animation on the screen",
          },
          right: {
            src: "/photos/rabbit-r1/duo-vision.jpg",
            alt: "The r1's Vision feature shown on the device screen, held in hand",
          },
        },
        {
          kind: "duo",
          variant: "h",
          left: {
            src: "/photos/rabbit-r1/duo-interface.jpg",
            alt: "The interface segment, an isometric black-and-white motion-graphics world",
          },
          right: {
            src: "/photos/rabbit-r1/duo-teach.jpg",
            alt: "A giant r1 render showing teach mode and generated images",
          },
        },
        {
          kind: "stat",
          num: "14.8M",
          unit: ".",
          caption: "Views in the first week. 10.5M on X, 4.3M on YouTube.",
        },
        {
          kind: "bleed",
          src: "/photos/rabbit-r1/bleed-thank-you.jpg",
          alt: "Jesse Lyu on the volume before a 'thank you, rabbit' end card, camera in foreground",
          caption: {
            index: "07",
            text: "One filmed keynote, set next to the biggest names in the building.",
          },
        },
      ],
    },
  },
  {
    slug: "coca-cola-y3000-sphere",
    name: "Coca-Cola Y3000 Sphere",
    client: "Coca-Cola",
    scale: "moments",
    venue: "Sphere · Las Vegas",
    year: "2023",
    yearLabel: "’23",
    scope: "Sphere · Las Vegas",
    heroImage: "/photos/coca-cola-y3000/hero.jpg",
    heroImageAlt:
      "Coca-Cola Y3000 iridescent fluid simulation wrapping the Sphere in Las Vegas",
    outcome:
      "Coca-Cola's flavor from the future, launched on the largest screen on earth.",
    caseStudy: {
      lede: "Coca-Cola's flavor from the future, launched on the largest screen on earth.",
      sections: [
        {
          kind: "block",
          label: "01 · The canvas",
          prose: [
            {
              size: "big",
              runs: [
                "Coca-Cola Y3000 is a flavor crafted with AI, built to taste like the future. To launch it, Coca-Cola brought it to the Exosphere in Las Vegas.",
              ],
            },
            {
              runs: [
                { type: "hl", text: "580,000 square feet of programmable LED" },
                ", the largest digital canvas anywhere. PHNTM made all of it, from the first storyboard to the live capture.",
              ],
            },
          ],
        },
        {
          kind: "film",
          videoId: "886646441",
          hash: "1bde9084cf",
          title: "Coca-Cola Y3000 · Sphere film",
        },
        {
          kind: "block",
          label: "02 · The film",
          prose: [
            {
              size: "big",
              runs: [
                "It started as storyboards and became a 90-second film: a pastel future city wrapped around the largest animated fluid simulation ever rendered.",
              ],
            },
            {
              runs: [
                "A Coca-Cola pour made of ",
                { type: "hl", text: "billions of particles" },
                " in RealFlow and Cinema 4D. Getting it onto the dome meant solving nighttime visibility and writing new workflows for a surface no one had animated before.",
              ],
            },
          ],
        },
        {
          kind: "bleed",
          src: "/photos/coca-cola-y3000/bleed-lava.jpg",
          alt: "The Coca-Cola pour rendered as molten light across the full dome of the Sphere",
          caption: { index: "02", text: "The pour, rendered as molten light across the full dome." },
        },
        {
          kind: "block",
          label: "03 · On the ground",
          prose: [
            {
              size: "big",
              runs: [
                "PHNTM produced a tasting party in full view of the Sphere with the Jonas Brothers, and ran live capture across the night.",
              ],
            },
          ],
        },
        {
          kind: "split",
          tall: {
            src: "/photos/coca-cola-y3000/split-tall.jpg",
            alt: "The Sphere towering over the tasting party venue at night",
            corner: "03",
          },
          wide: {
            src: "/photos/coca-cola-y3000/split-wide.jpg",
            alt: "Guests silhouetted against the glowing dome up close",
            corner: "04",
          },
        },
        {
          kind: "bleed",
          src: "/photos/coca-cola-y3000/bleed-crowd.jpg",
          alt: "The crowd lifting phones to capture the Coca-Cola pour on the Sphere",
          caption: { index: "05", text: "The room, phones up, the moment captured and shared in real time." },
        },
        {
          kind: "stat",
          num: "720K",
          unit: ".",
          caption: "Views in 72 hours, shared from the Jonas Brothers' Instagram.",
        },
      ],
    },
  },
  {
    slug: "bose-stevie-soundbar",
    name: "Bose Stevie Soundbar",
    client: "Bose",
    scale: "moments",
    year: "2023",
    yearLabel: "’23",
    scope: "Product Launch",
    heroImage: "/photos/bose-stevie.jpg",
    heroImageAlt:
      "Bose Stevie Soundbar in a cinematic horror-themed living room set",
    outcome:
      "A soundbar launch, built as a film about what sound does to a room.",
    caseStudy: {
      lede: "A soundbar launch, built as a film about what sound does to a room.",
      eyebrowRight: "Film · LED Volume",
      meta: [
        { key: "Client", value: "Bose" },
        { key: "Scale", value: "Moments" },
        { key: "Format", value: "60-second film" },
        { key: "Year", value: "2023" },
      ],
      heroAspectRatio: "3 / 2",
      heroImage: "/photos/bose-stevie/hero.jpg",
      heroImageAlt:
        "A horror-genre living room set bathed in red, family watching a scream on screen",
      sections: [
        {
          kind: "block",
          label: "01 · The idea",
          prose: [
            {
              size: "big",
              runs: [
                "Bose was launching the Stevie Smart Ultra Soundbar and wanted the campaign to show what the product does, not describe it.",
              ],
            },
            {
              runs: [
                "PHNTM built it as a ",
                { type: "hl", text: "60-second film shot on an LED volume" },
                ".",
              ],
            },
          ],
        },
        {
          kind: "film",
          videoId: "871935647",
          hash: "23af773276",
          title: "Bose Stevie Soundbar · hero film",
        },
        {
          kind: "block",
          label: "02 · Three genres",
          prose: [
            {
              size: "big",
              runs: [
                "The idea was simple: sound changes a room. The film moved through three genres, each with its own set, color, and talent.",
              ],
            },
            {
              runs: [
                "Horror, romance, and action. It opened in darkness, and when the soundbar switched on the room filled with color and motion, ",
                {
                  type: "hl",
                  text: "the screen doing on camera what the soundbar does to a real one",
                },
                ".",
              ],
            },
          ],
        },
        {
          kind: "bleed",
          src: "/photos/bose-stevie/bleed-romance.jpg",
          alt: "A romance-genre set in warm sunset light, a couple on a couch surrounded by blossom",
          caption: {
            index: "02",
            text: "Romance, warm light, blossom, a sunset that fills the room.",
          },
        },
        {
          kind: "duo",
          variant: "h",
          left: {
            src: "/photos/bose-stevie/duo-action-overhead.jpg",
            alt: "Overhead of the action-genre set, deep reds and a glowing orb",
          },
          right: {
            src: "/photos/bose-stevie/duo-action-viewer.jpg",
            alt: "A viewer in Bose headphones watches an action scene in a red-lit room",
          },
        },
        {
          kind: "block",
          label: "03 · The product",
          prose: [
            {
              size: "big",
              runs: [
                "PHNTM produced the hero spot and the retouched stills for Bose's launch.",
              ],
            },
            {
              runs: [
                "Out ",
                { type: "hl", text: "October 2, 2023" },
                ".",
              ],
            },
          ],
        },
        {
          kind: "bleed",
          src: "/photos/bose-stevie/bleed-product.jpg",
          alt: "The Bose Smart Ultra Soundbar in close-up, warm light behind",
          caption: {
            index: "05",
            text: "The Stevie Smart Ultra Soundbar, the hero of every frame.",
          },
        },
        {
          kind: "duo",
          variant: "h",
          left: {
            src: "/photos/bose-stevie/duo-soundbar-horror.jpg",
            alt: "The soundbar in the horror set, a skull beside it, screen glowing",
          },
          right: {
            src: "/photos/bose-stevie/duo-app.jpg",
            alt: "The Bose app in hand, setting up a new product",
          },
        },
        {
          kind: "stat",
          num: "10M",
          unit: ".",
          caption:
            "Views across the launch: horror, romance, action, one room.",
        },
      ],
    },
  },
  {
    slug: "reebok-the-other-side",
    name: "Reebok The Other Side",
    client: "Reebok",
    scale: "moments",
    venue: "Shanghai",
    year: "2018",
    yearLabel: "’18",
    scope: "Shanghai Fashion Week",
    heroImage: "/photos/reebok-other-side.jpg",
    heroImageAlt:
      "Reebok runway show with mirrored stage and beams of light",
    outcome:
      "Reebok's first show at Shanghai Fashion Week, built out of light and reflection.",
    caseStudy: {
      title: "Reebok: The Other Side",
      lede: "Reebok's first show at Shanghai Fashion Week, built out of light and reflection.",
      eyebrowRight: "Shanghai Fashion Week",
      heroAspectRatio: "1242 / 821",
      heroImage: "/photos/reebok-other-side/hero.jpg",
      heroImageAlt:
        "A lone model walks a mirrored runway between monoliths under radial beams of light",
      sections: [
        {
          kind: "block",
          label: "01 · The invitation",
          prose: [
            {
              size: "big",
              runs: [
                "Reebok was the first American brand invited to Shanghai Fashion Week, and the show had to carry that.",
              ],
            },
            {
              runs: [
                "Working with creative director Michael Yu, PHNTM designed, built, and ran ",
                { type: "hl", text: "\"The Other Side,\" a 15-minute runway in five acts" },
                ".",
              ],
            },
          ],
        },
        {
          kind: "film",
          videoId: "354713789",
          hash: "1aead4adc9",
          title: "Reebok The Other Side · film",
        },
        {
          kind: "block",
          label: "02 · The room was the set",
          prose: [
            {
              size: "big",
              runs: [
                "LED floors, two-way mirror monoliths, reflective ceilings, and archways of suspended light.",
              ],
            },
            {
              runs: [
                "All of it shifting across the five acts, so ",
                { type: "hl", text: "the space itself changed as the show moved" },
                ".",
              ],
            },
          ],
        },
        {
          kind: "bleed",
          src: "/photos/reebok-other-side/bleed-overhead.jpg",
          alt: "Overhead view of the mirrored runway, beams crossing in an X over the crowd",
          caption: {
            index: "02",
            text: "Reflective ceilings doubled the beams, the room mirrored end to end.",
          },
        },
        {
          kind: "duo",
          variant: "h",
          left: {
            src: "/photos/reebok-other-side/duo-archway.jpg",
            alt: "Models pass through a lit two-way mirror archway",
          },
          right: {
            src: "/photos/reebok-other-side/duo-floor.jpg",
            alt: "Two models reflected on the black mirrored runway floor",
          },
        },
        {
          kind: "block",
          label: "03 · On the ground",
          prose: [
            {
              size: "big",
              runs: ["Future and William Chan performed."],
            },
            {
              runs: [
                "PHNTM handled the experiential design, technical production, interactive lighting and coding, and ",
                { type: "hl", text: "ran the event on the ground in Shanghai" },
                ".",
              ],
            },
          ],
        },
        {
          kind: "duo",
          variant: "h",
          left: {
            src: "/photos/reebok-other-side/duo-future.jpg",
            alt: "Future performs into the crowd in a blue Reebok jacket",
          },
          right: {
            src: "/photos/reebok-other-side/duo-neon.jpg",
            alt: "The Reebok vector logo in blue neon",
          },
        },
        {
          kind: "bleed",
          src: "/photos/reebok-other-side/bleed-wide.jpg",
          alt: "Wide view of the runway, teal beams raking across the full crowd",
          caption: {
            index: "07",
            text: "The space, re-made for each of the five acts.",
          },
        },
        {
          kind: "stat",
          num: "5",
          unit: ".",
          caption: "Acts in one 15-minute show, the room re-made for each.",
        },
      ],
    },
  },
  {
    slug: "free-larry-hoover",
    name: "Free Larry Hoover",
    client: "Free Larry Hoover",
    scale: "moments",
    venue: "LA Coliseum",
    year: "2021",
    yearLabel: "’21",
    scope: "Stadium · Live",
    heroImage: "/photos/free-larry-hoover.jpg",
    heroImageAlt:
      "Free Larry Hoover benefit concert, lone figure on a vast stage in fog",
    outcome: "A stadium show and a global broadcast, built in 18 days.",
    caseStudy: {
      title: "Free Larry Hoover Benefit Concert",
      lede: "A stadium show and a global broadcast, built in 18 days.",
      eyebrowRight: "LA Memorial Coliseum",
      meta: [
        { key: "Show", value: "Free Larry Hoover" },
        { key: "Scale", value: "Moments" },
        { key: "Venue", value: "LA Coliseum" },
        { key: "Year", value: "2021" },
      ],
      heroAspectRatio: "3 / 2",
      heroImage: "/photos/free-larry-hoover/hero.jpg",
      heroImageAlt:
        "A lone figure stands on the edge of the concrete Mound as smoke fills the Coliseum",
      sections: [
        {
          kind: "block",
          label: "01 · 18 days",
          prose: [
            {
              size: "big",
              runs: [
                "In December 2021, the LA Memorial Coliseum hosted a one-night benefit for prison and sentencing reform, headlined by Kanye West and Drake.",
              ],
            },
            {
              runs: [
                "From first call to doors, the entire production had ",
                { type: "hl", text: "18 days" },
                ". A full stadium. A worldwide broadcast. One night, no second show.",
              ],
            },
          ],
        },
        {
          kind: "film",
          videoId: "735683584",
          hash: "ceb5f4dc53",
          title: "Free Larry Hoover · recap film",
        },
        {
          kind: "bleed",
          src: "/photos/free-larry-hoover/bleed-aerial.jpg",
          alt: "Aerial of the Coliseum, the LA skyline behind, the full crowd lit by phones",
          caption: {
            index: "02",
            text: "A full stadium, the field turned into one continuous environment.",
          },
        },
        {
          kind: "block",
          label: "02 · The Mound",
          prose: [
            {
              size: "big",
              runs: [
                "PHNTM built it. Working with creative director Niklas Bildstein Zaar, PHNTM made the centerpiece real: \"The Mound,\" a 200-foot-wide concrete stage.",
              ],
            },
            {
              runs: [
                "It took ",
                { type: "hl", text: "400,000 pounds of poured concrete" },
                " to build. 72 projectors wrapped the stadium in light, smoke, and shifting color, turning a football field into one continuous environment.",
              ],
            },
          ],
        },
        {
          kind: "duo",
          variant: "h",
          left: {
            src: "/photos/free-larry-hoover/duo-mound-overhead.jpg",
            alt: "Overhead of the round Mound, a lone figure in a spotlight through smoke",
          },
          right: {
            src: "/photos/free-larry-hoover/duo-mound-figure.jpg",
            alt: "A figure with arms raised on the Mound, blue and pink smoke, lit platforms above",
          },
        },
        {
          kind: "duo",
          variant: "h",
          left: {
            src: "/photos/free-larry-hoover/duo-arches.jpg",
            alt: "The Coliseum arches silhouetted, a flare of light bursting through",
          },
          right: {
            src: "/photos/free-larry-hoover/duo-steps.jpg",
            alt: "Figures arranged across the lit peristyle steps, beams cutting through",
          },
        },
        {
          kind: "block",
          label: "03 · The broadcast",
          prose: [
            {
              size: "big",
              runs: [
                "The night couldn't only belong to the people in the seats.",
              ],
            },
            {
              runs: [
                "PHNTM ran the global livestream across Amazon Music, Prime Video, and Twitch, and built the ",
                {
                  type: "hl",
                  text: "first live concert broadcast ever shown in IMAX theaters",
                },
                ", putting the show on the biggest screens in the world while it happened.",
              ],
            },
          ],
        },
        {
          kind: "film",
          videoId: "735692023",
          hash: "6dc3925ad3",
          title: "Free Larry Hoover · broadcast film",
        },
        {
          kind: "vrow",
          label: {
            left: "On the biggest screens, and the smallest",
            right: "IMAX · Social",
          },
          film: {
            videoId: "890041695",
            hash: "cd36c59f1e",
            title: "Free Larry Hoover · IMAX social clip",
          },
          photo: {
            src: "/photos/free-larry-hoover/vrow-kanye-drake.jpg",
            alt: "Kanye West and Drake perform together on the field under a full moon",
          },
        },
        {
          kind: "duo",
          variant: "h",
          left: {
            src: "/photos/free-larry-hoover/duo-walk.jpg",
            alt: "Two figures cross the field through a wall of pink and orange smoke",
          },
          right: {
            src: "/photos/free-larry-hoover/duo-solo.jpg",
            alt: "A lone figure, arms outstretched, enveloped in pale blue smoke",
          },
        },
        {
          kind: "stat",
          num: "6.9M",
          unit: ".",
          caption:
            "People reached across 22 countries, all of it built in eighteen days.",
        },
      ],
    },
  },
  {
    slug: "donda-2",
    name: "Donda 2 Listening Party",
    client: "Donda 2",
    scale: "moments",
    venue: "LoanDepot Park · Miami",
    year: "2022",
    yearLabel: "’22",
    scope: "Stadium · Live",
    heroImage: "/photos/donda-2.webp",
    heroImageAlt:
      "DONDA 2 listening event, burning house set reflected in water",
    outcome:
      "A replica of his childhood home, floating on water, burning to open the show.",
    caseStudy: {
      lede: "A replica of his childhood home, floating on water, burning to open the show.",
      eyebrowRight: "LoanDepot Park · Miami",
      meta: [
        { key: "Show", value: "Donda 2" },
        { key: "Scale", value: "Moments" },
        { key: "Venue", value: "LoanDepot Park" },
        { key: "Year", value: "2022" },
      ],
      heroImage: "/photos/donda-2/hero.jpg",
      heroImageAlt:
        "A to-scale replica of a house on fire, floating on water, a cross on its roof",
      heroImagePosition: "center 42%",
      sections: [
        {
          kind: "block",
          label: "01 · 22 days",
          prose: [
            {
              size: "big",
              runs: [
                "In February 2022, Kanye West debuted Donda 2 at LoanDepot Park in Miami. The centerpiece was the house he grew up in, rebuilt to scale on a pond.",
              ],
            },
            {
              runs: [
                "Set on fire as the show opened, left smoldering on the water as it closed. The whole thing came together in ",
                { type: "hl", text: "22 days, under heavy public scrutiny" },
                ".",
              ],
            },
          ],
        },
        {
          kind: "film",
          videoId: "743780902",
          hash: "0876cb2196",
          title: "Donda 2 · film",
        },
        {
          kind: "bleed",
          src: "/photos/donda-2/bleed-helmets.jpg",
          alt: "Ranks of helmeted performers face the house across the flooded field",
          caption: {
            index: "02",
            text: "A full crowd, the field turned to water around the house.",
          },
        },
        {
          kind: "block",
          label: "02 · The build",
          prose: [
            {
              size: "big",
              runs: [
                "Working with creative director Niklas Bildstein Zaar, PHNTM engineered and built it.",
              ],
            },
            {
              runs: [
                "A ",
                { type: "hl", text: "300,000-gallon pool" },
                " inside the ballpark, the to-scale house sitting on top of it, and the special effects to burn it down in a controlled way, live, in front of a full crowd.",
              ],
            },
          ],
        },
        {
          kind: "feature",
          tall: {
            src: "/photos/donda-2/feature-house-tall.jpg",
            alt: "The replica house standing on still water under a wall of pink smoke",
          },
          fill: {
            src: "/photos/donda-2/feature-house-fill.jpg",
            alt: "The house on the water, teal and pink smoke, performers wading",
          },
        },
        {
          kind: "duo",
          variant: "h",
          left: {
            src: "/photos/donda-2/duo-kneel.jpg",
            alt: "Kanye West kneels in the water in black, head bowed",
          },
          right: {
            src: "/photos/donda-2/duo-run.jpg",
            alt: "Kanye West runs from the house through pink smoke under a blood-red moon",
          },
        },
        {
          kind: "block",
          label: "03 · The broadcast",
          prose: [
            {
              size: "big",
              runs: [
                "PHNTM also built the broadcast. A live heartbeat feed, pulled from Ye in real time through custom biometric monitoring, ran to theaters and streaming as he performed.",
              ],
            },
            {
              runs: [
                "The show went out as the ",
                {
                  type: "hl",
                  text: "first live concert broadcast across 60 IMAX theaters, in 15 cities at once",
                },
                ".",
              ],
            },
          ],
        },
        {
          kind: "feature",
          flip: true,
          tall: {
            src: "/photos/donda-2/feature-cloaks-tall.jpg",
            alt: "Cloaked performers fill the ballpark floor under an open sky and stadium light",
          },
          fill: {
            src: "/photos/donda-2/feature-helmets-fill.jpg",
            alt: "Kanye West among a formation of helmeted performers in blue light",
          },
        },
        {
          kind: "bleed",
          src: "/photos/donda-2/bleed-blue-house.jpg",
          alt: "The house in blue light and smoke inside the ballpark",
          caption: {
            index: "09",
            text: "The house, lit blue in the smoke, between acts.",
          },
        },
        {
          kind: "stat",
          num: "5.9M",
          unit: ".",
          caption:
            "Viewers across 60 IMAX screens in 15 cities, all built in 22 days.",
        },
      ],
    },
  },
  {
    slug: "chase-sapphire-speedway",
    name: "Chase Sapphire Speedway",
    client: "Chase Sapphire",
    scale: "moments",
    venue: "Las Vegas",
    year: "2023",
    yearLabel: "’23",
    scope: "Las Vegas Grand Prix",
    heroImage: "/photos/chase-sapphire-speedway.jpg",
    heroImageAlt:
      "Chase Sapphire Speedway, Ferrari and supercars under brand lighting",
    outcome:
      "A cardholder lounge built inside the garages of F1's first Las Vegas Grand Prix.",
    caseStudy: {
      lede: "A cardholder lounge built inside the garages of F1's first Las Vegas Grand Prix.",
      eyebrowRight: "Las Vegas Grand Prix",
      heroImage: "/photos/chase-sapphire-speedway/hero.jpg",
      heroImageAlt:
        "Cardholders in helmets watch the track at night under the Sapphire Reserve arch",
      sections: [
        {
          kind: "block",
          label: "01 · Inside the weekend",
          prose: [
            {
              size: "big",
              runs: [
                "Formula 1 came to Las Vegas for the first time, and Chase Sapphire Reserve wanted its cardholders inside the weekend, not watching from the stands.",
              ],
            },
            {
              runs: [
                "PHNTM built Sapphire Speedway: ",
                {
                  type: "hl",
                  text: "the garages at the Las Vegas Motor Speedway turned into a Chase lounge",
                },
                " for the race.",
              ],
            },
          ],
        },
        {
          kind: "film",
          videoId: "890409159",
          hash: "3519955073",
          title: "Chase Sapphire Speedway · film",
        },
        {
          kind: "duo",
          variant: "v",
          left: {
            src: "/photos/chase-sapphire-speedway/duo-cars.jpg",
            alt: "Supercars on display in the garage beneath the Sapphire Reserve wall",
          },
          right: {
            src: "/photos/chase-sapphire-speedway/duo-suit.jpg",
            alt: "A vintage F1 race suit and helmet shown like a museum piece on blue",
          },
        },
        {
          kind: "block",
          label: "02 · Concept to build",
          prose: [
            {
              size: "big",
              runs: ["PHNTM owned it from the concept through the build."],
            },
            {
              runs: [
                "Driving on a working track, supercars on display, F1 gear shown like a museum, celebrity-chef dinners, and the whole space wrapped in hundreds of custom brand pieces. ",
                {
                  type: "hl",
                  text: "From the idea to the last asset on the wall, PHNTM designed and ran all of it.",
                },
              ],
            },
          ],
        },
        {
          kind: "feature",
          tall: {
            src: "/photos/chase-sapphire-speedway/feature-track.jpg",
            alt: "A Ferrari and instructors on the working track at Las Vegas Motor Speedway",
          },
          fill: {
            src: "/photos/chase-sapphire-speedway/feature-dinner.jpg",
            alt: "The dinner hall under hammered-gold dome lamps, set for service",
          },
        },
        {
          kind: "bleed",
          src: "/photos/chase-sapphire-speedway/bleed-helmet.jpg",
          alt: "A guest is helped into a helmet under the Sapphire Reserve arch before driving",
          caption: {
            index: "06",
            text: "Cardholders inside the weekend, not watching from the stands.",
          },
        },
        {
          kind: "stat",
          num: "5.1M",
          unit: ".",
          caption: "Views across socials from one weekend on the track.",
        },
      ],
    },
  },
  {
    slug: "aku-world",
    name: "Aku World",
    client: "Aku",
    scale: "moments",
    venue: "Wynwood · Miami",
    year: "2021",
    yearLabel: "’21",
    scope: "Wynwood · Miami",
    heroImage: "/photos/aku-world.jpg",
    heroImageAlt:
      "Aku World, immersive projection-mapped helmet installation",
    outcome: "A digital character you could walk inside.",
    caseStudy: {
      lede: "A digital character you could walk inside.",
      eyebrowRight: "Wynwood · Miami",
      meta: [
        { key: "Project", value: "Aku" },
        { key: "Scale", value: "Moments" },
        { key: "Venue", value: "Wynwood, Miami" },
        { key: "Year", value: "2021" },
      ],
      heroImage: "/photos/aku-world/hero.jpg",
      heroImageAlt:
        "A packed crowd around a stage with a giant astronaut-helmet sculpture, warm light",
      sections: [
        {
          kind: "block",
          label: "01 · The character",
          prose: [
            {
              size: "big",
              runs: [
                "Aku began as an NFT by artist Micah Johnson: a young Black boy in an astronaut's helmet, wondering if someone like him could go to space.",
              ],
            },
            {
              runs: [
                "He lived on screens, and his fans wanted to be near him. So PHNTM built him ",
                { type: "hl", text: "a world you could walk into" },
                ".",
              ],
            },
          ],
        },
        {
          kind: "film",
          videoId: "739836360",
          hash: "89758ff26b",
          title: "Aku World · film",
        },
        {
          kind: "bleed",
          src: "/photos/aku-world/bleed-helmet-purple.jpg",
          alt: "A colossal Aku helmet sculpture at the center, projection-mapped landscape walls around it",
          caption: {
            index: "02",
            text: "A colossal Aku helmet at the center, the rooms projection-mapped around it.",
          },
        },
        {
          kind: "block",
          label: "02 · The world",
          prose: [
            {
              size: "big",
              runs: [
                "In a 30,000 square foot space in Wynwood, Miami, working with Matte Projects, PHNTM turned the building into Aku's universe.",
              ],
            },
            {
              runs: [
                "Futuristic subway cars, projection mapping across the rooms, an NFT gallery and a retail space built into the story instead of bolted onto it. PHNTM handled the ",
                {
                  type: "hl",
                  text: "interactive media and coding, experiential design, XR and virtual production, and the motion graphics",
                },
                " that held the digital and physical halves together.",
              ],
            },
          ],
        },
        {
          kind: "duo",
          variant: "h",
          left: {
            src: "/photos/aku-world/duo-subway.jpg",
            alt: "An Aku avatar on a vertical screen by the Subway Lobby, pink-lit room",
          },
          right: {
            src: "/photos/aku-world/duo-nft.jpg",
            alt: "Two lit NFT display cases holding a t-shirt and a yellow backpack",
          },
        },
        {
          kind: "bleed",
          src: "/photos/aku-world/bleed-helmet-orange.jpg",
          alt: "The Aku helmet sculpture in an orange projection-mapped room, reflected on the floor",
          caption: {
            index: "05",
            text: "Projection mapping turned each room into another part of his world.",
          },
        },
        {
          kind: "block",
          label: "03 · The workshop",
          prose: [
            {
              size: "big",
              runs: [
                "The part fans remember is the 4D-scanning workshop. You stepped in, got scanned, and walked out as a custom avatar placed inside Aku's world.",
              ],
            },
            {
              runs: [
                "That was the whole idea of the place: ",
                {
                  type: "hl",
                  text: "something that only lived on a screen, turned into somewhere you could stand",
                },
                ".",
              ],
            },
          ],
        },
        {
          kind: "duo",
          variant: "h",
          left: {
            src: "/photos/aku-world/duo-pod.jpg",
            alt: "The white 4D-scanning pod with touch-to-begin kiosks in a purple room",
          },
          right: {
            src: "/photos/aku-world/duo-kiosk.jpg",
            alt: "A kiosk screen reading Ready to Explore with QR codes, a hand reaching in",
          },
        },
        {
          kind: "bleed",
          src: "/photos/aku-world/bleed-screen-wall.jpg",
          alt: "Guests gathered before a towering grid of screens showing the Aku character",
          caption: {
            index: "08",
            text: "A character that only lived on a screen, turned into somewhere you could stand.",
          },
        },
        {
          kind: "stat",
          num: "6K",
          unit: ".",
          caption:
            "People through the doors. Few studios had taken an NFT character off the screen and built it into a place you could visit.",
        },
      ],
    },
  },
  {
    slug: "cartier-met-gala",
    name: "Cartier · Met Gala",
    client: "Cartier",
    scale: "moments",
    venue: "The Mark Hotel · NYC",
    year: "2021",
    yearLabel: "’21",
    scope: "The Mark Hotel · NYC",
    heroImage: "/photos/cartier-met-gala.jpg",
    heroImageAlt:
      "Cartier at the Met Gala, portrait in diamonds amid refracted light",
    outcome: "One hotel room at The Mark, turned into five worlds.",
    caseStudy: {
      title: "Cartier at the Met Gala",
      lede: "One hotel room at The Mark, turned into five worlds.",
      eyebrowRight: "The Mark Hotel · NYC",
      meta: [
        { key: "Client", value: "Cartier" },
        { key: "Scale", value: "Moments" },
        { key: "Venue", value: "The Mark Hotel" },
        { key: "Year", value: "2021" },
      ],
      heroImage: "/photos/cartier-met-gala/hero.jpg",
      heroImageAlt:
        "Leon Bridges in a white hat and blue suede, lit by a star of light in the photobooth",
      sections: [
        {
          kind: "block",
          label: "01 · The moment",
          prose: [
            {
              size: "big",
              runs: [
                "On the night of the 2021 Met Gala, Cartier wanted a moment for the talent at The Mark Hotel, where much of the guest list gets ready before the Met steps.",
              ],
            },
            {
              runs: [
                "PHNTM built it inside a single furnished hotel room: ",
                {
                  type: "hl",
                  text: "a virtual production photobooth that dropped whoever stepped in into a different world",
                },
                ".",
              ],
            },
          ],
        },
        {
          kind: "film",
          videoId: "735725420",
          hash: "5bb9f43499",
          title: "Cartier at the Met Gala · film",
        },
        {
          kind: "bleed",
          src: "/photos/cartier-met-gala/bleed-troye.jpg",
          alt: "Troye Sivan in a black tank and tennis necklace amid glittering bokeh",
          caption: {
            index: "02",
            text: "Talent stepped through on the way to the gala.",
          },
        },
        {
          kind: "block",
          label: "02 · Five worlds",
          prose: [
            {
              size: "big",
              runs: [
                "Five of them, each built from Cartier's own language of diamonds, gold, and celestial shapes, blended with archival footage and run in real time so the room reacted live.",
              ],
            },
            {
              runs: [
                "Billie Eilish, Leon Bridges, and Troye Sivan stepped through them on their way to the gala. ",
                { type: "hl", text: "One ordinary room, five places that didn't exist." },
              ],
            },
          ],
        },
        {
          kind: "duo",
          variant: "sq",
          left: {
            src: "/photos/cartier-met-gala/duo-billie-pale.jpg",
            alt: "Billie Eilish in a pale gown and diamonds, reclining in shattered light",
          },
          right: {
            src: "/photos/cartier-met-gala/duo-billie-peach.jpg",
            alt: "Billie Eilish in a peach gown, arms crossed, rings and bracelets catching light",
          },
        },
        {
          kind: "feature",
          tall: {
            src: "/photos/cartier-met-gala/feature-troye-tall.jpg",
            alt: "Troye Sivan in a diamond necklace, Cartier at the Met Gala",
          },
          fill: {
            src: "/photos/cartier-met-gala/feature-maisie-fill.jpg",
            alt: "Maisie Williams in black with a diamond necklace, lit by a star of light",
          },
        },
        {
          kind: "block",
          label: "03 · Concept to build",
          prose: [
            {
              size: "big",
              runs: ["PHNTM owned it from concept through build."],
            },
            {
              runs: [
                "The experiential design, the real-time virtual production, the motion graphics, and ",
                { type: "hl", text: "the interactive system that made it run" },
                ".",
              ],
            },
          ],
        },
        {
          kind: "duo",
          variant: "v",
          left: {
            src: "/photos/cartier-met-gala/duo-dan-levy.jpg",
            alt: "Dan Levy in a map-print look, Cartier at the Met Gala",
          },
          right: {
            src: "/photos/cartier-met-gala/duo-red-mask.jpg",
            alt: "A guest in a red beaded mask and red suit with a Cartier brooch",
          },
        },
        {
          kind: "duo",
          variant: "h",
          label: { left: "Behind the scenes", right: "The set" },
          left: {
            src: "/photos/cartier-met-gala/duo-bts-room.jpg",
            alt: "The furnished hotel room turned into a virtual-production photobooth",
          },
          right: {
            src: "/photos/cartier-met-gala/duo-bts-kaleidoscope.jpg",
            alt: "A second world inside the room, walls mapped with a diamond kaleidoscope",
          },
        },
        {
          kind: "stat",
          num: "50M",
          unit: "+",
          caption:
            "Impressions from the content the talent shared from inside the room.",
        },
      ],
    },
  },
  {
    slug: "yeezy-gap",
    name: "Yeezy Gap",
    client: "Yeezy Gap",
    scale: "moments",
    venue: "Four cities · one night",
    year: "2021",
    yearLabel: "’21",
    scope: "Four cities · one night",
    heroImage: "/photos/yeezy-gap.jpg",
    heroImageAlt:
      "Yeezy Gap, blue jacket projected on the Guggenheim Museum facade",
    outcome: "A giant jacket on landmarks in four cities, built in 18 hours.",
    caseStudy: {
      title: "Yeezy Gap Round Jacket Launch",
      lede: "A giant jacket on landmarks in four cities, built in 18 hours.",
      eyebrowRight: "Four cities · one night",
      meta: [
        { key: "Client", value: "Yeezy Gap" },
        { key: "Scale", value: "Moments" },
        { key: "Built in", value: "18 hours" },
        { key: "Year", value: "2021" },
      ],
      heroImage: "/photos/yeezy-gap/hero.jpg",
      heroImageAlt:
        "The Round Jacket projected twice across the Walt Disney Concert Hall at night, with a QR code",
      sections: [
        {
          kind: "block",
          label: "01 · 18 hours",
          prose: [
            {
              size: "big",
              runs: [
                "Yeezy Gap was dropping the Round Jacket and wanted noise in the real world, not just the feed.",
              ],
            },
            {
              runs: [
                "PHNTM had ",
                { type: "hl", text: "18 hours from the idea to projectors going live" },
                ".",
              ],
            },
          ],
        },
        {
          kind: "film",
          videoId: "745755781",
          hash: "c9954ba4f5",
          title: "Yeezy Gap Round Jacket · film",
        },
        {
          kind: "bleed",
          src: "/photos/yeezy-gap/bleed-guggenheim.jpg",
          alt: "The blue Round Jacket and a QR code projected onto the Guggenheim Museum at night",
          caption: {
            index: "02",
            text: "The jacket, thrown onto a landmark, with a QR code to buy it.",
          },
        },
        {
          kind: "block",
          label: "02 · Idea to live",
          prose: [
            {
              size: "big",
              runs: [
                "In that window, PHNTM built the content, a 3D Round Jacket with logos and a scannable QR code, and put a 46-person team on the ground across New York, Miami, Los Angeles, and Chicago.",
              ],
            },
            {
              runs: [
                "Rolling projection units threw the jacket onto landmark buildings in all four cities at once. ",
                {
                  type: "hl",
                  text: "PHNTM ran the media buys and the content, all of it.",
                },
              ],
            },
          ],
        },
        {
          kind: "duo",
          variant: "h",
          left: {
            src: "/photos/yeezy-gap/duo-nyc-building.jpg",
            alt: "The Round Jacket projected on a building wall in New York at night",
          },
          right: {
            src: "/photos/yeezy-gap/duo-nyc-library.jpg",
            alt: "Three jackets projected across the columned facade of the New York Public Library",
          },
        },
        {
          kind: "film",
          videoId: "566313557",
          hash: "2e52f3101f",
          title: "Yeezy Gap Round Jacket · projection film",
        },
        {
          kind: "duo",
          variant: "h",
          left: {
            src: "/photos/yeezy-gap/duo-city-night.jpg",
            alt: "The jacket projected on a tower above a busy crossing at night",
          },
          right: {
            src: "/photos/yeezy-gap/duo-city-day.jpg",
            alt: "The same building screen in daylight, crowds at the crossing below",
          },
        },
        {
          kind: "stat",
          num: "50K",
          unit: ".",
          caption: "Units sold. The jacket sold out in pre-sale.",
        },
      ],
    },
  },
  {
    slug: "sunday-service",
    name: "Kanye Sunday Service",
    client: "Kanye West",
    scale: "moments",
    venue: "1360 Conway · Los Angeles",
    year: "2021",
    yearLabel: "’21",
    scope: "1360 Conway · Los Angeles",
    heroImage: "/photos/sunday-service.jpg",
    heroImageAlt:
      "Kanye Sunday Service, choir in a single beam of light",
    outcome: "A Sunday Service turned into a memorial for Virgil Abloh.",
    caseStudy: {
      title: "Sunday Service: In Memory of Virgil Abloh",
      lede: "A Sunday Service turned into a memorial for Virgil Abloh.",
      eyebrowRight: "1360 Conway · Los Angeles",
      meta: [
        { key: "Client", value: "Kanye West" },
        { key: "Scale", value: "Moments" },
        { key: "Venue", value: "1360 Conway, LA" },
        { key: "Year", value: "2021" },
      ],
      heroImage: "/photos/sunday-service/hero.jpg",
      heroImageAlt:
        "A conductor with raised hands leads the choir in a single shaft of light in a black room",
      sections: [
        {
          kind: "block",
          label: "01 · The service",
          prose: [
            {
              size: "big",
              runs: [
                "In late November 2021, Virgil Abloh died suddenly. He had been the creative director of Donda and one of Kanye West's closest friends.",
              ],
            },
            {
              runs: [
                "Kanye dedicated a Sunday Service to him, and PHNTM built and ran it: at 1360 Conway in Los Angeles, and for everyone watching around the world. PHNTM created the live show, designed the space and the lighting that set its tone, handled the technical production and the event, and produced the ",
                { type: "hl", text: "global livestream" },
                " so the room reached far past the people inside it.",
              ],
            },
          ],
        },
        {
          kind: "film",
          videoId: "745186827",
          hash: "47bc132330",
          title: "Sunday Service, In Memory of Virgil Abloh",
        },
        {
          kind: "bleed",
          src: "/photos/sunday-service/bleed-warehouse.jpg",
          alt: "Shafts of light cut through a darkened warehouse over a standing congregation",
          caption: {
            index: "02",
            text: "A black room, cut by light, and everyone watching around the world.",
          },
        },
        {
          kind: "block",
          label: "02 · The program",
          prose: [
            {
              size: "big",
              runs: ["The program held tribute and music together."],
            },
            {
              runs: [
                "The MUSYCA Children's Choir opened with 'Donda' and 'Jesus Lord.' The Sunday Service Choir sang 'Hurricane,' 'Moon,' and songs from their 'Emmanuel' EP. The tribute came with Adele's 'Easy On Me' and ",
                { type: "hl", text: "one line on the screen." },
              ],
            },
          ],
        },
        {
          kind: "feature",
          tall: {
            src: "/photos/sunday-service/feature-figure-beam.jpg",
            alt: "A lone figure steps into the beam as the choir stands in shadow",
          },
          fill: {
            src: "/photos/sunday-service/feature-conductor-back.jpg",
            alt: "The conductor seen from behind, arms raised, the choir in DONDA shirts",
          },
        },
        {
          kind: "feature",
          flip: true,
          tall: {
            src: "/photos/sunday-service/feature-beam-crowd.jpg",
            alt: "A single diagonal beam of light over a silhouetted crowd",
          },
          fill: {
            src: "/photos/sunday-service/feature-overhead.jpg",
            alt: "Overhead of the congregation ringed around performers under crossing beams",
          },
        },
        {
          kind: "statement",
          label: { left: "On the screen", right: "The tribute" },
          heading: "In Loving Memory of Virgil Abloh.",
          sub: "The Creative Director of Donda.",
        },
      ],
    },
  },
  {
    slug: "redbull-enigma-185",
    name: "Red Bull Enigma 185",
    client: "Red Bull",
    scale: "moments",
    venue: "Avant Gardner · Brooklyn",
    year: "2021",
    yearLabel: "’21",
    scope: "Avant Gardner · Brooklyn",
    heroImage: "/photos/redbull-enigma-185.jpg",
    heroImageAlt:
      "Red Bull Enigma 185, LED-visor performers in blue light",
    outcome:
      "A party hosted by an AI, for the people who host everyone else.",
    caseStudy: {
      lede: "A party hosted by an AI, for the people who host everyone else.",
      eyebrowRight: "Avant Gardner · Brooklyn",
      meta: [
        { key: "Client", value: "Red Bull" },
        { key: "Scale", value: "Moments" },
        { key: "Venue", value: "Avant Gardner, BK" },
        { key: "Year", value: "2021" },
      ],
      heroImage: "/photos/redbull-enigma-185/hero.jpg",
      heroImageAlt:
        "Three performers in LED-visor headpieces beneath a glowing canopy",
      sections: [
        {
          kind: "block",
          label: "01 · The night",
          prose: [
            {
              size: "big",
              runs: [
                "Red Bull's Red Monday series throws a night for New York's service industry, the bartenders and nightlife workers who spend every weekend making other people's nights.",
              ],
            },
            {
              runs: [
                "For this one, PHNTM conceived Enigma 185: ",
                { type: "hl", text: "a party run by an artificial intelligence," },
                " named for Alan Turing and the Enigma code. Thirty days before doors, the venue changed, and PHNTM rebuilt the whole concept for Avant Gardner in Brooklyn without losing it.",
              ],
            },
          ],
        },
        {
          kind: "film",
          videoId: "745113985",
          hash: "a6c2c28e48",
          title: "Red Bull Enigma 185, film",
        },
        {
          kind: "bleed",
          src: "/photos/redbull-enigma-185/bleed-neon.jpg",
          alt: "Suspended neon LED letter panels glowing over the crowd and a food cart",
          caption: {
            index: "02",
            text: "The technology ran the party instead of decorating it.",
          },
        },
        {
          kind: "block",
          label: "02 · Three lounges",
          prose: [
            {
              size: "big",
              runs: [
                "Inside, PHNTM split the space into three lounges, Byte, Cura, and Nexus, and used LED walls, projection, and holograms to make it feel like the AI was hosting the room.",
              ],
            },
            {
              runs: [
                "Guests moved through AI Integration Stations and live performance art, ",
                { type: "hl", text: "with the technology running the party instead of decorating it." },
              ],
            },
          ],
        },
        {
          kind: "duo",
          variant: "h",
          left: {
            src: "/photos/redbull-enigma-185/duo-binary-wall.jpg",
            alt: "The crowd under a giant LED wall of streaming binary code",
          },
          right: {
            src: "/photos/redbull-enigma-185/duo-marquee.jpg",
            alt: "Guests pass beneath the ENIGMA 185 LED marquee at the entrance",
          },
        },
        {
          kind: "duo",
          variant: "h",
          left: {
            src: "/photos/redbull-enigma-185/duo-dj.jpg",
            alt: "A DJ in a patterned coat works the Red Monday booth over the floor",
          },
          right: {
            src: "/photos/redbull-enigma-185/duo-dispenser.jpg",
            alt: "A custom Red Bull dispenser glowing on the floor",
          },
        },
        {
          kind: "stat",
          num: "250M",
          unit: ".",
          caption: "Images used to train the AI that hosted the room.",
        },
      ],
    },
  },
  {
    slug: "dakar-rally-closing-ceremony",
    name: "Dakar Rally Closing Ceremony",
    client: "Dakar · Qiddiya",
    scale: "moments",
    venue: "Tuwaiq Mountain · Saudi Arabia",
    year: "2020",
    yearLabel: "’20",
    scope: "Tuwaiq Mountain · Saudi Arabia",
    heroImage: "/photos/dakar-rally.jpg",
    heroImageAlt:
      "Dakar Rally Closing Ceremony, fireworks over a stage and crowd",
    outcome:
      "A mountain in the Saudi desert turned into a stage, in 31 days.",
    caseStudy: {
      lede: "A mountain in the Saudi desert turned into a stage, in 31 days.",
      eyebrowRight: "Tuwaiq Mountain · Saudi Arabia",
      meta: [
        { key: "Client", value: "Dakar · Qiddiya" },
        { key: "Scale", value: "Moments" },
        { key: "Venue", value: "Tuwaiq Mountain" },
        { key: "Year", value: "2020" },
      ],
      heroImage: "/photos/dakar-rally-closing/hero.jpg",
      heroImageAlt:
        "A wall of gold fireworks fills the sky over the lit rock stage and the desert crowd",
      sections: [
        {
          kind: "block",
          label: "01 · The night",
          prose: [
            {
              size: "big",
              runs: [
                "To close the 2020 Dakar Rally and launch Qiddiya to the world, PHNTM turned a mountain in the open Saudi desert into a stage.",
              ],
            },
            {
              runs: [
                "Wiz Khalifa and DJ Snake performed for more than 40,000 people. The ceremony closed with a projection-mapped story across the cliff and ",
                { type: "hl", text: "more than 13,000 fireworks over the desert." },
              ],
            },
          ],
        },
        {
          kind: "duo",
          variant: "h",
          left: {
            src: "/photos/dakar-rally-closing/duo-wiz.jpg",
            alt: "Wiz Khalifa mid-jump on the rock stage, confetti filling the night sky",
          },
          right: {
            src: "/photos/dakar-rally-closing/duo-dj-snake.jpg",
            alt: "DJ Snake's set, lasers raking pink and blue over a packed desert crowd",
          },
        },
        {
          kind: "film",
          videoId: "393980692",
          hash: "68ea3ed55d",
          title: "Dakar Rally Closing Ceremony, event recap",
        },
        {
          kind: "bleed",
          src: "/photos/dakar-rally-closing/bleed-blue-face.jpg",
          alt: "A face projected across the full cliff in blue, fireworks rising above the crowd",
          caption: {
            index: "04",
            text: "The built stage and the rock, read as a single surface.",
          },
        },
        {
          kind: "block",
          label: "02 · The screen in the rock",
          prose: [
            {
              size: "big",
              runs: [
                "PHNTM made the mountain the stage. Working with Martin Professional Middle East, PHNTM laser-scanned the cliff and installed 84 Barco projectors across nine sites, housed in custom marine containers to survive the desert.",
              ],
            },
            {
              runs: [
                "It turned ",
                { type: "hl", text: "32,000 square meters of mountain into a projection canvas" },
                ", the largest permanent projection mapping installation in the world, a Guinness World Record, built as the backdrop for one night.",
              ],
            },
          ],
        },
        {
          kind: "duo",
          variant: "h",
          left: {
            src: "/photos/dakar-rally-closing/duo-mountain-logo.jpg",
            alt: "The Dakar logo projected onto Tuwaiq Mountain at night, a single beam climbing the rock",
          },
          right: {
            src: "/photos/dakar-rally-closing/duo-calibration.jpg",
            alt: "A daytime calibration test, color bars and a wireframe mapped across the cliff",
          },
        },
        {
          kind: "film",
          videoId: "735705176",
          hash: "fb3a5d955e",
          title: "Dakar, projection mapping recap",
          label: {
            left: "The projection, up close",
            right: "Guinness World Record",
          },
        },
        {
          kind: "block",
          label: "03 · 31 days",
          prose: [
            {
              size: "big",
              runs: [
                "Live Nation and PHNTM had 31 days, from first call to doors, to build it all in open desert with the cliff face behind and nothing else around.",
              ],
            },
            {
              runs: [
                "On the night, more than 400 lighting elements, a full special effects package, and the projection system all ran as one.",
              ],
            },
          ],
        },
        {
          kind: "bleed",
          src: "/photos/dakar-rally-closing/bleed-podium.jpg",
          alt: "The Dakar finish podium built in open desert, the cliff face of Tuwaiq Mountain rising behind",
          caption: {
            index: "07",
            text: "The finish podium and stage, built into open desert in 31 days.",
          },
        },
        {
          kind: "stat",
          num: "32K",
          unit: ".",
          caption:
            "Square meters of mountain, turned into the world's largest permanent projection canvas. The screen stayed, and still runs Qiddiya's events today.",
        },
      ],
    },
  },
  {
    slug: "electric-forest-festival",
    name: "Electric Forest",
    client: "Electric Forest",
    scale: "moments",
    venue: "Sherwood Forest · Michigan",
    year: "2024",
    yearLabel: "’24",
    scope: "Sherwood Forest · Michigan",
    heroImage: "/photos/electric-forest/hero.jpg",
    heroImageAlt:
      "Ranch Arena under a fan of blue and teal beams, the crowd packed wall to wall",
    outcome: "Four stages, a decade running.",
    caseStudy: {
      lede: "Four stages, a decade running.",
      eyebrowRight: "Sherwood Forest · Michigan",
      meta: [
        { key: "Client", value: "Electric Forest" },
        { key: "Scale", value: "Moments" },
        { key: "Stages", value: "Four" },
        { key: "Running", value: "A decade" },
      ],
      heroImage: "/photos/electric-forest/hero.jpg",
      heroImageAlt:
        "Ranch Arena under a fan of blue and teal beams, the crowd packed wall to wall",
      sections: [
        {
          kind: "block",
          label: "01 · Four stages",
          prose: [
            {
              size: "big",
              runs: [
                "Electric Forest is one of the most production-forward festivals in the country, a Michigan forest turned into a world for a long weekend.",
              ],
            },
            {
              runs: [
                "PHNTM designs, builds, and runs the shows across four of its stages: ",
                { type: "hl", text: "Ranch Arena, Sherwood Court, Tripolee, and Carousel Club." },
              ],
            },
          ],
        },
        {
          kind: "film",
          videoId: "1200912295",
          hash: "514c0c56c8",
          title: "Electric Forest, film",
        },
        {
          kind: "bleed",
          src: "/photos/electric-forest/bleed-ranch-fireworks.jpg",
          alt: "Sparks and pyro raining over the Ranch Arena stage and a vast night crowd",
          caption: {
            index: "02",
            text: "Ranch Arena, the scale end of the festival.",
          },
        },
        {
          kind: "block",
          label: "02 · Each its own world",
          prose: [
            {
              size: "big",
              runs: [
                "Each stage is its own world, from the scale of Ranch Arena to the close quarters of Carousel Club.",
              ],
            },
            {
              runs: [
                "PHNTM designs each one to fit, with the ",
                { type: "hl", text: "lighting, video, and laser systems built around the music and the space" },
                " rather than dropped in. On top of the stages, PHNTM runs the technical production for the artists playing them.",
              ],
            },
          ],
        },
        {
          kind: "duo",
          variant: "h",
          left: {
            src: "/photos/electric-forest/duo-sherwood-elephant.jpg",
            alt: "Sherwood Court, an illuminated elephant mapped across the stage in lasers",
          },
          right: {
            src: "/photos/electric-forest/duo-jubilee-umbrellas.jpg",
            alt: "The Jubilee stage under a vast canopy of glowing orange umbrellas",
          },
        },
        {
          kind: "duo",
          variant: "h",
          left: {
            src: "/photos/electric-forest/duo-ranch-smoke.jpg",
            alt: "Columns of orange CO2 smoke firing over the Ranch Arena crowd",
          },
          right: {
            src: "/photos/electric-forest/duo-sherwood-blue.jpg",
            alt: "Sherwood Court raked by a starburst of blue laser beams",
          },
        },
        {
          kind: "block",
          label: "03 · A decade running",
          prose: [
            {
              size: "big",
              runs: [
                "Electric Forest has brought PHNTM back to do all of it for a decade running.",
              ],
            },
          ],
        },
        {
          kind: "bleed",
          src: "/photos/electric-forest/bleed-ranch-daytime.jpg",
          alt: "The ornate gold Ranch Arena stage in daylight, the forest behind a sea of fans",
          caption: {
            index: "07",
            text: "The same forest, every year, built new.",
          },
        },
        {
          kind: "stat",
          num: "10",
          unit: ".",
          caption: "Years running. Four stages designed, built, and run, every edition.",
        },
      ],
    },
  },
  {
    slug: "coca-cola-coachella",
    name: "Coca-Cola CokeChella",
    client: "Coca-Cola",
    scale: "moments",
    venue: "Coachella · Indio, California",
    year: "2023",
    yearLabel: "’23",
    scope: "Coachella · Coca-Cola",
    heroImage: "/photos/coca-cola-coachella/hero.jpg",
    heroImageAlt:
      "The mirrored Coke Studio room, the virtual pop star Yameii in wireframe, a 00:48 countdown on red LED walls",
    outcome:
      "A virtual pop star, a mirrored room, and every guest's phone wired into the same show.",
    caseStudy: {
      lede: "A virtual pop star, a mirrored room, and every guest's phone wired into the same show.",
      eyebrowRight: "Coachella · Coca-Cola",
      meta: [
        { key: "Client", value: "Coca-Cola" },
        { key: "Scale", value: "Moments" },
        { key: "Venue", value: "Coachella" },
        { key: "Year", value: "2023" },
      ],
      heroImage: "/photos/coca-cola-coachella/hero.jpg",
      heroImageAlt:
        "The mirrored Coke Studio room, the virtual pop star Yameii in wireframe, a 00:48 countdown on red LED walls",
      sections: [
        {
          kind: "block",
          label: "01 · The room",
          prose: [
            {
              size: "big",
              runs: [
                "At Coachella, Coca-Cola wanted its \"Real Magic\" world to be somewhere people stepped into, not just walked past.",
              ],
            },
            {
              runs: [
                "PHNTM conceived and built it: a 2,000 square foot Coke Studio with 13-foot LED walls, mirrored ceilings, and reflective floors that turned the room into a ",
                { type: "hl", text: "360-degree world of light and sound," },
                " with the virtual pop star Yameii Online performing inside it.",
              ],
            },
          ],
        },
        {
          kind: "film",
          videoId: "1098387335",
          hash: "98ae8c3236",
          title: "Coca-Cola CokeChella, film",
        },
        {
          kind: "block",
          label: "02 · Every phone, part of the show",
          prose: [
            {
              size: "big",
              runs: [
                "The room wasn't the whole show. PHNTM built it so every guest's phone became part of it, triggering AR animations during the performance.",
              ],
            },
            {
              runs: [
                "All of it synced in real time across the screens and the crowd's devices at once. ",
                { type: "hl", text: "One moment dropped the whole room into the feeling of floating in space." },
              ],
            },
          ],
        },
        {
          kind: "feature",
          tall: {
            src: "/photos/coca-cola-coachella/feature-galaxy.jpg",
            alt: "A guest lifts a phone into a galaxy of Coca-Cola towers and floating flowers",
          },
          fill: {
            src: "/photos/coca-cola-coachella/feature-phone-wall.jpg",
            alt: "A guest holds up a phone before the glowing Coke Studio Yameii & Friends wall",
          },
        },
        {
          kind: "bleed",
          src: "/photos/coca-cola-coachella/bleed-sky-room.jpg",
          alt: "The crowd inside the mirrored room beneath a pink-and-blue sky with Yameii overhead",
          caption: {
            index: "04",
            text: "Mirrored ceiling, reflective floor, a 360-degree world around the crowd.",
          },
        },
        {
          kind: "stat",
          num: "9,200",
          unit: "+",
          caption:
            "Guests across both Coachella weekends, who shared what they saw nearly four times each.",
        },
      ],
    },
  },

  // ===== PLATFORMS =====
  {
    slug: "mode-festival",
    name: "MODE Festival",
    client: "Flickr",
    scale: "platforms",
    venue: "Downtown Minneapolis",
    year: "2026",
    yearLabel: "’26",
    scope: "The World's Photography Festival",
    heroImage: "/photos/mode-festival.webp",
    heroImageAlt: "MODE by Flickr, The World's Photography Festival",
    outcome:
      "Three days in Minneapolis for everything photographers love, and love to shoot.",
    caseStudy: {
      title: "MODE: The World's Photography Festival",
      lede: "Three days in Minneapolis for everything photographers love, and love to shoot.",
      eyebrowRight: "MODE by Flickr",
      meta: [
        { key: "Scale", value: "Platforms" },
        { key: "Partner", value: "Flickr" },
        { key: "City", value: "Minneapolis" },
        { key: "Dates", value: "Sept 18–20, 2026" },
      ],
      when: [
        { label: "When", value: "Sept 18–20, 2026" },
        { label: "Where", value: "Downtown Minneapolis" },
      ],
      cta: {
        primary: { label: "Buy passes", href: "https://modefestival.com/passes" },
        secondary: { label: "Visit modefestival.com", href: "https://modefestival.com" },
      },
      heroAspectRatio: "3 / 2",
      heroImage: "/photos/mode-festival/hero.webp",
      heroImageAlt: "MODE by Flickr, The World's Photography Festival",
      sections: [
        {
          kind: "block",
          label: "What it is",
          prose: [
            {
              size: "big",
              runs: [
                "MODE is a three-day festival for photographers and the people who love the image.",
              ],
            },
            {
              runs: [
                "Live music, performances, keynotes, and classes. ",
                {
                  type: "hl",
                  text: "PHNTM partners with Flickr to design, build, and run it",
                },
                ", the moment, made a property, one that returns every year.",
              ],
            },
          ],
        },
        {
          kind: "poster",
          label: {
            left: "2026 Lineup",
            right: "Sept 18–20 · Minneapolis",
          },
          src: "/photos/mode-festival/poster-lineup.jpg",
          alt: "MODE 2026 lineup, Vince Staples, Tycho, Cory Wong, and dozens of photographers across three days in Minneapolis",
          href: "https://modefestival.com",
        },
        {
          kind: "ctaBand",
          heading: "Three days in Minneapolis. Get your passes.",
          primary: { label: "Buy passes", href: "https://modefestival.com/passes" },
          secondary: { label: "modefestival.com", href: "https://modefestival.com" },
        },
      ],
    },
  },
  {
    slug: "renegade",
    name: "Renegade",
    client: "PHNTM",
    scale: "platforms",
    venue: "New York City",
    year: "2026",
    yearLabel: "’26",
    scope: "New York City",
    heroImage: "/photos/renegade.png",
    heroImageAlt: "Club Renegade, red-lit warehouse DJ set",
    outcome:
      "NYC's leading culture-driven nightlife experience: music, dance, and the city's off-grid spaces.",
    caseStudy: {
      lede: "NYC's leading culture-driven nightlife experience: music, dance, and the city's off-grid spaces.",
      eyebrowRight: "New York City",
      meta: [
        { key: "Scale", value: "Platforms" },
        { key: "City", value: "New York" },
        { key: "Discipline", value: "Nightlife · Culture" },
        { key: "Status", value: "Ongoing" },
      ],
      cta: {
        primary: { label: "Follow for events", href: "https://www.instagram.com/renegade.nyc/" },
        secondary: { label: "Visit renegade.website", href: "https://www.renegade.website/" },
      },
      heroAspectRatio: "3 / 2",
      heroImage: "/photos/renegade/hero.png",
      heroImageAlt:
        "Renegade, a red-lit warehouse dancefloor in New York City",
      sections: [
        {
          kind: "block",
          label: "What it is",
          prose: [
            {
              size: "big",
              runs: [
                "Born during the global lockdown, Renegade emerged from underground New York City gatherings that united people through music, dance, and culture in the city's off-grid spaces.",
              ],
            },
            {
              runs: [
                "Today it's the leading culture-driven experience in NYC, with roots in the city's arts, music, and fashion, and a relentless commitment to authenticity. ",
                { type: "hl", text: "PHNTM partners to design, build, and run it" },
                ", the moment, made a property.",
              ],
            },
          ],
        },
        {
          kind: "ctaBand",
          heading: "Follow Renegade for the next event.",
          primary: { label: "@renegade.nyc", href: "https://www.instagram.com/renegade.nyc/" },
          secondary: { label: "renegade.website", href: "https://www.renegade.website/" },
        },
      ],
    },
  },
  {
    slug: "martin-garrix-world-tour",
    name: "Martin Garrix World Tour",
    client: "Martin Garrix",
    scale: "platforms",
    venue: "The Americas",
    year: "2026",
    yearLabel: "’26",
    scope: "Touring show · Since 2015",
    heroImage: "/photos/martin-garrix.webp",
    heroImageAlt: "Martin Garrix performing on a towering scaffold stage",
    outcome:
      "We've produced Martin Garrix's world tour since 2015. Right now he's on the biggest run of his career, across the Americas through the rest of 2026.",
    caseStudy: {
      lede: "We've produced Martin Garrix's world tour since 2015. Right now he's on the biggest run of his career, across the Americas through the rest of 2026.",
      eyebrowRight: "Touring show · Since 2015",
      meta: [
        { key: "Artist", value: "Martin Garrix" },
        { key: "Scale", value: "Platforms" },
        { key: "Shows", value: "1,000+" },
        { key: "Countries", value: "126" },
      ],
      when: [
        { label: "Now", value: "The Americas · 2026" },
        { label: "With PHNTM", value: "Since 2015" },
      ],
      cta: {
        primary: { label: "Get tickets", href: "https://martingarrix.com/tour/" },
        secondary: { label: "See tour dates", href: "https://martingarrix.com/tour/" },
      },
      heroAspectRatio: "3 / 2",
      heroImage: "/photos/martin-garrix-world-tour/hero.webp",
      heroImageAlt:
        "Martin Garrix on a towering scaffold stage under a fan of beams",
      sections: [
        {
          kind: "block",
          label: "What it is",
          prose: [
            {
              size: "big",
              runs: [
                "One show, built to travel anywhere and land the same every night.",
              ],
            },
            {
              runs: [
                { type: "hl", text: "PHNTM designs, builds, and runs the Martin Garrix world tour" },
                ", the stage, the lighting, the show, and the production that moves it from city to city. Ten years in, the partnership has put on more than 1,000 shows across 126 countries.",
              ],
            },
          ],
        },
        {
          kind: "bleed",
          src: "/photos/martin-garrix-world-tour/bleed-cross.jpg",
          alt: "Martin Garrix framed in a giant black-and-white cross of LED, a full crowd below",
          position: "center 30%",
          caption: {
            index: "02",
            text: "One stage, run the same every night, anywhere in the world.",
          },
        },
        {
          kind: "duo",
          variant: "v",
          left: {
            src: "/photos/martin-garrix-world-tour/duo-lasers.jpg",
            alt: "Green and violet lasers fan over the crowd in a mirrored star",
          },
          right: {
            src: "/photos/martin-garrix-world-tour/duo-scaffold.jpg",
            alt: "Garrix lit white inside a towering scaffold of light and smoke",
          },
        },
        {
          kind: "duo",
          variant: "h",
          left: {
            src: "/photos/martin-garrix-world-tour/duo-cyan.jpg",
            alt: "The towering LED scaffold set washed in cyan, Garrix center stage",
          },
          right: {
            src: "/photos/martin-garrix-world-tour/duo-blue-beams.jpg",
            alt: "A vast fan of blue beams over the decks and the crowd",
          },
        },
        {
          kind: "bleed",
          src: "/photos/martin-garrix-world-tour/bleed-laser-ceiling.jpg",
          alt: "A cathedral of blue laser lines crossing over a packed arena floor",
          position: "center 40%",
          caption: {
            index: "07",
            text: "Every night, a full room, anywhere in the world.",
          },
        },
        {
          kind: "stat",
          num: "1,000",
          unit: "+",
          caption:
            "Shows across 126 countries, produced with PHNTM since 2015.",
        },
        {
          kind: "ctaBand",
          heading: "On the road across the Americas. Get tickets.",
          primary: { label: "Get tickets", href: "https://martingarrix.com/tour/" },
          secondary: { label: "martingarrix.com", href: "https://martingarrix.com/tour/" },
        },
      ],
    },
  },
  {
    slug: "tenderfest",
    name: "TenderFest",
    client: "TenderFest",
    scale: "platforms",
    venue: "Coming Soon",
    year: "2026",
    yearLabel: "’26",
    scope: "Coming Soon",
    heroImage: "/photos/tenderfest.png",
    heroImageAlt: "TenderFest, festival entrance",
    outcome: "Crowning America's Greatest Tender.",
    caseStudy: {
      lede: "Crowning America's Greatest Tender.",
      eyebrowRight: "Coming Soon",
      meta: [
        { key: "Scale", value: "Platforms" },
        { key: "Property", value: "TenderFest" },
        { key: "Status", value: "Coming Soon" },
        { key: "Follow", value: "@tenderfest" },
      ],
      cta: {
        primary: { label: "Follow @tenderfest", href: "https://www.instagram.com/tenderfest/" },
      },
      heroAspectRatio: "3 / 2",
      heroImage: "/photos/tenderfest.png",
      heroImageAlt: "TenderFest, festival entrance",
      sections: [
        {
          kind: "ctaBand",
          heading: "Big announcement coming soon.",
          sub: "Follow us on Instagram.",
          primary: { label: "@tenderfest", href: "https://www.instagram.com/tenderfest/" },
        },
      ],
    },
  },
  {
    slug: "camp",
    name: "CAMP",
    client: "PHNTM",
    scale: "platforms",
    venue: "Las Vegas → Global",
    year: "2024",
    yearLabel: "’24",
    scope: "Returning · 2027",
    heroImage: "/photos/camp.jpg",
    heroImageAlt:
      "CAMP, violinist in a projection-mapped waveform environment",
    outcome:
      "A dining experience in partnership with the world's best chefs. We're bringing it back, bigger, in 2027.",
    caseStudy: {
      lede: "A dining experience in partnership with the world's best chefs. We're bringing it back, bigger, in 2027.",
      eyebrowRight: "Returning · 2027",
      meta: [
        { key: "Property", value: "CAMP" },
        { key: "Scale", value: "Platforms" },
        { key: "Debut", value: "Las Vegas" },
        { key: "Returns", value: "2027" },
      ],
      when: [
        { label: "Debut", value: "Super Bowl · Las Vegas" },
        { label: "Returns", value: "2027 · Global" },
      ],
      cta: {
        primary: { label: "See past editions", href: "https://www.instagram.com/its.just.camp/" },
        secondary: { label: "@its.just.camp", href: "https://www.instagram.com/its.just.camp/" },
      },
      heroAspectRatio: "3 / 2",
      heroImage: "/photos/camp/hero.jpg",
      heroImageAlt:
        "A cloaked violinist alone in a circle of light, the room mapped with rippling sound waves",
      sections: [
        {
          kind: "block",
          label: "What it is",
          prose: [
            {
              size: "big",
              runs: [
                "Every CAMP is a custom-built edition, designed end-to-end for the chef, the room, and the night.",
              ],
            },
            {
              runs: [
                "Each one is made with ",
                { type: "hl", text: "the world's best chefs" },
                ", the menu composed to the room, each course timed to a change in light, sound, and space. The first edition debuted at the Las Vegas Super Bowl with The Alchemist; CAMP returns in 2027 across cities around the world.",
              ],
            },
          ],
        },
        {
          kind: "film",
          videoId: "924730880",
          hash: "8f10e2b219",
          title: "CAMP · film",
        },
        {
          kind: "bleed",
          src: "/photos/camp/bleed-trio.jpg",
          alt: "A string trio plays at the center of a room mapped in red and blue waveforms, diners all around",
          caption: {
            index: "02",
            text: "The room becomes the performance: music, light, and the meal as one.",
          },
        },
        {
          kind: "feature",
          tall: {
            src: "/photos/camp/feature-chef.jpg",
            alt: "A chef leans in to talk with guests at their candlelit table",
          },
          fill: {
            src: "/photos/camp/feature-wine.jpg",
            alt: "Wine poured across a long table set with crystal and plated courses",
          },
        },
        {
          kind: "block",
          label: "The kitchen",
          prose: [
            {
              size: "big",
              runs: [
                "Every edition is built in partnership with the world's best chefs.",
              ],
            },
            {
              runs: [
                "The menu is composed to the room. Each course is timed to a change in light, sound, and space, so the food and the show move together.",
              ],
            },
          ],
        },
        {
          kind: "duo",
          variant: "h",
          left: {
            src: "/photos/camp/duo-lava.jpg",
            alt: "Diners along a bar as the room glows molten red and orange",
          },
          right: {
            src: "/photos/camp/duo-galaxy.jpg",
            alt: "The dining room set within a deep violet starfield projection",
          },
        },
        {
          kind: "ctaBand",
          heading: "More soon. Stay tuned.",
          sub: "Global relaunch in 2027. See previous editions on Instagram.",
          primary: { label: "Follow @its.just.camp", href: "https://www.instagram.com/its.just.camp/" },
        },
      ],
    },
  },

  // ===== VENUES =====
  {
    slug: "riot-games-arena",
    name: "Riot Games Arena",
    client: "Riot Games",
    scale: "venues",
    venue: "Los Angeles · Permanent",
    year: "2023",
    yearLabel: "’23",
    scope: "Los Angeles · Permanent",
    heroImage: "/photos/riot-games-arena.webp",
    heroImageAlt: "Riot Games Arena, League of Legends broadcast stage",
    outcome: "One arena, two esports, a two-hour switch between them.",
    caseStudy: {
      lede: "One arena, two esports, a two-hour switch between them.",
      eyebrowRight: "Los Angeles · Permanent",
      meta: [
        { key: "Client", value: "Riot Games" },
        { key: "Scale", value: "Venues" },
        { key: "Location", value: "Los Angeles" },
        { key: "Switch", value: "~2 hours" },
      ],
      heroImage: "/photos/riot-games-arena/hero.jpg",
      heroImageAlt:
        "The arena split blue and red for Cloud9 versus 100 Thieves, a full crowd watching",
      sections: [
        {
          kind: "block",
          label: "01 · Two games, one room",
          prose: [
            {
              size: "big",
              runs: [
                "Riot needed its Los Angeles arena to host two different esports leagues out of the same room: League of Legends and Valorant's VCT Americas.",
              ],
            },
            {
              runs: [
                "The two games run on different layouts, broadcast setups, and technical demands, down to capturing the in-game footsteps Valorant broadcasts depend on. ",
                { type: "hl", text: "The arena had to be both, and change between them fast." },
              ],
            },
          ],
        },
        {
          kind: "film",
          videoId: "856603251",
          hash: "b0a224c185",
          title: "Riot Games Arena, film",
        },
        {
          kind: "bleed",
          src: "/photos/riot-games-arena/bleed-valorant.jpg",
          alt: "The Valorant stage configuration, player desks under a white play-button screen in red",
          caption: {
            index: "02",
            text: "League of Legends one night, Valorant the next, out of the same room.",
          },
        },
        {
          kind: "block",
          label: "02 · The build",
          prose: [
            {
              size: "big",
              runs: [
                "PHNTM handled the integration end to end: feasibility and 3D visualization up front, then custom fabrication, hardware integration, and system commissioning.",
              ],
            },
            {
              runs: [
                "The build is an 18-foot stage and ",
                { type: "hl", text: "more than 1,000 LED screens" },
                ", designed as one modular system that reconfigures between the two games instead of two separate setups.",
              ],
            },
          ],
        },
        {
          kind: "feature",
          tall: {
            src: "/photos/riot-games-arena/feature-desk.jpg",
            alt: "The analyst desk lit in neon under the VCT Americas mark",
          },
          fill: {
            src: "/photos/riot-games-arena/feature-couch.jpg",
            alt: "The League broadcast couch set, hosts mid-show",
          },
        },
        {
          kind: "duo",
          variant: "h",
          left: {
            src: "/photos/riot-games-arena/duo-league.jpg",
            alt: "The League broadcast set, hosts running a streamer tier list on the wall screen",
          },
          right: {
            src: "/photos/riot-games-arena/duo-vct.jpg",
            alt: "The VCT Americas Playoffs stage, blue and red, the mark on the floor",
          },
        },
        {
          kind: "block",
          label: "03 · The switch",
          prose: [
            {
              size: "big",
              runs: [
                "PHNTM trained a crew of 12 to 16 to flip the entire venue in about two hours.",
              ],
            },
            {
              runs: [
                "The system is engineered to bring that down to one. The result is one room that runs two major leagues, switches between them in roughly two hours, and ",
                { type: "hl", text: "carries multiple language broadcasts at the same time." },
              ],
            },
          ],
        },
        {
          kind: "bleed",
          src: "/photos/riot-games-arena/bleed-red-crowd.jpg",
          alt: "The Valorant layout mid-show, 100 Thieves versus FURIA, the crowd bathed in red",
          position: "center 40%",
          caption: {
            index: "07",
            text: "The same room, hours later, running Valorant for a different crowd.",
          },
        },
        {
          kind: "stat",
          num: "100M",
          unit: "+",
          caption: "Views per year, across two leagues run from one room.",
        },
      ],
    },
  },
];

// Display order for the Moments group on the work grid. Slugs not listed here
// fall to the end. Platforms and Venues keep their array order.
const MOMENTS_ORDER: string[] = [
  "usmnt-wc26-roster-reveal",
  "cartier-met-gala",
  "chase-sapphire-speedway",
  "coca-cola-y3000-sphere",
  "reebok-the-other-side",
  "dakar-rally-closing-ceremony",
  "free-larry-hoover",
  "aku-world",
  "gq-super-bowl-party",
  "bose-stevie-soundbar",
  "donda-2",
  "fanatics-socials",
  "electric-forest-festival",
  "rabbit-r1-launch",
  "sunday-service",
  "redbull-enigma-185",
  "coca-cola-coachella",
  "yeezy-gap",
];

export const projects: Project[] = (() => {
  const orderMap = new Map(MOMENTS_ORDER.map((slug, i) => [slug, i]));
  const moments = _projectsRaw
    .filter((p) => p.scale === "moments")
    .sort(
      (a, b) =>
        (orderMap.get(a.slug) ?? Number.MAX_SAFE_INTEGER) -
        (orderMap.get(b.slug) ?? Number.MAX_SAFE_INTEGER)
    );
  const others = _projectsRaw.filter((p) => p.scale !== "moments");
  return [...moments, ...others];
})();

export const projectsBySlug: Record<string, Project> = Object.fromEntries(
  projects.map((p) => [p.slug, p])
);

export const partners = [
  "Coca-Cola",
  "Cartier",
  "Riot Games",
  "Red Bull",
  "Bose",
  "Reebok",
  "Chase",
  "GQ",
  "Fanatics",
  "U.S. Soccer",
  "Live Nation",
  "Yeezy Gap",
  "Martin Garrix",
  "Dakar Rally",
  "Flickr",
  "FIFA",
];

export const openRoles = [
  {
    title: "Technical Director",
    location: "Remote / US",
    type: "Contract",
    mailto:
      "mailto:careers@phntm.com?subject=PHNTM%20Application%3A%20Technical%20Director",
  },
  {
    title: "Interactive Director",
    location: "Remote / US",
    type: "Contract",
    mailto:
      "mailto:careers@phntm.com?subject=PHNTM%20Application%3A%20Interactive%20Director",
  },
  {
    title: "AI Director",
    location: "Remote / US",
    type: "Contract",
    mailto: "mailto:careers@phntm.com?subject=PHNTM%20Application%3A%20AI%20Director",
  },
  {
    title: "Experiential Producers",
    location: "Remote / US",
    type: "Contract",
    mailto:
      "mailto:careers@phntm.com?subject=PHNTM%20Application%3A%20Experiential%20Producers",
  },
  {
    title: "Vectorworks Draftsmen",
    location: "Remote / US",
    type: "Contract",
    mailto:
      "mailto:careers@phntm.com?subject=PHNTM%20Application%3A%20Vectorworks%20Draftsmen",
  },
  {
    title: "2D Design Director",
    location: "Remote / US",
    type: "Contract",
    mailto:
      "mailto:careers@phntm.com?subject=PHNTM%20Application%3A%202D%20Design%20Director",
  },
];

export function nextProject(slug: string): Project {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) return projects[0];
  return projects[(i + 1) % projects.length];
}

export function projectsForScale(scale: Scale): Project[] {
  return projects.filter((p) => p.scale === scale);
}
