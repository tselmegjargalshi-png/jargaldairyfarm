import { notFound } from "next/navigation";
import { deleteMedia } from "@/app/actions/admin";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { MediaForm } from "@/components/admin/MediaForm";
import { adminMediaItem } from "@/lib/data";

export default async function EditMedia({ params }: PageProps<"/admin/media/[id]">) {
  const { id } = await params;
  const n = Number(id);
  const item = Number.isInteger(n) ? await adminMediaItem(n) : null;
  if (!item) notFound();
  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl text-green-900">Засах</h1>
        <DeleteButton action={deleteMedia.bind(null, n)} />
      </div>
      <MediaForm item={item} />
    </>
  );
}
