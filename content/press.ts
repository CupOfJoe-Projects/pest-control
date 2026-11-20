import type { StaticImageData } from "next/image";
import vicTruck from "@/public/images/family/vic-truck.png";
import bestOfBartow from "@/public/images/badges/best-of-bartow-2026.png";

/**
 * Press: coverage of the company published elsewhere, and awards. Copied from
 * the Press page on the old site (mcdonaldexterminators.com/press). Newest first.
 * Our own SEO articles will be added to the press page separately.
 */
export type PressItem = {
  id: string;
  kind: "feature" | "award";
  /** Who published it or gave the award. */
  source: string;
  title: string;
  summary: string;
  /** ISO date, when known. */
  date?: string;
  /** Link to the original story. Leave out when there is none. */
  href?: string;
  linkLabel?: string;
  image: { src: StaticImageData; alt: string; fit: "cover" | "contain" };
};

export const pressItems: PressItem[] = [
  {
    id: "voyagetampa-rising-stars",
    kind: "feature",
    source: "VoyageTampa",
    title: "Featured in VoyageTampa's “Rising Stars” series",
    summary:
      "VoyageTampa featured McDonald Exterminators in its Rising Stars series. The article explores the company's growth, its long standing Central Florida legacy, and how its continued success is driven by the dedicated, long standing employees who care for its customers and community every day.",
    date: "2026-07-08",
    href: "https://voyagetampa.com/interview/rising-stars-meet-victoria-ames-of-tampa",
    linkLabel: "Read the full interview",
    image: { src: vicTruck, alt: "Vic Ames beside a McDonald Exterminators truck", fit: "cover" },
  },
  {
    id: "best-of-bartow-2026",
    kind: "award",
    source: "BusinessRate",
    title: "Named Best Pest Control Company in Bartow",
    summary:
      "McDonald Exterminators was proud to be named Bartow's Best Pest Control Company for 2026. This recognition reflects the dedication of our entire team and their commitment to providing dependable, high quality service to the community. We are incredibly grateful to our customers and neighbors for continuing to trust our local team.",
    date: "2026",
    image: { src: bestOfBartow, alt: "Best of Bartow 2026 award badge", fit: "contain" },
  },
];

/** "July 8, 2026", or just the year when that is all we know. */
export function formatPressDate(date?: string) {
  if (!date) return null;
  if (/^\d{4}$/.test(date)) return date;
  return new Date(`${date}T12:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}
