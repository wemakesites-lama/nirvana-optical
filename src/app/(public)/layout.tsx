import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StructuredData } from "@/components/shared/StructuredData";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import { StickyBookCTA } from "@/components/shared/StickyBookCTA";
import { CookieConsent } from "@/components/shared/CookieConsent";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StructuredData />
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
      <WhatsAppButton />
      <StickyBookCTA />
      <CookieConsent />
    </>
  );
}
