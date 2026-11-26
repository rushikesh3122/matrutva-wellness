import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const metadata: Metadata = {
  title: "Quality & Transparency",
  description: "How Matrutva Wellness approaches ingredients, quality checks and product transparency.",
  alternates: { canonical: "/quality" },
};

export default function Page() {
  return <PagePlaceholder eyebrow="Quality & Transparency" title="Our Quality Promise" />;
}
