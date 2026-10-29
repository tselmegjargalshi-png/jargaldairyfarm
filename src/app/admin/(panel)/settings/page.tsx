import { saveSettings } from "@/app/actions/admin";
import { AdminForm, F } from "@/components/admin/AdminForm";
import { getSettings } from "@/lib/data";
import { uploadsAvailable } from "@/lib/upload";

const slots = [
  ["hero", "Нүүр хуудасны дэвсгэр зураг"],
  ["portrait", "Ц. Жаргалын хөрөг"],
  ["milking", "Саалтуурын зураг"],
  ["manure", "Бууц зайлуулах системийн зураг"],
  ["barn", "Фермийн орчны зураг"],
  ["feeding", "Тэжээл түгээх зураг"],
] as const;

export default async function SettingsAdmin() {
  const s = await getSettings();
  const c = s.contact;
  return (
    <>
      <h1 className="mb-2 text-3xl text-green-900">Сайтын мэдээлэл</h1>
      <p className="mb-8 text-sm text-muted">Нүүр хуудасны текст, холбоо барих мэдээлэл, үндсэн зургууд. Хоосон үлдээсэн холбоо барих талбар сайт дээр харагдахгүй.</p>
      {!uploadsAvailable() && (
        <p className="mb-6 rounded-lg bg-gold-soft px-4 py-3 text-sm">Файл хадгалах сан (BLOB_READ_WRITE_TOKEN) тохируулаагүй тул зураг оруулах боломжгүй.</p>
      )}
      <AdminForm action={saveSettings}>
        <h2 className="text-xl text-green-900">Нүүр хуудас</h2>
        <F label="Гол гарчиг"><input name="heroTitle" required defaultValue={s.heroTitle} className="field" /></F>
        <F label="Дэд гарчиг"><textarea name="heroSubtitle" defaultValue={s.heroSubtitle} className="field" rows={2} /></F>
        <F label="Танилцуулгын гарчиг"><input name="introTitle" defaultValue={s.introTitle} className="field" /></F>
        <F label="Танилцуулгын текст"><textarea name="introText" defaultValue={s.introText} className="field" rows={6} /></F>
        <F label="Ц. Жаргалын ишлэл (заавал биш)" hint="Зөвхөн өөрийнх нь хэлсэн үг. Хоосон бол харагдахгүй."><textarea name="founderQuote" defaultValue={s.founderQuote} className="field" rows={2} /></F>

        <h2 className="pt-4 text-xl text-green-900">Холбоо барих</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <F label="Утас"><input name="phone" defaultValue={c.phone} className="field" /></F>
          <F label="Имэйл"><input name="email" type="email" defaultValue={c.email} className="field" /></F>
          <F label="Facebook холбоос"><input name="facebook" defaultValue={c.facebook} placeholder="https://" className="field" /></F>
          <F label="YouTube холбоос"><input name="youtube" defaultValue={c.youtube} placeholder="https://" className="field" /></F>
          <F label="Instagram холбоос"><input name="instagram" defaultValue={c.instagram} placeholder="https://" className="field" /></F>
          <F label="Газрын зургийн холбоос"><input name="mapUrl" defaultValue={c.mapUrl} placeholder="https://" className="field" /></F>
        </div>
        <F label="Байршил / хаяг"><input name="address" defaultValue={c.address} className="field" /></F>
        <F label="Ажиллах цаг"><input name="hours" defaultValue={c.hours} className="field" /></F>

        <h2 className="pt-4 text-xl text-green-900">Үндсэн зургууд</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {slots.map(([k, label]) => (
            <fieldset key={k} className="rounded-xl border border-line p-4">
              <legend className="px-2 text-sm font-semibold text-green-900">{label}</legend>
              {s.images[k] ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.images[k]} alt="" className="mb-3 h-28 w-full rounded-lg object-cover" />
                  <label className="mb-3 flex items-center gap-2 text-sm"><input type="checkbox" name={`remove_${k}`} /> Устгах</label>
                </>
              ) : (
                <p className="mb-3 text-xs text-muted">Зураг оруулаагүй — сайт дээр тэмдэглэгээтэй байрлал харагдана.</p>
              )}
              <input type="hidden" name={`current_${k}`} value={s.images[k]} />
              <input type="file" name={`file_${k}`} accept="image/jpeg,image/png,image/webp" className="field" />
            </fieldset>
          ))}
        </div>
      </AdminForm>
    </>
  );
}
