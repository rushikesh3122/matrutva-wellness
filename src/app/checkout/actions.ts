"use server";

import { claimOrderForEmail } from "@/backend/orders";
import { emailConfigured, sendEmail } from "@/backend/email";
import { getSettings } from "@/lib/live-settings";
import { customerEmail, shopAlertEmail } from "@/lib/order-emails";

/**
 * Called by checkout after an order is saved. Sends the customer's "order placed" email and the
 * shop's "new order" alert. Does nothing until RESEND_API_KEY is set in .env.local.
 * The order details come from the database (once per order), not from the browser.
 */
export async function sendOrderEmails(orderNumber: string, phone: string): Promise<void> {
  if (!emailConfigured() || typeof orderNumber !== "string" || typeof phone !== "string") return;
  const order = await claimOrderForEmail(orderNumber.slice(0, 40), phone.slice(0, 20));
  if (!order) return;
  const settings = await getSettings();
  const alertTo = process.env.ORDER_ALERT_EMAIL || settings.email;
  const sends: Promise<boolean>[] = [];
  if (order.email) sends.push(sendEmail({ to: order.email, replyTo: settings.email || undefined, ...customerEmail(order, settings) }));
  if (alertTo) sends.push(sendEmail({ to: alertTo, replyTo: order.email || undefined, ...shopAlertEmail(order, settings) }));
  await Promise.all(sends);
}
