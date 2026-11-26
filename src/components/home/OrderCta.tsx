import Link from "next/link";
import { orderCta } from "@/content/home";
import { orderHref } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";

/** "Naturally yours." Closing order prompt on teal. */
export function OrderCta() {
  return (
    <section aria-labelledby="order-title" className="bg-teal-deep text-ivory">
      <Reveal className="mx-auto max-w-[42rem] px-6 py-28 text-center sm:px-10 md:py-36">
        <h2 id="order-title" className="font-display text-[clamp(2.75rem,1.8rem+3.2vw,4.1rem)] leading-none font-light tracking-[-0.02em] text-ivory">
          {orderCta.title}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-7 text-ivory/85">{orderCta.description}</p>
        <Link
          href={orderHref()}
          className="mt-10 inline-flex h-14 items-center gap-3 rounded-full bg-ivory px-8 font-medium text-emerald transition-colors hover:bg-white"
        >
          <WhatsAppIcon className="size-5" />
          {orderCta.cta}
        </Link>
      </Reveal>
    </section>
  );
}
