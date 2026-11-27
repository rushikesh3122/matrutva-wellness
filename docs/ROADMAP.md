# Matrutva Wellness – Roadmap

Saved plan for future work. Full version (editable): https://claude.ai/artifact/CQz7v6FrrBZqwNUSmaS2Yr

## Step 0 – Info needed from the owner
- WhatsApp number (/admin → Settings)
- Final price, MRP, pack sizes (60 / 120 capsules; 1 / 2 / 3 bottles)
- Confirm claims: 100% Organic, 60% protein, <45°C (FSSAI)
- High-resolution white-bottle photo
- Instagram / Facebook links, phone, registered address, FSSAI licence no.
- Domain name; capsule shell type (veg / gelatin)
- Shipping charge, free-shipping limit, COD yes/no, delivery days

## Products & inventory – chosen approach
Supabase (free tier) + a private `/admin` dashboard in this Next.js app:
- Overview: today's orders, monthly revenue, low-stock alerts
- Products: add / edit name, photos, label, price, MRP, packs, active/hidden
- Inventory: stock per pack, batch + expiry, adjustments with reason, auto "Out of stock"
- Orders: New → Confirmed/Paid → Packed → Shipped → Delivered/Cancelled, tracking no.
- Customers: history + CSV export

## Checkout flow (like mohorsuperfoods.in)
3 steps with a progress bar: **1 Cart → 2 Your details → 3 Payment**
1. **Cart** – lines with image, pack, qty stepper, remove; Order summary (Subtotal, Shipment, Total); "Proceed to checkout"; trust lines (secure payment, delivery days, WhatsApp help).
2. **Your details (`/checkout`)** – name, phone, email, address ×2, city, PIN (auto-fills city/state), state, country, optional company/GSTIN; Your order card with Edit cart; payment method radio; privacy note; required T&C checkbox; "Place order · ₹total" saves order as *Pending payment*.
3. **Payment** – gateway page (UPI, cards, netbanking, wallets). Recommend **Razorpay** (absorb ~2% fee; Instamojo charges customer a convenience fee). Success → order Paid, stock reduced, confirmation page + email/WhatsApp. Failure → back to checkout, "Try again".

## Phases (one small PR each)
1. Launch basics – Step 0 info, pack options, MRP / Save %, domain + SEO
2. Supabase + products moved to DB + admin login + Products page
3. Inventory – stock, batch/expiry, low-stock alerts, out-of-stock on site
4. Orders + checkout flow above (WhatsApp first), Track Order page, email on new order
5. Growth – journal articles, search, newsletter, GA4 / Meta Pixel, real reviews
6. Payments & shipping – Razorpay, Shiprocket, GST invoices

## Standing rules
No invented prices, certifications, ratings, test results or medical claims. Real brand assets only. Spirulina products only (no turmeric etc.). Keep Lighthouse 100 for a11y / best practices / SEO.
