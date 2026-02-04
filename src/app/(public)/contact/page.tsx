import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { ContactForm } from "@/components/shared/ContactForm";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us - Get in Touch",
  description:
    "Get in touch with Nirvana Optical in Mahikeng. Call us at 018 338 1015, email, WhatsApp, or visit us for all your eye care needs.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact Us"
        subtitle="Have a question or ready to book? We're here to help."
      />

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-brand-black">
                Send Us a Message
              </h2>
              <p className="mt-2 text-muted-foreground">
                Fill out the form below and we&rsquo;ll get back to you as soon
                as possible.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>

            {/* Contact Info */}
            <div className="lg:pl-8">
              <h2 className="text-2xl font-bold tracking-tight text-brand-black">
                Get in Touch
              </h2>
              <p className="mt-2 text-muted-foreground">
                Reach us through any of the following channels.
              </p>

              <div className="mt-8 space-y-6">
                {/* Phone */}
                <div className="flex items-start gap-4 rounded-xl border border-border p-5 transition-shadow duration-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-green-50">
                    <svg className="h-5 w-5 text-brand-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-black">Phone</h3>
                    <a
                      href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`}
                      className="mt-1 text-muted-foreground transition-colors duration-200 hover:text-brand-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-500"
                    >
                      {SITE_CONFIG.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 rounded-xl border border-border p-5 transition-shadow duration-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-green-50">
                    <svg className="h-5 w-5 text-brand-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-black">Email</h3>
                    <a
                      href={`mailto:${SITE_CONFIG.email}`}
                      className="mt-1 text-muted-foreground transition-colors duration-200 hover:text-brand-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-500"
                    >
                      {SITE_CONFIG.email}
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 rounded-xl border border-border bg-green-50 p-5 transition-shadow duration-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-500 focus-visible:ring-offset-2"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25D366]">
                    <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-black">WhatsApp</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Send us a message for quick responses
                    </p>
                  </div>
                </a>

                {/* Address */}
                <div className="flex items-start gap-4 rounded-xl border border-border p-5 transition-shadow duration-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-green-50">
                    <svg className="h-5 w-5 text-brand-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-black">Visit Us</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {SITE_CONFIG.address.street}
                      <br />
                      {SITE_CONFIG.address.city},{" "}
                      {SITE_CONFIG.address.province}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
