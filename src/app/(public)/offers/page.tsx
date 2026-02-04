import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { getPromoBanners } from "@/lib/db/queries";
import type { PromoBanner } from "@/lib/database.types";

export const metadata: Metadata = {
  title: "Offers & Specials",
  description:
    "Discover current promotions and special offers at Nirvana Optical Mahikeng. Save on eye tests, frames, lenses, contact lenses, and more.",
};

export default async function OffersPage() {
  const { data } = await getPromoBanners(true);
  const activeBanners = ((data ?? []) as PromoBanner[]).sort(
    (a, b) => a.sort_order - b.sort_order
  );

  const featured = activeBanners[0];
  const remaining = activeBanners.slice(1);

  return (
    <>
      <PageHeader
        title="Offers & Specials"
        subtitle="Take advantage of our current promotions and save on quality eye care."
      />

      <section className="relative px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        {/* Section-level geometric lines */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          aria-hidden="true"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          <line
            x1="8"
            y1="22"
            x2="92"
            y2="22"
            stroke="var(--color-brand-green-200)"
            strokeWidth="0.06"
            opacity="0.2"
          />
          <line
            x1="50"
            y1="24"
            x2="50"
            y2="88"
            stroke="var(--color-brand-green-300)"
            strokeWidth="0.06"
            opacity="0.12"
            strokeDasharray="200"
            strokeDashoffset="200"
            className="motion-safe:animate-line-draw"
          />
          <line
            x1="4"
            y1="12"
            x2="11"
            y2="12"
            stroke="var(--color-brand-green-400)"
            strokeWidth="0.1"
            opacity="0.22"
          />
          <line
            x1="93"
            y1="40"
            x2="93"
            y2="48"
            stroke="var(--color-brand-green-400)"
            strokeWidth="0.1"
            opacity="0.22"
          />
        </svg>

        <div className="relative z-10 mx-auto max-w-7xl">
          {/* Featured Offer */}
          {featured && (
            <div className="group relative overflow-hidden bg-brand-green-50 motion-safe:animate-fade-in-up">
              {/* Internal SVG lines */}
              <svg
                className="pointer-events-none absolute inset-0 h-full w-full"
                aria-hidden="true"
                preserveAspectRatio="none"
                viewBox="0 0 100 100"
              >
                <line
                  x1="0"
                  y1="50"
                  x2="30"
                  y2="50"
                  stroke="var(--color-brand-green-300)"
                  strokeWidth="0.12"
                  opacity="0.18"
                />
                <line
                  x1="5"
                  y1="20"
                  x2="5"
                  y2="80"
                  stroke="var(--color-brand-green-200)"
                  strokeWidth="0.08"
                  opacity="0.15"
                  strokeDasharray="200"
                  strokeDashoffset="200"
                  className="motion-safe:animate-line-draw"
                />
              </svg>

              {/* Corner brackets */}
              <span className="absolute left-6 top-6 h-8 w-px bg-brand-green-400/30" aria-hidden="true" />
              <span className="absolute left-6 top-6 h-px w-8 bg-brand-green-400/30" aria-hidden="true" />
              <span className="absolute bottom-6 right-6 h-8 w-px bg-brand-green-400/30 hidden sm:block" aria-hidden="true" />
              <span className="absolute bottom-6 right-6 h-px w-8 bg-brand-green-400/30 hidden sm:block" aria-hidden="true" />

              <div className="flex flex-col sm:flex-row">
                {/* Image */}
                {featured.image_url && (
                  <div className="relative aspect-video w-full sm:aspect-auto sm:w-1/2 lg:w-[45%]">
                    <Image
                      src={featured.image_url}
                      alt={featured.image_alt || featured.headline}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 50vw"
                      priority
                    />
                  </div>
                )}

                {/* Content */}
                <div className="flex flex-1 flex-col justify-center p-8 sm:p-10 lg:p-14">
                  {/* Concentric lens icon */}
                  <div className="relative mb-5 inline-flex h-12 w-12 items-center justify-center" aria-hidden="true">
                    <div className="absolute inset-0 rounded-full border border-brand-green-300/40" />
                    <div className="absolute inset-2 rounded-full border border-brand-green-400/30" />
                    <div className="absolute inset-4 rounded-full bg-brand-green-100" />
                    <svg className="relative h-4 w-4 text-brand-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>

                  <h2 className="text-2xl font-bold text-brand-black sm:text-3xl">
                    {featured.headline}
                  </h2>
                  <div className="mt-3 h-px w-10 bg-brand-green-300/40" aria-hidden="true" />
                  {featured.subheadline && (
                    <p className="mt-4 max-w-md text-base text-muted-foreground sm:text-lg">
                      {featured.subheadline}
                    </p>
                  )}
                  {featured.link_url && (
                    <div className="mt-7">
                      <Link
                        href={featured.link_url}
                        className="inline-flex items-center rounded-lg bg-brand-green-500 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-500 focus-visible:ring-offset-2"
                      >
                        {featured.link_text}
                        <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* No offers message */}
          {activeBanners.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No current offers. Check back soon for our latest promotions!
              </p>
            </div>
          )}

          {/* Remaining Offers Grid */}
          {remaining.length > 0 && (
            <div className="mt-14 grid gap-px bg-brand-green-100/30 sm:grid-cols-2 lg:grid-cols-3">
              {remaining.map((banner, index) => (
                <div
                  key={banner.id}
                  className="group relative flex flex-col bg-white transition-all duration-300 hover:bg-brand-green-50/30 motion-safe:animate-fade-in-up"
                  style={{ animationDelay: `${(index + 1) * 120}ms`, animationFillMode: "backwards" }}
                >
                  {/* Left-edge accent line */}
                  <span className="absolute left-0 top-0 h-full w-px bg-brand-green-200/40" aria-hidden="true" />

                  {/* Corner marks — top-left */}
                  <span className="absolute left-0 top-0 h-6 w-px bg-brand-green-300/25 transition-colors duration-300 group-hover:bg-brand-green-400/40" aria-hidden="true" />
                  <span className="absolute left-0 top-0 h-px w-6 bg-brand-green-300/25 transition-colors duration-300 group-hover:bg-brand-green-400/40" aria-hidden="true" />

                  {/* Image */}
                  {banner.image_url && (
                    <div className="relative aspect-16/10 w-full overflow-hidden">
                      <Image
                        src={banner.image_url}
                        alt={banner.image_alt || banner.headline}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="text-lg font-semibold text-brand-black">
                      {banner.headline}
                    </h3>
                    <div className="mt-2.5 h-px w-8 bg-brand-green-300/30" aria-hidden="true" />
                    {banner.subheadline && (
                      <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                        {banner.subheadline}
                      </p>
                    )}
                    {banner.link_url && (
                      <span className="mt-auto inline-flex items-center pt-5 text-sm font-medium text-brand-green-600 transition-colors duration-200 group-hover:text-brand-green-700">
                        <span className="mr-2 inline-block h-px w-0 bg-brand-green-500 transition-all duration-300 group-hover:w-4" aria-hidden="true" />
                        <Link
                          href={banner.link_url}
                          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-500 focus-visible:ring-offset-2 rounded"
                          aria-label={`${banner.link_text || 'Learn more'} about ${banner.headline}`}
                        >
                          {banner.link_text || 'View offer details'}
                        </Link>
                        <svg className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CTA Section */}
          <div className="relative mt-20 overflow-hidden bg-brand-green-500 px-8 py-16 sm:px-12 sm:py-20">
            {/* Decorative lens circles */}
            <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full border-2 border-white/10" aria-hidden="true" />
            <div className="pointer-events-none absolute -left-4 -top-4 h-28 w-28 rounded-full border border-white/10" aria-hidden="true" />
            <div className="pointer-events-none absolute -bottom-8 -right-8 h-32 w-32 rounded-full border-2 border-white/10" aria-hidden="true" />
            <div className="pointer-events-none absolute -bottom-3 -right-3 h-20 w-20 rounded-full border border-white/10" aria-hidden="true" />

            {/* SVG geometric lines */}
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              aria-hidden="true"
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
            >
              <line x1="0" y1="28" x2="100" y2="28" stroke="white" strokeWidth="0.06" opacity="0.08" />
              <line x1="0" y1="72" x2="100" y2="72" stroke="white" strokeWidth="0.06" opacity="0.08" />
              <line
                x1="78"
                y1="0"
                x2="78"
                y2="100"
                stroke="white"
                strokeWidth="0.06"
                opacity="0.06"
                strokeDasharray="200"
                strokeDashoffset="200"
                className="motion-safe:animate-line-draw"
              />
            </svg>

            {/* Corner brackets */}
            <div className="pointer-events-none absolute left-6 top-6" aria-hidden="true">
              <div className="h-10 w-px bg-white/20" />
              <div className="absolute left-0 top-0 h-px w-10 bg-white/20" />
            </div>
            <div className="pointer-events-none absolute bottom-6 right-6" aria-hidden="true">
              <div className="absolute bottom-0 right-0 h-10 w-px bg-white/20" />
              <div className="absolute bottom-0 right-0 h-px w-10 bg-white/20" />
            </div>

            {/* Content */}
            <div className="relative z-10 mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                Don&apos;t Miss Out
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-brand-green-100">
                Contact us to learn about our current specials or to check if your medical aid covers our services.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/booking"
                  className="inline-flex items-center rounded-lg bg-white px-8 py-3.5 font-semibold text-brand-green-600 transition-colors hover:bg-brand-green-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-green-500"
                >
                  Book Eye Test
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-lg border-2 border-white px-8 py-3.5 font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-green-500"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
