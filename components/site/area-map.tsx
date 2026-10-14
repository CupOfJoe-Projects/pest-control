import { useId } from "react";
import { areas } from "@/content/areas";
import { cn } from "@/lib/utils";

// Simple equirectangular projection over Polk County.
const LON0 = -82.12;
const LAT0 = 28.4;
const KY = 666;
const KX = KY * Math.cos((28 * Math.PI) / 180);
const project = ([lat, lon]: [number, number]) => [(lon - LON0) * KX, (LAT0 - lat) * KY] as const;

// Simplified county outline (lat, lon). Not survey accurate, just recognizable.
const outline: [number, number][] = [
  [28.26, -82.06],
  [28.26, -81.66],
  [28.35, -81.66],
  [28.35, -81.52],
  [28.12, -81.45],
  [27.95, -81.3],
  [27.8, -81.2],
  [27.64, -81.14],
  [27.64, -82.06],
];

type LabelPos = { dx: number; dy: number; anchor: "start" | "middle" | "end" };
const right: LabelPos = { dx: 14, dy: 7, anchor: "start" };
// Hand placed so labels stay readable (about 13px) on a phone without colliding.
const labels: Record<string, LabelPos> = {
  lakeland: { dx: 0, dy: -18, anchor: "middle" },
  "eagle-lake": { dx: 0, dy: 30, anchor: "middle" },
  medulla: { dx: 0, dy: 30, anchor: "middle" },
  mulberry: { dx: 0, dy: 33, anchor: "middle" },
  "cypress-gardens": { dx: 14, dy: 18, anchor: "start" },
  "winter-haven": { dx: 14, dy: 2, anchor: "start" },
};

const HQ = "bartow";

export function AreaMap({ className, activeSlug }: { className?: string; activeSlug?: string }) {
  const titleId = useId();
  const points = outline.map((p) => project(p).join(",")).join(" ");
  return (
    <svg
      viewBox="0 0 600 533"
      role="img"
      aria-labelledby={titleId}
      className={cn("h-auto w-full", className)}
    >
      <title id={titleId}>Map of Polk County, Florida showing the towns we serve, with our office in Bartow</title>
      <polygon
        points={points}
        fill="var(--brand-green-soft)"
        stroke="var(--brand-green)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <text x="470" y="480" textAnchor="middle" fontSize="18" fontWeight="700" letterSpacing="3" fill="var(--brand-green)" opacity="0.55">
        POLK COUNTY
      </text>
      {areas.map((area) => {
        const [x, y] = project(area.coords);
        const pos = labels[area.slug] ?? right;
        const isHQ = area.slug === HQ;
        const isActive = area.slug === activeSlug;
        return (
          <a key={area.slug} href={`/areas/${area.slug}`}>
            <g className="group">
              {isHQ && <circle cx={x} cy={y} r="18" fill="var(--brand-orange)" opacity="0.25" />}
              <circle
                cx={x}
                cy={y}
                r={isHQ || isActive ? 10 : 8}
                fill={isHQ || isActive ? "var(--brand-orange)" : "var(--brand-green)"}
                stroke="#fff"
                strokeWidth="2.5"
              />
              <text
                x={x + pos.dx}
                y={y + pos.dy}
                textAnchor={pos.anchor}
                fontSize="23"
                fontWeight={isHQ || isActive ? 800 : 600}
                fill="var(--brand-ink)"
                className="group-hover:underline"
                style={{ paintOrder: "stroke", stroke: "var(--brand-green-soft)", strokeWidth: 5 }}
              >
                {area.name}
              </text>
              {isHQ && (
                <text
                  x={x + pos.dx}
                  y={y + pos.dy + 22}
                  textAnchor={pos.anchor}
                  fontSize="18"
                  fontWeight="600"
                  fill="var(--brand-green)"
                  style={{ paintOrder: "stroke", stroke: "var(--brand-green-soft)", strokeWidth: 5 }}
                >
                  Our office
                </text>
              )}
            </g>
          </a>
        );
      })}
    </svg>
  );
}
