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
  /** Where they live (owner, November 2026). */
  town: string;
};

// Real team photos, supplied by the owner (November 2026). Customers name
// several of them in their Google reviews.
// Order matters: Justin and Roy wear the same shirt and look alike, so they sit
// at opposite corners of the grid (first and last) on phones and desktop.
export const team: TeamMember[] = [
  { name: "Justin Smith", photo: justin, town: "Bartow, FL" },
  { name: "Austin Taylor", photo: austin, town: "Bartow, FL" },
  { name: "Vic Ames", photo: vic, town: "Lakeland, FL" },
  { name: "Bill Long", photo: bill, town: "Winter Haven, FL" },
  { name: "Michelle Patrick", photo: michelle, town: "Bartow, FL" },
  { name: "Roy Holmes", photo: roy, town: "Babson Park, FL" },
];
