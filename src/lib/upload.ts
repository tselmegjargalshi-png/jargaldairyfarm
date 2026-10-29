import "server-only";
import { randomBytes } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { put } from "@vercel/blob";

const IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};
const VIDEO_TYPES: Record<string, string> = { "video/mp4": "mp4", "video/webm": "webm" };

export const MAX_IMAGE_BYTES = 4 * 1024 * 1024; // Vercel request body limit is ~4.5 MB
export const MAX_VIDEO_BYTES = 4 * 1024 * 1024;

export class UploadError extends Error {}

export function uploadsAvailable(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN) || process.env.NODE_ENV !== "production";
}

/** Stores an uploaded File and returns its public URL. */
export async function saveUpload(file: File, kind: "image" | "video"): Promise<string> {
  const types = kind === "image" ? IMAGE_TYPES : VIDEO_TYPES;
  const ext = types[file.type];
  if (!ext) throw new UploadError(kind === "image" ? "Зөвхөн JPG, PNG, WEBP, GIF зураг оруулна уу." : "Зөвхөн MP4 эсвэл WEBM видео оруулна уу.");
  const max = kind === "image" ? MAX_IMAGE_BYTES : MAX_VIDEO_BYTES;
  if (file.size > max) {
    throw new UploadError(`Файл хэт том байна (дээд хэмжээ ${Math.round(max / 1024 / 1024)} MB). Том видеог YouTube-д байршуулаад холбоосыг нь оруулна уу.`);
  }
  const name = `${kind}s/${Date.now()}-${randomBytes(4).toString("hex")}.${ext}`;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(name, file, { access: "public", contentType: file.type });
    return blob.url;
  }
  if (process.env.NODE_ENV === "production") {
    throw new UploadError("Файл хадгалах сан (Vercel Blob) тохируулаагүй байна. BLOB_READ_WRITE_TOKEN нэмнэ үү.");
  }
  // Local development only
  const dir = path.join(process.cwd(), "public", "uploads", kind + "s");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, path.basename(name)), Buffer.from(await file.arrayBuffer()));
  return `/uploads/${name}`;
}
