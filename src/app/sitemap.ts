import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://agent.ergonomia.re",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}