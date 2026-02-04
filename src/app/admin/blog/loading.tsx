export default function BlogLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-8 bg-neutral-200 rounded w-40 mb-2 animate-pulse" />
          <div className="h-4 bg-neutral-200 rounded w-64 animate-pulse" />
        </div>
        <div className="h-10 bg-neutral-200 rounded w-28 animate-pulse" />
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="min-w-full divide-y divide-neutral-200">
          <thead className="bg-neutral-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Author
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-neutral-200">
            {Array.from({ length: 5 }).map((_, i) => (
              <tr key={i}>
                <td className="px-6 py-4">
                  <div className="animate-pulse">
                    <div className="h-4 bg-neutral-200 rounded w-48 mb-2" />
                    <div className="h-3 bg-neutral-200 rounded w-64" />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-6 bg-neutral-200 rounded w-20 animate-pulse" />
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 bg-neutral-200 rounded w-24 animate-pulse" />
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 bg-neutral-200 rounded w-20 animate-pulse" />
                </td>
                <td className="px-6 py-4">
                  <div className="h-8 bg-neutral-200 rounded w-24 ml-auto animate-pulse" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
