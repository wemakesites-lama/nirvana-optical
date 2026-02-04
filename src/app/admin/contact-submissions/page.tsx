import { Suspense } from 'react'
import { getContactSubmissions } from '@/lib/db/queries'
import { ContactSubmissionsManager } from '@/components/admin/ContactSubmissionsManager'

export const metadata = {
  title: 'Contact Messages | Nirvana Optical Admin',
}

export default function ContactSubmissionsPage() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-brand-black">
          Contact Messages
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 mt-1">
          View and manage contact form submissions
        </p>
      </div>

      <Suspense fallback={<SubmissionsSkeleton />}>
        <SubmissionsContent />
      </Suspense>
    </div>
  )
}

async function SubmissionsContent() {
  const { data: submissions, error } = await getContactSubmissions()

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
        Error loading submissions: {error.message}
      </div>
    )
  }

  return <ContactSubmissionsManager submissions={submissions ?? []} />
}

function SubmissionsSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4 animate-pulse"
        >
          <div className="flex items-start gap-4">
            <div className="w-3 h-3 rounded-full bg-neutral-200 mt-2" />
            <div className="flex-1">
              <div className="h-5 bg-neutral-200 rounded w-32 mb-2" />
              <div className="h-4 bg-neutral-200 rounded w-48 mb-1" />
              <div className="h-4 bg-neutral-200 rounded w-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
