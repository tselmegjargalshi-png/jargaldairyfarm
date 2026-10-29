import Link from "next/link";
import { Photo } from "@/components/Photo";
import { Container, PageHeader } from "@/components/Section";
import { getPublishedArticles } from "@/lib/data";
import { formatDate, pageMeta } from "@/lib/site";

export const metadata = pageMeta(
  "Мэдлэгийн сан",
  "Сүүний ферм эхлүүлэх, саалийн үнээний арчилгаа, саалтуурын хэрэглээ, ажилчдын зохион байгуулалт, сүүний үйлдвэрт нийлүүлэх тухай практик нийтлэлүүд.",
  "/medlegiin-san",
);

export default async function KnowledgePage() {
  const articles = await getPublishedArticles();
  return (
    <>
      <PageHeader
        eyebrow="Мэдлэгийн сан"
        title="Фермийн туршлагаас бичсэн нийтлэлүүд"
        lead="Практик туршлага дээр суурилсан ерөнхий мэдээлэл. Малын эмчилгээ, тэжээлийн норм зэрэг мэргэжлийн асуудлаар малын эмч, зоотехникчтэй зөвлөлдөнө үү."
      />
      <Container className="py-16">
        {articles.length === 0 ? (
          <p className="text-muted">Одоогоор нийтлэл алга байна.</p>
        ) : (
          <ul className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <li key={a.slug}>
                <Link href={`/medlegiin-san/${a.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-paper transition-shadow hover:shadow-lg">
                  {a.coverUrl ? (
                    <Photo src={a.coverUrl} alt="" slot="" className="aspect-[16/9]" />
                  ) : (
                    <div className="aspect-[16/9] bg-gradient-to-br from-green-700 to-green-900 p-6">
                      <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white">{a.category}</span>
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    {a.coverUrl && <span className="text-xs font-bold uppercase tracking-wider text-gold">{a.category}</span>}
                    <h2 className="mt-1 text-xl text-green-900 group-hover:underline">{a.title}</h2>
                    <p className="mt-3 flex-1 text-sm text-muted">{a.excerpt}</p>
                    <p className="mt-4 text-xs text-muted">{formatDate(a.publishedAt)}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </>
  );
}
