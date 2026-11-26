import type { Metadata } from "next";
import { AdminApp } from "@/components/admin/AdminApp";

export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };

export default function AdminPage() {
  return (
    <section className="bg-ivory">
      <div className="container-luxe max-w-6xl pt-10 pb-24 md:pt-14">
        <AdminApp />
      </div>
    </section>
  );
}
