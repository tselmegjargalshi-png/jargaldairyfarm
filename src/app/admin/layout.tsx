import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Админ самбар" },
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminRoot({ children }: LayoutProps<"/admin">) {
  return <div className="min-h-screen bg-stone/40">{children}</div>;
}
