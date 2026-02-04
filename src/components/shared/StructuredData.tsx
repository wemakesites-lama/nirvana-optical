import { SITE_CONFIG } from "@/lib/constants";

export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_CONFIG.url}/#organization`,
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/logo.jpeg`,
    sameAs: [
      SITE_CONFIG.social.facebook,
      SITE_CONFIG.social.instagram,
    ].filter(Boolean),
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "Optician",
    "@id": `${SITE_CONFIG.url}/#localbusiness`,
    name: SITE_CONFIG.name,
    alternateName: "Nirvana Optical Mahikeng",
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    logo: `${SITE_CONFIG.url}/logo.jpeg`,
    image: [
      `${SITE_CONFIG.url}/nirvana-eye.jpeg`,
      `${SITE_CONFIG.url}/logo.jpeg`,
      `${SITE_CONFIG.url}/Nirvana optical store.jpeg`,
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.address.street,
      addressLocality: SITE_CONFIG.address.city,
      addressRegion: SITE_CONFIG.address.province,
      postalCode: SITE_CONFIG.address.postalCode,
      addressCountry: "ZA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -25.8652,
      longitude: 25.6441,
    },
    openingHoursSpecification: SITE_CONFIG.hours
      .filter((h) => h.open !== "Closed")
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.day,
        opens: h.open,
        closes: h.close,
      })),
    priceRange: "$$",
    currenciesAccepted: "ZAR",
    paymentAccepted: "Cash, Credit Card, Medical Aid",
    slogan: SITE_CONFIG.tagline,
    areaServed: {
      "@type": "City",
      name: "Mahikeng",
      containedInPlace: {
        "@type": "State",
        name: "North West",
        containedInPlace: {
          "@type": "Country",
          name: "South Africa",
        },
      },
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Optometry Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Comprehensive Eye Exams",
            description: "Thorough vision and eye health assessments using advanced diagnostic technology.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Contact Lens Fitting",
            description: "Expert fitting for all types of contact lenses.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Prescription Eyeglasses",
            description: "Designer and affordable frames with precision-crafted lenses.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Driver's Licence Eye Test",
            description: "Professional eye tests for driver's licence applications and renewals.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Pediatric Eye Care",
            description: "Specialised eye examinations for children.",
          },
        },
      ],
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_CONFIG.url}/#website`,
    url: SITE_CONFIG.url,
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    publisher: {
      "@id": `${SITE_CONFIG.url}/#organization`,
    },
    inLanguage: "en-ZA",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
