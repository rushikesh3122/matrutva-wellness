import type { CartItem } from "@/context/CartContext";
import { siteConfig } from "@/lib/site";
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
};

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
    [`Order: ${order.number}`, ...items, `Subtotal: ${formatPrice(subtotal)} (shipping to be confirmed)`].join("\n"),
    customer.join("\n"),
  ].join("\n\n");
}

/** Where to send the order: WhatsApp once a number is set, otherwise email. */
export function sendOrderHref(order: PlacedOrder) {
  const text = orderMessage(order);
  const n = siteConfig.whatsappNumber as string;
  if (n) return { channel: "WhatsApp" as const, href: `https://wa.me/${n}?text=${encodeURIComponent(text)}` };
  return {
    channel: "email" as const,
    href: `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(`New order ${order.number}`)}&body=${encodeURIComponent(text)}`,
  };
}

export const indianStates = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir",
  "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
  "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
];
