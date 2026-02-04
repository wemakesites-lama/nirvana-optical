export default function DashboardLoading() {
  return (
    <div className="space-y-6">
      <div>
        <div className="h-8 bg-neutral-200 rounded w-48 mb-2 animate-pulse" />
        <div className="h-4 bg-neutral-200 rounded w-80 animate-pulse" />
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-sm border border-neutral-200 p-5 animate-pulse"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="h-4 bg-neutral-200 rounded w-24 mb-2" />
                <div className="h-8 bg-neutral-200 rounded w-16 mb-2" />
                <div className="h-3 bg-neutral-200 rounded w-32" />
              </div>
              <div className="w-10 h-10 bg-neutral-200 rounded-lg" />
            </div>
          </div>
        ))}
      </div>

      {/* Cards Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-sm border border-neutral-200"
          >
            <div className="p-4 border-b border-neutral-200">
              <div className="h-5 bg-neutral-200 rounded w-48 animate-pulse" />
            </div>
            <div className="p-4 space-y-4 animate-pulse">
              {Array.from({ length: 5 }).map((_, j) => (
                <div key={j} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-neutral-200 mt-2" />
                  <div className="flex-1">
                    <div className="h-4 bg-neutral-200 rounded w-3/4 mb-2" />
                    <div className="h-3 bg-neutral-200 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
