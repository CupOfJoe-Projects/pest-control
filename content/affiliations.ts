import type { StaticImageData } from "next/image";
import businessRate from "@/public/images/affiliations/businessrate-best-of-2026.webp";
import fpma from "@/public/images/affiliations/fpma.webp";
import lakelandChamber from "@/public/images/affiliations/lakeland-chamber.webp";
import npma from "@/public/images/affiliations/npma.webp";
import bni from "@/public/images/affiliations/bni.webp";

export type Affiliation = {
  /** Used as the logo's alt text. */
  name: string;
  logo: StaticImageData;
  /** Badges (the round award) render a bit taller than wordmark logos. */
  badge?: boolean;
};

// Real affiliations, taken from the "Certified. Trusted. Proven." section of
// the current site (mcdonaldexterminators.com). The owner already shows these.
// TODO(owner): Swap in original logo files if they have them (these were
// pulled from the old site at web resolution).
export const affiliations: Affiliation[] = [
  { name: "BusinessRate Best of 2026 award winner", logo: businessRate, badge: true },
  { name: "Florida Pest Management Association", logo: fpma },
  { name: "National Pest Management Association", logo: npma },
  { name: "Lakeland Chamber of Commerce", logo: lakelandChamber },
  { name: "BNI", logo: bni },
];
