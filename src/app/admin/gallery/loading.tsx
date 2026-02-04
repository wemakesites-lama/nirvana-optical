export default function GalleryLoading() {
  return (
    <div className="space-y-6">
      <div>
        <div className="h-8 bg-neutral-200 rounded w-32 mb-2 animate-pulse" />
        <div className="h-4 bg-neutral-200 rounded w-64 animate-pulse" />
      </div>

      <div className="flex justify-end mb-6">
        <div className="h-10 bg-neutral-200 rounded w-28 animate-pulse" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden animate-pulse"
          >
            <div className="w-full aspect-square bg-neutral-200" />
            <div className="p-3">
              <div className="h-4 bg-neutral-200 rounded w-3/4 mb-2" />
              <div className="h-4 bg-neutral-200 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
