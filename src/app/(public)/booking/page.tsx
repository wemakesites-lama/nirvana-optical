import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description:
    "Schedule your eye exam or consultation online with Nirvana Optical in Mahikeng. Easy online booking available 24/7 for eye tests and services.",
};

export default function BookingPage() {
  return (
    <>
      <PageHeader
        title="Book Your Appointment"
        subtitle="Schedule your visit online, anytime. Choose a date and time that works best for you."
      />

      {/* Booking Widget */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="overflow-hidden rounded-2xl border-2 border-brand-green-100 bg-white">
            <div className="flex min-h-[500px] items-center justify-center bg-brand-green-50/30 p-8">
              {/* Placeholder for Setmore embed */}
              <div className="text-center">
                <svg
                  className="mx-auto h-16 w-16 text-brand-green-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                  />
                </svg>
                <h2 className="mt-4 text-xl font-semibold text-brand-black">
                  Online Booking
                </h2>
                <p className="mt-2 max-w-md text-sm text-muted-foreground">
                  Setmore booking widget will be embedded here. Select your
                  preferred service, date, and time slot.
                </p>
                <a
                  href={SITE_CONFIG.setmoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center rounded-lg bg-brand-green-500 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-500 focus-visible:ring-offset-2"
                >
                  Open Booking Page
                  <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before Your Visit */}
      <section className="bg-brand-green-50/50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-2xl font-bold tracking-tight text-brand-black sm:text-3xl">
            Before Your Visit
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {[
              {
                title: "What to Bring",
                items: [
                  "Medical aid card and details",
                  "Previous prescription or glasses",
                  "List of current medications",
                  "Sunglasses (for dilation)",
                ],
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                ),
              },
              {
                title: "What to Expect",
                items: [
                  "Comprehensive eye health check",
                  "Visual acuity assessment",
                  "Refraction test for prescriptions",
                  "Discussion of results and options",
                ],
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                ),
              },
              {
                title: "Cancellation Policy",
                items: [
                  "24 hours notice for cancellations",
                  "Reschedule online anytime",
                  "Late arrivals may be rescheduled",
                  "Contact us for emergencies",
                ],
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                ),
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-border bg-white p-8"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-green-50">
                  <svg className="h-6 w-6 text-brand-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                    {card.icon}
                  </svg>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-brand-black">
                  {card.title}
                </h3>
                <ul className="mt-3 space-y-2">
                  {card.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-brand-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
