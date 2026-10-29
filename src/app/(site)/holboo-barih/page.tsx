import { InquiryForm } from "@/components/InquiryForm";
import { Container, PageHeader, Pending } from "@/components/Section";
import { getSettings } from "@/lib/data";
import { pageMeta, site } from "@/lib/site";

export const metadata = pageMeta(
  "Холбоо барих",
  "Ц. Жаргалын сүүний фермтэй холбогдох: утас, имэйл, байршил болон мессеж илгээх форм.",
  "/holboo-barih",
);

export default async function ContactPage() {
  const { contact } = await getSettings();
  const rows = [
    ["Утас", contact.phone, contact.phone && `tel:${contact.phone.replace(/\s/g, "")}`],
    ["Имэйл", contact.email, contact.email && `mailto:${contact.email}`],
    ["Facebook", contact.facebook && "Facebook хуудас нээх", contact.facebook],
    ["YouTube", contact.youtube && "YouTube суваг нээх", contact.youtube],
    ["Instagram", contact.instagram && "Instagram хуудас нээх", contact.instagram],
    ["Байршил", contact.address, ""],
    ["Ажиллах цаг", contact.hours, ""],
  ] as const;
  const missing = rows.filter((r) => !r[1]).map((r) => r[0]);

  return (
    <>
      <PageHeader eyebrow="Холбоо барих" title="Бидэнтэй холбогдох" lead={`${site.legalName} — ${site.name}`} />
      <Container className="grid gap-14 py-16 lg:grid-cols-2">
        <section aria-labelledby="h-info">
          <h2 id="h-info" className="text-2xl text-green-900">Холбоо барих мэдээлэл</h2>
          <dl className="mt-6 space-y-4">
            {rows.filter((r) => r[1]).map(([label, value, href]) => (
              <div key={label} className="rounded-xl border border-line bg-paper p-5">
                <dt className="text-sm text-muted">{label}</dt>
                <dd className="mt-1 font-semibold text-green-900">
                  {href ? (
                    <a href={href} className="underline underline-offset-4" {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{value}</a>
                  ) : value}
                </dd>
              </div>
            ))}
          </dl>
          {contact.mapUrl && (
            <a href={contact.mapUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline mt-6">Газрын зураг дээр харах</a>
          )}
          {missing.length > 0 && (
            <div className="mt-6">
              <Pending>
                {missing.join(", ")} — эзэн мэдээллээ өгсний дараа нэмнэ. Тэр болтол баруун талын формоор бичиж болно.
              </Pending>
            </div>
          )}
        </section>
        <section aria-labelledby="h-form" className="h-fit rounded-2xl border border-line bg-paper p-6 sm:p-8">
          <h2 id="h-form" className="text-2xl text-green-900">Мессеж илгээх</h2>
          <div className="mt-6"><InquiryForm kind="contact" submitLabel="Мессеж илгээх" /></div>
        </section>
      </Container>
    </>
  );
}
