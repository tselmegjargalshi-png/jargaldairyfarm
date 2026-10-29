"use server";

import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { hasDatabase, sql } from "@/lib/db";
import { inquirySchema, type FormState } from "@/lib/inquiry";

const MAX_PER_HOUR = 5;

export async function submitInquiry(_prev: FormState, formData: FormData): Promise<FormState> {
  // Honeypot: real visitors never see or fill this field.
  if (String(formData.get("website") ?? "") !== "") {
    return { ok: true, message: "Баярлалаа! Таны хүсэлтийг хүлээн авлаа." };
  }

  const parsed = inquirySchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      errors[key] ??= issue.message;
    }
    return { ok: false, message: "Талбаруудыг шалгана уу.", errors };
  }

  if (!hasDatabase()) {
    return {
      ok: false,
      message:
        "Уучлаарай, сайтын форм одоогоор холбогдоогүй байна. Та дараа дахин оролдоно уу.",
    };
  }

  const h = await headers();
  const ip = (h.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  const ipHash = createHash("sha256").update(ip + (process.env.SESSION_SECRET ?? "")).digest("hex").slice(0, 32);
  const db = sql();

  try {
    const [{ n }] = await db`select count(*)::int as n from inquiries
      where ip_hash = ${ipHash} and created_at > now() - interval '1 hour'`;
    if ((n as number) >= MAX_PER_HOUR) {
      return { ok: false, message: "Хэт олон хүсэлт илгээлээ. Түр хүлээгээд дахин оролдоно уу." };
    }
    const v = parsed.data;
    await db`insert into inquiries (kind, org_name, contact_name, phone, email, topic, message, ip_hash)
      values (${v.kind}, ${v.orgName}, ${v.contactName}, ${v.phone}, ${v.email}, ${v.topic}, ${v.message}, ${ipHash})`;
  } catch (err) {
    console.error("inquiry insert failed", err);
    return { ok: false, message: "Хүсэлтийг хадгалж чадсангүй. Түр хүлээгээд дахин оролдоно уу." };
  }

  return { ok: true, message: "Баярлалаа! Таны хүсэлтийг хүлээн авлаа. Бид тантай эргэн холбогдох болно." };
}
