import Link from "next/link";
import { notFound } from "next/navigation";
import { deleteArticle } from "@/app/actions/admin";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { adminArticle } from "@/lib/data";

export default async function EditArticle({ params, searchParams }: PageProps<"/admin/articles/[id]">) {
  const { id } = await params;
  const sp = await searchParams;
  const n = Number(id);
  const article = Number.isInteger(n) ? await adminArticle(n) : null;
  if (!article) notFound();
  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl text-green-900">Нийтлэл засах</h1>
        <div className="flex gap-3">
          {article.status === "published" && <Link href={`/medlegiin-san/${article.slug}`} target="_blank" className="btn btn-outline !min-h-10">Сайт дээр харах</Link>}
          <DeleteButton action={deleteArticle.bind(null, n)} />
        </div>
      </div>
      {sp.saved && <p role="status" className="mb-5 rounded-lg bg-green-100 px-4 py-3 text-sm text-green-900">Хадгалагдлаа.</p>}
      <ArticleForm article={article} />
    </>
  );
}
