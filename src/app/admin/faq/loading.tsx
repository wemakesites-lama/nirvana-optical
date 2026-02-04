export default function FAQLoading() {
  return (
    <div className="space-y-6">
      <div>
        <div className="h-8 bg-neutral-200 rounded w-24 mb-2 animate-pulse" />
        <div className="h-4 bg-neutral-200 rounded w-72 animate-pulse" />
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="h-10 bg-neutral-200 rounded w-40 animate-pulse" />
        <div className="h-10 bg-neutral-200 rounded w-24 animate-pulse" />
      </div>

      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4 animate-pulse"
          >
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <div className="h-4 bg-neutral-200 rounded w-24 mb-2" />
                <div className="h-5 bg-neutral-200 rounded w-3/4 mb-2" />
                <div className="h-4 bg-neutral-200 rounded w-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
