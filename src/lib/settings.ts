/**
 * Store settings edited in /admin → Settings (Supabase `settings` table).
 * The defaults below are used until the database is set up, or if it can't be reached.
 */
export type StoreSettings = {
  /** WhatsApp number for orders, digits with country code (e.g. "919876543210"). Empty = no WhatsApp. */
  whatsapp: string;
  phone: string;
  email: string;
  hours: string;
  address: string;
  instagram: string;
  facebook: string;
  youtube: string;
  /** Messages in the strip above the header. Empty = no strip. */
  announcements: string[];
  /** Shipping charge in ₹. null = not priced on the site, confirmed with the customer. */
  shippingFee: number | null;
  /** Free shipping when the subtotal reaches this amount (₹). null = never free. */
  freeShippingAbove: number | null;
  /** Offer cash on delivery at checkout. */
  cod: boolean;
  /** FSSAI licence number, shown in the footer once set. */
  fssai: string;
};

export const defaultSettings: StoreSettings = {
  whatsapp: "",
  phone: "",
  email: "care@matrutvawellness.com",
  hours: "Mon–Sat, 10 AM – 6 PM IST",
  address: "",
  instagram: "",
  facebook: "",
  youtube: "",
  announcements: [],
  shippingFee: null,
  freeShippingAbove: null,
  cod: false,
  fssai: "",
};

/** Database row → settings, falling back to the defaults for anything missing. */
export function settingsFromRow(row: Record<string, unknown> | null | undefined): StoreSettings {
  if (!row) return defaultSettings;
  const str = (k: string, fallback: string) => (typeof row[k] === "string" ? (row[k] as string).trim() : fallback);
  const num = (k: string) => (typeof row[k] === "number" ? (row[k] as number) : null);
  return {
    whatsapp: str("whatsapp", "").replace(/\D/g, ""),
    phone: str("phone", ""),
    email: str("email", "") || defaultSettings.email,
    hours: str("hours", defaultSettings.hours),
    address: str("address", ""),
    instagram: str("instagram", ""),
    facebook: str("facebook", ""),
    youtube: str("youtube", ""),
    announcements: Array.isArray(row.announcements) ? (row.announcements as unknown[]).filter((m): m is string => typeof m === "string" && m.trim() !== "") : [],
    shippingFee: num("shipping_fee"),
    freeShippingAbove: num("free_shipping_above"),
    cod: row.cod_enabled === true,
    fssai: str("fssai", ""),
  };
}

/** WhatsApp chat link with a prefilled message, or null when no number is set. */
export function whatsappHref(s: StoreSettings, message = "Hi Matrutva Wellness, I'd like to place an order."): string | null {
  return s.whatsapp ? `https://wa.me/${s.whatsapp}?text=${encodeURIComponent(message)}` : null;
}

/** Shipping for a subtotal: ₹ amount, 0 for free, or null when it is confirmed with the customer. */
export function shippingFor(s: StoreSettings, subtotal: number): number | null {
  if (s.shippingFee === null) return null;
  if (s.freeShippingAbove !== null && subtotal >= s.freeShippingAbove) return 0;
  return s.shippingFee;
}
