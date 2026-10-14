import type { StaticImageData } from "next/image";
import familyHome from "@/public/images/family-home.webp";

/**
 * Image slots. Each one renders a styled placeholder until its file exists.
 *
 * To add an image: drop the WebP into /public/images, import it at the top of
 * this file, and set `src` on its slot. Static imports give next/image the size
 * and the blur placeholder automatically.
 *
 * TODO(owner): These are AI generated demo images. Captions stay generic: never
 * label them as the McDonald family, staff, or trucks. Replace with real photos
 * before launch.
 */
export type ImageSlot = {
  src: StaticImageData | null;
  alt: string;
  /** Shown on the placeholder so it is clear what belongs there. */
  label: string;
  width: number;
  height: number;
};

const slot = (alt: string, label: string, width: number, height: number): ImageSlot => ({
  src: null,
  alt,
  label,
  width,
  height,
});

export const images = {
  hero: slot(
    "Pest control technician treating the foundation of a Florida ranch home",
    "Technician treating a home foundation",
    2400,
    1350,
  ),
  heroMobile: slot(
    "Pest control technician treating the foundation of a Florida ranch home",
    "Technician treating a home foundation",
    1080,
    1350,
  ),
  truck: slot("White service pickup parked in a Central Florida driveway under oak trees", "Service truck on a job", 1600, 1200),
  inspection: slot("Technician with a flashlight inspecting under a kitchen sink", "Inspection under a kitchen sink", 1200, 900),
  yard: slot("Florida backyard at dusk with a screened lanai and pool", "Backyard mosquito treatment", 1200, 900),
  commercial: slot("Technician placing a rodent bait station along a commercial building", "Rodent station at a business", 1200, 900),
  familyHome: {
    ...slot("A family and their golden retriever relaxing on the front steps of a Florida home", "Family on a Florida porch", 1600, 900),
    src: familyHome,
  },
} satisfies Record<string, ImageSlot>;
