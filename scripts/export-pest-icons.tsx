/**
 * Writes one SVG file per pest to /public/icons/pests, using the same icon
 * components the site renders inline. Run: npm run icons
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { Icon } from "../components/icons";
import { pests } from "../content/pests";

const BRAND_GREEN = "#1F3D2B";
const outDir = join(process.cwd(), "public/icons/pests");
mkdirSync(outDir, { recursive: true });

for (const pest of pests) {
  const svg = renderToStaticMarkup(<Icon name={pest.icon} stroke={BRAND_GREEN} strokeWidth={1.75} />)
    .replace(/ aria-hidden="true"/g, "")
    .replace(/ class="[^"]*"/g, "");
  writeFileSync(join(outDir, `${pest.slug}.svg`), `${svg}\n`);
  console.log(`wrote ${pest.slug}.svg`);
}
