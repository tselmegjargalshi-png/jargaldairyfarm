"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav, site } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-milk/95 backdrop-blur">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2"
      >
        Агуулга руу шилжих
      </a>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)} aria-label={`${site.name} — нүүр хуудас`}>
          <Image src="/logo-mark.png" alt="" width={52} height={52} className="h-12 w-12 object-contain" priority />
          <span className="flex flex-col whitespace-nowrap leading-tight">
            <span className="font-serif text-lg font-semibold text-green-900">{site.shortName}</span>
            <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-gold">Сүүний аж ахуй</span>
          </span>
        </Link>

        <nav aria-label="Үндсэн цэс" className="hidden items-center gap-1 xl:flex">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition-colors hover:bg-green-100 ${
                  active ? "bg-green-100 text-green-900" : "text-ink/80"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link href="/holboo-barih" className="btn btn-primary ml-2 !min-h-10 whitespace-nowrap !px-5 !py-2 text-sm">
            Холбоо барих
          </Link>
        </nav>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-line xl:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Цэсийг хаах" : "Цэсийг нээх"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
            {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Гар утасны цэс" className="border-t border-line bg-milk xl:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col px-5 py-3 sm:px-8">
            {[...nav, { href: "/holboo-barih", label: "Холбоо барих" }].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-base font-medium hover:bg-green-100"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
