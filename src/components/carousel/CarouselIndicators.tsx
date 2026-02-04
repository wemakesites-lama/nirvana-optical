interface CarouselIndicatorsProps {
  total: number;
  current: number;
  onSelect: (index: number) => void;
}

export function CarouselIndicators({
  total,
  current,
  onSelect,
}: CarouselIndicatorsProps) {
  return (
    <div
      className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2"
      role="tablist"
      aria-label="Slide navigation"
    >
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          role="tab"
          aria-selected={index === current}
          aria-label={`Go to slide ${index + 1}`}
          onClick={() => onSelect(index)}
          className={`h-2.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-500 focus-visible:ring-offset-2 ${
            index === current
              ? "w-8 bg-brand-green-500"
              : "w-2.5 bg-white/70 hover:bg-white"
          }`}
        />
      ))}
    </div>
  );
}
