import { promises as fs } from "node:fs";

// Files to process. For each, every <img ... /> that does NOT already include
// `loading=` will get `loading="lazy"` and `decoding="async"` added before /> .
const FILES = [
  "components/CaseStudy.tsx",
  "app/work/[slug]/page.tsx",
];

const imgTag = /<img\b([^>]*?)\/>/gs;

for (const f of FILES) {
  const before = await fs.readFile(f, "utf8");
  let count = 0;
  const after = before.replace(imgTag, (full, attrs) => {
    if (/\bloading=/.test(attrs)) return full; // skip if already set (hero etc.)
    count++;
    // Trim trailing whitespace before /> for clean inserts
    const trimmed = attrs.replace(/\s+$/, "");
    return `<img${trimmed} loading="lazy" decoding="async" />`;
  });
  if (count > 0) {
    await fs.writeFile(f, after);
    console.log(`${f}: added lazy hints to ${count} <img> tags`);
  } else {
    console.log(`${f}: no changes`);
  }
}
