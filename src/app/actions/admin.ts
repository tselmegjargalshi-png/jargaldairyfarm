"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { checkPassword, createSession, destroySession, requireAdmin, authConfigured } from "@/lib/auth";
import { sql } from "@/lib/db";
import { defaultSettings } from "@/lib/seed";
import {
  articleSchema, firstError, mediaSchema, serviceSchema, settingsSchema, type AdminState,
} from "@/lib/admin-forms";
import { saveUpload, UploadError } from "@/lib/upload";
import type { SiteSettings } from "@/lib/types";

const fail = (message: string): AdminState => ({ ok: false, message });
const str = (fd: FormData, k: string) => String(fd.get(k) ?? "");

async function maybeUpload(fd: FormData, field: string, kind: "image" | "video"): Promise<string | null> {
  const f = fd.get(field);
  if (f instanceof File && f.size > 0) return saveUpload(f, kind);
  return null;
}

function errMsg(e: unknown): AdminState {
  if (e instanceof UploadError) return fail(e.message);
  console.error(e);
  const code = (e as { code?: string })?.code;
  if (code === "23505") return fail("Ийм хаягтай (slug) бичлэг аль хэдийн байна. Өөр хаяг сонгоно уу.");
  return fail("Алдаа гарлаа. Дахин оролдоно уу.");
}

// ---------- auth ----------
const attempts = new Map<string, { n: number; until: number }>();

export async function login(_p: AdminState, fd: FormData): Promise<AdminState> {
  if (!authConfigured()) {
    return fail("Админ нэвтрэлт тохируулаагүй байна. ADMIN_PASSWORD болон SESSION_SECRET (24+ тэмдэгт) орчны хувьсагчдыг нэмнэ үү.");
  }
  const key = "global";
  const a = attempts.get(key);
  if (a && a.until > Date.now() && a.n >= 5) return fail("Олон удаа буруу оруулсан. 10 минутын дараа дахин оролдоно уу.");
  if (!checkPassword(str(fd, "password"))) {
    const n = (a && a.until > Date.now() ? a.n : 0) + 1;
    attempts.set(key, { n, until: Date.now() + 10 * 60_000 });
    return fail("Нууц үг буруу байна.");
  }
  attempts.delete(key);
  await createSession();
  redirect("/admin");
}

export async function logout(): Promise<void> {
  await destroySession();
  redirect("/admin/login");
}

// ---------- articles ----------
export async function saveArticle(id: number | null, _p: AdminState, fd: FormData): Promise<AdminState> {
  await requireAdmin();
  const parsed = articleSchema.safeParse({
    title: str(fd, "title"), slug: str(fd, "slug"), category: str(fd, "category"), excerpt: str(fd, "excerpt"),
    body: str(fd, "body"), status: str(fd, "status"), seoTitle: str(fd, "seoTitle"), seoDescription: str(fd, "seoDescription"),
  });
  if (!parsed.success) return fail(firstError(parsed.error));
  const v = parsed.data;
  let cover: string | null;
  try {
    cover = await maybeUpload(fd, "coverFile", "image");
  } catch (e) {
    return errMsg(e);
  }
  const removeCover = str(fd, "removeCover") === "on";
  const db = sql();
  try {
    if (id === null) {
      const rows = await db`insert into articles (slug,title,excerpt,body,category,cover_url,status,seo_title,seo_description)
        values (${v.slug},${v.title},${v.excerpt},${v.body},${v.category},${cover ?? ""},${v.status},${v.seoTitle},${v.seoDescription})
        returning id`;
      id = rows[0].id as number;
    } else {
      const current = await db`select cover_url from articles where id = ${id}`;
      const coverUrl = cover ?? (removeCover ? "" : ((current[0]?.cover_url as string) ?? ""));
      await db`update articles set slug=${v.slug}, title=${v.title}, excerpt=${v.excerpt}, body=${v.body}, category=${v.category},
        cover_url=${coverUrl}, status=${v.status}, seo_title=${v.seoTitle}, seo_description=${v.seoDescription}, updated_at=now()
        where id=${id}`;
    }
  } catch (e) {
    return errMsg(e);
  }
  updateTag("articles");
  revalidatePath("/sitemap.xml");
  redirect(`/admin/articles/${id}?saved=1`);
}

export async function deleteArticle(id: number): Promise<void> {
  await requireAdmin();
  await sql()`delete from articles where id = ${id}`;
  updateTag("articles");
  redirect("/admin/articles");
}

