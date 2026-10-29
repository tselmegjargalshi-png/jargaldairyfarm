import { saveArticle } from "@/app/actions/admin";
import { AdminForm, F } from "@/components/admin/AdminForm";
import { articleCategories } from "@/lib/site";
import type { Article } from "@/lib/types";

export function ArticleForm({ article }: { article?: Article }) {
  const action = saveArticle.bind(null, article?.id ?? null);
  return (
    <AdminForm action={action} submitLabel={article ? "Хадгалах" : "Үүсгэх"}>
      <F label="Гарчиг"><input name="title" required defaultValue={article?.title} className="field" /></F>
      <div className="grid gap-5 sm:grid-cols-2">
        <F label="Хаяг (slug)" hint="Латин жижиг үсэг, тоо, зураас. Жишээ: saaliin-uneenii-archilgaa">
          <input name="slug" required defaultValue={article?.slug} pattern="[a-z0-9]+(-[a-z0-9]+)*" className="field" />
        </F>
        <F label="Ангилал">
          <select name="category" defaultValue={article?.category ?? articleCategories[0]} className="field">
            {articleCategories.map((c) => <option key={c}>{c}</option>)}
          </select>
        </F>
      </div>
      <F label="Товч тайлбар" hint="Жагсаалт болон хайлтын үр дүнд харагдана"><textarea name="excerpt" defaultValue={article?.excerpt} className="field" rows={3} /></F>
      <F label="Агуулга" hint="## Гарчиг, - жагсаалт, **тод бичвэр**, хоосон мөрөөр догол мөр салгана">
        <textarea name="body" required defaultValue={article?.body} className="field font-mono !text-sm" rows={22} />
      </F>
      <F label="Нүүр зураг (заавал биш)" hint="JPG, PNG, WEBP · 4 MB хүртэл">
        <input type="file" name="coverFile" accept="image/jpeg,image/png,image/webp,image/gif" className="field" />
      </F>
      {article?.coverUrl && (
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="removeCover" /> Одоогийн нүүр зургийг устгах ({article.coverUrl})</label>
      )}
      <div className="grid gap-5 sm:grid-cols-2">
        <F label="SEO гарчиг (заавал биш)" hint="70 тэмдэгт хүртэл"><input name="seoTitle" defaultValue={article?.seoTitle} className="field" maxLength={70} /></F>
        <F label="SEO тайлбар (заавал биш)" hint="170 тэмдэгт хүртэл"><input name="seoDescription" defaultValue={article?.seoDescription} className="field" maxLength={170} /></F>
      </div>
      <F label="Төлөв">
        <select name="status" defaultValue={article?.status ?? "draft"} className="field">
          <option value="draft">Ноорог (сайт дээр харагдахгүй)</option>
          <option value="published">Нийтлэх</option>
        </select>
      </F>
    </AdminForm>
  );
}
