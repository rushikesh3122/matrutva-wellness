/**
 * Sending email (server only). Today: Resend (resend.com), called over its REST API.
 * Keys live in .env.local, never in the browser:
 *   RESEND_API_KEY     required; without it no email is sent and nothing breaks
 *   EMAIL_FROM         optional, default "Matrutva Wellness <orders@matrutvawellness.com>"
 *   ORDER_ALERT_EMAIL  optional, where "new order" alerts go (default: the email in /admin → Settings)
 * To switch provider (e.g. Amazon SES, Zoho ZeptoMail), rewrite sendEmail() only.
 */
export type Email = { to: string; subject: string; html: string; text: string; replyTo?: string };

export const emailConfigured = () => Boolean(process.env.RESEND_API_KEY);

export const emailFrom = () => process.env.EMAIL_FROM || "Matrutva Wellness <orders@matrutvawellness.com>";

/** Sends one email. Returns false (and logs) if it couldn't be sent. */
export async function sendEmail(email: Email): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key || !email.to) return false;
  try {
    const res = await fetch(`${process.env.RESEND_API_URL || "https://api.resend.com"}/emails`, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: emailFrom(),
        to: [email.to],
        subject: email.subject,
        html: email.html,
        text: email.text,
        ...(email.replyTo ? { reply_to: email.replyTo } : {}),
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) console.error("[email] send failed", res.status, await res.text().catch(() => ""));
    return res.ok;
  } catch (err) {
    console.error("[email] send failed", err);
    return false;
  }
}
