import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHeader } from "@/components/shared/PageHeader";
import { SERVICES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Eye Care Services in Mahikeng",
  description:
    "Comprehensive eye care services including eye exams, contact lens fitting, prescription eyeglasses, lens coatings, and pediatric eye care.",
};

function ServiceIcon({ type, className = "h-12 w-12" }: { type: string; className?: string }) {
  const icons: Record<string, React.ReactNode> = {
    eye: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </>
    ),
    lens: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </>
    ),
    glasses: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M2 10.5a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0zm13 0a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0zM9 10.5h6M1 10.5h1m20 0h1" />
    ),
    shield: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    ),
    child: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
    ),
    emergency: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
    ),
    car: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </>
    ),
  };

  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      {icons[type] || icons.eye}
    </svg>
  );
}

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Our Services"
        subtitle="Comprehensive eye care solutions for the whole family, powered by advanced technology and experienced professionals."
      />

      <section>
        {SERVICES.map((service, index) => (
          <div
            key={service.id}
            id={service.id}
            className={`relative min-h-100 scroll-mt-24 overflow-hidden ${index % 2 === 0 ? "bg-white" : "bg-brand-green-50"}`}
          >
            {/* Horizontal separator between sections */}
            {index > 0 && (
              <div
                className="absolute left-0 right-0 top-0 z-20 flex items-center justify-center"
                aria-hidden="true"
              >
                <div className="h-px flex-1 bg-linear-to-r from-transparent via-brand-green-300/20 to-brand-green-300/20" />
                <div className="relative mx-4 flex items-center justify-center">
                  <div className="h-3 w-px bg-brand-green-300/30" />
                  <div className="absolute h-px w-3 bg-brand-green-300/30" />
                </div>
                <div className="h-px flex-1 bg-linear-to-l from-transparent via-brand-green-300/20 to-brand-green-300/20" />
              </div>
            )}

            {/* Background image — 40% width on desktop */}
            <div
              className={`absolute inset-y-0 w-full lg:w-[40%] ${
                index % 2 === 1 ? "left-0" : "right-0"
              }`}
              aria-hidden="true"
            >
              <Image
                src={service.image}
                alt={`${service.title} - ${service.description.slice(0, 60)}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              {/* Mobile overlay */}
              <div className="absolute inset-0 bg-white/80 lg:hidden" />
              {/* Desktop gradient blend */}
              <div
                className={`absolute inset-0 hidden lg:block ${
                  index % 2 === 1
                    ? "bg-linear-to-l from-transparent via-brand-green-50/40 to-brand-green-50"
                    : "bg-linear-to-r from-transparent via-white/40 to-white"
                }`}
              />
            </div>

            {/* Corner bracket accents — content side */}
            <div
              className={`pointer-events-none absolute top-8 hidden lg:block ${
                index % 2 === 1 ? "right-8" : "left-8"
              }`}
              aria-hidden="true"
            >
              <div className="h-6 w-px bg-brand-green-300/25" />
              <div
                className={`absolute top-0 h-px w-6 bg-brand-green-300/25 ${
                  index % 2 === 1 ? "right-0" : "left-0"
                }`}
              />
            </div>
            <div
              className={`pointer-events-none absolute bottom-8 hidden lg:block ${
                index % 2 === 1 ? "right-8" : "left-8"
              }`}
              aria-hidden="true"
            >
              <div className="h-6 w-px bg-brand-green-300/25" />
              <div
                className={`absolute bottom-0 h-px w-6 bg-brand-green-300/25 ${
                  index % 2 === 1 ? "right-0" : "left-0"
                }`}
              />
            </div>

            {/* Subtle geometric grid lines */}
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              aria-hidden="true"
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
            >
              <line
                x1="0" y1="30" x2="100" y2="30"
                stroke="var(--color-brand-green-200)"
                strokeWidth="0.08"
                opacity="0.15"
              />
              <line
                x1="0" y1="70" x2="100" y2="70"
                stroke="var(--color-brand-green-200)"
                strokeWidth="0.08"
                opacity="0.15"
              />
              <line
                x1={index % 2 === 1 ? "40" : "60"}
                y1="0"
                x2={index % 2 === 1 ? "40" : "60"}
                y2="100"
                stroke="var(--color-brand-green-300)"
                strokeWidth="0.08"
                opacity="0.15"
              />
              <line
                x1={index % 2 === 1 ? "35" : "55"}
                y1="50"
                x2={index % 2 === 1 ? "45" : "65"}
                y2="50"
                stroke="var(--color-brand-green-400)"
                strokeWidth="0.1"
                opacity="0.2"
              />
            </svg>

            {/* Text content */}
            <div
              className={`relative z-10 mx-auto flex min-h-100 max-w-7xl items-center px-8 py-12 sm:px-12 lg:w-[60%] lg:px-16 ${
                index % 2 === 1 ? "lg:ml-auto lg:mr-0" : "lg:ml-0"
              }`}
            >
              <div>
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/80 shadow-sm backdrop-blur-sm">
                  <ServiceIcon type={service.icon} className="h-8 w-8 text-brand-green-600" />
                </div>
                <h2 className="mt-6 text-2xl font-bold tracking-tight text-brand-black sm:text-3xl">
                  {service.title}
                </h2>
                <div className="mt-4 h-px w-10 bg-brand-green-300/30" aria-hidden="true" />
                <p className="mt-3 max-w-md text-lg leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
                <Link
                  href="/booking"
                  className="mt-6 inline-flex items-center rounded-lg bg-brand-green-500 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-500 focus-visible:ring-offset-2"
                >
                  Book This Service
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Insurance Info */}
      <section className="bg-brand-green-50/50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-brand-black">
            Medical Aid & Payment
          </h2>
          <p className="mt-4 text-muted-foreground">
            We accept all medical aids and offer flexible payment options.
            Contact us for more information about coverage and pricing.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center text-base font-semibold text-brand-green-600 transition-colors duration-200 hover:text-brand-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-500 focus-visible:ring-offset-2"
          >
            Get in Touch
            <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
