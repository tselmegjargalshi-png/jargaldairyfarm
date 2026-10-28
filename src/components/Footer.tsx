import Link from "next/link";
import { cacheLife } from "next/cache";
import { getSettings } from "@/lib/data";
import { nav, site } from "@/lib/site";

export async function Footer() {
  "use cache";
  cacheLife("days");
  const { contact } = await getSettings();
  const channels = [
    contact.phone && { label: "Утас", value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, "")}` },
    contact.email && { label: "Имэйл", value: contact.email, href: `mailto:${contact.email}` },
    contact.facebook && { label: "Facebook", value: "Facebook хуудас", href: contact.facebook },
    contact.youtube && { label: "YouTube", value: "YouTube суваг", href: contact.youtube },
    contact.instagram && { label: "Instagram", value: "Instagram хуудас", href: contact.instagram },
  ].filter(Boolean) as { label: string; value: string; href: string }[];

  return (
    <footer className="mt-24 bg-green-900 text-white/85">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-3">
        <div>
          <p className="font-serif text-2xl text-white">{site.shortName}</p>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-soft">Сүүний аж ахуй</p>
          <p className="mt-4 text-sm leading-relaxed">{site.tagline}</p>
        </div>
        <nav aria-label="Хөлийн цэс">
          <p className="mb-3 text-sm font-semibold text-white">Хуудсууд</p>
          <ul className="space-y-1.5 text-sm">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-white hover:underline">{n.label}</Link>
              </li>
            ))}
            <li><Link href="/holboo-barih" className="hover:text-white hover:underline">Холбоо барих</Link></li>
          </ul>
        </nav>
        <div>
          <p className="mb-3 text-sm font-semibold text-white">Холбоо барих</p>
          {channels.length ? (
            <ul className="space-y-1.5 text-sm">
              {channels.map((c) => (
                <li key={c.label}>
                  <span className="text-white/60">{c.label}: </span>
                  <a href={c.href} className="hover:text-white hover:underline" {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                    {c.value}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-white/70">
              Холбоо барих мэдээлэл удахгүй нэмэгдэнэ. Одоогоор{" "}
              <Link href="/holboo-barih" className="underline">сайтын форм</Link>-оор бичиж болно.
            </p>
          )}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-5 text-xs text-white/60 sm:flex-row sm:justify-between sm:px-8">
          <p>© {new Date().getUTCFullYear()} {site.legalName}. Бүх эрх хуулиар хамгаалагдсан.</p>
          <p>{site.name}</p>
        </div>
      </div>
    </footer>
  );
}
