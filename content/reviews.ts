// Real 5 star Google reviews, copied word for word from the Google Business
// Profile (supplied by the owner, October 2026). Keep the text exactly as the
// customer wrote it. Dates are relative, as Google shows them, so refresh this
// list now and then.

export type ReviewPlatform = "google" | "trustpilot" | "facebook";

export type Review = {
  platform: ReviewPlatform;
  name: string;
  /** Only when the review itself names a Polk town. Google does not show where reviewers live. */
  town?: string;
  rating: number;
  /** Relative date as shown on the platform, e.g. "2 weeks ago". */
  date: string;
  text: string;
};

export const reviews: Review[] = [
  { platform: "google", name: "Rena C.", rating: 5, date: "6 months ago", text: "Had my first service today (same day I called). It was amazing. More to the point, Victoria was amazing! She spent over an hour on our yard. She was very thorough and detail orientated. She answered all my questions and pointed out where our issues needed the most attention. I look forward to our next service. So far, I have great confidence in what I've seen. Thank you, Victoria!" },
  { platform: "google", name: "Janet P.", rating: 5, date: "3 months ago", text: "Austin was timely, courteous and professional. Will use this company as long as they are in operation as I have for the past 25+ years." },
  { platform: "google", name: "Artesian Property Management", town: "Lakeland", rating: 5, date: "7 months ago", text: "I recently used McDonald exterminators for a roach issue in my kitchen in Lakeland that I could not get rid of, and their team did a fantastic job and removing them. They were friendly and took the time to educate me and got the job done!" },
  { platform: "google", name: "Carmen P.", rating: 5, date: "4 months ago", text: "Our first time using this company went well. We wanted to find a pest control company that was local and would come out quarterly. Everything looked good and he was informative and polite." },
  { platform: "google", name: "Mike S.", rating: 5, date: "7 months ago", text: "My experience so far has been extremely pleasant from the very first phone call setting up the first visit. The company was exceptionally friendly, accommodating, and professional." },
  { platform: "google", name: "Lisa C.", rating: 5, date: "1 month ago", text: "We've used McDonald Exterminators to treat our church for many years. Roy is phenomenal - friendly, knowledgeable, timely and professional. He is always a pleasure to work with. Thank you!" },
  { platform: "google", name: "Jenna G.", rating: 5, date: "7 months ago", text: "Roy was amazing. He explained exactly where critters could be hiding and how the spray worked. I would recommend his services to anyone looking for great pest control!" },
  { platform: "google", name: "Rachel P.", rating: 5, date: "2 months ago", text: "McDonald Exterminators is always kind, sends reminders, and does very thorough work. I have used them for years and am very appreciative of them." },
  { platform: "google", name: "Carol R.", town: "Bartow", rating: 5, date: "3 months ago", text: "Austin Taylor is a great addition to the Bartow, Fl group of McDonald Exterminators. He did a good job." },
  { platform: "google", name: "Amaryllis R.", rating: 5, date: "5 months ago", text: "Great company! Justin was very nice and courteous. Very pleased with the service." },
  { platform: "google", name: "Sherry K.", rating: 5, date: "10 months ago", text: "Jon Copple is always professional, thorough, and dependable whenever he services our property. We’ve had an excellent experience every time. I highly recommend McDonald Exterminators for anyone looking for reliable pest control." },
  { platform: "google", name: "Joan C.", rating: 5, date: "5 months ago", text: "Austin was very knowledgeable! He did a wonderful job. Love this company." },
];

/** Reviews from a given town first, then the rest, so area pages always have a full wall. */
export function reviewsFor(town?: string, min = 6) {
  if (!town) return reviews;
  const local = reviews.filter((r) => r.town === town);
  return local.length >= min ? local : [...local, ...reviews.filter((r) => r.town !== town)];
}
