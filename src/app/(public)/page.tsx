import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG, SERVICES } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";
import { PromoCarousel } from "@/components/carousel/PromoCarousel";
import { Testimonials } from "@/components/shared/Testimonials";
import { InstagramFeed } from "@/components/shared/InstagramFeed";
import type { PromoBanner, Testimonial, InstagramPost } from "@/lib/database.types";

function ServiceIcon({ type }: { type: string }) {
  const icons: Record<string, React.ReactNode> = {
    eye: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    lens: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    glasses: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2 10.5a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0zm13 0a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0zM9 10.5h6M1 10.5h1m20 0h1" />
      </svg>
    ),
    shield: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    child: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
      </svg>
    ),
    emergency: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
      </svg>
    ),
    car: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
  };

  return (
    <div className="relative flex h-12 w-12 items-center justify-center text-brand-green-600">
      {icons[type] || icons.eye}
      {/* Micro corner marks — bracket framing */}
      <span className="absolute left-0 top-0 h-2 w-px bg-brand-green-400/30 transition-colors duration-300 group-hover:bg-brand-green-500/50" aria-hidden="true" />
      <span className="absolute left-0 top-0 h-px w-2 bg-brand-green-400/30 transition-colors duration-300 group-hover:bg-brand-green-500/50" aria-hidden="true" />
      <span className="absolute bottom-0 right-0 h-2 w-px bg-brand-green-400/30 transition-colors duration-300 group-hover:bg-brand-green-500/50" aria-hidden="true" />
      <span className="absolute bottom-0 right-0 h-px w-2 bg-brand-green-400/30 transition-colors duration-300 group-hover:bg-brand-green-500/50" aria-hidden="true" />
    </div>
  );
}

