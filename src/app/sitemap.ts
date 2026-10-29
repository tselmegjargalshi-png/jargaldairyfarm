import type { MetadataRoute } from "next";
import { getPublishedArticles } from "@/lib/data";
import { siteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl();
  const articles = await getPublishedArticles();
  const pages = ["", "/fermiin-tukhai", "/tekhnologi", "/medlegiin-san", "/galerei", "/surgalt-zuvlugee", "/hamtran-ajillah", "/holboo-barih"];
  return [
    ...pages.map((p) => ({ url: `${base}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.7 })),
    ...articles.map((a) => ({
      url: `${base}/medlegiin-san/${a.slug}`,
      lastModified: a.updatedAt,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
