import Link from "next/link";
import { adminMedia } from "@/lib/data";
import { mediaCategoryLabel } from "@/lib/site";

export default async function MediaAdmin({ searchParams }: PageProps<"/admin/media">) {
  const [items, sp] = await Promise.all([adminMedia(), searchParams]);
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl text-green-900">Зураг, видео</h1>
        <Link href="/admin/media/new" className="btn btn-primary">Нэмэх</Link>
      </div>
      {sp.saved && <p role="status" className="mt-4 rounded-lg bg-green-100 px-4 py-3 text-sm text-green-900">Хадгалагдлаа.</p>}
      <ul className="mt-6 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-paper">
        {items.map((m) => (
          <li key={m.id}>
            <Link href={`/admin/media/${m.id}`} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 hover:bg-green-100/50">
              <span>
                <span className="font-semibold text-green-900">{m.title}</span>
                <span className="block text-xs text-muted">{mediaCategoryLabel(m.category)} · {m.kind === "image" ? "Зураг" : "Видео"}</span>
              </span>
              {m.isSample && <span className="rounded-full bg-gold-soft px-3 py-1 text-xs font-semibold">Жишээ</span>}
            </Link>
          </li>
        ))}
        {!items.length && <li className="p-6 text-muted">Одоогоор зураг, видео нэмээгүй байна.</li>}
      </ul>
    </>
  );
}
