import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for Nirvana Optical in Mahikeng. Learn how we collect, use, store, and protect your personal and health information securely.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your personal information."
      />

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl prose prose-green">
          <p className="text-sm text-muted-foreground">
            Last updated: February 2026
          </p>

          <h2 className="mt-8 text-xl font-bold text-brand-black">
            1. Introduction
          </h2>
          <p className="mt-4 text-muted-foreground">
            {SITE_CONFIG.name} (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting
            your privacy. This Privacy Policy explains how we collect, use,
            disclose, and safeguard your information when you visit our website
            or use our optometry services.
          </p>

          <h2 className="mt-8 text-xl font-bold text-brand-black">
            2. Information We Collect
          </h2>
          <p className="mt-4 text-muted-foreground">
            We may collect the following types of information:
          </p>
          <ul className="mt-4 space-y-2 text-muted-foreground">
            <li>
              <strong>Personal Information:</strong> Name, email address, phone
              number, and postal address when you book an appointment or contact
              us.
            </li>
            <li>
              <strong>Health Information:</strong> Eye health records,
              prescriptions, and medical history necessary for providing
              optometry services.
            </li>
            <li>
              <strong>Payment Information:</strong> Medical aid details and
              payment information for processing transactions.
            </li>
            <li>
              <strong>Usage Data:</strong> Information about how you interact
              with our website, including IP address, browser type, and pages
              visited.
            </li>
          </ul>

          <h2 className="mt-8 text-xl font-bold text-brand-black">
            3. How We Use Your Information
          </h2>
          <p className="mt-4 text-muted-foreground">
            We use the information we collect to:
          </p>
          <ul className="mt-4 space-y-2 text-muted-foreground">
            <li>Provide and maintain our optometry services</li>
            <li>Process appointments and bookings</li>
            <li>Communicate with you about your appointments and eye care</li>
            <li>Process payments and medical aid claims</li>
            <li>Improve our website and services</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2 className="mt-8 text-xl font-bold text-brand-black">
            4. Information Sharing
          </h2>
          <p className="mt-4 text-muted-foreground">
            We do not sell your personal information. We may share your
            information with:
          </p>
          <ul className="mt-4 space-y-2 text-muted-foreground">
            <li>Medical aid providers for claims processing</li>
            <li>Healthcare professionals for referrals when necessary</li>
            <li>Service providers who assist in operating our business</li>
            <li>Legal authorities when required by law</li>
          </ul>

          <h2 className="mt-8 text-xl font-bold text-brand-black">
            5. Data Security
          </h2>
          <p className="mt-4 text-muted-foreground">
            We implement appropriate technical and organisational measures to
            protect your personal information against unauthorised access,
            alteration, disclosure, or destruction. However, no method of
            transmission over the internet is 100% secure.
          </p>

          <h2 className="mt-8 text-xl font-bold text-brand-black">
            6. Your Rights
          </h2>
          <p className="mt-4 text-muted-foreground">
            Under the Protection of Personal Information Act (POPIA), you have
            the right to:
          </p>
          <ul className="mt-4 space-y-2 text-muted-foreground">
            <li>Access your personal information</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Object to processing of your information</li>
            <li>Lodge a complaint with the Information Regulator</li>
          </ul>

          <h2 className="mt-8 text-xl font-bold text-brand-black">
            7. Cookies
          </h2>
          <p className="mt-4 text-muted-foreground">
            Our website uses cookies to enhance your browsing experience. You
            can control cookie settings through your browser preferences.
          </p>

          <h2 className="mt-8 text-xl font-bold text-brand-black">
            8. Contact Us
          </h2>
          <p className="mt-4 text-muted-foreground">
            If you have questions about this Privacy Policy or wish to exercise
            your rights, please contact us:
          </p>
          <ul className="mt-4 space-y-2 text-muted-foreground">
            <li>
              <strong>Address:</strong> {SITE_CONFIG.address.street},{" "}
              {SITE_CONFIG.address.city}, {SITE_CONFIG.address.province}
            </li>
            <li>
              <strong>Phone:</strong> {SITE_CONFIG.phone}
            </li>
            <li>
              <strong>Email:</strong> {SITE_CONFIG.email}
            </li>
          </ul>

          <h2 className="mt-8 text-xl font-bold text-brand-black">
            9. Changes to This Policy
          </h2>
          <p className="mt-4 text-muted-foreground">
            We may update this Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the &quot;Last updated&quot; date.
          </p>
        </div>
      </section>
    </>
  );
}
