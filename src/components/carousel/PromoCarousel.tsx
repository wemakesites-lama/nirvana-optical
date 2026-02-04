"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { CarouselSlide } from "./CarouselSlide";
import { CarouselControls } from "./CarouselControls";
import { CarouselIndicators } from "./CarouselIndicators";
import { useCarouselAutoplay } from "./useCarouselAutoplay";
import type { PromoBanner } from "@/lib/database.types";

interface PromoCarouselProps {
  banners: PromoBanner[];
  autoAdvanceInterval?: number;
}

export function PromoCarousel({
  banners,
  autoAdvanceInterval = 5000,
}: PromoCarouselProps) {
  const activeBanners = banners
    .filter((b) => b.is_active)
    .sort((a, b) => a.sort_order - b.sort_order);

  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useCarouselAutoplay({
    totalSlides: activeBanners.length,
    currentIndex,
    setCurrentIndex,
    interval: autoAdvanceInterval,
    isPaused,
  });

  useEffect(() => {
    if (containerRef.current) {
      const slideWidth = containerRef.current.offsetWidth;
      containerRef.current.scrollTo({
        left: slideWidth * currentIndex,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
  }, [activeBanners.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex(
      (prev) => (prev - 1 + activeBanners.length) % activeBanners.length
    );
  }, [activeBanners.length]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goPrev();
        e.preventDefault();
      }
      if (e.key === "ArrowRight") {
        goNext();
        e.preventDefault();
      }
    },
    [goNext, goPrev]
  );

  if (activeBanners.length === 0) return null;

  if (activeBanners.length === 1) {
    return (
      <section aria-label="Promotion" className="w-full">
        <CarouselSlide banner={activeBanners[0]} />
      </section>
    );
  }

  return (
    <section
      aria-label="Promotions"
      aria-roledescription="carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className="relative w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-500 focus-visible:ring-offset-2"
    >
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        Slide {currentIndex + 1} of {activeBanners.length}:{" "}
        {activeBanners[currentIndex].headline}
      </div>

      <div
        ref={containerRef}
        className="flex w-full snap-x snap-mandatory overflow-hidden"
      >
        {activeBanners.map((banner, index) => (
          <div
            key={banner.id}
            className="w-full flex-shrink-0 snap-center"
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${index + 1} of ${activeBanners.length}: ${banner.headline}`}
            inert={index !== currentIndex ? true : undefined}
          >
            <CarouselSlide banner={banner} />
          </div>
        ))}
      </div>

      <CarouselControls onPrev={goPrev} onNext={goNext} />
      <CarouselIndicators
        total={activeBanners.length}
        current={currentIndex}
        onSelect={goToSlide}
      />
    </section>
  );
}
