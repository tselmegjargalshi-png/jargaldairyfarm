import { InquiryForm } from "@/components/InquiryForm";
import { Container, PageHeader, Pending } from "@/components/Section";
import { getServices } from "@/lib/data";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta(
  "Сургалт, зөвлөх үйлчилгээ, уулзалт товлох",
  "Сүүний ферм эхлүүлэх зөвлөгөө, фермтэй танилцах хөтөлбөр, онлайн сургалт. Сургалтад бүртгүүлэх, Ц. Жаргалтай уулзах цаг товлох хүсэлт илгээнэ үү.",
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
        lead="Эдгээр нь одоогоор төлбөртэй үйлчилгээгээр баталгаажаагүй, сонирхлыг судалж буй чиглэлүүд. Сургалтад бүртгүүлэх эсвэл уулзах цаг товлох хүсэлтээ доороос илгээнэ үү."
      />
      <Container className="py-16">
        <nav aria-label="Хүсэлтийн төрөл" className="mb-10 flex flex-wrap gap-3">
          <a href="#burtgel" className="btn btn-primary">Сургалтад бүртгүүлэх</a>
          <a href="#uulzalt" className="btn btn-outline">Уулзалтын цаг товлох</a>
        </nav>

        <ul className="grid gap-5 md:grid-cols-2">
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

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <section id="burtgel" aria-labelledby="h-burtgel" className="scroll-mt-24 rounded-2xl border border-line bg-paper p-6 sm:p-8">
            <h2 id="h-burtgel" className="text-2xl text-green-900">Сургалтад бүртгүүлэх</h2>
            <p className="mb-6 mt-2 text-sm text-muted">
              Сургалтын хуваарь, үнэ баталгаажаагүй байгаа тул энэ нь хүлээлгийн жагсаалтад бүртгүүлэх хүсэлт юм.
              Сургалт товлогдох үед бид тантай эхэлж холбогдоно. Төлбөр шаардахгүй.
            </p>
            <InquiryForm kind="training" submitLabel="Бүртгүүлэх" messageLabel="Нэмэлт хүсэлт, хүлээлт (заавал биш)" />
          </section>

          <section id="uulzalt" aria-labelledby="h-uulzalt" className="scroll-mt-24 rounded-2xl border border-line bg-paper p-6 sm:p-8">
            <h2 id="h-uulzalt" className="text-2xl text-green-900">Уулзалтын цаг товлох</h2>
            <p className="mb-6 mt-2 text-sm text-muted">
              Тохиромжтой огноо, цагаа сонгон хүсэлт илгээнэ үү. Энэ нь баталгаажсан цаг биш, Ц. Жаргал хүсэлтийг хараад
              тантай холбогдож цагийг баталгаажуулна.
            </p>
            <InquiryForm kind="meeting" submitLabel="Цаг товлох хүсэлт илгээх" messageLabel="Юуны талаар уулзахыг хүсэж байна вэ?" />
          </section>
        </div>
      </Container>
    </>
  );
}
