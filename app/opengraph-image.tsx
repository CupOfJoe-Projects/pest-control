import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name}. ${site.tagline} Pest control in Polk County since 1959.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Bricolage as TTF (the OG renderer cannot read WOFF2). Falls back to the default font. */
async function loadHeadingFont() {
  try {
    const css = await (await fetch("https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@800")).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    return url ? await (await fetch(url)).arrayBuffer() : null;
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const heading = await loadHeadingFont();
  const svg = await readFile(join(process.cwd(), "public/images/logo-mark.svg"));
  const mark = `data:image/svg+xml;base64,${svg.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#1f3d2b",
          color: "#faf7f0",
          padding: "64px 80px",
          fontFamily: heading ? "Bricolage" : "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {/* Their logo: the ant, grass, and mouse tiles beside the name. */}
          <img src={mark} width={64} height={110} alt="" />
          <div style={{ display: "flex", flexDirection: "column", fontFamily: "Arial", fontSize: 34, fontWeight: 700, lineHeight: 1.12 }}>
            <span>McDonald</span>
            <span>Exterminators</span>
            <span>Inc.</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 104, fontWeight: 800, lineHeight: 1, letterSpacing: -3 }}>
            Keep Florida <span style={{ color: "#e8701a", marginLeft: 26 }}>outside.</span>
          </div>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 800, marginTop: 18, opacity: 0.85 }}>
            Pest control in Polk County since 1959
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 32, fontWeight: 700 }}>
          <span style={{ opacity: 0.85 }}>Family owned in Bartow, FL</span>
          <span style={{ color: "#e8701a" }}>{site.phone}</span>
        </div>
      </div>
    ),
    { ...size, fonts: heading ? [{ name: "Bricolage", data: heading, weight: 800, style: "normal" }] : [] },
  );
}
