import type { MetadataRoute } from "next";
import { IS_DEMO, site } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  // Demo builds stay out of search engines entirely.
  if (IS_DEMO) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
