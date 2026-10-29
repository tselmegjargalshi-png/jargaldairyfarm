// Usage: DATABASE_URL=... npm run db:setup
// Creates tables and inserts starter content ONLY into empty tables.
import { readFileSync } from "node:fs";
import postgres from "postgres";
import { defaultArticles, defaultServices, defaultSettings } from "../src/lib/seed.ts";

const url = process.env.DATABASE_URL;
if (!url) {
  if (process.argv.includes("--if-configured")) {
    console.log("DATABASE_URL тохируулаагүй тул өгөгдлийн сангийн тохиргоог алгаслаа.");
    process.exit(0);
  }
  console.error("DATABASE_URL тохируулаагүй байна.");
  process.exit(1);
}
const sql = postgres(url, { ssl: /localhost|127\.0\.0\.1/.test(url) ? false : "require" });

await sql.unsafe(readFileSync(new URL("../db/schema.sql", import.meta.url), "utf8"));

const [{ n: articleCount }] = await sql`select count(*)::int as n from articles`;
if (articleCount === 0) {
  for (const a of defaultArticles) {
    await sql`insert into articles (slug,title,excerpt,body,category,cover_url,status,seo_title,seo_description,published_at,updated_at)
      values (${a.slug},${a.title},${a.excerpt},${a.body},${a.category},${a.coverUrl},${a.status},${a.seoTitle},${a.seoDescription},${a.publishedAt},${a.updatedAt})`;
  }
  console.log(`Нийтлэл: ${defaultArticles.length} нэмлээ`);
}
const [{ n: serviceCount }] = await sql`select count(*)::int as n from services`;
if (serviceCount === 0) {
  for (const s of defaultServices) {
    await sql`insert into services (slug,title,summary,details,status,price_note,schedule_note,sort_order)
      values (${s.slug},${s.title},${s.summary},${s.details},${s.status},${s.priceNote},${s.scheduleNote},${s.sortOrder})`;
  }
  console.log(`Үйлчилгээ: ${defaultServices.length} нэмлээ`);
}
await sql`insert into settings (key,value) values ('site', ${sql.json(defaultSettings)}) on conflict (key) do nothing`;
console.log("Өгөгдлийн сан бэлэн боллоо.");
await sql.end();
