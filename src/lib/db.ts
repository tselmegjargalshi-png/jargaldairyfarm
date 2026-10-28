import "server-only";
import postgres from "postgres";

declare global {
  var __sql: ReturnType<typeof postgres> | undefined;
}

export function hasDatabase(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

export function sql() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL тохируулаагүй байна.");
  if (!globalThis.__sql) {
    globalThis.__sql = postgres(url, {
      max: 5,
      idle_timeout: 20,
      ssl: /localhost|127\.0\.0\.1/.test(url) ? false : "require",
    });
  }
  return globalThis.__sql;
}
