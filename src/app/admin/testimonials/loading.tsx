export default function TestimonialsLoading() {
  return (
    <div className="space-y-6">
      <div>
        <div className="h-8 bg-neutral-200 rounded w-40 mb-2 animate-pulse" />
        <div className="h-4 bg-neutral-200 rounded w-64 animate-pulse" />
      </div>

      <div className="flex justify-end mb-6">
        <div className="h-10 bg-neutral-200 rounded w-36 animate-pulse" />
      </div>

      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4 animate-pulse"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-neutral-200 rounded-full" />
              <div className="flex-1">
                <div className="h-5 bg-neutral-200 rounded w-32 mb-2" />
                <div className="h-4 bg-neutral-200 rounded w-full mb-1" />
                <div className="h-4 bg-neutral-200 rounded w-3/4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
