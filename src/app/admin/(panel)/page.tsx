import Link from "next/link";
import { adminArticles, adminInquiries, adminMedia } from "@/lib/data";

export default async function Dashboard() {
  const [articles, media, inquiries] = await Promise.all([adminArticles(), adminMedia(), adminInquiries()]);
  const cards = [
    ["Нийтлэл", `${articles.filter((a) => a.status === "published").length} нийтлэгдсэн · ${articles.filter((a) => a.status === "draft").length} ноорог`, "/admin/articles"],
    ["Зураг, видео", `${media.length} файл`, "/admin/media"],
    ["Шинэ хүсэлт", `${inquiries.filter((i) => i.status === "new").length} шинэ · нийт ${inquiries.length}`, "/admin/inquiries"],
  ];
  return (
    <>
      <h1 className="text-3xl text-green-900">Сайн байна уу, Ц. Жаргал</h1>
      <p className="mt-2 text-muted">Сайтын агуулгаа эндээс удирдана.</p>
      <ul className="mt-8 grid gap-5 md:grid-cols-3">
        {cards.map(([t, d, h]) => (
          <li key={h}>
            <Link href={h} className="block rounded-2xl border border-line bg-paper p-6 hover:shadow-md">
              <p className="text-sm text-muted">{t}</p>
              <p className="mt-2 font-serif text-xl text-green-900">{d}</p>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-10 rounded-2xl border border-line bg-paper p-6">
        <p className="font-semibold text-green-900">Түргэн үйлдэл</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/admin/articles/new" className="btn btn-primary">Нийтлэл нэмэх</Link>
          <Link href="/admin/media/new" className="btn btn-outline">Зураг / видео нэмэх</Link>
          <Link href="/admin/settings" className="btn btn-outline">Нүүр хуудас, холбоо барих мэдээлэл</Link>
        </div>
      </div>
    </>
  );
}
