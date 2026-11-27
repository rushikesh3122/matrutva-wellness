# How the site is put together (and how to change parts later)

The website never talks to the database, payment or courier companies directly.
Every outside service is reached through **one folder: `src/backend/`**.
To switch a service, you rewrite the file for it. The pages and the admin screens stay the same.

```
src/backend/
  catalog.ts       Website reads: products, store settings, approved reviews (server side)
  orders.ts        Checkout and tracking: placeOrder(), trackOrder() (browser side)
  admin.ts         Everything /admin reads and writes: sign-in, orders, products, stock,
                   photos, settings, reviews
  server-auth.ts   Server check that a signed-in user is an admin
  payments.ts      Payment methods at checkout (today: pay before dispatch, cash on delivery)
  shipping.ts      Courier bookings (today: manual tracking numbers)
  email.ts         Sending email (today: Resend), server only
  supabase/        The only code that knows about Supabase
    client.ts      Supabase browser client (admin sign-in, storage)
    rest.ts        Light REST helpers for public reads and database functions
supabase/*.sql     Database tables, security rules and functions (run in order)
```

Business rules that must not be bypassed (prices, shipping charge, stock checks, who is an
admin) live **in the database** (`place_order`, `track_order`, `is_admin`, row-level security),
not in the browser.

## Common future changes

### Move to a Supabase project in another region (e.g. Mumbai)
1. Create the new project and run `supabase/schema.sql`, then `02`–`07` in order.
2. Create your admin user and run the `admins` insert (end of `schema.sql`).
3. Put the new URL and publishable key in `.env`. No code changes.

### Move off Supabase (e.g. AWS RDS / your own Postgres + an API)
The SQL files are plain Postgres. Re-implement `catalog.ts`, `orders.ts`, `admin.ts` and
`server-auth.ts` against the new API, and replace `supabase/`. Function names and return
shapes stay the same, so pages and admin screens don't change.

### Add Razorpay (online payment)
1. Add a `razorpay` provider in `payments.ts`. Its `start()` opens Razorpay checkout for the
   saved order number and total.
2. Add a server route (`src/app/api/razorpay/webhook/route.ts`) that verifies Razorpay's
   signature with the secret key (in `.env.local`, never in the browser) and marks the order paid.
3. Add a `paid` status to orders. Checkout itself doesn't change: it lists whatever `paymentProviders()` returns.

### Add Shiprocket (couriers)
1. Write a `shiprocket` provider in `shipping.ts` (server only, secret key in `.env.local`).
2. Call it from a server route when an order is marked "packed" in /admin, and save the
   returned tracking number on the order. The customer's Track order page shows it automatically.

### Order emails (built in)
After an order is saved, checkout calls `sendOrderEmails()` (`src/app/checkout/actions.ts`) on the
server. It reads the order from the database once (`claim_order_email` in
`supabase/06-order-emails.sql`) and sends:
- the customer an "order placed" email (if they gave an email), and
- you a "new order" alert (to `ORDER_ALERT_EMAIL`, or the email in /admin → Settings).

The email text is in `src/lib/order-emails.ts`. Settings, in `.env.local` (never committed):
```
RESEND_API_KEY=re_...                                   # required; no key = no emails, nothing breaks
EMAIL_FROM=Matrutva Wellness <orders@matrutvawellness.com>   # optional
ORDER_ALERT_EMAIL=care@matrutvawellness.com             # optional
```
To use another provider (Amazon SES, ZeptoMail…), rewrite `sendEmail()` in `src/backend/email.ts`.

## Speed
Product, settings and review data is cached ("use cache", refreshed every few minutes and
immediately when you save in /admin), so most visitors never reach the database.
