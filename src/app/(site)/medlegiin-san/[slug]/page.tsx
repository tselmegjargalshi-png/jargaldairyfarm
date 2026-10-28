import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { JsonLd } from "@/components/JsonLd";
import { Markdown } from "@/components/Markdown";
import { Container } from "@/components/Section";
import { getArticleBySlug, getPublishedArticles } from "@/lib/data";
import { formatDate, site, siteUrl } from "@/lib/site";

export async function generateStaticParams() {
  const articles = await getPublishedArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/medlegiin-san/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const a = await getArticleBySlug(slug);
  if (!a) return {};
  const title = a.seoTitle || a.title;
  const description = a.seoDescription || a.excerpt;
  return {
    title,
    description,
    alternates: { canonical: `/medlegiin-san/${a.slug}` },
    openGraph: {
      type: "article",
      title,
      description,
      url: `/medlegiin-san/${a.slug}`,
      publishedTime: a.publishedAt,
      modifiedTime: a.updatedAt,
      locale: site.locale,
      siteName: site.name,
      ...(a.coverUrl && { images: [a.coverUrl] }),
    },
  };
}

export default function ArticlePage(props: PageProps<"/medlegiin-san/[slug]">) {
  return (
    <Suspense fallback={<Container className="py-24 text-muted">Ачаалж байна…</Container>}>
      <Article params={props.params} />
    </Suspense>
  );
}

async function Article({ params }: Pick<PageProps<"/medlegiin-san/[slug]">, "params">) {
  const { slug } = await params;
  const a = await getArticleBySlug(slug);
  if (!a) notFound();
  const url = `${siteUrl()}/medlegiin-san/${a.slug}`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: a.title,
          description: a.excerpt,
          datePublished: a.publishedAt,
          dateModified: a.updatedAt,
          inLanguage: "mn",
          mainEntityOfPage: url,
          author: { "@type": "Person", name: site.founder },
          publisher: { "@type": "Organization", name: site.legalName },
          ...(a.coverUrl && { image: a.coverUrl }),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Нүүр", item: siteUrl() },
            { "@type": "ListItem", position: 2, name: "Мэдлэгийн сан", item: `${siteUrl()}/medlegiin-san` },
            { "@type": "ListItem", position: 3, name: a.title, item: url },
          ],
        }}
      />
      <article>
        <header className="bg-green-900 text-white">
          <Container className="max-w-3xl py-14 sm:py-20">
            <nav aria-label="Зам" className="mb-5 text-sm text-white/70">
              <Link href="/medlegiin-san" className="hover:underline">← Мэдлэгийн сан</Link>
            </nav>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-soft">{a.category}</p>
            <h1 className="mt-3 text-3xl sm:text-5xl">{a.title}</h1>
            <p className="mt-5 text-sm text-white/70">
              {site.founder} · <time dateTime={a.publishedAt}>{formatDate(a.publishedAt)}</time>
            </p>
          </Container>
        </header>
        <Container className="max-w-3xl py-12 text-lg leading-relaxed">
          {a.coverUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={a.coverUrl} alt="" className="mb-10 w-full rounded-2xl" />
          )}
          <Markdown source={a.body} />
          <aside className="mt-12 rounded-2xl bg-gold-soft/60 p-6 text-base text-ink/85">
            <p className="font-semibold">Анхааруулга</p>
            <p className="mt-1">
              Энэ нийтлэл нь фермийн ажиллагааны ерөнхий туршлага дээр үндэслэсэн мэдээлэл болохоос малын эмчилгээ, тэжээлийн
              норм, эмийн тун зэрэг мэргэжлийн зөвлөгөө биш. Эдгээр асуудлаар малын эмч, зоотехникчтэй заавал зөвлөлдөнө үү.
            </p>
          </aside>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/medlegiin-san" className="btn btn-outline">Бусад нийтлэл</Link>
            <Link href="/hamtran-ajillah" className="btn btn-primary">Хамтран ажиллах</Link>
          </div>
        </Container>
      </article>
    </>
  );
}
