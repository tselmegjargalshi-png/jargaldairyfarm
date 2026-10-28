import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { logout } from "@/app/actions/admin";
import { isAdmin } from "@/lib/auth";
import { hasDatabase } from "@/lib/db";
import { newInquiryCount } from "@/lib/data";

export default function PanelLayout({ children }: LayoutProps<"/admin">) {
  return (
    <Suspense fallback={<p className="p-8 text-muted">Ачаалж байна…</p>}>
      <Guard>{children}</Guard>
    </Suspense>
  );
}

async function Guard({ children }: { children: React.ReactNode }) {
  if (!(await isAdmin())) redirect("/admin/login");
  const dbOk = hasDatabase();
  const fresh = await newInquiryCount();
  const links = [
    ["/admin", "Хяналт"],
    ["/admin/articles", "Нийтлэл"],
    ["/admin/media", "Зураг, видео"],
    ["/admin/services", "Үйлчилгээ"],
    ["/admin/settings", "Сайтын мэдээлэл"],
    ["/admin/inquiries", fresh ? `Хүсэлтүүд (${fresh})` : "Хүсэлтүүд"],
  ];
  return (
    <>
      <header className="border-b border-line bg-green-900 text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-5 py-3">
          <Link href="/admin" className="font-serif text-lg">Админ</Link>
          <nav aria-label="Админ цэс" className="flex flex-1 flex-wrap gap-1 text-sm">
            {links.map(([href, label]) => (
              <Link key={href} href={href} className="rounded-full px-3 py-1.5 hover:bg-white/10">{label}</Link>
            ))}
          </nav>
          <Link href="/" target="_blank" className="text-sm underline">Сайт харах</Link>
          <form action={logout}><button className="rounded-full border border-white/40 px-3 py-1.5 text-sm hover:bg-white/10">Гарах</button></form>
        </div>
      </header>
      {!dbOk && (
        <p className="bg-gold-soft px-5 py-3 text-center text-sm">
          DATABASE_URL тохируулаагүй тул өөрчлөлт хадгалах боломжгүй. README-г үзнэ үү.
        </p>
      )}
      <div className="mx-auto max-w-6xl px-5 py-10">{children}</div>
    </>
  );
}
