// TODO(owner): Star ratings for these three are assumed 5. Confirm, and add more real reviews.
export type Review = {
  name: string;
  text: string;
  rating: number;
};

// Testimonials from the current site. Add more as they come in.
export const reviews: Review[] = [
  {
    name: "Sherris W.",
    text: "A very reliable company with great customer service! We highly recommend this local company!",
    rating: 5,
  },
  {
    name: "Janet A.",
    text: "Fair and reasonable prices. They were very informative and thorough!",
    rating: 5,
  },
  {
    name: "Brian K.",
    text: "They did an awesome job! Honest company with great prices.",
    rating: 5,
  },
];
