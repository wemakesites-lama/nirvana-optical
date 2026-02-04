import Image from "next/image";
import Link from "next/link";
import type { PromoBanner } from "@/lib/database.types";

interface CarouselSlideProps {
  banner: PromoBanner;
}

export function CarouselSlide({ banner }: CarouselSlideProps) {
  const content = renderSlideContent(banner);

  if (banner.link_url) {
    return (
      <Link href={banner.link_url} className="block w-full">
        {content}
      </Link>
    );
  }

  return content;
}

function renderSlideContent(banner: PromoBanner) {
  switch (banner.layout) {
    case "full-image":
      return <FullImageSlide banner={banner} />;
    case "text-overlay":
      return <TextOverlaySlide banner={banner} />;
    case "split":
      return <SplitSlide banner={banner} />;
    default:
      return <FullImageSlide banner={banner} />;
  }
}

function FullImageSlide({ banner }: { banner: PromoBanner }) {
  return (
    <div className="relative aspect-[21/9] w-full sm:aspect-[3/1] lg:aspect-[4/1]">
      {banner.image_url && (
        <Image
          src={banner.image_url}
          alt={banner.image_alt || banner.headline}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      )}
      <span className="sr-only">
        {banner.headline}
        {banner.subheadline && `. ${banner.subheadline}`}
        {banner.link_text && `. ${banner.link_text}`}
      </span>
    </div>
  );
}

function TextOverlaySlide({ banner }: { banner: PromoBanner }) {
  return (
    <div
      className="relative flex aspect-[21/9] w-full items-center justify-center sm:aspect-[3/1] lg:aspect-[4/1]"
      style={{ backgroundColor: banner.background_color || undefined }}
    >
      {banner.image_url && (
        <Image
          src={banner.image_url}
          alt={banner.image_alt || banner.headline}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      )}
      {banner.image_url && (
        <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
      )}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <h2
          className="text-2xl font-bold sm:text-4xl lg:text-5xl"
          style={{ color: banner.text_color || "#ffffff" }}
        >
          {banner.headline}
        </h2>
        {banner.subheadline && (
          <p
            className="mt-2 text-base sm:text-lg lg:text-xl"
            style={{ color: banner.text_color || "#ffffff" }}
          >
            {banner.subheadline}
          </p>
        )}
        {banner.link_url && (
          <span className="mt-6 inline-flex items-center rounded-lg bg-brand-green-500 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand-green-600 sm:text-base">
            {banner.link_text}
          </span>
        )}
      </div>
    </div>
  );
}

function SplitSlide({ banner }: { banner: PromoBanner }) {
  return (
    <div className="flex aspect-[21/9] w-full flex-col sm:aspect-[3/1] sm:flex-row lg:aspect-[4/1]">
      <div
        className="flex flex-1 items-center justify-center px-8 py-6"
        style={{ backgroundColor: banner.background_color || "#f0f9f0" }}
      >
        <div className="max-w-md text-center sm:text-left">
          <h2 className="text-xl font-bold text-brand-black sm:text-3xl lg:text-4xl">
            {banner.headline}
          </h2>
          {banner.subheadline && (
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              {banner.subheadline}
            </p>
          )}
          {banner.link_url && (
            <span className="mt-4 inline-flex items-center rounded-lg bg-brand-green-500 px-5 py-2.5 text-sm font-semibold text-white">
              {banner.link_text}
            </span>
          )}
        </div>
      </div>
      {banner.image_url && (
        <div className="relative flex-1">
          <Image
            src={banner.image_url}
            alt={banner.image_alt || banner.headline}
            fill
            className="object-cover"
            sizes="50vw"
            priority
          />
        </div>
      )}
    </div>
  );
}
