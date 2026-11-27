/**
 * Customer-side order calls (browser): place an order and track one.
 * Prices, shipping and stock checks happen in the database, never in the browser.
 * To switch database, re-implement these two functions.
 */
import { rpc } from "./supabase/rest";

export type OrderCustomer = {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  pincode: string;
  gstin: string;
  notes: string;
  payment: string;
};

export type PlacedResult = { number: string; total: number; shipping: number };

/** Saves the order. Returns the result, { error } for a message to show, or null if the database is unreachable. */
export async function placeOrder(customer: OrderCustomer, items: { slug: string; quantity: number }[]): Promise<PlacedResult | { error: string } | null> {
  const res = await rpc<{ number: string; total: number; shipping?: number }>("place_order", { customer, items });
  if (res.data?.number) return { number: res.data.number, total: res.data.total ?? 0, shipping: res.data.shipping ?? 0 };
  // A message raised by place_order (e.g. "Only 3 left of …") is shown to the customer.
  if (res.status === 400 && res.message) return { error: res.message };
  return null;
}

export type TrackedOrder = {
  number: string;
  status: "new" | "confirmed" | "packed" | "shipped" | "delivered" | "cancelled";
  tracking: string | null;
  created_at: string;
  subtotal: number;
  shipping: number | null;
  total: number;
  payment: string | null;
  city: string;
  items: { name: string; quantity: number; price: number }[] | null;
};

/** One order by number + phone. "unavailable" when tracking can't be reached. */
export async function trackOrder(orderNumber: string, phone: string): Promise<TrackedOrder | null | "unavailable"> {
  const res = await rpc<TrackedOrder | null>("track_order", { order_number: orderNumber, phone });
  if (res.status === 0 || res.status >= 400) return "unavailable";
  return res.data;
}
