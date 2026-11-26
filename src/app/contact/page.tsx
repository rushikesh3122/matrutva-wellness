import type { Metadata } from "next";
import Link from "next/link";
import { orderHref, siteConfig } from "@/lib/site";
import { PageIntro } from "@/components/ui/PageIntro";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to the Matrutva Wellness team by WhatsApp or email. We help you choose and order.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const hasWhatsApp = Boolean(siteConfig.whatsappNumber);
  const { email, phone, hours, address } = siteConfig.contact;
  const rows = [
    { label: "Email", value: email, href: `mailto:${email}` },
    { label: "Phone", value: phone, href: `tel:${phone.replace(/\s/g, "")}` },
    { label: "Hours", value: hours },
    { label: "Address", value: address },
  ].filter((r) => !/0{5}|^Your /.test(r.value)); // hide placeholder values until real ones are set in siteConfig
  return (
    <>
      <PageIntro
        eyebrow="Contact"
        title="Naturally,"
        accent="we're listening."
        description="Tell us what you're reaching for. We'll help you choose and order."
      >
        {hasWhatsApp && (
          <Link
            href={orderHref()}
            className="mt-10 inline-flex h-14 items-center gap-3 rounded-full bg-teal-deep px-8 font-medium text-ivory transition-colors hover:bg-emerald"
          >
            <WhatsAppIcon className="size-5" /> Chat on WhatsApp
          </Link>
        )}
      </PageIntro>
      <section aria-label="Contact details" className="border-t border-forest/10 bg-ivory">
        <dl className="container-luxe grid max-w-4xl gap-px py-16 md:py-24">
          {rows.map((r) => (
            <div key={r.label} className="grid gap-2 border-b border-forest/10 py-6 sm:grid-cols-[10rem_1fr]">
              <dt className="eyebrow text-xs text-teal-deep">{r.label}</dt>
              <dd className="font-display text-xl text-emerald sm:text-2xl">
                {r.href ? (
                  <a href={r.href} className="hover:text-teal-deep">
                    {r.value}
                  </a>
                ) : (
                  r.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
