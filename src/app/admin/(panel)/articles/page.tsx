import Link from "next/link";
import { adminArticles } from "@/lib/data";
import { formatDate } from "@/lib/site";

export default async function ArticlesAdmin() {
  const articles = await adminArticles();
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl text-green-900">Нийтлэлүүд</h1>
        <Link href="/admin/articles/new" className="btn btn-primary">Нийтлэл нэмэх</Link>
      </div>
      <ul className="mt-6 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-paper">
        {articles.map((a) => (
          <li key={a.id}>
            <Link href={`/admin/articles/${a.id}`} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 hover:bg-green-100/50">
              <span>
                <span className="font-semibold text-green-900">{a.title}</span>
                <span className="block text-xs text-muted">{a.category} · шинэчлэгдсэн {formatDate(a.updatedAt)}</span>
              </span>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${a.status === "published" ? "bg-green-100 text-green-900" : "bg-gold-soft text-ink"}`}>
                {a.status === "published" ? "Нийтлэгдсэн" : "Ноорог"}
              </span>
            </Link>
          </li>
        ))}
        {!articles.length && <li className="p-6 text-muted">Нийтлэл алга.</li>}
      </ul>
    </>
  );
}
