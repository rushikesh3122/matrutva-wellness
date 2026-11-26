import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Matrutva Wellness team.",
  alternates: { canonical: "/contact" },
};

export default function Page() {
  return (
    <PagePlaceholder eyebrow="Contact" title="We Would Love to Hear From You" description="Our full contact page is on its way. Until then, reach us here.">
      <ul className="flex flex-col gap-3 text-forest/85 sm:flex-row sm:gap-8">
        <li className="flex items-center gap-2">
          <Mail className="size-4 text-teal" aria-hidden />
          <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-teal">
            {siteConfig.contact.email}
          </a>
        </li>
        <li className="flex items-center gap-2">
          <Phone className="size-4 text-teal" aria-hidden /> {siteConfig.contact.phone}
        </li>
      </ul>
    </PagePlaceholder>
  );
}
