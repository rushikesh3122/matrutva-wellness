import type { OrderForEmail } from "@/backend/orders";
import { paymentLabel, type PaymentMethodId } from "@/backend/payments";
import type { StoreSettings } from "@/lib/settings";
import { siteConfig } from "@/lib/site";
import { siteUrl } from "@/lib/seo";
import { formatPrice } from "@/lib/utils";

/** The "order confirmed" email to the customer and the "new order" alert to the shop. */

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function money(o: OrderForEmail, s: StoreSettings) {
  const tbc = s.shippingFee === null && !o.shipping;
  return {
    subtotal: formatPrice(o.subtotal),
    shipping: tbc ? "To be confirmed" : o.shipping ? formatPrice(o.shipping) : "Free",
    total: tbc ? `${formatPrice(o.total)} + shipping` : formatPrice(o.total),
  };
}

const payment = (o: OrderForEmail) => (o.payment ? paymentLabel(o.payment as PaymentMethodId) : "");

const address = (o: OrderForEmail) => [o.address1, o.address2, o.city, o.state, o.pincode].filter(Boolean).join(", ");

function itemsTable(o: OrderForEmail, s: StoreSettings) {
  const m = money(o, s);
  const rows = (o.items ?? [])
    .map(
      (i) =>
        `<tr><td style="padding:8px 0;border-bottom:1px solid #e9ece3">${esc(i.name)} × ${i.quantity}</td><td style="padding:8px 0;border-bottom:1px solid #e9ece3;text-align:right">${formatPrice(i.price * i.quantity)}</td></tr>`,
    )
    .join("");
  const line = (label: string, value: string, bold = false) =>
    `<tr><td style="padding:4px 0;${bold ? "font-weight:700" : "color:#4a5a50"}">${label}</td><td style="padding:4px 0;text-align:right;${bold ? "font-weight:700" : ""}">${esc(value)}</td></tr>`;
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:15px">${rows}${line("Subtotal", m.subtotal)}${line("Shipping", m.shipping)}${line("Total", m.total, true)}</table>`;
}

function itemsText(o: OrderForEmail, s: StoreSettings) {
  const m = money(o, s);
  return [
    ...(o.items ?? []).map((i) => `- ${i.name} × ${i.quantity}: ${formatPrice(i.price * i.quantity)}`),
    `Subtotal: ${m.subtotal}`,
    `Shipping: ${m.shipping}`,
    `Total: ${m.total}`,
  ].join("\n");
}

function layout(title: string, body: string) {
  return `<!doctype html><html><body style="margin:0;background:#f7f5ef;font-family:Arial,Helvetica,sans-serif;color:#0c2419">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden">
<tr><td style="background:#123324;color:#ffffff;padding:20px 24px;font-size:18px;font-weight:700">${esc(siteConfig.name)}</td></tr>
<tr><td style="padding:24px"><h1 style="margin:0 0 16px;font-size:22px;color:#123324">${esc(title)}</h1>${body}</td></tr>
</table></td></tr></table></body></html>`;
}

export function customerEmail(o: OrderForEmail, s: StoreSettings) {
  const trackUrl = `${siteUrl}/track-order`;
  const pay = payment(o);
  const next =
    o.payment === "cod"
      ? "We'll confirm your order shortly and send it out. Please keep the amount ready to pay on delivery."
      : "We'll confirm your order shortly and send the payment details. Your order is dispatched once payment is received.";
  const contact = [s.whatsapp ? `WhatsApp ${s.whatsapp}` : "", s.phone ? `call ${s.phone}` : "", s.email ? `reply to this email` : ""]
    .filter(Boolean)
    .join(", ")
    .replace(/^./, (c) => c.toUpperCase());
  const html = layout(
    `Thank you, ${o.first_name}! Your order is placed.`,
    `<p style="margin:0 0 16px;font-size:15px;line-height:1.5">Order number: <strong>${esc(o.number)}</strong></p>
${itemsTable(o, s)}
${pay ? `<p style="margin:16px 0 0;font-size:15px">Payment: ${esc(pay)}</p>` : ""}
<p style="margin:8px 0 0;font-size:15px;line-height:1.5">Delivering to: ${esc(address(o))}</p>
<p style="margin:16px 0 0;font-size:15px;line-height:1.5">${esc(next)}</p>
<p style="margin:20px 0"><a href="${trackUrl}" style="display:inline-block;background:#1f8a80;color:#ffffff;text-decoration:none;padding:12px 20px;border-radius:999px;font-weight:700">Track your order</a></p>
<p style="margin:0;font-size:13px;color:#4a5a50;line-height:1.5">To track it, use order number ${esc(o.number)} and the phone number you ordered with.${contact ? ` Questions? ${esc(contact)}.` : ""}</p>`,
  );
  const text = [
    `Thank you, ${o.first_name}! Your order is placed.`,
    `Order number: ${o.number}`,
    itemsText(o, s),
    pay ? `Payment: ${pay}` : "",
    `Delivering to: ${address(o)}`,
    next,
    `Track your order: ${trackUrl} (order number + phone number)`,
    contact ? `Questions? ${contact}.` : "",
  ]
    .filter(Boolean)
    .join("\n\n");
  return { subject: `Order ${o.number} placed: ${siteConfig.name}`, html, text };
}

export function shopAlertEmail(o: OrderForEmail, s: StoreSettings) {
  const m = money(o, s);
  const pay = payment(o);
  const details = [
    ["Name", `${o.first_name} ${o.last_name}`],
    ["Phone", o.phone],
    ["Email", o.email ?? ""],
    ["Address", address(o)],
    ["GSTIN", o.gstin ?? ""],
    ["Notes", o.notes ?? ""],
    ["Payment", pay],
  ].filter(([, v]) => v);
  const html = layout(
    `New order ${o.number}: ${m.total}`,
    `${itemsTable(o, s)}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;font-size:15px;border-collapse:collapse">${details
      .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#4a5a50;vertical-align:top;white-space:nowrap">${k}</td><td style="padding:4px 0">${esc(v)}</td></tr>`)
      .join("")}</table>
<p style="margin:20px 0 0"><a href="${siteUrl}/admin" style="display:inline-block;background:#123324;color:#ffffff;text-decoration:none;padding:12px 20px;border-radius:999px;font-weight:700">Open in admin</a></p>`,
  );
  const text = [`New order ${o.number}: ${m.total}`, itemsText(o, s), details.map(([k, v]) => `${k}: ${v}`).join("\n"), `Admin: ${siteUrl}/admin`].join("\n\n");
  return { subject: `New order ${o.number}: ${m.total}`, html, text };
}