export default async function HomePage() {
  const supabase = await createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any;

  // Fetch all data in parallel for faster TTFB
  const [
    { data: banners },
    { data: testimonials },
    { data: instagramPosts }
  ] = await Promise.all([
    db.from("promo_banners").select("*").eq("is_active", true).order("sort_order", { ascending: true }),
    db.from("testimonials").select("*").eq("is_featured", true).order("sort_order", { ascending: true }),
    db.from("instagram_posts").select("*").eq("is_active", true).order("sort_order", { ascending: true }).limit(6)
  ]);

  const promoBanners = (banners || []) as PromoBanner[];
  const testimonialList = (testimonials || []) as Testimonial[];
  const instagramPostList = (instagramPosts || []) as InstagramPost[];

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        {/* Background image - right 40%, full height */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-[40%]" aria-hidden="true">
          <Image
            src="/stock multi eyewear.avif"
            alt="Assorted eyewear frames displayed at Nirvana Optical"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 40vw"
            priority
          />
          {/* Mobile overlay - white wash so text is readable */}
          <div className="absolute inset-0 bg-white/85 lg:hidden" />
          {/* Desktop fade - soft left edge blend */}
          <div className="absolute inset-0 hidden bg-linear-to-r from-white via-white/40 to-transparent lg:block" />
        </div>

        {/* Subtle geometric lines - horizontal & vertical only */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          aria-hidden="true"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          {/* Horizontal lines */}
          <line
            x1="0" y1="25" x2="100" y2="25"
            stroke="var(--color-brand-green-200)"
            strokeWidth="0.08"
            opacity="0.25"
          />
          <line
            x1="0" y1="75" x2="100" y2="75"
            stroke="var(--color-brand-green-200)"
            strokeWidth="0.08"
            opacity="0.25"
          />
          {/* Vertical line at image boundary */}
          <line
            x1="60" y1="0" x2="60" y2="100"
            stroke="var(--color-brand-green-300)"
            strokeWidth="0.08"
            opacity="0.2"
            strokeDasharray="200"
            strokeDashoffset="200"
            className="motion-safe:animate-line-draw"
          />
          {/* Short horizontal accent */}
          <line
            x1="55" y1="50" x2="65" y2="50"
            stroke="var(--color-brand-green-400)"
            strokeWidth="0.12"
            opacity="0.3"
          />
        </svg>

        {/* Corner accent marks */}
        <div className="pointer-events-none absolute right-[40%] top-8 hidden lg:block" aria-hidden="true">
          <div className="h-8 w-px bg-brand-green-400/30" />
          <div className="absolute right-0 top-0 h-px w-8 bg-brand-green-400/30" />
        </div>
        <div className="pointer-events-none absolute bottom-8 right-[40%] hidden lg:block" aria-hidden="true">
          <div className="h-8 w-px bg-brand-green-400/30" />
          <div className="absolute bottom-0 left-0 h-px w-8 bg-brand-green-400/30" />
        </div>

        {/* Text content */}
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="max-w-xl lg:max-w-lg">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-green-600">
              {SITE_CONFIG.tagline}
            </p>
            <h1 className="mt-4 text-5xl font-bold leading-tight tracking-tight text-brand-black sm:text-6xl lg:text-7xl">
              Your Vision,{" "}
              <span className="text-brand-green-500">Our&nbsp;Priority</span>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Professional eye care services in Mahikeng. From comprehensive
              examinations to designer frames, we help you see the world more
              clearly.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/booking"
                className="inline-flex items-center justify-center rounded-lg bg-brand-green-500 px-8 py-4 text-base font-semibold text-white transition-colors duration-200 hover:bg-brand-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-500 focus-visible:ring-offset-2"
              >
                Book an Eye Exam
              </Link>
              <Link
                href="/gallery"
                className="inline-flex items-center justify-center rounded-lg border-2 border-brand-green-500 px-8 py-4 text-base font-semibold text-brand-green-600 transition-colors duration-200 hover:bg-brand-green-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-500 focus-visible:ring-offset-2"
              >
                View Our Collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Promotions Carousel */}
      <PromoCarousel banners={promoBanners} />

      {/* Services Overview */}
      <section className="px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-brand-black sm:text-4xl">
              Our Services
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Comprehensive eye care solutions tailored to your needs, delivered
              with expertise and the latest technology.
            </p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.slice(0, 3).map((service, index) => (
              <Link
                key={service.id}
                href={`/services#${service.id}`}
                className="group relative bg-white p-10 transition-all duration-300 hover:bg-brand-green-50/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-500 focus-visible:ring-offset-2"
              >
                {/* Edge accent line — varies per card */}
                {index !== 1 && (
                  <span className="absolute left-0 top-0 h-full w-px bg-brand-green-200/40" aria-hidden="true" />
                )}
                {index === 1 && (
                  <span className="absolute left-0 top-0 h-px w-full bg-brand-green-200/40" aria-hidden="true" />
                )}

                {/* Corner accents — card 0: TL+BR, card 1: TR+BL, card 2: TL+TR */}
                {(index === 0 || index === 2) && (
                  <>
                    <span className="absolute left-0 top-0 h-6 w-px bg-brand-green-300/25 transition-colors duration-300 group-hover:bg-brand-green-400/40" aria-hidden="true" />
                    <span className="absolute left-0 top-0 h-px w-6 bg-brand-green-300/25 transition-colors duration-300 group-hover:bg-brand-green-400/40" aria-hidden="true" />
                  </>
                )}
                {index === 0 && (
                  <>
                    <span className="absolute bottom-0 right-0 h-6 w-px bg-brand-green-300/25 transition-colors duration-300 group-hover:bg-brand-green-400/40" aria-hidden="true" />
                    <span className="absolute bottom-0 right-0 h-px w-6 bg-brand-green-300/25 transition-colors duration-300 group-hover:bg-brand-green-400/40" aria-hidden="true" />
                  </>
                )}
                {index === 1 && (
                  <>
                    <span className="absolute right-0 top-0 h-6 w-px bg-brand-green-300/25 transition-colors duration-300 group-hover:bg-brand-green-400/40" aria-hidden="true" />
                    <span className="absolute right-0 top-0 h-px w-6 bg-brand-green-300/25 transition-colors duration-300 group-hover:bg-brand-green-400/40" aria-hidden="true" />
                    <span className="absolute bottom-0 left-0 h-6 w-px bg-brand-green-300/25 transition-colors duration-300 group-hover:bg-brand-green-400/40" aria-hidden="true" />
                    <span className="absolute bottom-0 left-0 h-px w-6 bg-brand-green-300/25 transition-colors duration-300 group-hover:bg-brand-green-400/40" aria-hidden="true" />
                  </>
                )}
                {index === 2 && (
                  <>
                    <span className="absolute right-0 top-0 h-6 w-px bg-brand-green-300/25 transition-colors duration-300 group-hover:bg-brand-green-400/40" aria-hidden="true" />
                    <span className="absolute right-0 top-0 h-px w-6 bg-brand-green-300/25 transition-colors duration-300 group-hover:bg-brand-green-400/40" aria-hidden="true" />
                  </>
                )}

                {/* Middle card: faint internal horizontal line */}
                {index === 1 && (
                  <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <line x1="10" y1="65" x2="90" y2="65" stroke="var(--color-brand-green-200)" strokeWidth="0.15" opacity="0.15" />
                  </svg>
                )}

                <ServiceIcon type={service.icon} />

                <h3 className="mt-6 text-xl font-semibold text-brand-black">
                  {service.shortTitle}
                </h3>

                {/* Short accent divider */}
                <div className="mt-4 h-px w-8 bg-brand-green-300/30" aria-hidden="true" />

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>

                <span className="mt-6 inline-flex items-center text-sm font-medium text-brand-green-600 transition-colors duration-200 group-hover:text-brand-green-700">
                  <span className="mr-2 inline-block h-px w-0 bg-brand-green-500 transition-all duration-300 group-hover:w-4" aria-hidden="true" />
                  Learn more
                  <svg
                    className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/services"
              className="inline-flex items-center text-base font-semibold text-brand-green-600 transition-colors duration-200 hover:text-brand-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-500 focus-visible:ring-offset-2"
            >
              View All Services
              <svg
                className="ml-2 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="relative overflow-hidden bg-brand-green-50/50 px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        {/* Background image - left 50%, full height */}
        <div className="absolute inset-y-0 left-0 w-full lg:w-1/2" aria-hidden="true">
          <Image
            src="/Nirvana optical store.jpeg"
            alt="Interior of Nirvana Optical store in Mahikeng"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {/* Mobile overlay - green wash so text is readable */}
          <div className="absolute inset-0 bg-brand-green-50/90 lg:hidden" />
          {/* Desktop fade - soft right edge blend */}
          <div className="absolute inset-0 hidden bg-linear-to-l from-brand-green-50/50 via-brand-green-50/80 to-transparent lg:block" />
        </div>

        {/* Subtle geometric lines - horizontal & vertical only */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          aria-hidden="true"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          {/* Horizontal lines */}
          <line
            x1="0" y1="30" x2="100" y2="30"
            stroke="var(--color-brand-green-200)"
            strokeWidth="0.08"
            opacity="0.2"
          />
          <line
            x1="0" y1="70" x2="100" y2="70"
            stroke="var(--color-brand-green-200)"
            strokeWidth="0.08"
            opacity="0.2"
          />
          {/* Vertical line at image boundary */}
          <line
            x1="50" y1="0" x2="50" y2="100"
            stroke="var(--color-brand-green-300)"
            strokeWidth="0.08"
            opacity="0.2"
            strokeDasharray="200"
            strokeDashoffset="200"
            className="motion-safe:animate-line-draw"
          />
          {/* Short vertical accent */}
          <line
            x1="25" y1="45" x2="25" y2="55"
            stroke="var(--color-brand-green-400)"
            strokeWidth="0.12"
            opacity="0.3"
          />
        </svg>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Spacer for image side */}
            <div className="hidden lg:block" aria-hidden="true" />

            {/* Content side */}
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-brand-black sm:text-4xl">
                Why Choose Nirvana Optical?
              </h2>
              <p className="mt-4 text-muted-foreground">
                We combine advanced technology with personalised care to deliver
                an exceptional eye care experience.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  "Advanced diagnostic equipment for accurate assessments",
                  "Experienced and qualified optometrists",
                  "Wide selection of premium and affordable frames",
                  "Personalised attention and follow-up care",
                  "Convenient location in central Mahikeng",
                  "Same-day service available for urgent cases",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 h-5 w-5 shrink-0 text-brand-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-brand-black">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials testimonials={testimonialList} />

      {/* Instagram Feed */}
      <InstagramFeed posts={instagramPostList} />

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-brand-green-500 px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        {/* Decorative pattern overlay */}
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div className="absolute left-1/4 top-1/4 h-40 w-40 rounded-full border-2 border-white" />
          <div className="absolute right-1/4 top-1/3 h-24 w-24 rounded-full border-2 border-white" />
          <div className="absolute bottom-1/4 left-1/3 h-32 w-32 rounded-full border-2 border-white" />
        </div>
        <div className="relative mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            See the World More Clearly
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-brand-green-100">
            Book your comprehensive eye examination today and take the first
            step towards better vision.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/booking"
              className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-base font-semibold text-brand-green-600 transition-colors duration-200 hover:bg-brand-green-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-green-500"
            >
              Book Eye Test
            </Link>
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white px-8 py-4 text-base font-semibold text-white transition-colors duration-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-green-500"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
