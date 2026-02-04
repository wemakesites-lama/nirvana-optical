import { Suspense } from 'react'
import { getTestimonials } from '@/lib/db/queries'
import { TestimonialsManager } from '@/components/admin/TestimonialsManager'

export const metadata = {
  title: 'Testimonials | Nirvana Optical Admin',
}

export default function TestimonialsPage() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-brand-black">Testimonials</h1>
        <p className="text-sm sm:text-base text-neutral-600 mt-1">
          Manage customer reviews and testimonials
        </p>
      </div>

      <Suspense fallback={<TestimonialsSkeleton />}>
        <TestimonialsContent />
      </Suspense>
    </div>
  )
}

async function TestimonialsContent() {
  const { data: testimonials, error } = await getTestimonials()

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
        Error loading testimonials: {error.message}
      </div>
    )
  }

  return <TestimonialsManager initialTestimonials={testimonials ?? []} />
}

function TestimonialsSkeleton() {
  return (
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
  )
}
