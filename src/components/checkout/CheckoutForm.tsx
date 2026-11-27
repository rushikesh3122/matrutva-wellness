"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice, cn } from "@/lib/utils";
import { indianStates, LAST_ORDER_KEY, newOrderNumber, saveOrder, type CheckoutDetails, type PaymentMethod, type PlacedOrder } from "@/lib/order";
import { paymentProviders } from "@/backend/payments";
import { shippingFor } from "@/lib/settings";
import { useSettings } from "@/context/SettingsContext";
import { OrderSummary } from "./OrderSummary";
import { sendOrderEmails } from "@/app/checkout/actions";

const DETAILS_KEY = "matrutva-checkout-details";

const empty: CheckoutDetails = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  address1: "",
  address2: "",
  city: "",
  pincode: "",
  state: "Maharashtra",
  gstin: "",
  notes: "",
};

type Errors = Partial<Record<keyof CheckoutDetails | "terms", string>>;

function validate(d: CheckoutDetails, terms: boolean): Errors {
  const e: Errors = {};
  if (!d.firstName.trim()) e.firstName = "Enter your first name.";
  if (!d.lastName.trim()) e.lastName = "Enter your last name.";
  if (!/^[6-9]\d{9}$/.test(d.phone.replace(/\D/g, "").replace(/^91(?=\d{10}$)/, ""))) e.phone = "Enter a 10-digit mobile number.";
  if (d.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) e.email = "Enter a valid email address.";
  if (!d.address1.trim()) e.address1 = "Enter your house number and street.";
  if (!d.city.trim()) e.city = "Enter your city.";
  if (!/^[1-9]\d{5}$/.test(d.pincode)) e.pincode = "Enter a 6-digit PIN code.";
  if (!d.state) e.state = "Choose your state.";
  if (d.gstin && !/^\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/.test(d.gstin.toUpperCase())) e.gstin = "Check the 15-character GSTIN.";
  if (!terms) e.terms = "Please accept the terms to continue.";
  return e;
}

const input =
  "mt-1.5 block h-12 w-full rounded-xl border border-forest/20 bg-white px-4 text-forest placeholder:text-forest/50 focus:border-teal-deep focus:ring-2 focus:ring-teal-deep/20 focus:outline-none aria-invalid:border-terracotta-deep";

function Field({
  id,
  label,
  error,
  optional,
  className,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm font-medium text-forest">
        {label} {optional ? <span className="font-normal text-forest/65">(optional)</span> : <span className="text-terracotta-deep" aria-hidden>*</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-terracotta-deep">
          {error}
        </p>
      )}
    </div>
  );
}

