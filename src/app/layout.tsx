import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/constants";
import { StructuredData } from "@/components/shared/StructuredData";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.name} - Professional Eye Care in Mahikeng`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  metadataBase: new URL(SITE_CONFIG.url),
  keywords: [
    "optometrist",
    "optometry",
    "eye care",
    "eye exam",
    "glasses",
    "eyeglasses",
    "prescription glasses",
    "contact lenses",
    "sunglasses",
    "Mahikeng",
    "North West",
    "South Africa",
    "Nirvana Optical",
    "eye test",
    "driver's licence eye test",
    "pediatric eye care",
    "children's glasses",
  ],
  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/nirvana-eye.jpeg", sizes: "any" },
      { url: "/nirvana-eye.jpeg", type: "image/jpeg", sizes: "32x32" },
      { url: "/nirvana-eye.jpeg", type: "image/jpeg", sizes: "16x16" },
    ],
    apple: [
      { url: "/nirvana-eye.jpeg", sizes: "180x180", type: "image/jpeg" },
    ],
    shortcut: "/nirvana-eye.jpeg",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    images: [
      {
        url: "/nirvana-optical-promo.png",
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} - Professional Eye Care in Mahikeng`,
      },
      {
        url: "/logo.jpg",
        width: 726,
        height: 334,
        alt: SITE_CONFIG.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    images: ["/nirvana-optical-promo.png"],
    creator: "@nirvanaoptical",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  category: "healthcare",
  other: {
    "theme-color": "#4a9d5b",
    "msapplication-TileColor": "#4a9d5b",
    "msapplication-TileImage": "/nirvana-eye.jpeg",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": SITE_CONFIG.name,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <StructuredData />
      </head>
      <body className="antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
