import { Photo } from "@/components/Photo";
import { Container, PageHeader, Pending } from "@/components/Section";
import { getMedia } from "@/lib/data";
import { mediaCategories, pageMeta } from "@/lib/site";
import { youtubeEmbed } from "@/lib/video";
import type { MediaItem } from "@/lib/types";

export const metadata = pageMeta(
  "Зураг, видео — фермийн бодит амьдрал",
  "Өглөөний сааль, саалтуурын ажиллагаа, үхрийн арчилгаа, тэжээл бэлтгэх, тоног төхөөрөмжийн шинэчлэл ба фермийн эзний ярилцлага.",
  "/galerei",
);

export default async function GalleryPage() {
  const media = await getMedia();
  const byCat = (slug: string) => media.filter((m) => m.category === slug);

  return (
    <>
      <PageHeader
        eyebrow="Бодит ферм"
        title="Зураг, видео"
        lead="Фермийн өдөр тутмын амьдрал, ажиллагаа, технологи. “Жишээ зураг” гэсэн тэмдэглэгээтэй материал нь фермээс авсан зураг биш гэдгийг анхаарна уу."
      />
      <Container className="py-12">
        <nav aria-label="Ангилал" className="mb-12 flex flex-wrap gap-2">
          {mediaCategories.map((c) => (
            <a key={c.slug} href={`#${c.slug}`} className="rounded-full border border-line bg-paper px-4 py-2 text-sm font-medium hover:bg-green-100">
              {c.label}
            </a>
          ))}
        </nav>

        {media.length === 0 && (
          <div className="mb-12"><Pending>фермийн бодит зураг, видеог эзэн ирүүлсний дараа админ самбараар нэмнэ. Доор оруулах байрлалууд бэлэн байна.</Pending></div>
        )}

        <div className="space-y-16">
          {mediaCategories.map((c) => {
            const items = byCat(c.slug);
            return (
              <section key={c.slug} id={c.slug} aria-labelledby={`h-${c.slug}`} className="scroll-mt-24">
                <h2 id={`h-${c.slug}`} className="text-2xl text-green-900">{c.label}</h2>
                {items.length ? (
                  <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((m) => (
                      <li key={m.id}><MediaCard m={m} /></li>
                    ))}
                  </ul>
                ) : (
                  <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    <Photo alt="" slot={`${c.label} — зураг эсвэл видео`} className="aspect-[4/3] rounded-xl" />
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </Container>
    </>
  );
}

function MediaCard({ m }: { m: MediaItem }) {
  const embed = m.kind === "video" ? youtubeEmbed(m.url) : null;
  return (
    <figure>
      <div className="relative overflow-hidden rounded-xl bg-stone">
        {m.kind === "image" ? (
          <Photo src={m.url} alt={m.title} slot={m.title} sample={m.isSample} className="aspect-[4/3]" />
        ) : embed ? (
          <iframe
            src={embed}
            title={m.title}
            loading="lazy"
            allow="accelerometer; encrypted-media; picture-in-picture"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            className="aspect-video w-full"
          />
        ) : (
          <video controls preload="none" poster={m.posterUrl || undefined} className="aspect-video w-full bg-black">
            <source src={m.url} />
          </video>
        )}
        {m.kind === "video" && m.isSample && (
          <span className="absolute left-2 top-2 rounded bg-black/70 px-2 py-1 text-xs text-white">Жишээ видео</span>
        )}
      </div>
      <figcaption className="mt-2">
        <p className="font-semibold text-green-900">{m.title}</p>
        {m.description && <p className="text-sm text-muted">{m.description}</p>}
      </figcaption>
    </figure>
  );
}
