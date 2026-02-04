import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";

export const metadata: Metadata = {
  title: "About Our Optometry Practice",
  description:
    "Learn about Nirvana Optical, your trusted optometry practice in Mahikeng. Dedicated to quality eye care with advanced diagnostic technology.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Us"
        subtitle="Your trusted partner in eye care, committed to helping Mahikeng see better."
      />

      {/* Our Story */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-brand-black sm:text-4xl">
                Our Story
              </h2>
              <div className="mt-6 space-y-4 text-muted-foreground">
                <p>
                  Nirvana Optical was founded with a simple yet powerful vision:
                  to provide the community of Mahikeng with accessible,
                  professional eye care of the highest standard.
                </p>
                <p>
                  Located at the corner of First Street and Bessemer Street, our
                  practice has become a trusted destination for comprehensive
                  eye examinations, quality eyewear, and personalised optical
                  solutions.
                </p>
                <p>
                  We believe that clear vision transforms lives. Whether
                  it&rsquo;s a child seeing the board clearly for the first
                  time, or an adult finding the perfect frames that reflect their
                  personality, every patient&rsquo;s experience matters to us.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-brand-green-50">
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <svg
                      className="mx-auto h-24 w-24 text-brand-green-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={0.5}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <p className="mt-4 text-sm text-brand-green-400">
                      Practice photo
                    </p>
                  </div>
                </div>
              </div>
              {/* Green frame accent (from logo design) */}
              <div
                className="absolute -bottom-3 -right-3 -z-10 h-full w-full rounded-2xl border-2 border-brand-green-200"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-brand-black sm:text-4xl">
              Meet Our Team
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Dedicated professionals committed to your eye health.
            </p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Victor Monama",
                role: "Lead Optometrist",
                bio: "With years of experience in comprehensive eye care, Monama leads our clinical team with expertise and compassion.",
              },
              {
                name: "Staff Member 1",
                role: "Optical Dispenser",
                bio: "Specialising in frame selection and lens fitting, helping patients find the perfect eyewear to match their style and needs.",
              },
              {
                name: "Staff Member 2",
                role: "Practice Manager",
                bio: "Ensuring smooth operations and excellent patient experiences from booking to follow-up care.",
              },
            ].map((member) => (
              <div key={member.name} className="text-center">
                <div className="mx-auto h-40 w-40 overflow-hidden rounded-full border-4 border-brand-green-100 bg-brand-green-50">
                  <div className="flex h-full items-center justify-center">
                    <svg
                      className="h-16 w-16 text-brand-green-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={0.5}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="mt-6 text-lg font-semibold text-brand-black">
                  {member.name}
                </h3>
                <p className="text-sm font-medium text-brand-green-600">
                  {member.role}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Store */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-brand-black sm:text-4xl">
              Our Store
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Step into our welcoming space on the corner of First Street and
              Bessemer Street. Our store is designed to make your eyewear
              experience comfortable and enjoyable, with a wide selection of
              frames beautifully displayed for easy browsing.
            </p>
          </div>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { id: "store-1", alt: "Store interior showing frame display" },
              { id: "store-2", alt: "Eyewear display wall" },
              { id: "store-3", alt: "Consultation area" },
            ].map((image) => (
              <div
                key={image.id}
                className="aspect-4/3 overflow-hidden rounded-xl bg-brand-green-50"
              >
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-brand-green-200"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
                      />
                    </svg>
                    <p className="mt-2 text-xs text-brand-green-400">
                      {image.alt}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-brand-green-50/50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-brand-black sm:text-4xl">
              Our Values
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              The principles that guide everything we do at Nirvana Optical.
            </p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Excellence",
                description:
                  "We maintain the highest standards in eye care, using advanced equipment and staying current with the latest developments in optometry.",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                  />
                ),
              },
              {
                title: "Compassion",
                description:
                  "Every patient receives personalised attention and care. We take the time to understand your needs and address your concerns thoroughly.",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                ),
              },
              {
                title: "Accessibility",
                description:
                  "Quality eye care should be available to everyone. We offer a range of options to suit different budgets without compromising on quality.",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                  />
                ),
              },
            ].map((value) => (
              <div
                key={value.title}
                className="rounded-2xl border border-border bg-white p-8"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-green-50">
                  <svg
                    className="h-6 w-6 text-brand-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  >
                    {value.icon}
                  </svg>
                </div>
                <h3 className="mt-5 text-xl font-semibold text-brand-black">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
