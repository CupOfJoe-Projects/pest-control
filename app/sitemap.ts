import type { MetadataRoute } from "next";
import { IS_DEMO, site } from "@/content/site";
import { services } from "@/content/services";
import { pests } from "@/content/pests";
import { areas } from "@/content/areas";

export default function sitemap(): MetadataRoute.Sitemap {
  if (IS_DEMO) return [];
  const paths = [
    { path: "", priority: 1 },
    { path: "/services", priority: 0.8 },
    { path: "/pests", priority: 0.7 },
    { path: "/pricing", priority: 0.9 },
    { path: "/areas", priority: 0.8 },
    { path: "/about", priority: 0.6 },
    { path: "/press", priority: 0.5 },
    { path: "/contact", priority: 0.8 },
    ...services.map((s) => ({ path: `/services/${s.slug}`, priority: 0.8 })),
    ...areas.map((a) => ({ path: `/areas/${a.slug}`, priority: 0.7 })),
    ...pests.map((p) => ({ path: `/pests/${p.slug}`, priority: 0.6 })),
    { path: "/privacy", priority: 0.2 },
    { path: "/terms", priority: 0.2 },
  ];
  return paths.map(({ path, priority }) => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly",
    priority,
  }));
}
