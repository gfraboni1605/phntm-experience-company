import sharp from "sharp";
import { promises as fs } from "node:fs";
import path from "node:path";

const PHOTOS = "public/photos";

// [source, target, opts]
const JOBS = [
  ["riot-games-arena.png",    "riot-games-arena.webp",      { width: 2000, format: "webp", quality: 78 }],
  ["gq-super-bowl.png",       "gq-super-bowl.webp",         { width: 2000, format: "webp", quality: 78 }],
  ["reel-cover.png",          "reel-cover.webp",            { width: 1800, format: "webp", quality: 74 }],
  ["martin-garrix.jpg",       "martin-garrix.webp",         { width: 2000, format: "webp", quality: 78 }],
  ["martin-garrix-world-tour/hero.jpg", "martin-garrix-world-tour/hero.webp", { width: 2000, format: "webp", quality: 78 }],
  ["mode-festival.webp",      "mode-festival.webp",         { width: 1800, format: "webp", quality: 76 }],
  ["mode-festival/hero.webp", "mode-festival/hero.webp",    { width: 1800, format: "webp", quality: 76 }],
  ["donda-2.jpg",             "donda-2.webp",               { width: 1800, format: "webp", quality: 78 }],
];

for (const [src, dst, opts] of JOBS) {
  const srcPath = path.join(PHOTOS, src);
  const dstPath = path.join(PHOTOS, dst);
  const before = (await fs.stat(srcPath)).size;
  const inPlace = src === dst;
  const tmp = inPlace ? dstPath + ".tmp" : dstPath;

  let pipe = sharp(srcPath).resize({ width: opts.width, withoutEnlargement: true });
  if (opts.format === "webp") pipe = pipe.webp({ quality: opts.quality });
  await pipe.toFile(tmp);
  if (inPlace) await fs.rename(tmp, dstPath);

  const after = (await fs.stat(dstPath)).size;
  const pct = Math.round((1 - after / before) * 100);
  console.log(`${src.padEnd(40)} ${(before/1024).toFixed(0).padStart(6)}KB -> ${(after/1024).toFixed(0).padStart(6)}KB  (-${pct}%)  ${dst}`);
}