// ---------- media ----------
export async function saveMedia(id: number | null, _p: AdminState, fd: FormData): Promise<AdminState> {
  await requireAdmin();
  const parsed = mediaSchema.safeParse({
    title: str(fd, "title"), description: str(fd, "description"), category: str(fd, "category"), kind: str(fd, "kind"),
    url: str(fd, "url"), posterUrl: str(fd, "posterUrl"), isSample: str(fd, "isSample") === "on", sortOrder: str(fd, "sortOrder") || "0",
  });
  if (!parsed.success) return fail(firstError(parsed.error));
  const v = parsed.data;
  let url = v.url;
  let poster = v.posterUrl;
  try {
    const up = await maybeUpload(fd, "file", v.kind);
    if (up) url = up;
    const pu = await maybeUpload(fd, "posterFile", "image");
    if (pu) poster = pu;
  } catch (e) {
    return errMsg(e);
  }
  if (!url) return fail("Файл оруулах эсвэл холбоос (URL) бичнэ үү.");
  if (url.startsWith("http") === false && !url.startsWith("/uploads/")) return fail("Холбоос https:// -ээр эхлэх ёстой.");
  const db = sql();
  try {
    if (id === null) {
      await db`insert into media (title,description,category,kind,url,poster_url,is_sample,sort_order)
        values (${v.title},${v.description},${v.category},${v.kind},${url},${poster},${v.isSample},${v.sortOrder})`;
    } else {
      await db`update media set title=${v.title}, description=${v.description}, category=${v.category}, kind=${v.kind},
        url=${url}, poster_url=${poster}, is_sample=${v.isSample}, sort_order=${v.sortOrder} where id=${id}`;
    }
  } catch (e) {
    return errMsg(e);
  }
  updateTag("media");
  redirect("/admin/media?saved=1");
}

export async function deleteMedia(id: number): Promise<void> {
  await requireAdmin();
  await sql()`delete from media where id = ${id}`;
  updateTag("media");
  redirect("/admin/media");
}

// ---------- services ----------
export async function saveService(id: number, _p: AdminState, fd: FormData): Promise<AdminState> {
  await requireAdmin();
  const parsed = serviceSchema.safeParse({
    title: str(fd, "title"), summary: str(fd, "summary"), details: str(fd, "details"), status: str(fd, "status"),
    priceNote: str(fd, "priceNote"), scheduleNote: str(fd, "scheduleNote"), sortOrder: str(fd, "sortOrder") || "0",
  });
  if (!parsed.success) return fail(firstError(parsed.error));
  const v = parsed.data;
  try {
    await sql()`update services set title=${v.title}, summary=${v.summary}, details=${v.details}, status=${v.status},
      price_note=${v.priceNote}, schedule_note=${v.scheduleNote}, sort_order=${v.sortOrder} where id=${id}`;
  } catch (e) {
    return errMsg(e);
  }
  updateTag("services");
  redirect("/admin/services?saved=1");
}

// ---------- site settings ----------
const imageKeys = ["hero", "portrait", "milking", "manure", "barn", "feeding"] as const;

export async function saveSettings(_p: AdminState, fd: FormData): Promise<AdminState> {
  await requireAdmin();
  const parsed = settingsSchema.safeParse(Object.fromEntries(
    ["heroTitle", "heroSubtitle", "introTitle", "introText", "founderQuote", "phone", "email", "facebook", "youtube", "instagram", "address", "mapUrl", "hours"]
      .map((k) => [k, str(fd, k)]),
  ));
  if (!parsed.success) return fail(firstError(parsed.error));
  const v = parsed.data;
  const images = { ...defaultSettings.images };
  try {
    for (const k of imageKeys) {
      const uploaded = await maybeUpload(fd, `file_${k}`, "image");
      images[k] = uploaded ?? (str(fd, `remove_${k}`) === "on" ? "" : str(fd, `current_${k}`));
    }
  } catch (e) {
    return errMsg(e);
  }
  const value: SiteSettings = {
    heroTitle: v.heroTitle, heroSubtitle: v.heroSubtitle, introTitle: v.introTitle, introText: v.introText, founderQuote: v.founderQuote,
    contact: {
      phone: v.phone, email: v.email, facebook: v.facebook, youtube: v.youtube, instagram: v.instagram,
      address: v.address, mapUrl: v.mapUrl, hours: v.hours,
    },
    images,
  };
  try {
    await sql()`insert into settings (key,value,updated_at) values ('site', ${sql().json(value as never)}, now())
      on conflict (key) do update set value = excluded.value, updated_at = now()`;
  } catch (e) {
    return errMsg(e);
  }
  updateTag("settings");
  return { ok: true, message: "Хадгалагдлаа. Өөрчлөлт сайт дээр шууд харагдана." };
}

// ---------- inquiries ----------
export async function setInquiryStatus(id: number, status: "new" | "read" | "archived"): Promise<void> {
  await requireAdmin();
  await sql()`update inquiries set status = ${status} where id = ${id}`;
  revalidatePath("/admin/inquiries");
}

export async function deleteInquiry(id: number): Promise<void> {
  await requireAdmin();
  await sql()`delete from inquiries where id = ${id}`;
  revalidatePath("/admin/inquiries");
}
