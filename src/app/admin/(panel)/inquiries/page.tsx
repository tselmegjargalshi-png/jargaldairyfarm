import { deleteInquiry, setInquiryStatus } from "@/app/actions/admin";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { adminInquiries } from "@/lib/data";

const kindLabel = { partnership: "Хамтын ажиллагаа", interest: "Сонирхол", contact: "Мессеж", meeting: "Уулзалт товлох", training: "Сургалтад бүртгүүлэх" } as const;

export default async function InquiriesAdmin() {
  const items = await adminInquiries();
  return (
    <>
      <h1 className="text-3xl text-green-900">Ирсэн хүсэлтүүд</h1>
      <ul className="mt-6 space-y-4">
        {items.map((i) => (
          <li key={i.id} className={`rounded-2xl border bg-paper p-5 ${i.status === "new" ? "border-gold" : "border-line"}`}>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded-full bg-green-100 px-3 py-1 font-semibold text-green-900">{kindLabel[i.kind]}</span>
              {i.status === "new" && <span className="rounded-full bg-gold px-3 py-1 font-semibold text-white">Шинэ</span>}
              {i.status === "archived" && <span className="rounded-full bg-stone px-3 py-1 font-semibold">Архив</span>}
              <time className="text-muted" dateTime={i.createdAt}>{new Date(i.createdAt).toLocaleString("mn-MN", { timeZone: "Asia/Ulaanbaatar" })}</time>
            </div>
            <p className="mt-3 font-semibold text-green-900">{i.contactName}{i.orgName && ` — ${i.orgName}`}</p>
            <p className="text-sm text-muted">
              {i.phone && <a href={`tel:${i.phone}`} className="underline">{i.phone}</a>}
              {i.phone && i.email && " · "}
              {i.email && <a href={`mailto:${i.email}`} className="underline">{i.email}</a>}
            </p>
            {i.topic && <p className="mt-2 text-sm"><span className="text-muted">Төрөл: </span>{i.topic}</p>}
            {i.preferredTime && <p className="mt-1 text-sm"><span className="text-muted">Хүссэн цаг: </span><strong>{i.preferredTime}</strong></p>}
            {i.message && <p className="mt-2 whitespace-pre-wrap">{i.message}</p>}
            <div className="mt-4 flex flex-wrap gap-2">
              {i.status !== "read" && <form action={setInquiryStatus.bind(null, i.id, "read")}><button className="btn btn-outline !min-h-9 !px-4 !py-1 text-sm">Уншсан</button></form>}
              {i.status !== "archived" && <form action={setInquiryStatus.bind(null, i.id, "archived")}><button className="btn btn-outline !min-h-9 !px-4 !py-1 text-sm">Архивлах</button></form>}
              <DeleteButton action={deleteInquiry.bind(null, i.id)} />
            </div>
          </li>
        ))}
        {!items.length && <li className="rounded-2xl border border-line bg-paper p-6 text-muted">Хүсэлт ирээгүй байна.</li>}
      </ul>
    </>
  );
}
