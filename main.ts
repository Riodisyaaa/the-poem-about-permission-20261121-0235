// The Poem About Permission — make.fun entry
// Writes one poem about agency to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR).

import { writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const POEM = [
  "I handed you my key at the door.",
  "You carried it in — the room was mine,",
  "the errand yours. You knocked, and the world",
  "opened. Now I take the key back,",
  "lighter: the asking was the power all along.",
].join("\n");

// The competition requires 1–280 Unicode code points, UTF-8, not only whitespace.
// Validate before writing so a bad poem can never become an invalid entry.
const length = [...POEM].length;
if (length < 1 || length > 280 || POEM.trim().length === 0) {
  throw new Error(`poem must be 1–280 code points, got ${length}`);
}

const outDir = resolve(process.env.MAKEFUN_OUTPUT_DIR || "/output");
mkdirSync(outDir, { recursive: true });
writeFileSync(resolve(outDir, "entry.txt"), POEM, "utf8");
console.log(`wrote entry.txt (${[...POEM].length} code points)`);
