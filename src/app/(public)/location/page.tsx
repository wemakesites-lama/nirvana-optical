import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/shared/PageHeader";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Location & Hours",
  description:
    "Find Nirvana Optical at Shop No 13, Cnr First Street & Bessemer Street, Mahikeng. View our hours of operation and get directions.",
};

function isOpenNow(): { isOpen: boolean; todayHours: string } {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const now = new Date();
  const today = days[now.getDay()];
  const todayEntry = SITE_CONFIG.hours.find((h) => h.day === today);

  if (!todayEntry || todayEntry.open === "Closed") {
    return { isOpen: false, todayHours: "Closed" };
  }

  return {
    isOpen: true,
    todayHours: `${todayEntry.open} - ${todayEntry.close}`,
  };
}

export default function LocationPage() {
  const { todayHours } = isOpenNow();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const todayName = days[new Date().getDay()];

  return (
    <>
      <PageHeader
        title="Find Us"
        subtitle="Visit Nirvana Optical in the heart of Mahikeng."
      />

      {/* Map — full-width, hero position */}
      <section className="w-full">
        <iframe
          title="Nirvana Optical location on Google Maps"
          src={`https://maps.google.com/maps?q=${encodeURIComponent(`${SITE_CONFIG.address.street}, ${SITE_CONFIG.address.city}, ${SITE_CONFIG.address.province}, ${SITE_CONFIG.address.country}`)}&t=&z=17&ie=UTF8&iwloc=&output=embed`}
          className="h-80 w-full border-0 sm:h-96 lg:h-[500px]"
          width="100%"
          height="500"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </section>

      {/* Info Grid */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        {/* Subtle geometric lines — horizontal & vertical only */}
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
            opacity="0.2"
          />
          <line
            x1="0" y1="70" x2="100" y2="70"
            stroke="var(--color-brand-green-200)"
            strokeWidth="0.08"
            opacity="0.2"
          />
          <line
            x1="33" y1="0" x2="33" y2="100"
            stroke="var(--color-brand-green-300)"
            strokeWidth="0.08"
            opacity="0.15"
            strokeDasharray="200"
            strokeDashoffset="200"
            className="motion-safe:animate-line-draw"
          />
          <line
            x1="66" y1="0" x2="66" y2="100"
            stroke="var(--color-brand-green-300)"
            strokeWidth="0.08"
            opacity="0.15"
            strokeDasharray="200"
            strokeDashoffset="200"
            className="motion-safe:animate-line-draw"
          />
        </svg>

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-3">
            {/* Address */}
            <div className="group relative bg-white p-8 transition-all duration-300 hover:bg-brand-green-50/30">
              {/* Edge accent */}
              <span className="absolute left-0 top-0 h-full w-px bg-brand-green-200/40" aria-hidden="true" />
              {/* Corner accents — TL + BR */}
              <span className="absolute left-0 top-0 h-6 w-px bg-brand-green-300/25 transition-colors duration-300 group-hover:bg-brand-green-400/40" aria-hidden="true" />
              <span className="absolute left-0 top-0 h-px w-6 bg-brand-green-300/25 transition-colors duration-300 group-hover:bg-brand-green-400/40" aria-hidden="true" />
              <span className="absolute bottom-0 right-0 h-6 w-px bg-brand-green-300/25 transition-colors duration-300 group-hover:bg-brand-green-400/40" aria-hidden="true" />
              <span className="absolute bottom-0 right-0 h-px w-6 bg-brand-green-300/25 transition-colors duration-300 group-hover:bg-brand-green-400/40" aria-hidden="true" />

              <div className="relative flex h-12 w-12 items-center justify-center text-brand-green-600">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {/* Micro corner marks */}
                <span className="absolute left-0 top-0 h-2 w-px bg-brand-green-400/30 transition-colors duration-300 group-hover:bg-brand-green-500/50" aria-hidden="true" />
                <span className="absolute left-0 top-0 h-px w-2 bg-brand-green-400/30 transition-colors duration-300 group-hover:bg-brand-green-500/50" aria-hidden="true" />
                <span className="absolute bottom-0 right-0 h-2 w-px bg-brand-green-400/30 transition-colors duration-300 group-hover:bg-brand-green-500/50" aria-hidden="true" />
                <span className="absolute bottom-0 right-0 h-px w-2 bg-brand-green-400/30 transition-colors duration-300 group-hover:bg-brand-green-500/50" aria-hidden="true" />
              </div>
              <h2 className="mt-6 text-xl font-semibold text-brand-black">
                Address
              </h2>
              <div className="mt-4 h-px w-8 bg-brand-green-300/30" aria-hidden="true" />
              <address className="mt-4 not-italic text-sm leading-relaxed text-muted-foreground">
                <p>{SITE_CONFIG.address.street}</p>
                <p>
                  {SITE_CONFIG.address.city}, {SITE_CONFIG.address.province}
                </p>
                <p>{SITE_CONFIG.address.postalCode}</p>
              </address>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                  `${SITE_CONFIG.address.street}, ${SITE_CONFIG.address.city}, ${SITE_CONFIG.address.province}, ${SITE_CONFIG.address.country}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center text-sm font-medium text-brand-green-600 transition-colors duration-200 hover:text-brand-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-500"
              >
                <span className="mr-2 inline-block h-px w-0 bg-brand-green-500 transition-all duration-300 group-hover:w-4" aria-hidden="true" />
                Get Directions
                <svg className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>

            {/* Hours */}
            <div className="group relative bg-white p-8 transition-all duration-300 hover:bg-brand-green-50/30">
              {/* Edge accent */}
              <span className="absolute left-0 top-0 h-px w-full bg-brand-green-200/40" aria-hidden="true" />
              {/* Corner accents — TR + BL */}
              <span className="absolute right-0 top-0 h-6 w-px bg-brand-green-300/25 transition-colors duration-300 group-hover:bg-brand-green-400/40" aria-hidden="true" />
              <span className="absolute right-0 top-0 h-px w-6 bg-brand-green-300/25 transition-colors duration-300 group-hover:bg-brand-green-400/40" aria-hidden="true" />
              <span className="absolute bottom-0 left-0 h-6 w-px bg-brand-green-300/25 transition-colors duration-300 group-hover:bg-brand-green-400/40" aria-hidden="true" />
              <span className="absolute bottom-0 left-0 h-px w-6 bg-brand-green-300/25 transition-colors duration-300 group-hover:bg-brand-green-400/40" aria-hidden="true" />

              {/* Faint internal horizontal line */}
              <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" preserveAspectRatio="none" viewBox="0 0 100 100">
                <line x1="10" y1="65" x2="90" y2="65" stroke="var(--color-brand-green-200)" strokeWidth="0.15" opacity="0.15" />
              </svg>

              <div className="relative flex h-12 w-12 items-center justify-center text-brand-green-600">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="absolute left-0 top-0 h-2 w-px bg-brand-green-400/30 transition-colors duration-300 group-hover:bg-brand-green-500/50" aria-hidden="true" />
                <span className="absolute left-0 top-0 h-px w-2 bg-brand-green-400/30 transition-colors duration-300 group-hover:bg-brand-green-500/50" aria-hidden="true" />
                <span className="absolute bottom-0 right-0 h-2 w-px bg-brand-green-400/30 transition-colors duration-300 group-hover:bg-brand-green-500/50" aria-hidden="true" />
                <span className="absolute bottom-0 right-0 h-px w-2 bg-brand-green-400/30 transition-colors duration-300 group-hover:bg-brand-green-500/50" aria-hidden="true" />
              </div>
              <h2 className="mt-6 text-xl font-semibold text-brand-black">
                Hours of Operation
              </h2>
              <div className="mt-4 h-px w-8 bg-brand-green-300/30" aria-hidden="true" />
              <div className="mt-4">
                <p className="mb-3 text-sm">
                  <span className="font-medium text-brand-black">Today:</span>{" "}
                  <span className="tabular-nums text-muted-foreground">
                    {todayHours}
                  </span>
                </p>
                <table className="w-full text-sm" aria-label="Hours of operation">
                  <thead className="sr-only">
                    <tr>
                      <th scope="col">Day</th>
                      <th scope="col">Hours</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SITE_CONFIG.hours.map((entry) => (
                      <tr
                        key={entry.day}
                        className={
                          entry.day === todayName
                            ? "font-medium text-brand-green-600"
                            : "text-muted-foreground"
                        }
                      >
                        <th scope="row" className="py-1 font-normal text-left">{entry.day}</th>
                        <td className="py-1 text-right tabular-nums">
                          {entry.open === "Closed"
                            ? "Closed"
                            : `${entry.open} - ${entry.close}`}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Contact Quick */}
            <div className="group relative bg-white p-8 transition-all duration-300 hover:bg-brand-green-50/30">
              {/* Edge accent */}
              <span className="absolute right-0 top-0 h-full w-px bg-brand-green-200/40" aria-hidden="true" />
              {/* Corner accents — TL + TR */}
              <span className="absolute left-0 top-0 h-6 w-px bg-brand-green-300/25 transition-colors duration-300 group-hover:bg-brand-green-400/40" aria-hidden="true" />
              <span className="absolute left-0 top-0 h-px w-6 bg-brand-green-300/25 transition-colors duration-300 group-hover:bg-brand-green-400/40" aria-hidden="true" />
              <span className="absolute right-0 top-0 h-6 w-px bg-brand-green-300/25 transition-colors duration-300 group-hover:bg-brand-green-400/40" aria-hidden="true" />
              <span className="absolute right-0 top-0 h-px w-6 bg-brand-green-300/25 transition-colors duration-300 group-hover:bg-brand-green-400/40" aria-hidden="true" />

              <div className="relative flex h-12 w-12 items-center justify-center text-brand-green-600">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="absolute left-0 top-0 h-2 w-px bg-brand-green-400/30 transition-colors duration-300 group-hover:bg-brand-green-500/50" aria-hidden="true" />
                <span className="absolute left-0 top-0 h-px w-2 bg-brand-green-400/30 transition-colors duration-300 group-hover:bg-brand-green-500/50" aria-hidden="true" />
                <span className="absolute bottom-0 right-0 h-2 w-px bg-brand-green-400/30 transition-colors duration-300 group-hover:bg-brand-green-500/50" aria-hidden="true" />
                <span className="absolute bottom-0 right-0 h-px w-2 bg-brand-green-400/30 transition-colors duration-300 group-hover:bg-brand-green-500/50" aria-hidden="true" />
              </div>
              <h2 className="mt-6 text-xl font-semibold text-brand-black">
                Quick Contact
              </h2>
              <div className="mt-4 h-px w-8 bg-brand-green-300/30" aria-hidden="true" />
              <div className="mt-4 space-y-3">
                <a
                  href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`}
                  className="block text-sm text-muted-foreground transition-colors duration-200 hover:text-brand-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-500"
                >
                  {SITE_CONFIG.phone}
                </a>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="block text-sm text-muted-foreground transition-colors duration-200 hover:text-brand-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-500"
                >
                  {SITE_CONFIG.email}
                </a>
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-brand-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-500"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </a>
              </div>
              <div className="mt-6">
                <Link
                  href="/booking"
                  className="inline-flex w-full items-center justify-center rounded-lg bg-brand-green-500 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-500 focus-visible:ring-offset-2"
                >
                  Book Appointment
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
