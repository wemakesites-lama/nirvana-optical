'use client'

import dynamic from 'next/dynamic'
import type { PromoBanner } from '@/lib/database.types'

const CarouselManager = dynamic(
  () => import('./CarouselManager').then(mod => ({ default: mod.CarouselManager })),
  {
    loading: () => (
      <div className="animate-pulse">
        <div className="h-12 bg-neutral-200 rounded w-32 mb-6" />
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4 h-24" />
          ))}
        </div>
      </div>
    ),
    ssr: false,
  }
)

interface Props {
  initialBanners: PromoBanner[]
}

export function DynamicCarouselManager({ initialBanners }: Props) {
  return <CarouselManager initialBanners={initialBanners} />
}
