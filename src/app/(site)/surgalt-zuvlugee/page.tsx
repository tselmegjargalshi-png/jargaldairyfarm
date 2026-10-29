import { InquiryForm } from "@/components/InquiryForm";
import { Container, PageHeader, Pending } from "@/components/Section";
import { getServices } from "@/lib/data";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta(
  "Сургалт ба зөвлөх үйлчилгээ",
  "Сүүний ферм эхлүүлэх зөвлөгөө, фермтэй танилцах хөтөлбөр, онлайн сургалт, фермерүүдийн туршлага солилцох уулзалт. Сонирхлоо илэрхийлээрэй.",
  "/surgalt-zuvlugee",
);

const statusLabel = { interest: "Сонирхол судалж байна", open: "Бүртгэл нээлттэй", paused: "Түр зогссон" } as const;

export default async function ServicesPage() {
  const services = await getServices();
  return (
    <>
      <PageHeader
        eyebrow="Сургалт, зөвлөх үйлчилгээ"
        title="Туршлагаа хуваалцах боломжууд"
        lead="Эдгээр нь одоогоор төлбөртэй үйлчилгээгээр баталгаажаагүй, сонирхлыг судалж буй чиглэлүүд. Таны сонирхол бидэнд хөтөлбөрөө төлөвлөхөд тусална."
      />
      <Container className="grid gap-14 py-16 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <ul className="space-y-5">
            {services.map((s) => (
              <li key={s.slug} className="rounded-2xl border border-line bg-paper p-6">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-xl text-green-900">{s.title}</h2>
                  <span className="rounded-full bg-gold-soft px-3 py-1 text-xs font-semibold text-ink">{statusLabel[s.status]}</span>
                </div>
                <p className="mt-3 text-muted">{s.summary}</p>
                {s.details && <p className="mt-2 text-ink/85">{s.details}</p>}
                {(s.priceNote || s.scheduleNote) && (
                  <dl className="mt-3 grid gap-1 text-sm sm:grid-cols-2">
                    {s.priceNote && <div><dt className="inline text-muted">Үнэ: </dt><dd className="inline font-semibold">{s.priceNote}</dd></div>}
                    {s.scheduleNote && <div><dt className="inline text-muted">Хуваарь: </dt><dd className="inline font-semibold">{s.scheduleNote}</dd></div>}
                  </dl>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-6"><Pending>үйлчилгээний үнэ, сургалтын хуваарь, хүчин чадлыг Ц. Жаргал баталгаажуулсны дараа нийтэлнэ.</Pending></div>
        </div>

        <aside id="sonirhol" className="h-fit scroll-mt-24 rounded-2xl border border-line bg-paper p-6 sm:p-8 lg:sticky lg:top-24">
          <h2 className="text-2xl text-green-900">Сонирхлоо илэрхийлэх</h2>
          <p className="mb-6 mt-2 text-sm text-muted">Аль чиглэл танд хэрэгтэй байгаагаа бичнэ үү. Энэ нь захиалга биш, төлбөр шаардахгүй.</p>
          <InquiryForm kind="interest" submitLabel="Сонирхлоо илгээх" messageLabel="Аль чиглэлийг сонирхож байна вэ?" />
        </aside>
      </Container>
    </>
  );
}
