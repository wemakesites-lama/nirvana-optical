import { Suspense } from 'react'
import { getFAQItems, getFAQCategories } from '@/lib/db/queries'
import { FAQManager } from '@/components/admin/FAQManager'

export const metadata = {
  title: 'FAQ | Nirvana Optical Admin',
}

export default function FAQPage() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-brand-black">FAQ</h1>
        <p className="text-sm sm:text-base text-neutral-600 mt-1">
          Manage frequently asked questions by category
        </p>
      </div>

      <Suspense fallback={<FAQSkeleton />}>
        <FAQContent />
      </Suspense>
    </div>
  )
}

async function FAQContent() {
  const [faqResult, categories] = await Promise.all([
    getFAQItems(),
    getFAQCategories(),
  ])

  if (faqResult.error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
        Error loading FAQ items: {faqResult.error.message}
      </div>
    )
  }

  return (
    <FAQManager
      initialItems={faqResult.data ?? []}
      categories={categories}
    />
  )
}

function FAQSkeleton() {
  return (
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
  )
}
