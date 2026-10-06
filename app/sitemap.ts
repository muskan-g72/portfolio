import { content } from "@/content/content";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://muskan.engineering";
  return [
    { url: base, lastModified: new Date() },
    { url: `${base}/resume`, lastModified: new Date() },
    ...content.projects.map((project) => ({
      url: `${base}/work/${project.slug}`,
      lastModified: new Date(),
    })),
  ];
}
