import type { Metadata } from "next";
import { generatePageMetadata, pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata(pageMetadata.pricing as any);

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}