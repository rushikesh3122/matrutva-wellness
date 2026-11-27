import type { CartItem } from "@/context/CartContext";
import { siteConfig } from "@/lib/site";
import { whatsappHref, type StoreSettings } from "@/lib/settings";
import { formatPrice } from "@/lib/utils";

export type CheckoutDetails = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address1: string;
  address2: string;
  city: string;
  pincode: string;
  state: string;
  gstin: string;
  notes: string;
};

export type PlacedOrder = {
  number: string;
  createdAt: string;
  items: CartItem[];
  details: CheckoutDetails;
  /** true once the order is saved in the admin dashboard */
  saved?: boolean;
  /** total confirmed by the server (prices from the database), shipping included */
  total?: number;
  /** shipping in ₹ (0 = free); null/undefined = confirmed with the customer */
  shipping?: number | null;
  /** how the customer will pay */
  payment?: PaymentMethod;
};

export type PaymentMethod = "prepaid" | "cod";
export const paymentLabel: Record<PaymentMethod, string> = {
  prepaid: "Pay before dispatch (UPI / bank transfer)",
  cod: "Cash on delivery",
};

/**
 * Saves the order through the database function `place_order` (prices are taken from the
 * database, never from the browser). Returns null if the database isn't set up or can't be
 * reached, so checkout still works by WhatsApp / email.
 */
export async function saveOrder(
  items: CartItem[],
  d: CheckoutDetails,
  payment: PaymentMethod = "prepaid",
): Promise<{ number: string; total: number; shipping: number } | { error: string } | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return null;
  try {
    const res = await fetch(`${url}/rest/v1/rpc/place_order`, {
      method: "POST",
      headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        customer: {
          first_name: d.firstName,
          last_name: d.lastName,
          phone: d.phone,
          email: d.email,
          address1: d.address1,
          address2: d.address2,
          city: d.city,
          state: d.state,
          pincode: d.pincode,
          gstin: d.gstin,
          notes: d.notes,
          payment,
        },
        items: items.map((i) => ({ slug: i.slug, quantity: i.quantity })),
      }),
      signal: AbortSignal.timeout(10000),
    });
    const body = (await res.json().catch(() => null)) as { number?: string; total?: number; shipping?: number; message?: string } | null;
    if (res.ok && body?.number) return { number: body.number, total: body.total ?? 0, shipping: body.shipping ?? 0 };
    // A message raised by place_order (e.g. "Only 3 left of …") is shown to the customer.
    if (res.status === 400 && body?.message) return { error: body.message };
    return null;
  } catch {
    return null;
  }
}

export const LAST_ORDER_KEY = "matrutva-last-order";

/** Order number like MW-261126-4821 (date + 4 random digits). */
export function newOrderNumber(date = new Date()) {
  const ymd = `${String(date.getFullYear()).slice(2)}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
  const rand = String(Math.floor(1000 + Math.random() * 9000));
  return `MW-${ymd}-${rand}`;
}

/** Plain-text order, used for the WhatsApp and email messages. */
export function orderMessage(order: PlacedOrder) {
  const d = order.details;
  const subtotal = order.items.reduce((n, i) => n + (i.price ?? 0) * i.quantity, 0);
  const items = order.items.map((i) => `• ${i.name} × ${i.quantity}${i.price ? ` — ${formatPrice(i.price * i.quantity)}` : ""}`);
  const customer = [
    `Name: ${d.firstName} ${d.lastName}`,
    `Phone: ${d.phone}`,
    d.email ? `Email: ${d.email}` : "",
    `Address: ${[d.address1, d.address2, d.city, d.state, d.pincode, "India"].filter(Boolean).join(", ")}`,
    d.gstin ? `GSTIN: ${d.gstin}` : "",
    d.notes ? `Notes: ${d.notes}` : "",
  ].filter(Boolean);
  return [
    `Hi ${siteConfig.name}, I'd like to place this order.`,
    [
      `Order: ${order.number}`,
      ...items,
      order.shipping == null
        ? `Subtotal: ${formatPrice(subtotal)} (shipping to be confirmed)`
        : `Subtotal: ${formatPrice(subtotal)}\nShipping: ${order.shipping === 0 ? "Free" : formatPrice(order.shipping)}\nTotal: ${formatPrice(order.total ?? subtotal + order.shipping)}`,
      order.payment ? `Payment: ${paymentLabel[order.payment]}` : "",
    ]
      .filter(Boolean)
      .join("\n"),
    customer.join("\n"),
  ].join("\n\n");
}

/** Where to send the order: WhatsApp once a number is set, otherwise email. */
export function sendOrderHref(order: PlacedOrder, s: StoreSettings) {
  const text = orderMessage(order);
  const wa = whatsappHref(s, text);
  if (wa) return { channel: "WhatsApp" as const, href: wa };
  return {
    channel: "email" as const,
    href: `mailto:${s.email}?subject=${encodeURIComponent(`New order ${order.number}`)}&body=${encodeURIComponent(text)}`,
  };
}

export const indianStates = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir",
  "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
  "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
];
