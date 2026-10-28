import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { hasDatabase, sql } from "./db";
import { defaultArticles, defaultServices, defaultSettings } from "./seed";
import type { Article, Inquiry, MediaItem, Service, SiteSettings } from "./types";

// ---------- row mappers ----------
type Row = Record<string, unknown>;
const iso = (v: unknown) => (v instanceof Date ? v.toISOString() : String(v ?? ""));

function toArticle(r: Row): Article {
  return {
    id: r.id as number,
    slug: r.slug as string,
    title: r.title as string,
    excerpt: r.excerpt as string,
    body: r.body as string,
    category: r.category as string,
    coverUrl: r.cover_url as string,
    status: r.status as Article["status"],
    seoTitle: r.seo_title as string,
    seoDescription: r.seo_description as string,
    publishedAt: iso(r.published_at),
    updatedAt: iso(r.updated_at),
  };
}

function toMedia(r: Row): MediaItem {
  return {
    id: r.id as number,
    title: r.title as string,
    description: r.description as string,
    category: r.category as string,
    kind: r.kind as MediaItem["kind"],
    url: r.url as string,
    posterUrl: r.poster_url as string,
    isSample: r.is_sample as boolean,
    sortOrder: r.sort_order as number,
    createdAt: iso(r.created_at),
  };
}

function toService(r: Row): Service {
  return {
    id: r.id as number,
    slug: r.slug as string,
    title: r.title as string,
    summary: r.summary as string,
    details: r.details as string,
    status: r.status as Service["status"],
    priceNote: r.price_note as string,
    scheduleNote: r.schedule_note as string,
    sortOrder: r.sort_order as number,
  };
}

function toInquiry(r: Row): Inquiry {
  return {
    id: r.id as number,
    kind: r.kind as Inquiry["kind"],
    orgName: r.org_name as string,
    contactName: r.contact_name as string,
    phone: r.phone as string,
    email: r.email as string,
    topic: r.topic as string,
    message: r.message as string,
    status: r.status as Inquiry["status"],
    createdAt: iso(r.created_at),
  };
}

// ---------- public, cached reads ----------
export async function getSettings(): Promise<SiteSettings> {
  "use cache";
  cacheTag("settings");
  cacheLife("hours");
  if (!hasDatabase()) return defaultSettings;
  const rows = await sql()`select value from settings where key = 'site'`;
  if (!rows.length) return defaultSettings;
  const v = rows[0].value as Partial<SiteSettings>;
  return {
    ...defaultSettings,
    ...v,
    contact: { ...defaultSettings.contact, ...v.contact },
    images: { ...defaultSettings.images, ...v.images },
  };
}

export async function getPublishedArticles(): Promise<Article[]> {
  "use cache";
  cacheTag("articles");
  cacheLife("hours");
  if (!hasDatabase()) return defaultArticles.filter((a) => a.status === "published");
  const rows = await sql()`select * from articles where status = 'published' order by published_at desc`;
  return rows.map(toArticle);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  "use cache";
  cacheTag("articles");
  cacheLife("hours");
  if (!hasDatabase()) return defaultArticles.find((a) => a.slug === slug && a.status === "published") ?? null;
  const rows = await sql()`select * from articles where slug = ${slug} and status = 'published'`;
  return rows[0] ? toArticle(rows[0]) : null;
}

export async function getMedia(): Promise<MediaItem[]> {
  "use cache";
  cacheTag("media");
  cacheLife("hours");
  if (!hasDatabase()) return [];
  const rows = await sql()`select * from media order by sort_order asc, id desc`;
  return rows.map(toMedia);
}

export async function getServices(): Promise<Service[]> {
  "use cache";
  cacheTag("services");
  cacheLife("hours");
  if (!hasDatabase()) return defaultServices;
  const rows = await sql()`select * from services order by sort_order asc, id asc`;
  return rows.map(toService);
}

// ---------- admin reads (uncached, called only behind auth) ----------
export async function adminArticles(): Promise<Article[]> {
  if (!hasDatabase()) return [];
  return (await sql()`select * from articles order by updated_at desc`).map(toArticle);
}
export async function adminArticle(id: number): Promise<Article | null> {
  if (!hasDatabase()) return null;
  const rows = await sql()`select * from articles where id = ${id}`;
  return rows[0] ? toArticle(rows[0]) : null;
}
export async function adminMedia(): Promise<MediaItem[]> {
  if (!hasDatabase()) return [];
  return (await sql()`select * from media order by sort_order asc, id desc`).map(toMedia);
}
export async function adminMediaItem(id: number): Promise<MediaItem | null> {
  if (!hasDatabase()) return null;
  const rows = await sql()`select * from media where id = ${id}`;
  return rows[0] ? toMedia(rows[0]) : null;
}
export async function adminServices(): Promise<Service[]> {
  if (!hasDatabase()) return [];
  return (await sql()`select * from services order by sort_order asc, id asc`).map(toService);
}
export async function adminService(id: number): Promise<Service | null> {
  if (!hasDatabase()) return null;
  const rows = await sql()`select * from services where id = ${id}`;
  return rows[0] ? toService(rows[0]) : null;
}
export async function adminInquiries(): Promise<Inquiry[]> {
  if (!hasDatabase()) return [];
  return (await sql()`select * from inquiries order by created_at desc limit 500`).map(toInquiry);
}
export async function newInquiryCount(): Promise<number> {
  if (!hasDatabase()) return 0;
  const [{ n }] = await sql()`select count(*)::int as n from inquiries where status = 'new'`;
  return n as number;
}
