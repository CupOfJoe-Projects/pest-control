import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name}. Pest control in Polk County since 1959.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/brand/logo-mark.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

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
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <img src={logoSrc} width={66} height={115} alt="" style={{ background: "#faf7f0", borderRadius: 10, padding: 8 }} />
          <div style={{ display: "flex", flexDirection: "column", fontSize: 44, fontWeight: 800, lineHeight: 1.05 }}>
            <span>McDonald</span>
            <span>Exterminators</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.04, letterSpacing: -2 }}>Pest control in</div>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.04, letterSpacing: -2 }}>
            Polk County <span style={{ color: "#e8701a", marginLeft: 20 }}>since 1959</span>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 32, fontWeight: 700 }}>
          <span style={{ opacity: 0.85 }}>Family owned in Bartow, FL</span>
          <span style={{ color: "#e8701a" }}>{site.phone}</span>
        </div>
      </div>
    ),
    size,
  );
}
