export default function CarouselLoading() {
  return (
    <div className="space-y-6">
      <div>
        <div className="h-8 bg-neutral-200 rounded w-48 mb-2 animate-pulse" />
        <div className="h-4 bg-neutral-200 rounded w-80 animate-pulse" />
      </div>

      <div className="flex justify-end mb-6">
        <div className="h-10 bg-neutral-200 rounded w-28 animate-pulse" />
      </div>

      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4 animate-pulse"
          >
            <div className="flex items-center gap-4">
              <div className="w-32 h-20 bg-neutral-200 rounded" />
              <div className="flex-1">
                <div className="h-5 bg-neutral-200 rounded w-48 mb-2" />
                <div className="h-4 bg-neutral-200 rounded w-64" />
              </div>
              <div className="h-6 bg-neutral-200 rounded w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
