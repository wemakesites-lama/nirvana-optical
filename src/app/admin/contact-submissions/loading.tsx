export default function ContactSubmissionsLoading() {
  return (
    <div className="space-y-6">
      <div>
        <div className="h-8 bg-neutral-200 rounded w-48 mb-2 animate-pulse" />
        <div className="h-4 bg-neutral-200 rounded w-72 animate-pulse" />
      </div>

      <div className="flex gap-6">
        <div className="w-1/2">
          <div className="flex items-center gap-2 mb-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-9 bg-neutral-200 rounded w-24 animate-pulse" />
            ))}
          </div>

          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4 animate-pulse"
              >
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-neutral-200 mt-2" />
                  <div className="flex-1">
                    <div className="h-5 bg-neutral-200 rounded w-32 mb-2" />
                    <div className="h-4 bg-neutral-200 rounded w-48 mb-1" />
                    <div className="h-4 bg-neutral-200 rounded w-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-1/2">
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-12 animate-pulse">
            <div className="h-6 bg-neutral-200 rounded w-48 mx-auto" />
          </div>
        </div>
      </div>
    </div>
  )
}
