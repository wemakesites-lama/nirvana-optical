"use client";

import { useState } from "react";
import type { FAQItem } from "@/lib/types";

interface FAQAccordionProps {
  items: FAQItem[];
  category?: string;
}

export function FAQAccordion({ items, category }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredItems = category
    ? items.filter((item) => item.category === category)
    : items;

  return (
    <div className="divide-y divide-border rounded-2xl border border-border bg-white">
      {filteredItems.map((item, index) => (
        <div key={index}>
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-brand-green-50/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-green-500"
            aria-expanded={openIndex === index}
          >
            <span className="pr-4 text-sm font-medium text-brand-black sm:text-base">
              {item.question}
            </span>
            <svg
              className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 ${
                openIndex === index ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div
            className={`overflow-hidden transition-all duration-200 ${
              openIndex === index ? "max-h-96" : "max-h-0"
            }`}
          >
            <p className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">
              {item.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
