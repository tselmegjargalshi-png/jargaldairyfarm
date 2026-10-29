import type { Metadata, Viewport } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import { site, siteUrl } from "@/lib/site";

const body = Manrope({ variable: "--font-body", subsets: ["cyrillic", "latin"], display: "swap" });
const display = Playfair_Display({
  variable: "--font-display",
  subsets: ["cyrillic", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: `${site.name} — Сүүний үхрийн ферм`, template: `%s | ${site.shortName}` },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    title: site.name,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#17402f",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="mn" className={`${body.variable} ${display.variable}`}>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
