import Link from "next/link";
import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Pricing & Payment | Nirvana Optical",
  description:
    "Service pricing and payment options at Nirvana Optical Mahikeng. Eye exams, lenses, frames, coatings, and more. All medical aids accepted.",
};

const PRICE_LIST = [
  { service: "Eye Examination", price: "R400" },
  { service: "Driver's Assessment", price: "R100" },
  { service: "Single Vision Lenses", price: "R400" },
  { service: "Bifocal Lenses", price: "R800" },
  { service: "Multifocal Lenses", price: "R1,200" },
  { service: "Contact Lenses", price: "R1,198.30" },
  { service: "Frames", price: "R1,000" },
  { service: "Anti-Reflective Coating", price: "R800" },
  { service: "Blue-Light Coating", price: "R800" },
];

const PAYMENT_METHODS = [
  { method: "Cash", icon: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" },
  { method: "Debit & Credit Card", icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" },
  { method: "EFT / Bank Transfer", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
  { method: "SnapScan", icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" },
];

export default function MedicalAidPage() {
  return (
    <>
      <PageHeader
        title="Pricing & Payment"
        subtitle="Transparent pricing for quality eye care. All prices shown are starting rates."
      />

      {/* Price List */}
      <section className="relative px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        {/* Geometric SVG lines */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          aria-hidden="true"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          <line x1="5" y1="10" x2="95" y2="10"
            stroke="var(--color-brand-green-200)" strokeWidth="0.06" opacity="0.2" />
          <line x1="5" y1="90" x2="95" y2="90"
            stroke="var(--color-brand-green-200)" strokeWidth="0.06" opacity="0.15" />
          <line x1="50" y1="12" x2="50" y2="88"
            stroke="var(--color-brand-green-300)" strokeWidth="0.06" opacity="0.1"
            strokeDasharray="200" strokeDashoffset="200"
            className="motion-safe:animate-line-draw" />
          <line x1="3" y1="28" x2="8" y2="28"
            stroke="var(--color-brand-green-400)" strokeWidth="0.1" opacity="0.22" />
          <line x1="95" y1="38" x2="95" y2="45"
            stroke="var(--color-brand-green-400)" strokeWidth="0.1" opacity="0.22" />
        </svg>

        <div className="relative z-10 mx-auto max-w-3xl">
          {/* Section heading with lens icon */}
          <div className="text-center">
            <div className="relative mx-auto mb-6 inline-flex h-14 w-14 items-center justify-center" aria-hidden="true">
              <div className="absolute inset-0 rounded-full border border-brand-green-300/40" />
              <div className="absolute inset-2 rounded-full border border-brand-green-400/30" />
              <div className="absolute inset-4 rounded-full bg-brand-green-100" />
              <svg className="relative h-5 w-5 text-brand-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-brand-black sm:text-3xl">
              Service Pricing
            </h2>
            <div className="mx-auto mt-4 h-px w-10 bg-brand-green-300/40" aria-hidden="true" />
            <p className="mt-4 text-muted-foreground">
              Starting prices for our most popular services. Final pricing depends on your specific requirements.
            </p>
          </div>

          {/* Price list card */}
          <div className="relative mt-12">
            {/* Corner brackets — top-left */}
            <span className="absolute left-0 top-0 h-8 w-px bg-brand-green-400/30" aria-hidden="true" />
            <span className="absolute left-0 top-0 h-px w-8 bg-brand-green-400/30" aria-hidden="true" />
            {/* Corner brackets — bottom-right */}
            <span className="absolute bottom-0 right-0 h-8 w-px bg-brand-green-400/30" aria-hidden="true" />
            <span className="absolute bottom-0 right-0 h-px w-8 bg-brand-green-400/30" aria-hidden="true" />

            <div className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-white">
              {PRICE_LIST.map((item, index) => (
                <div
                  key={item.service}
                  className="flex items-center justify-between px-6 py-4"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <span className="text-sm font-medium text-brand-black sm:text-base">
                    {item.service}
                  </span>
                  <span className="tabular-nums text-sm font-semibold text-brand-green-600 sm:text-base">
                    from {item.price}
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              Prices are subject to change. Contact us for a detailed quote.
            </p>
          </div>
        </div>
      </section>

      {/* Medical Aid Note */}
      <section className="bg-brand-green-50/50 px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-2">
            <svg className="h-5 w-5 shrink-0 text-brand-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm font-medium text-brand-black sm:text-base">
              We accept all medical aids and process claims directly on your behalf.
            </p>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Bring your medical aid card to your appointment — you only pay the difference, if any.
          </p>
        </div>
      </section>

      {/* Payment Options */}
      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-brand-black sm:text-3xl">
              Payment Options
            </h2>
            <div className="mx-auto mt-4 h-px w-10 bg-brand-green-300/40" aria-hidden="true" />
            <p className="mt-4 text-muted-foreground">
              For services not covered by medical aid, we accept the following payment methods.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {PAYMENT_METHODS.map((item) => (
              <div
                key={item.method}
                className="group relative flex items-center gap-4 rounded-xl border border-border bg-white p-5 transition-colors duration-200 hover:bg-brand-green-50/30"
              >
                {/* Corner marks — top-left */}
                <span className="absolute left-0 top-0 h-4 w-px bg-brand-green-300/25 transition-colors duration-300 group-hover:bg-brand-green-400/40" aria-hidden="true" />
                <span className="absolute left-0 top-0 h-px w-4 bg-brand-green-300/25 transition-colors duration-300 group-hover:bg-brand-green-400/40" aria-hidden="true" />

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-green-50">
                  <svg className="h-5 w-5 text-brand-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                </div>
                <span className="text-sm font-medium text-brand-black">{item.method}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl bg-brand-green-500 px-8 py-14 sm:px-12 sm:py-16">
          {/* Decorative lens circles */}
          <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full border-2 border-white/10" aria-hidden="true" />
          <div className="pointer-events-none absolute -right-3 -top-3 h-20 w-20 rounded-full border border-white/10" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-6 -left-6 h-24 w-24 rounded-full border-2 border-white/10" aria-hidden="true" />

          {/* SVG geometric lines */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            aria-hidden="true"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
          >
            <line x1="0" y1="30" x2="100" y2="30" stroke="white" strokeWidth="0.06" opacity="0.08" />
            <line x1="0" y1="70" x2="100" y2="70" stroke="white" strokeWidth="0.06" opacity="0.08" />
            <line x1="80" y1="0" x2="80" y2="100"
              stroke="white" strokeWidth="0.06" opacity="0.06"
              strokeDasharray="200" strokeDashoffset="200"
              className="motion-safe:animate-line-draw" />
          </svg>

          {/* Corner brackets */}
          <div className="pointer-events-none absolute left-5 top-5" aria-hidden="true">
            <div className="h-8 w-px bg-white/20" />
            <div className="absolute left-0 top-0 h-px w-8 bg-white/20" />
          </div>
          <div className="pointer-events-none absolute bottom-5 right-5" aria-hidden="true">
            <div className="absolute bottom-0 right-0 h-8 w-px bg-white/20" />
            <div className="absolute bottom-0 right-0 h-px w-8 bg-white/20" />
          </div>

          {/* Content */}
          <div className="relative z-10 text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Ready to Book?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-brand-green-100">
              Schedule your eye examination or contact us for a personalised quote.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/booking"
                className="inline-flex items-center rounded-lg bg-white px-8 py-3 font-semibold text-brand-green-600 transition-colors hover:bg-brand-green-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-green-500"
              >
                Book Eye Test
              </Link>
              <a
                href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 rounded-lg border-2 border-white px-8 py-3 font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-green-500"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
