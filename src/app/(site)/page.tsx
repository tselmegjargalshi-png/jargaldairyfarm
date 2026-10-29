import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { Photo } from "@/components/Photo";
import { Container, Pending, SectionHeading } from "@/components/Section";
import { getMedia, getPublishedArticles, getSettings } from "@/lib/data";
import { formatDate, mediaCategoryLabel, pageMeta, site, siteUrl } from "@/lib/site";

export const metadata = pageMeta(
  "15 жилийн туршлагатай сүүний үхрийн ферм",
  site.description,
  "/",
  { title: { absolute: `${site.name} — 15 жилийн туршлагатай сүүний үхрийн ферм` } },
);

export default async function HomePage() {
  const [s, articles, media] = await Promise.all([getSettings(), getPublishedArticles(), getMedia()]);
  const latest = articles.slice(0, 3);
  const realMedia = media.filter((m) => !m.isSample).slice(0, 3);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": `${siteUrl()}/#org`,
              name: site.legalName,
              alternateName: site.name,
              url: siteUrl(),
              founder: { "@type": "Person", name: site.founder },
              ...(s.contact.email && { email: s.contact.email }),
              ...(s.contact.phone && { telephone: s.contact.phone }),
              sameAs: [s.contact.facebook, s.contact.youtube, s.contact.instagram].filter(Boolean),
            },
            { "@type": "WebSite", "@id": `${siteUrl()}/#site`, url: siteUrl(), name: site.name, inLanguage: "mn" },
          ],
        }}
      />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-green-900 text-white">
        <div className="absolute inset-0 -z-10 opacity-40">
          {s.images.hero && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={s.images.hero} alt="" className="h-full w-full object-cover" fetchPriority="high" />
          )}
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-green-900 via-green-900/90 to-green-900/40" />
        <Container className="grid items-center gap-10 py-16 sm:py-24 lg:grid-cols-[1.25fr_1fr]">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-gold-soft">{site.tagline}</p>
            <h1 className="text-4xl leading-[1.15] sm:text-5xl lg:text-6xl">{s.heroTitle}</h1>
            <p className="mt-6 max-w-xl text-lg text-white/85">{s.heroSubtitle}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/tekhnologi" className="btn btn-gold">Фермтэй танилцах</Link>
              <Link href="/fermiin-tukhai" className="btn btn-ghost">Бидний туршлага</Link>
              <Link href="/hamtran-ajillah" className="btn btn-ghost">Хамтран ажиллах</Link>
            </div>
          </div>
          <Photo
            src={s.images.portrait}
            alt="Ц. Жаргал"
            slot="Ц. Жаргалын хөрөг зураг"
            className="aspect-[4/5] w-full rounded-2xl lg:max-w-sm lg:justify-self-end"
            priority
          />
        </Container>
      </section>

      {/* Facts strip — only confirmed facts */}
      <section aria-label="Фермийн товч мэдээлэл" className="border-b border-line bg-paper">
        <Container className="grid grid-cols-2 gap-6 py-8 md:grid-cols-4">
          {[
            ["15 жил", "сүүний үхрийн аж ахуйн туршлага"],
            ["≈50", "саалийн үнээ (одоогийн байдлаар)"],
            ["Саалтуур", "төхөөрөмжөөр үнээ саадаг"],
            ["Үйлдвэрт", "сүүгээ сүүний үйлдвэрт нийлүүлдэг"],
          ].map(([big, small]) => (
            <div key={big}>
              <p className="font-serif text-3xl font-semibold text-green-800">{big}</p>
              <p className="mt-1 text-sm text-muted">{small}</p>
            </div>
          ))}
        </Container>
      </section>

      {/* About */}
      <section className="py-20">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <Photo src={s.images.barn} alt="Фермийн орчин" slot="Фермийн гаднах эсвэл дотор талын зураг" className="aspect-[4/3] rounded-2xl" />
          <div>
            <SectionHeading eyebrow="Фермийн тухай" title={s.introTitle} />
            <p className="-mt-4 text-lg leading-relaxed text-ink/85">{s.introText}</p>
            <Link href="/fermiin-tukhai" className="btn btn-outline mt-7">Түүхийг дэлгэрэнгүй унших</Link>
          </div>
        </Container>
      </section>

      {/* Experience */}
      <section className="bg-green-100/60 py-20">
        <Container>
          <SectionHeading eyebrow="15 жилийн туршлага" title="Практикаас суралцсан мэдлэг">
            Сүүний аж ахуй номноос илүү өдөр тутмын ажлаар сурагддаг. Энэ сайт тэр туршлагыг хуваалцах зорилготой.
          </SectionHeading>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              ["Өдөр бүрийн сааль", "Үнээг тогтмол цагт саах, малын байдлыг ажиглах, ажлаа тасралтгүй зохион байгуулах туршлага."],
              ["Малын арчилгаа, тэжээл", "Саалийн үнээ, сувиа үнээ, тугал болон бусад насны үхрийн арчилгааг бүлэглэн зохион байгуулах."],
              ["Үе шаттай шинэчлэл", "Фермийн ажиллагаа, тоног төхөөрөмжөө алхам алхмаар сайжруулж ирсэн бодит туршлага."],
            ].map(([t, d]) => (
              <article key={t} className="rounded-2xl border border-line bg-paper p-7">
                <h3 className="text-xl text-green-900">{t}</h3>
                <p className="mt-3 text-muted">{d}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Technology */}
      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="Технологи" title="Саалтуур ба бууц зайлуулах систем">
            Фермийн хамгийн их хөдөлмөр шаарддаг ажлуудыг төхөөрөмжөөр хөнгөвчилж байгаа бодит туршлага.
          </SectionHeading>
          <div className="grid gap-6 md:grid-cols-2">
            <TechCard
              title="Саалтуурын төхөөрөмж"
              text="Үнээгээ саалтуурын төхөөрөмжөөр саадаг. Төхөөрөмж ажлыг хөнгөвчилдөг ч сааль бүрт хүний ажиглалт, цэвэрлэгээ шаардлагатай хэвээр."
              src={s.images.milking}
              slot="Саалтуур ажиллаж буй зураг"
            />
            <TechCard
              title="Бууцыг усаар зайлуулах систем"
              text="Бууцыг усаар шүршиж зайлуулдаг. Байрны цэвэр байдлыг хадгалахад өдөр тутмын ажлыг хөнгөвчилдөг."
              src={s.images.manure}
              slot="Бууц зайлуулах системийн зураг"
            />
          </div>
          <Link href="/tekhnologi" className="btn btn-outline mt-8">Технологийн хуудас руу</Link>
        </Container>
      </section>

      {/* Daily life */}
      <section className="bg-green-900 py-20 text-white">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-gold-soft">Өдөр тутмын ажиллагаа</p>
            <h2 className="text-3xl sm:text-4xl">Үхрийн арчилгаа, тэжээл, ажилчдын зохион байгуулалт</h2>
            <p className="mt-5 text-lg text-white/80">
              Ферм дээр өглөөнөөс орой хүртэл сааль, тэжээл түгээх, цэвэрлэгээ, малын ажиглалт тогтмол хуваарьтай явагддаг.
              Сувиа үнээ, тугал, бусад насны үхрийг тусад нь арчилдаг.
            </p>
            <Link href="/fermiin-tukhai#udur-tutmiin" className="btn btn-gold mt-7">Өдрийн ажлын урсгал</Link>
          </div>
          <Photo src={s.images.feeding} alt="Тэжээл түгээх ажил" slot="Тэжээл бэлтгэх, түгээх ажлын зураг" className="aspect-[4/3] rounded-2xl" />
        </Container>
      </section>

      {/* Gallery teaser */}
      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="Бодит ферм" title="Зураг, видео">
            Фермийн өдөр тутмын амьдралыг камерт буулгасан бодит материал.
          </SectionHeading>
          {realMedia.length ? (
            <ul className="grid gap-4 sm:grid-cols-3">
              {realMedia.map((m) => (
                <li key={m.id}>
                  <Photo src={m.kind === "image" ? m.url : m.posterUrl} alt={m.title} slot={m.title} className="aspect-[4/3] rounded-xl" />
                  <p className="mt-2 text-sm font-semibold text-green-900">{m.title}</p>
                  <p className="text-xs text-muted">{mediaCategoryLabel(m.category)}</p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="grid gap-4 sm:grid-cols-3">
              {["Өглөөний сааль", "Үхрийн арчилгаа", "Ц. Жаргалын ярилцлага"].map((slot) => (
                <Photo key={slot} alt="" slot={slot} className="aspect-[4/3] rounded-xl" />
              ))}
              <div className="sm:col-span-3"><Pending>фермийн бодит зураг, видеог эзэн ирүүлсний дараа энд харуулна.</Pending></div>
            </div>
          )}
          <Link href="/galerei" className="btn btn-outline mt-8">Бүх галерей</Link>
        </Container>
      </section>

      {/* Articles */}
      <section className="bg-green-100/60 py-20">
        <Container>
          <SectionHeading eyebrow="Мэдлэгийн сан" title="Туршлагаас бичсэн нийтлэлүүд" />
          <ul className="grid gap-6 md:grid-cols-3">
            {latest.map((a) => (
              <li key={a.slug}>
                <Link href={`/medlegiin-san/${a.slug}`} className="group flex h-full flex-col rounded-2xl border border-line bg-paper p-6 transition-shadow hover:shadow-lg">
                  <span className="text-xs font-bold uppercase tracking-wider text-gold">{a.category}</span>
                  <h3 className="mt-2 text-xl text-green-900 group-hover:underline">{a.title}</h3>
                  <p className="mt-3 flex-1 text-sm text-muted">{a.excerpt}</p>
                  <span className="mt-4 text-xs text-muted">{formatDate(a.publishedAt)}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/medlegiin-san" className="btn btn-outline mt-8">Бүх нийтлэл</Link>
        </Container>
      </section>

      {/* Training & meetings */}
      <section className="pb-4">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-line bg-paper p-8">
              <h2 className="text-2xl text-green-900">Сургалтад бүртгүүлэх</h2>
              <p className="mt-3 text-muted">Ферм эхлүүлэх зөвлөгөө, онлайн сургалт, фермтэй танилцах хөтөлбөрийн хүлээлгийн жагсаалтад бүртгүүлээрэй.</p>
              <Link href="/surgalt-zuvlugee#burtgel" className="btn btn-primary mt-6">Бүртгүүлэх</Link>
            </article>
            <article className="rounded-2xl border border-line bg-paper p-8">
              <h2 className="text-2xl text-green-900">Уулзалтын цаг товлох</h2>
              <p className="mt-3 text-muted">Фермтэй газар дээр нь танилцах, онлайн эсвэл утсаар зөвлөгөө авах тохиромжтой цагаа сонгоно уу.</p>
              <Link href="/surgalt-zuvlugee#uulzalt" className="btn btn-outline mt-6">Цаг товлох</Link>
            </article>
          </div>
        </Container>
      </section>

      {/* Collaboration CTA */}
      <section className="py-20">
        <Container>
          <div className="rounded-3xl bg-green-800 px-8 py-14 text-center text-white sm:px-16">
            <h2 className="text-3xl sm:text-4xl">Хамтран ажиллах боломж</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
              Сүүний үйлдвэр, тэжээл ба тоног төхөөрөмж нийлүүлэгч, малын эмч, мэргэжилтэн, фермерүүд болон судалгаа, сургалтын байгууллагуудтай хамтран ажиллахад нээлттэй.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/hamtran-ajillah" className="btn btn-gold">Хамтран ажиллах хүсэлт илгээх</Link>
              <Link href="/surgalt-zuvlugee" className="btn btn-ghost">Сургалт, зөвлөгөө</Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function TechCard({ title, text, src, slot }: { title: string; text: string; src: string; slot: string }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-line bg-paper">
      <Photo src={src} alt={title} slot={slot} className="aspect-[16/9]" />
      <div className="p-7">
        <h3 className="text-xl text-green-900">{title}</h3>
        <p className="mt-3 text-muted">{text}</p>
      </div>
    </article>
  );
}
