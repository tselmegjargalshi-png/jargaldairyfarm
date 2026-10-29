import Link from "next/link";
import { Photo } from "@/components/Photo";
import { Container, PageHeader, Pending } from "@/components/Section";
import { getSettings } from "@/lib/data";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta(
  "Фермийн технологи ба үйл ажиллагаа",
  "Сүүний фермд ашигладаг саалтуурын төхөөрөмж, бууцыг усаар зайлуулах систем, өдөр тутмын ажлын урсгал ба тоног төхөөрөмжийг сайжруулсан туршлага.",
  "/tekhnologi",
);

export default async function TechnologyPage() {
  const s = await getSettings();
  return (
    <>
      <PageHeader
        eyebrow="Технологи ба үйл ажиллагаа"
        title="Ферм дээр ашиглаж буй бодит технологи"
        lead="Тоног төхөөрөмж нь ажлыг хөнгөвчилдөг ч фермийн гол хүч нь хүний хөдөлмөр, ажиглалт хэвээр. Доор бидний өнөөдөр ашиглаж буй зүйлсийг тайлбарлав."
      />

      <Container className="space-y-20 py-16">
        <TechBlock
          id="saaltuur"
          title="Саалтуурын төхөөрөмжөөр үнээ саах"
          src={s.images.milking}
          slot="Саалтуур ажиллаж буй зураг эсвэл богино видео"
        >
          <p>
            Ферм үнээгээ саалтуурын төхөөрөмжөөр саадаг. Энэ нь саалийн ажлыг хөнгөвчилж, өдөр бүр тогтмол хуваарьтай ажиллах боломж олгодог.
          </p>
          <p>
            Гэхдээ саалтуур ашиглана гэдэг нь ферм бүрэн автомат ажиллана гэсэн үг биш. Сааль бүрт үнээг бэлтгэх,
            ажиглах, төхөөрөмжийг цэвэрлэх зэрэг ажлыг хүн гүйцэтгэдэг.
          </p>
          <Pending>төхөөрөмжийн брэнд, хүчин чадал (нэг дор хэдэн үнээ саах) зэргийг эзэн баталгаажуулсны дараа нэмнэ.</Pending>
        </TechBlock>

        <TechBlock
          id="buuts"
          title="Бууцыг усаар шүршиж зайлуулах"
          src={s.images.manure}
          slot="Бууц зайлуулах системийн зураг"
          flip
        >
          <p>
            Малын байрны бууцыг усаар шүршиж зайлуулдаг систем ашигладаг. Энэ нь байрыг цэвэр байлгах өдөр тутмын хүнд ажлыг хөнгөвчилдөг.
          </p>
          <Pending>системийн бүтэц, ашиглалтын нарийн мэдээллийг эзэн баталгаажуулсны дараа нэмнэ.</Pending>
        </TechBlock>

        <section aria-labelledby="h-flow">
          <h2 id="h-flow" className="text-3xl text-green-900">Фермийн өдөр тутмын ажлын урсгал</h2>
          <p className="mt-4 max-w-3xl text-lg text-ink/85">
            Сааль, тэжээллэлт, цэвэрлэгээ, малын ажиглалт — тус бүр тогтмол дарааллаар, тодорхой хариуцлагатай хийгддэг.
            Ажлаа хуваарьтай болгосноор мал тайван, ажилчид ачаалал багатай ажиллах боломж бүрддэг.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <Card title="Малын арчилгаа" text="Саалийн үнээ, сувиа үнээ, тугал болон бусад насны үхрийг бүлэглэн арчилна." />
            <Card title="Тэжээлийн зохион байгуулалт" text="Тэжээл бэлтгэх, түгээх ажлыг тогтмол хуваарьтай хийнэ. Найрлагыг мэргэжлийн зөвлөгөөгөөр тодорхойлно." />
            <Card title="Ажилчдын зохион байгуулалт" text="Ажил бүр хариуцах хүнтэй, ээлжийн хуваарьтай байх нь ажиллагааг тасалдуулдаггүй." />
          </div>
          <div className="mt-6"><Pending>фермийн ажлын цагийн хуваарь, ажилчдын тоог эзэн баталгаажуулсны дараа нэмнэ.</Pending></div>
        </section>

        <section aria-labelledby="h-improve" className="rounded-3xl bg-green-100/70 p-8 sm:p-12">
          <h2 id="h-improve" className="text-3xl text-green-900">Тоног төхөөрөмж, ажиллагааг сайжруулах туршлага</h2>
          <p className="mt-4 max-w-3xl text-lg text-ink/85">
            Ферм бүх тоног төхөөрөмжөө нэг дор шинэчлээгүй, харин хэрэгцээ, боломжийнхоо дагуу үе шаттайгаар сайжруулж ирсэн.
            Энэ арга нь эрсдэл багатай, ажилчид шинэ ажиллагаанд дасах боломж олгодог.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/medlegiin-san/tonog-tuhuurumjiig-ue-shattai-saijruulah" className="btn btn-primary">Нийтлэл унших</Link>
            <Link href="/hamtran-ajillah" className="btn btn-outline">Тоног төхөөрөмж нийлүүлэгчид</Link>
          </div>
        </section>
      </Container>
    </>
  );
}

function TechBlock({
  id, title, src, slot, flip, children,
}: { id: string; title: string; src: string; slot: string; flip?: boolean; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`h-${id}`} className="grid items-center gap-10 lg:grid-cols-2">
      <Photo src={src} alt={title} slot={slot} className={`aspect-[4/3] rounded-2xl ${flip ? "lg:order-2" : ""}`} />
      <div className="space-y-4 text-lg leading-relaxed text-ink/90">
        <h2 id={`h-${id}`} className="text-3xl text-green-900">{title}</h2>
        {children}
      </div>
    </section>
  );
}

function Card({ title, text }: { title: string; text: string }) {
  return (
    <article className="rounded-2xl border border-line bg-paper p-6">
      <h3 className="text-xl text-green-900">{title}</h3>
      <p className="mt-2 text-muted">{text}</p>
    </article>
  );
}
