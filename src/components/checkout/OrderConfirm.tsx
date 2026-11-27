"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
import { LAST_ORDER_KEY, sendOrderHref, type PlacedOrder } from "@/lib/order";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { PrimaryButton } from "@/components/ui/Button";
import { OrderSummary } from "./OrderSummary";
import { useSettings } from "@/context/SettingsContext";

/** Step 3: the order is ready; the customer sends it to us (WhatsApp, or email until a number is set). */
export function OrderConfirm() {
  const [order, setOrder] = useState<PlacedOrder | null | undefined>(undefined);
  const [sent, setSent] = useState(false);
  const settings = useSettings();

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(LAST_ORDER_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time read from storage
      setOrder(saved ? (JSON.parse(saved) as PlacedOrder) : null);
    } catch {
      setOrder(null);
    }
  }, []);

  if (order === undefined)
    return (
      <div
        className="mt-12 h-64 animate-pulse rounded-figure bg-sage/50"
        aria-hidden
      />
    );

  if (order === null) {
    return (
      <div className="mt-12 rounded-figure border border-forest/10 bg-white p-10 text-center">
        <p className="text-forest/80">
          There is no order to confirm on this device.
        </p>
        <PrimaryButton href="/shop" className="mt-6">
          Go to shop
        </PrimaryButton>
      </div>
    );
  }

  const { channel, href } = sendOrderHref(order, settings);
  const d = order.details;

  return (
    <div className="mt-12 grid items-start gap-8 lg:grid-cols-[1fr_24rem] lg:gap-10">
      <div className="rounded-figure border border-forest/10 bg-white p-6 sm:p-10">
        <p className="eyebrow text-teal-deep">Order {order.number}</p>
        <h2 className="mt-4 font-display text-3xl text-emerald">
          {order.saved ? "Thank you! We've received your order." : sent ? "Thank you! We'll be in touch." : "One last step: send it to us."}
        </h2>
        <p className="mt-4 max-w-lg leading-relaxed text-forest/75">
          {order.saved
            ? `We'll contact you on ${d.phone} to confirm ${order.shipping == null ? "shipping and payment" : order.payment === "cod" ? "delivery" : "your order and share payment details"}, usually within working hours.${channel === "WhatsApp" ? " For a faster reply, you can also send it to us on WhatsApp." : ""}`
            : channel === "WhatsApp"
              ? "Tap the button to send your order on WhatsApp. We reply to confirm stock, shipping and payment, usually within working hours."
              : "Tap the button to email your order to us. We reply to confirm stock, shipping and payment, usually within working hours."}
        </p>
        {!(order.saved && channel === "email") && (
          <a
            href={href}
            target={channel === "WhatsApp" ? "_blank" : undefined}
            rel={channel === "WhatsApp" ? "noopener noreferrer" : undefined}
            onClick={() => setSent(true)}
            className="mt-8 inline-flex h-14 w-full items-center justify-center gap-3 rounded-full bg-teal-deep px-8 font-medium text-ivory transition-colors hover:bg-emerald sm:w-auto"
          >
            {channel === "WhatsApp" ? <WhatsAppIcon className="size-5" /> : <Mail className="size-5" aria-hidden />}
            Send order by {channel}
          </a>
        )}

        <div className="mt-10 grid gap-6 border-t border-forest/10 pt-8 text-sm sm:grid-cols-2">
          <div>
            <h3 className="eyebrow text-forest/70">Deliver to</h3>
            <p className="mt-3 leading-relaxed text-forest">
              {d.firstName} {d.lastName}
              <br />
              {d.address1}
              {d.address2 && (
                <>
                  <br />
                  {d.address2}
                </>
              )}
              <br />
              {d.city}, {d.state} {d.pincode}
            </p>
          </div>
          <div>
            <h3 className="eyebrow text-forest/70">Contact</h3>
            <p className="mt-3 leading-relaxed text-forest">
              {d.phone}
              {d.email && (
                <>
                  <br />
                  {d.email}
                </>
              )}
            </p>
          </div>
        </div>
        {order.saved && (
          <p className="mt-8 text-sm text-forest/70">
            Follow your order anytime on{" "}
            <Link href="/track-order" className="text-teal-deep underline underline-offset-4">
              Track your order
            </Link>{" "}
            with order number {order.number} and your phone number.
          </p>
        )}
        <p className="mt-4 text-sm text-forest/70">
          Something wrong?{" "}
          <Link
            href="/contact"
            className="text-teal-deep underline underline-offset-4"
          >
            Contact us
          </Link>{" "}
          with your order number.
        </p>
      </div>
      <OrderSummary items={order.items} title="Your order" showItems shipping={order.shipping} />
    </div>
  );
}
