import { saveMedia } from "@/app/actions/admin";
import { AdminForm, F } from "@/components/admin/AdminForm";
import { mediaCategories } from "@/lib/site";
import type { MediaItem } from "@/lib/types";

export function MediaForm({ item }: { item?: MediaItem }) {
  const action = saveMedia.bind(null, item?.id ?? null);
  return (
    <AdminForm action={action}>
      <F label="Гарчиг"><input name="title" required defaultValue={item?.title} className="field" /></F>
      <F label="Тайлбар (заавал биш)"><textarea name="description" defaultValue={item?.description} className="field" rows={2} /></F>
      <div className="grid gap-5 sm:grid-cols-3">
        <F label="Ангилал">
          <select name="category" defaultValue={item?.category ?? mediaCategories[0].slug} className="field">
            {mediaCategories.map((c) => <option key={c.slug} value={c.slug}>{c.label}</option>)}
          </select>
        </F>
        <F label="Төрөл">
          <select name="kind" defaultValue={item?.kind ?? "image"} className="field">
            <option value="image">Зураг</option>
            <option value="video">Видео</option>
          </select>
        </F>
        <F label="Дараалал" hint="Бага тоо түрүүлж харагдана"><input name="sortOrder" type="number" min={0} defaultValue={item?.sortOrder ?? 0} className="field" /></F>
      </div>
      <fieldset className="space-y-4 rounded-xl border border-line p-4">
        <legend className="px-2 text-sm font-semibold text-green-900">Файл</legend>
        <F label="Файл оруулах" hint="Зураг: JPG/PNG/WEBP. Видео: MP4/WEBM. Хамгийн ихдээ 4 MB.">
          <input type="file" name="file" accept="image/*,video/mp4,video/webm" className="field" />
        </F>
        <F label="эсвэл холбоос (URL)" hint="Том видеог YouTube-д байршуулаад холбоосыг нь энд буулгана уу.">
          <input name="url" defaultValue={item?.url} placeholder="https://" className="field" />
        </F>
        <F label="Видеоны нүүр зураг (заавал биш)">
          <input type="file" name="posterFile" accept="image/*" className="field" />
        </F>
        <input type="hidden" name="posterUrl" value={item?.posterUrl ?? ""} />
      </fieldset>
      <label className="flex items-start gap-2 text-sm">
        <input type="checkbox" name="isSample" defaultChecked={item?.isSample} className="mt-1" />
        <span><strong>Жишээ материал</strong> — фермийн бодит зураг биш бол заавал тэмдэглэнэ үү. Сайт дээр “Жишээ” гэж харагдана.</span>
      </label>
    </AdminForm>
  );
}
