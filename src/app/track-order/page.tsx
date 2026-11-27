import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/PageIntro";
import { TrackOrderForm } from "@/components/checkout/TrackOrderForm";

export const metadata: Metadata = {
  title: "Track Your Order",
  description: "See the status of your Matrutva Wellness order with your order number and phone number.",
  alternates: { canonical: "/track-order" },
};

export default function TrackOrderPage() {
  return (
    <>
      <PageIntro eyebrow="Customer Care" title="Where is" accent="my order?" description="Enter the order number from your confirmation and the phone number you ordered with." />
      <section aria-label="Track your order" className="border-t border-forest/10 bg-ivory">
        <div className="container-luxe max-w-3xl py-16 md:py-24">
          <TrackOrderForm />
        </div>
      </section>
    </>
  );
}
