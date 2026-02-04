"use client";

import { useEffect, useRef } from "react";

interface UseCarouselAutoplayOptions {
  totalSlides: number;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  interval: number;
  isPaused: boolean;
}

export function useCarouselAutoplay({
  totalSlides,
  setCurrentIndex,
  interval,
  isPaused,
}: UseCarouselAutoplayOptions) {
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || isPaused || totalSlides <= 1) {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = null;
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, interval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, totalSlides, interval, setCurrentIndex]);
}
