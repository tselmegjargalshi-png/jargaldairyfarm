import { notFound } from "next/navigation";
import { saveService } from "@/app/actions/admin";
import { AdminForm, F } from "@/components/admin/AdminForm";
import { adminService } from "@/lib/data";

export default async function EditService({ params }: PageProps<"/admin/services/[id]">) {
  const { id } = await params;
  const n = Number(id);
  const s = Number.isInteger(n) ? await adminService(n) : null;
  if (!s) notFound();
  return (
    <>
      <h1 className="mb-6 text-3xl text-green-900">Үйлчилгээ засах</h1>
      <AdminForm action={saveService.bind(null, n)}>
        <F label="Гарчиг"><input name="title" required defaultValue={s.title} className="field" /></F>
        <F label="Товч тайлбар"><textarea name="summary" defaultValue={s.summary} className="field" rows={3} /></F>
        <F label="Дэлгэрэнгүй (заавал биш)"><textarea name="details" defaultValue={s.details} className="field" rows={5} /></F>
        <div className="grid gap-5 sm:grid-cols-3">
          <F label="Төлөв">
            <select name="status" defaultValue={s.status} className="field">
              <option value="interest">Сонирхол судалж байна</option>
              <option value="open">Бүртгэл нээлттэй</option>
              <option value="paused">Түр зогссон</option>
            </select>
          </F>
          <F label="Үнэ (баталгаажсан бол)"><input name="priceNote" defaultValue={s.priceNote} className="field" /></F>
          <F label="Хуваарь (баталгаажсан бол)"><input name="scheduleNote" defaultValue={s.scheduleNote} className="field" /></F>
        </div>
        <F label="Дараалал"><input name="sortOrder" type="number" min={0} defaultValue={s.sortOrder} className="field max-w-32" /></F>
      </AdminForm>
    </>
  );
}
