import { Suspense } from 'react'
import { getPromoBanners } from '@/lib/db/queries'
import { DynamicCarouselManager } from '@/components/admin/DynamicCarouselManager'

export const metadata = {
  title: 'Carousel & Promos | Nirvana Optical Admin',
}

export default function CarouselPage() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-brand-black">
          Carousel & Promotions
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 mt-1">
          Manage homepage carousel slides and promotional banners
        </p>
      </div>

      <Suspense fallback={<CarouselSkeleton />}>
        <CarouselContent />
      </Suspense>
    </div>
  )
}

async function CarouselContent() {
  const { data: banners, error } = await getPromoBanners()

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
        Error loading banners: {error.message}
      </div>
    )
  }

  return <DynamicCarouselManager initialBanners={banners ?? []} />
}

function CarouselSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4 animate-pulse"
        >
          <div className="flex items-center gap-4">
            <div className="w-32 h-20 bg-neutral-200 rounded" />
            <div className="flex-1">
              <div className="h-5 bg-neutral-200 rounded w-48 mb-2" />
              <div className="h-4 bg-neutral-200 rounded w-64" />
            </div>
            <div className="h-6 bg-neutral-200 rounded w-20" />
          </div>
        </div>
      ))}
    </div>
  )
}
