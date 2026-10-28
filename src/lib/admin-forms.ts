import { z } from "zod";
import { articleCategories, mediaCategories } from "./site";

export type AdminState = { ok: boolean; message: string };

const slugRe = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const articleSchema = z.object({
  title: z.string().trim().min(3, "Гарчиг дор хаяж 3 тэмдэгт").max(200),
  slug: z.string().trim().toLowerCase().regex(slugRe, "Хаяг зөвхөн латин жижиг үсэг, тоо, зураас (-) агуулна").max(100),
  category: z.enum(articleCategories),
  excerpt: z.string().trim().max(400).default(""),
  body: z.string().trim().min(20, "Агуулга хэт богино байна"),
  status: z.enum(["draft", "published"]),
  seoTitle: z.string().trim().max(70).default(""),
  seoDescription: z.string().trim().max(170).default(""),
});

export const mediaSchema = z.object({
  title: z.string().trim().min(2, "Гарчиг оруулна уу").max(150),
  description: z.string().trim().max(400).default(""),
  category: z.enum(mediaCategories.map((c) => c.slug) as [string, ...string[]]),
  kind: z.enum(["image", "video"]),
  url: z.string().trim().max(1000).default(""),
  posterUrl: z.string().trim().max(1000).default(""),
  isSample: z.boolean(),
  sortOrder: z.coerce.number().int().min(0).max(9999).default(0),
});

export const serviceSchema = z.object({
  title: z.string().trim().min(3).max(200),
  summary: z.string().trim().max(600).default(""),
  details: z.string().trim().max(3000).default(""),
  status: z.enum(["interest", "open", "paused"]),
  priceNote: z.string().trim().max(200).default(""),
  scheduleNote: z.string().trim().max(200).default(""),
  sortOrder: z.coerce.number().int().min(0).max(9999).default(0),
});

const optionalUrl = z
  .string()
  .trim()
  .max(500)
  .refine((v) => v === "" || /^https?:\/\//.test(v), "https:// -ээр эхэлсэн холбоос оруулна уу")
  .default("");

export const settingsSchema = z.object({
  heroTitle: z.string().trim().min(5).max(200),
  heroSubtitle: z.string().trim().max(400).default(""),
  introTitle: z.string().trim().max(200).default(""),
  introText: z.string().trim().max(2000).default(""),
  founderQuote: z.string().trim().max(500).default(""),
  phone: z.string().trim().max(40).default(""),
  email: z
    .string()
    .trim()
    .max(150)
    .refine((v) => v === "" || z.email().safeParse(v).success, "Имэйл буруу байна")
    .default(""),
  facebook: optionalUrl,
  youtube: optionalUrl,
  instagram: optionalUrl,
  address: z.string().trim().max(300).default(""),
  mapUrl: optionalUrl,
  hours: z.string().trim().max(200).default(""),
});

export function firstError(err: z.ZodError): string {
  const i = err.issues[0];
  return `${i.message}${i.path.length ? ` (${String(i.path[0])})` : ""}`;
}
