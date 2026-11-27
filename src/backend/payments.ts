/**
 * Payment methods offered at checkout. Each method is a small "provider" object, so adding
 * Razorpay later means writing one more provider here; the checkout screen does not change.
 *
 * Flow: the order is saved first (src/backend/orders.ts), then the chosen provider's `start`
 * runs. Return null to go straight to the confirmation page, or a URL to send the customer to
 * (e.g. a payment page). A real online payment must be verified on the server (webhook) before
 * the order is marked paid; never trust the browser for that.
 */
import type { StoreSettings } from "@/lib/settings";

export type PaymentMethodId = "prepaid" | "cod";

export type PaymentProvider = {
  id: PaymentMethodId;
  /** Shown at checkout and in the order message */
  label: string;
  /** Runs after the order is saved. */
  start: (order: { number: string; total: number; phone: string; email: string }) => Promise<{ redirectUrl: string } | null>;
};

/** Pay before dispatch: we confirm the order and send UPI / bank details. */
const manualPrepaid: PaymentProvider = {
  id: "prepaid",
  label: "Pay before dispatch (UPI / bank transfer)",
  start: async () => null,
};

/** Cash on delivery, offered when switched on in /admin → Settings. */
const cashOnDelivery: PaymentProvider = {
  id: "cod",
  label: "Cash on delivery",
  start: async () => null,
};

// Later: const razorpay: PaymentProvider = { id: "online", label: "UPI, cards, netbanking", start: … }

const all = [manualPrepaid, cashOnDelivery];

/** Methods to offer at checkout, first one is the default. */
export function paymentProviders(settings: StoreSettings): PaymentProvider[] {
  return all.filter((p) => p.id !== "cod" || settings.cod);
}

export const paymentLabel = (id: PaymentMethodId) => all.find((p) => p.id === id)?.label ?? id;
