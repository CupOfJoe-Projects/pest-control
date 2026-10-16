import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  images: {
    // 55 and 60 for the hero photo, 75 (the default) for everything else.
    qualities: [55, 60, 75],
  },
  partialPrefetching: true,
  // Old Squarespace page addresses, so links and search results keep working
  // after the domain moves here.
  async redirects() {
    const old: Record<string, string> = {
      "/home": "/",
      "/appointments": "/contact",
      "/press": "/about",
      "/privacypolicy": "/privacy",
      "/termsandconditions": "/terms",
      "/serviceareas": "/areas",
      "/homeownerservices": "/services/homeowner-services",
      "/commercialservices": "/services/commercial-services",
      "/rodentcontrol": "/services/rodent-control",
      "/mosquitocontrol": "/services/mosquito-control",
      "/specialty-pest-control": "/services/specialty-pest-control",
      "/ants": "/pests/ants",
      "/bedbugs": "/pests/bed-bugs",
      "/beetles": "/pests/beetles",
      "/cockroaches": "/pests/cockroaches",
      "/crickets": "/pests/crickets",
      "/earwigs": "/pests/earwigs",
      "/fleas": "/pests/fleas",
      "/mice": "/pests/mice",
      "/mice-1": "/pests/mice",
      "/mice-1-1": "/pests/mice",
      "/rats": "/pests/rats",
      "/spiders": "/pests/spiders",
      "/mosquito": "/pests/mosquitoes",
      "/specialty-bugs": "/pests/specialty-bugs",
      "/bartow-pest-control": "/areas/bartow",
      "/lakeland-pest-control": "/areas/lakeland",
      "/winter-haven-pest-control": "/areas/winter-haven",
      "/cypress-gardens-pest-control": "/areas/cypress-gardens",
      "/lake-wales-pest-control": "/areas/lake-wales",
      "/fort-meade-pest-control": "/areas/fort-meade",
      "/mulberry": "/areas/mulberry",
      "/babson-park-exterminator": "/areas/babson-park",
      "/haines-city-pest-control-": "/areas/haines-city",
      "/medulla-pest-control-1": "/areas/medulla",
      "/eagle-lake-exterminator": "/areas/eagle-lake",
      "/auburndale": "/areas/auburndale",
    };
    return Object.entries(old).map(([source, destination]) => ({ source, destination, permanent: true }));
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
