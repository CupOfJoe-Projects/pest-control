import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name}. Family owned pest control in Polk County since 1959.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28, fontWeight: 700, opacity: 0.9 }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: "#e8701a" }} />
          FAMILY OWNED IN POLK COUNTY SINCE 1959
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, fontWeight: 800, lineHeight: 1.02, letterSpacing: -2 }}>Pests gone.</div>
          <div style={{ fontSize: 92, fontWeight: 800, lineHeight: 1.02, letterSpacing: -2 }}>Done right.</div>
          <div style={{ fontSize: 92, fontWeight: 800, lineHeight: 1.02, letterSpacing: -2, color: "#e8701a" }}>
            Since 1959.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: 34 }}>
          <div style={{ fontWeight: 800 }}>{site.name}</div>
          <div style={{ fontWeight: 700, color: "#e8701a" }}>{site.phone}</div>
        </div>
      </div>
    ),
    size,
  );
}
