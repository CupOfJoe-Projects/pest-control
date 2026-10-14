// TODO(launch): SAMPLE REVIEWS. Replace with real Google reviews and set IS_DEMO false before launch.
//
// Only the texts from Sherris W., Janet A., and Brian K. are real (from the
// current site). Their towns, dates, and platform here are sample values.
// Every other review below is invented for the pitch demo.

export type ReviewPlatform = "google" | "trustpilot" | "facebook";

export type Review = {
  platform: ReviewPlatform;
  name: string;
  town: string;
  rating: number;
  /** Relative date as shown on the platform, e.g. "2 weeks ago". */
  date: string;
  text: string;
};

export const reviews: Review[] = [
  { platform: "google", name: "Sherris W.", town: "Lakeland", rating: 5, date: "2 weeks ago", text: "A very reliable company with great customer service! We highly recommend this local company!" },
  { platform: "google", name: "Janet A.", town: "Bartow", rating: 5, date: "1 month ago", text: "Fair and reasonable prices. They were very informative and thorough!" },
  { platform: "google", name: "Brian K.", town: "Winter Haven", rating: 5, date: "3 weeks ago", text: "They did an awesome job! Honest company with great prices." },
  { platform: "google", name: "Mike R.", town: "Lakeland", rating: 5, date: "1 week ago", text: "Had roaches in the garage after all the rain. Called in the morning and they had someone out that afternoon. Haven't seen one since." },
  { platform: "trustpilot", name: "Dana P.", town: "Auburndale", rating: 5, date: "2 months ago", text: "Same tech every quarter and he actually remembers our house. Explains what he's doing and never rushes." },
  { platform: "google", name: "Carlos M.", town: "Haines City", rating: 5, date: "1 month ago", text: "Rats in the attic. They found how they were getting in, sealed it up, and came back to check. Real professionals." },
  { platform: "trustpilot", name: "Linda S.", town: "Lake Wales", rating: 5, date: "3 months ago", text: "My mom used McDonald back in the 80s and now I use them. Still the same honest people." },
  { platform: "google", name: "Tom H.", town: "Mulberry", rating: 5, date: "2 weeks ago", text: "Ants kept coming back no matter what I tried from the store. One treatment and they were gone." },
  { platform: "google", name: "Ashley B.", town: "Winter Haven", rating: 5, date: "1 month ago", text: "We have two dogs and a toddler so I was nervous. They walked me through everything they used. Super easy." },
  { platform: "trustpilot", name: "Greg F.", town: "Bartow", rating: 5, date: "4 months ago", text: "Manage 30 units and they handle every call fast. Tenants are happy and I get a report every time." },
  { platform: "google", name: "Maria L.", town: "Eagle Lake", rating: 5, date: "2 months ago", text: "Mosquitoes were so bad we couldn't use the backyard. Now we're out there every evening." },
  { platform: "google", name: "Jeff W.", town: "Fort Meade", rating: 4, date: "3 weeks ago", text: "Good service and fair price. Had to reschedule once on their end but they called ahead and made it right." },
  { platform: "trustpilot", name: "Steph K.", town: "Lakeland", rating: 5, date: "1 month ago", text: "Actual person answered the phone. That alone sold me. The service backed it up." },
  { platform: "google", name: "Ron D.", town: "Babson Park", rating: 5, date: "2 months ago", text: "Spiders all over the lanai. They took care of it and told me what to change so they don't come back." },
];

/** Reviews from a given town, falling back to the full list when there are too few. */
export function reviewsFor(town?: string, min = 6) {
  if (!town) return reviews;
  const local = reviews.filter((r) => r.town === town);
  return local.length >= min ? local : [...local, ...reviews.filter((r) => r.town !== town)];
}
