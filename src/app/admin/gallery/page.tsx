import { Suspense } from 'react'
import { getGalleryImages } from '@/lib/db/queries'
import { GalleryManager } from '@/components/admin/GalleryManager'

export const metadata = {
  title: 'Gallery | Nirvana Optical Admin',
}

export default function GalleryPage() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-brand-black">Gallery</h1>
        <p className="text-sm sm:text-base text-neutral-600 mt-1">
          Manage your eyewear gallery images. Drag to reorder.
        </p>
      </div>

      <Suspense fallback={<GallerySkeleton />}>
        <GalleryContent />
      </Suspense>
    </div>
  )
}

async function GalleryContent() {
  const { data: images, error } = await getGalleryImages()

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
        Error loading gallery: {error.message}
      </div>
    )
  }

  return <GalleryManager initialImages={images ?? []} />
}

function GallerySkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
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
  )
}
