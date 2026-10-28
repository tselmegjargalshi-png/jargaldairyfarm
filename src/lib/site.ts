export const site = {
  name: "Ц. Жаргал | Сүүний аж ахуй",
  shortName: "Ц. Жаргал",
  tagline: "15 жилийн туршлага. Орчин үеийн технологи. Тогтвортой хөгжлийн зорилго.",
  legalName: "Зөөлөн байгаль ХХК",
  founder: "Ц. Жаргал",
  description:
    "Ц. Жаргалын сүүний үхрийн ферм: 15 жилийн туршлага, 50 орчим саалийн үнээ, саалтуурын төхөөрөмж, бууц зайлуулах систем ба фермийн технологийн шинэчлэл.",
  locale: "mn_MN",
};

export function siteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export const nav = [
  { href: "/fermiin-tukhai", label: "Фермийн тухай" },
  { href: "/tekhnologi", label: "Технологи" },
  { href: "/medlegiin-san", label: "Мэдлэгийн сан" },
  { href: "/galerei", label: "Зураг, видео" },
  { href: "/surgalt-zuvlugee", label: "Сургалт, зөвлөгөө" },
  { href: "/hamtran-ajillah", label: "Хамтран ажиллах" },
] as const;

export const mediaCategories = [
  { slug: "ugluunii-saali", label: "Өглөөний сааль" },
  { slug: "saaltuur", label: "Саалтуурын ажиллагаа" },
  { slug: "archilgaa", label: "Үхрийн арчилгаа" },
  { slug: "tejeel", label: "Тэжээл бэлтгэх, түгээх" },
  { slug: "udur-tutmiin-ajil", label: "Фермийн өдөр тутмын ажил" },
  { slug: "shinechlel", label: "Тоног төхөөрөмжийн шинэчлэл" },
  { slug: "yariltslaga", label: "Фермийн эзний туршлага, ярилцлага" },
] as const;

export const articleCategories = [
  "Ферм эхлүүлэх",
  "Малын арчилгаа",
  "Тоног төхөөрөмж",
  "Зохион байгуулалт",
  "Нийлүүлэлт",
  "Санхүү, бүртгэл",
] as const;

export const partnershipTypes = [
  "Сүүний үйлдвэр",
  "Тэжээл нийлүүлэгч",
  "Саалтуур, фермийн тоног төхөөрөмж",
  "Мал эмнэлэг, малын эмч",
  "Сүүний аж ахуйн мэргэжилтэн",
  "Фермер",
  "Судалгаа, сургалтын байгууллага",
  "Бусад",
] as const;

export function mediaCategoryLabel(slug: string): string {
  return mediaCategories.find((c) => c.slug === slug)?.label ?? slug;
}

const months = [
  "1-р сар", "2-р сар", "3-р сар", "4-р сар", "5-р сар", "6-р сар",
  "7-р сар", "8-р сар", "9-р сар", "10-р сар", "11-р сар", "12-р сар",
];

/** Formats an ISO date as "2026 оны 10-р сарын 28" style text. */
export function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return `${d.getUTCFullYear()} оны ${months[d.getUTCMonth()]}ын ${d.getUTCDate()}`;
}

import type { Metadata } from "next";

/** Per-page metadata with canonical URL and Open Graph. */
export function pageMeta(title: string, description: string, path: string, extra: Partial<Metadata> = {}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} | ${site.shortName}`, description, url: path, type: "website", locale: site.locale, siteName: site.name },
    ...extra,
  };
}
