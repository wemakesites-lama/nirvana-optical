export default function SettingsLoading() {
  return (
    <div className="space-y-6">
      <div>
        <div className="h-8 bg-neutral-200 rounded w-32 mb-2 animate-pulse" />
        <div className="h-4 bg-neutral-200 rounded w-64 animate-pulse" />
      </div>

      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6 animate-pulse"
        >
          <div className="h-6 bg-neutral-200 rounded w-48 mb-4" />
          <div className="space-y-4">
            <div>
              <div className="h-4 bg-neutral-200 rounded w-32 mb-2" />
              <div className="h-10 bg-neutral-200 rounded w-full" />
            </div>
            <div>
              <div className="h-4 bg-neutral-200 rounded w-40 mb-2" />
              <div className="h-10 bg-neutral-200 rounded w-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
