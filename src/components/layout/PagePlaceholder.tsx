import Link from "next/link";
import { PageIntro } from "@/components/ui/PageIntro";

type PagePlaceholderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  primary?: { label: string; href: string };
  children?: React.ReactNode;
};

/**
 * Figma-style placeholder for pages whose final content is still being written
 * (policies, journal articles). Keeps every link working (200, not 404).
 */
export function PagePlaceholder({
  eyebrow = "Coming soon",
  title,
  description = "We are carefully writing this page. In the meantime, explore our spirulina.",
  primary = { label: "Shop spirulina", href: "/shop/spirulina-capsules" },
  children,
}: PagePlaceholderProps) {
  return (
    <PageIntro eyebrow={eyebrow} title={title} description={description} className="pb-16 md:pb-24">
      {children}
      <div className="mt-10 flex flex-wrap items-center gap-6">
        <Link href={primary.href} className="inline-flex h-12 items-center rounded-full bg-teal-deep px-7 font-medium text-ivory transition-colors hover:bg-emerald">
          {primary.label}
        </Link>
        <Link href="/" className="eyebrow text-[0.66rem] text-forest/70 hover:text-emerald">
          Back to home
        </Link>
      </div>
    </PageIntro>
  );
}