/** Step 2 of checkout: contact and delivery details, then "Place order". */
export function CheckoutForm() {
  const router = useRouter();
  const { items, ready, subtotal, clear } = useCart();
  const settings = useSettings();
  const ship = shippingFor(settings, subtotal);
  const providers = paymentProviders(settings);
  const [payment, setPayment] = useState<PaymentMethod>(providers[0].id);
  const provider = providers.find((p) => p.id === payment) ?? providers[0];
  const pay: PaymentMethod = provider.id;
  const [d, setD] = useState<CheckoutDetails>(empty);
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  // Remember details on this device so a returning customer doesn't retype them.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(DETAILS_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from storage
      if (saved) setD({ ...empty, ...(JSON.parse(saved) as Partial<CheckoutDetails>) });
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (ready && items.length === 0 && !submitting) router.replace("/cart");
  }, [ready, items.length, submitting, router]);

  const set = (key: keyof CheckoutDetails) => (ev: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = key === "pincode" ? ev.target.value.replace(/\D/g, "").slice(0, 6) : ev.target.value;
    setD((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const a11y = (key: keyof CheckoutDetails) => ({
    id: key,
    name: key,
    value: d[key],
    onChange: set(key),
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `${key}-error` : undefined,
    className: input,
  });

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    const found = validate(d, terms);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      document.getElementById(first)?.focus();
      return;
    }
    setSubmitting(true);
    setServerError("");
    const details = { ...d, gstin: d.gstin.toUpperCase(), phone: d.phone.replace(/\D/g, "").replace(/^91(?=\d{10}$)/, "") };
    const saved = await saveOrder(items, details, pay);
    if (saved && "error" in saved) {
      setServerError(saved.error);
      setSubmitting(false);
      return;
    }
    const order: PlacedOrder = {
      number: saved?.number ?? newOrderNumber(),
      createdAt: new Date().toISOString(),
      items,
      details,
      saved: Boolean(saved),
      total: saved ? saved.total : subtotal + (ship ?? 0),
      shipping: saved ? (ship === null ? null : saved.shipping) : ship,
      payment: pay,
    };
    try {
      window.localStorage.setItem(DETAILS_KEY, JSON.stringify({ ...details, notes: "" }));
      window.localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(order));
    } catch {
      /* storage full or blocked */
    }
    // Confirmation email + shop alert, sent on the server. Checkout doesn't wait if it's slow.
    if (saved) sendOrderEmails(order.number, details.phone).catch(() => {});
    const next = saved ? await provider.start({ number: order.number, total: order.total ?? 0, phone: details.phone, email: details.email }) : null;
    if (next) window.location.assign(next.redirectUrl);
    else router.push("/checkout/confirm");
    clear();
  }

  if (!ready || items.length === 0) return <div className="mt-12 h-96 animate-pulse rounded-figure bg-sage/50" aria-hidden />;

  return (
    <form noValidate onSubmit={onSubmit} className="mt-12 grid items-start gap-8 lg:grid-cols-[1fr_24rem] lg:gap-10">
      <div className="rounded-figure border border-forest/10 bg-white p-6 sm:p-8">
        <h2 className="font-display text-2xl text-emerald">Contact &amp; delivery</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <Field id="firstName" label="First name" error={errors.firstName}>
            <input {...a11y("firstName")} autoComplete="given-name" />
          </Field>
          <Field id="lastName" label="Last name" error={errors.lastName}>
            <input {...a11y("lastName")} autoComplete="family-name" />
          </Field>
          <Field id="phone" label="Mobile number" error={errors.phone}>
            <input {...a11y("phone")} type="tel" inputMode="tel" autoComplete="tel" placeholder="98765 43210" />
          </Field>
          <Field id="email" label="Email" optional error={errors.email}>
            <input {...a11y("email")} type="email" autoComplete="email" />
          </Field>
          <Field id="address1" label="Street address" error={errors.address1} className="sm:col-span-2">
            <input {...a11y("address1")} autoComplete="address-line1" placeholder="House number and street name" />
          </Field>
          <div className="sm:col-span-2">
            <label htmlFor="address2" className="sr-only">
              Apartment, landmark (optional)
            </label>
            <input {...a11y("address2")} autoComplete="address-line2" placeholder="Apartment, area, landmark (optional)" className={cn(input, "mt-0")} />
          </div>
          <Field id="city" label="City" error={errors.city}>
            <input {...a11y("city")} autoComplete="address-level2" />
          </Field>
          <Field id="pincode" label="PIN code" error={errors.pincode}>
            <input {...a11y("pincode")} inputMode="numeric" autoComplete="postal-code" />
          </Field>
          <Field id="state" label="State" error={errors.state}>
            <select {...a11y("state")} autoComplete="address-level1">
              {indianStates.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </Field>
          <Field id="country" label="Country">
            <input id="country" value="India" readOnly className={cn(input, "bg-sage/40")} />
          </Field>
          <Field id="gstin" label="GSTIN, for a GST invoice" optional error={errors.gstin}>
            <input {...a11y("gstin")} autoCapitalize="characters" maxLength={15} />
          </Field>
          <Field id="notes" label="Order notes" optional className="sm:col-span-2">
            <textarea {...a11y("notes")} rows={3} className={cn(input, "h-auto py-3")} placeholder="Delivery instructions, preferred time to call, etc." />
          </Field>
        </div>
        {providers.length > 1 && (
          <fieldset className="mt-8">
            <legend className="font-display text-xl text-emerald">Payment</legend>
            <div className="mt-4 grid gap-3">
              {providers.map(({ id: m, label }) => (
                <label
                  key={m}
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3.5 text-sm transition-colors",
                    payment === m ? "border-teal-deep bg-teal/5" : "border-forest/20 hover:border-forest/40",
                  )}
                >
                  <input type="radio" name="payment" value={m} checked={payment === m} onChange={() => setPayment(m)} className="size-5 accent-teal-deep" />
                  {label}
                </label>
              ))}
            </div>
          </fieldset>
        )}
      </div>

      <OrderSummary items={items} title="Your order" showItems editLink className="lg:sticky lg:top-28">
        <p className="mt-2 text-xs leading-relaxed text-forest/70">
          We use your details only to process and deliver this order. See our{" "}
          <Link href="/privacy-policy" className="text-teal-deep underline underline-offset-2">
            privacy policy
          </Link>
          .
        </p>
        <div className="mt-4">
          <label className="flex items-start gap-3 text-sm text-forest">
            <input
              id="terms"
              type="checkbox"
              checked={terms}
              onChange={(e) => {
                setTerms(e.target.checked);
                if (errors.terms) setErrors((p) => ({ ...p, terms: undefined }));
              }}
              aria-invalid={errors.terms ? true : undefined}
              aria-describedby={errors.terms ? "terms-error" : undefined}
              className="mt-0.5 size-5 shrink-0 accent-teal-deep"
            />
            <span>
              I have read and agree to the{" "}
              <Link href="/terms" className="text-teal-deep underline underline-offset-2">
                terms and conditions
              </Link>
              <span className="text-terracotta-deep" aria-hidden>
                {" "}
                *
              </span>
            </span>
          </label>
          {errors.terms && (
            <p id="terms-error" className="mt-1.5 text-sm text-terracotta-deep">
              {errors.terms}
            </p>
          )}
        </div>
        {serverError && (
          <p role="alert" className="mt-4 rounded-xl bg-terracotta/10 px-4 py-3 text-sm text-terracotta-deep">
            {serverError}
          </p>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="mt-5 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-teal-deep px-6 font-medium text-ivory transition-colors hover:bg-emerald disabled:opacity-60"
        >
          {submitting ? "Placing order…" : <>Place order · {formatPrice(subtotal + (ship ?? 0))}</>}
          <ArrowRight className="size-4" aria-hidden />
        </button>
        <p className="mt-3 text-center text-xs text-forest/70">
          {ship === null ? "We confirm shipping and payment with you." : pay === "cod" ? "Pay in cash when your order arrives." : "We confirm your order and send payment details."}
        </p>
      </OrderSummary>
    </form>
  );
}
