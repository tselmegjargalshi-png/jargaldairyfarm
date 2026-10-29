import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { Photo } from "@/components/Photo";
import { Container, PageHeader, Pending } from "@/components/Section";
import { getSettings } from "@/lib/data";
import { pageMeta, site, siteUrl } from "@/lib/site";

export const metadata = pageMeta(
  "Фермийн тухай",
  "Ц. Жаргалын 15 жилийн сүүний аж ахуйн туршлага, фермийн өдөр тутмын зохион байгуулалт, технологийн шинэчлэл, ирээдүйн зорилго.",
  "/fermiin-tukhai",
);

export default async function AboutPage() {
  const s = await getSettings();
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: site.founder,
          jobTitle: "Сүүний үхрийн аж ахуйн эрхлэгч",
          worksFor: { "@type": "Organization", name: site.legalName },
          url: `${siteUrl()}/fermiin-tukhai`,
        }}
      />
      <PageHeader
        eyebrow="Фермийн тухай"
        title="Ц. Жаргал ба түүний сүүний ферм"
        lead="15 жилийн турш сүүний үхрийн аж ахуй эрхэлж, ферм, тоног төхөөрөмжөө үе шаттайгаар хөгжүүлж ирсэн бодит туршлага."
      />

      <Container className="grid gap-12 py-16 lg:grid-cols-[1fr_340px]">
        <div className="space-y-14">
          <section aria-labelledby="h-story">
            <h2 id="h-story" className="text-3xl text-green-900">Фермийн түүх</h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-ink/90">
              <p>
                Ц. Жаргал сүүний үхрийн аж ахуйн чиглэлээр 15 жил ажиллаж байна. Энэ хугацаанд фермийн өдөр тутмын ажил,
                малын арчилгаа, сааль, тэжээл, ажилчдын зохион байгуулалтыг өөрийн биеэр туулж ирсэн.
              </p>
              <p>
                Одоо ферм ойролцоогоор 50 саалийн үнээтэй. Үүнээс гадна сувиа үнээ, тугал болон бусад насны үхэр бий.
                Үнээг саалтуурын төхөөрөмжөөр саадаг, бууцыг усаар шүршиж зайлуулдаг бөгөөд сүүгээ сүүний үйлдвэрт нийлүүлдэг.
              </p>
              <p>
                Фермийн ажиллагаа, тоног төхөөрөмжийг нэг дор бүгдийг нь биш, үе шаттайгаар сайжруулж байна.
              </p>
            </div>
            <div className="mt-6">
              <Pending>
                фермийг хэзээ, хэрхэн үүсгэн байгуулсан түүх, анхны сүргийн хэмжээ зэргийг Ц. Жаргал өөрөө хэлж өгсний дараа энд нэмнэ.
                Баталгаагүй мэдээллийг зориуд бичээгүй.
              </Pending>
            </div>
            {s.founderQuote && (
              <blockquote className="mt-8 border-l-4 border-gold pl-5 font-serif text-xl italic text-green-900">
                “{s.founderQuote}” <footer className="mt-2 text-sm not-italic text-muted">— Ц. Жаргал</footer>
              </blockquote>
            )}
          </section>

          <section aria-labelledby="h-learn">
            <h2 id="h-learn" className="text-3xl text-green-900">15 жилийн туршлагаас сурсан зүйлс</h2>
            <ul className="mt-5 space-y-3 text-lg text-ink/90">
              <li><strong className="text-green-900">Тогтмол байдал.</strong> Сүүний ферм өдөр бүр, хэзээ ч зогсдоггүй ажил. Тогтмол хуваарь бол хамгийн найдвартай суурь.</li>
              <li><strong className="text-green-900">Малын ажиглалт.</strong> Үнээ бүрийн байдлыг өдөр бүр ажиглах нь асуудлыг эрт анзаарах хамгийн энгийн арга.</li>
              <li><strong className="text-green-900">Хүний хүчин зүйл.</strong> Ажилчдын зохион байгуулалт сайн бол ферм тогтвортой ажилладаг.</li>
              <li><strong className="text-green-900">Үе шаттай сайжруулалт.</strong> Технологийг алхам алхмаар нэвтрүүлэх нь эрсдэл багатай.</li>
            </ul>
            <div className="mt-5"><Pending>Ц. Жаргалын өөрийн үгээр бичсэн сургамжуудыг нэмэх боломжтой.</Pending></div>
          </section>

          <section aria-labelledby="h-care">
            <h2 id="h-care" className="text-3xl text-green-900">Малын арчилгаа</h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/90">
              Ферм дээр саалийн үнээнээс гадна сувиа үнээ, тугал болон бусад насны үхрийг тус тусад нь арчилдаг.
              Насны бүлэг бүр өөр хэрэгцээтэй тул арчилгаа, тэжээллэлтийг бүлэг бүрээр зохион байгуулдаг.
            </p>
            <p className="mt-4 text-sm text-muted">
              Тэжээлийн найрлага, малын эмчилгээ, вакцинжуулалт зэрэг мэргэжлийн асуудлыг малын эмч, зоотехникчтэй зөвлөлдөж шийддэг.
            </p>
          </section>

          <section aria-labelledby="h-daily" id="udur-tutmiin">
            <h2 id="h-daily" className="text-3xl text-green-900">Өдөр тутмын зохион байгуулалт</h2>
            <ol className="mt-6 space-y-4">
              {[
                ["Өглөөний сааль", "Саалтуурын төхөөрөмжөөр үнээг саана."],
                ["Тэжээллэлт", "Тэжээл бэлтгэж, малд түгээнэ."],
                ["Цэвэрлэгээ", "Бууцыг усаар зайлуулж, байр, төхөөрөмжийг цэвэрлэнэ."],
                ["Малын ажиглалт", "Мал бүлэг бүрийг ажиглаж, хэвийн бус зүйлийг тэмдэглэнэ."],
                ["Оройн сааль", "Үнээг дахин саана."],
              ].map(([t, d], i) => (
                <li key={t} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-700 font-semibold text-white">{i + 1}</span>
                  <div><p className="font-semibold text-green-900">{t}</p><p className="text-muted">{d}</p></div>
                </li>
              ))}
            </ol>
            <div className="mt-5"><Pending>саалийн цаг, ажилчдын тоо, ээлжийн хуваарийг эзэн баталгаажуулсны дараа нарийвчилж бичнэ.</Pending></div>
          </section>

          <section aria-labelledby="h-future">
            <h2 id="h-future" className="text-3xl text-green-900">Ирээдүйн зорилго</h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/90">
              Фермийн ажиллагаагаа тасралтгүй сайжруулах, технологиа үе шаттайгаар шинэчлэх, мөн олсон туршлагаа
              сүүний аж ахуй эрхлэх хүсэлтэй хүмүүстэй хуваалцах нь бидний зорилго. Энэ сайт цаашид сургалт,
              зөвлөгөө, салбарын хамтын ажиллагааны талбар болж өргөжих боломжтой.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/medlegiin-san" className="btn btn-primary">Нийтлэл унших</Link>
              <Link href="/hamtran-ajillah" className="btn btn-outline">Хамтран ажиллах</Link>
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <Photo src={s.images.portrait} alt="Ц. Жаргал" slot="Ц. Жаргалын хөрөг зураг" className="aspect-[4/5] rounded-2xl" />
          <div className="rounded-2xl border border-line bg-paper p-6">
            <p className="font-serif text-lg text-green-900">Товч мэдээлэл</p>
            <dl className="mt-3 space-y-3 text-sm">
              <div><dt className="text-muted">Туршлага</dt><dd className="font-semibold">15 жил, сүүний үхрийн аж ахуй</dd></div>
              <div><dt className="text-muted">Саалийн үнээ</dt><dd className="font-semibold">Ойролцоогоор 50</dd></div>
              <div><dt className="text-muted">Сүүний борлуулалт</dt><dd className="font-semibold">Сүүний үйлдвэрт нийлүүлдэг</dd></div>
              <div><dt className="text-muted">Компани</dt><dd className="font-semibold">{site.legalName}</dd></div>
            </dl>
          </div>
        </aside>
      </Container>
    </>
  );
}
