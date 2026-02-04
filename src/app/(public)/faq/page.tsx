import Link from "next/link";
import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { createClient } from "@/lib/supabase/server";
import type { FAQItem } from "@/lib/database.types";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Find answers to common questions about eye tests, frames, lenses, medical aid claims, and booking appointments at Nirvana Optical in Mahikeng.",
};

export default async function FAQPage() {
  const supabase = await createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any;

  const { data } = await db
    .from("faq_items")
    .select("*")
    .order("sort_order", { ascending: true });

  const faqItems = (data || []) as FAQItem[];
  const categories = [...new Set(faqItems.map((item) => item.category))];

  return (
    <>
      <PageHeader
        title="Frequently Asked Questions"
        subtitle="Find answers to our most commonly asked questions. Can't find what you're looking for? Contact us directly."
      />

      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {categories.map((category) => (
            <div key={category} className="mb-12 last:mb-0">
              <h2 className="mb-6 text-xl font-bold text-brand-black">
                {category}
              </h2>
              <FAQAccordion items={faqItems} category={category} />
            </div>
          ))}

          {/* Still have questions */}
          <div className="mt-16 rounded-2xl bg-brand-green-50 p-8 text-center">
            <h2 className="text-xl font-bold text-brand-black">
              Still Have Questions?
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              We&apos;re happy to help. Reach out to our team directly.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-lg bg-brand-green-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-green-600"
              >
                Contact Us
              </Link>
              <Link
                href="/booking"
                className="inline-flex items-center rounded-lg border-2 border-brand-green-500 px-6 py-2.5 text-sm font-semibold text-brand-green-600 transition-colors hover:bg-brand-green-50"
              >
                Book Eye Test
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
