import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const metadata: Metadata = {
  title: "Discover Spirulina",
  description: "Learn what spirulina is, its typical nutritional composition and how to enjoy it every day.",
  alternates: { canonical: "/discover-spirulina" },
};

export default function Page() {
  return <PagePlaceholder eyebrow="Discover Spirulina" title="The Science of a Tiny Spiral" />;
}
