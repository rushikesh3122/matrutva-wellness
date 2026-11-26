import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const metadata: Metadata = {
  title: "Our Story",
  description: "The story behind Matrutva Wellness: nourishment with a mother's care.",
  alternates: { canonical: "/our-story" },
};

export default function Page() {
  return <PagePlaceholder eyebrow="Our Story" title="Nourishment With a Mother's Care" />;
}
