import Link from "next/link";
import { adminServices } from "@/lib/data";

const label = { interest: "Сонирхол судалж байна", open: "Нээлттэй", paused: "Түр зогссон" } as const;

export default async function ServicesAdmin({ searchParams }: PageProps<"/admin/services">) {
  const [items, sp] = await Promise.all([adminServices(), searchParams]);
  return (
    <>
      <h1 className="text-3xl text-green-900">Сургалт, үйлчилгээ</h1>
      <p className="mt-2 text-sm text-muted">Үнэ, хуваарийг зөвхөн баталгаажуулсны дараа бөглөнө үү.</p>
      {sp.saved && <p role="status" className="mt-4 rounded-lg bg-green-100 px-4 py-3 text-sm text-green-900">Хадгалагдлаа.</p>}
      <ul className="mt-6 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-paper">
        {items.map((s) => (
          <li key={s.id}>
            <Link href={`/admin/services/${s.id}`} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 hover:bg-green-100/50">
              <span className="font-semibold text-green-900">{s.title}</span>
              <span className="rounded-full bg-gold-soft px-3 py-1 text-xs font-semibold">{label[s.status]}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
