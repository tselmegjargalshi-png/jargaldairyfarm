import Link from "next/link";
import { Container } from "@/components/Section";

export default function NotFound() {
  return (
    <Container className="py-28 text-center">
      <p className="text-sm font-bold uppercase tracking-widest text-gold">404</p>
      <h1 className="mt-3 text-4xl text-green-900">Хуудас олдсонгүй</h1>
      <p className="mx-auto mt-4 max-w-md text-muted">Таны хайсан хуудас байхгүй эсвэл өөр хаяг руу шилжсэн байж магадгүй.</p>
      <Link href="/" className="btn btn-primary mt-8">Нүүр хуудас руу буцах</Link>
    </Container>
  );
}
