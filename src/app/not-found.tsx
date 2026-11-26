import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return <PagePlaceholder eyebrow="404" title="This page wandered off." description="The page you are looking for does not exist or has moved." />;
}
