import { InquiryForm } from "@/components/InquiryForm";
import { Container, PageHeader } from "@/components/Section";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta(
  "Хамтран ажиллах",
  "Сүүний үйлдвэр, тэжээл ба тоног төхөөрөмж нийлүүлэгч, малын эмч, мэргэжилтэн, фермер, судалгаа сургалтын байгууллагуудад зориулсан хамтын ажиллагааны хүсэлт.",
  "/hamtran-ajillah",
);

const partners = [
  ["Сүүний үйлдвэрүүд", "Сүү нийлүүлэлт, чанарын шаардлага, урт хугацааны хамтын ажиллагаа."],
  ["Үхрийн тэжээл нийлүүлэгчид", "Тэжээлийн хангамж, туршилт, санал солилцоо."],
  ["Саалтуур, фермийн тоног төхөөрөмж нийлүүлэгчид", "Бодит фермийн нөхцөлд хэрэглэсэн туршлага, санал хүсэлт."],
  ["Мал эмнэлэг, малын эмч нар", "Малын эрүүл мэндийн үйлчилгээ, мэргэжлийн зөвлөгөө."],
  ["Сүүний аж ахуйн мэргэжилтнүүд", "Туршлага солилцох, хамтарсан сургалт, нийтлэл."],
  ["Бусад фермерүүд", "Туршлага, мэдлэг хуваалцах, хамтдаа суралцах."],
  ["Судалгаа, сургалтын байгууллагууд", "Фермтэй танилцах, практик судалгаа, сургалтын хамтын ажиллагаа."],
];

export default function PartnershipPage() {
  return (
    <>
      <PageHeader
        eyebrow="Хамтран ажиллах"
        title="Сүүний аж ахуйн салбарын хамтын ажиллагаа"
        lead="Бодит ферм, бодит туршлага. Салбарын хөгжилд хувь нэмэр оруулахыг хүссэн байгууллага, хүмүүстэй нээлттэй хамтран ажиллана."
      />
      <Container className="grid gap-14 py-16 lg:grid-cols-[1fr_1.1fr]">
        <section aria-labelledby="h-who">
          <h2 id="h-who" className="text-2xl text-green-900">Хэнтэй хамтран ажиллах вэ?</h2>
          <ul className="mt-6 space-y-4">
            {partners.map(([t, d]) => (
              <li key={t} className="rounded-xl border border-line bg-paper p-5">
                <p className="font-semibold text-green-900">{t}</p>
                <p className="mt-1 text-sm text-muted">{d}</p>
              </li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="h-form" className="h-fit rounded-2xl border border-line bg-paper p-6 sm:p-8">
          <h2 id="h-form" className="text-2xl text-green-900">Хамтран ажиллах хүсэлт илгээх</h2>
          <p className="mb-6 mt-2 text-sm text-muted">Хүсэлтийг Ц. Жаргал өөрөө хянаж, тантай эргэн холбогдоно.</p>
          <InquiryForm kind="partnership" submitLabel="Хүсэлт илгээх" />
        </section>
      </Container>
    </>
  );
}
