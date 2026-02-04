export default function AdminLoading() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-brand-green-200 rounded-full animate-spin border-t-brand-green-600" />
        </div>
        <p className="text-neutral-600">Loading...</p>
      </div>
    </div>
  )
}
