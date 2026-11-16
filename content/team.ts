import type { StaticImageData } from "next/image";
import justin from "@/public/images/team/justin-smith.jpg";
import roy from "@/public/images/team/roy-holmes.jpg";
import austin from "@/public/images/team/austin-taylor.jpg";
import bill from "@/public/images/team/bill-long.jpg";
import vic from "@/public/images/team/vic-ames.png";
import michelle from "@/public/images/team/michelle-patrick.png";

export type TeamMember = {
  name: string;
  photo: StaticImageData;
  /** TODO(owner): Years with the company. "TBD" until Vic supplies them. */
  years: string;
};

// Real team photos, supplied by the owner (November 2026). Customers name
// several of them in their Google reviews.
// Order matters: Justin and Roy wear the same shirt and look alike, so they sit
// at opposite corners of the grid (first and last) on phones and desktop.
export const team: TeamMember[] = [
  { name: "Justin Smith", photo: justin, years: "TBD" },
  { name: "Austin Taylor", photo: austin, years: "TBD" },
  { name: "Vic Ames", photo: vic, years: "TBD" },
  { name: "Bill Long", photo: bill, years: "TBD" },
  { name: "Michelle Patrick", photo: michelle, years: "TBD" },
  { name: "Roy Holmes", photo: roy, years: "TBD" },
];
