'use client'

import { useState, useTransition } from 'react'
import { GalleryGrid } from './GalleryGrid'
import { ImageUploader } from './ImageUploader'
import {
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
  reorderGalleryImages,
} from '@/lib/actions/gallery'
import type { GalleryImage } from '@/lib/database.types'

interface GalleryManagerProps {
  initialImages: GalleryImage[]
}

const CATEGORIES = [
  { value: 'frames', label: 'Frames' },
  { value: 'sunglasses', label: 'Sunglasses' },
  { value: 'contact-lenses', label: 'Contact Lenses' },
  { value: 'store', label: 'Store' },
] as const

export function GalleryManager({ initialImages }: GalleryManagerProps) {
  const [images, setImages] = useState(initialImages)
  const [showModal, setShowModal] = useState(false)
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [filterCategory, setFilterCategory] = useState<string>('')

  // Form state
  const [imageUrl, setImageUrl] = useState('')
  const [altText, setAltText] = useState('')
  const [category, setCategory] = useState<GalleryImage['category']>('frames')
  const [brand, setBrand] = useState('')
  const [description, setDescription] = useState('')

  const openAddModal = () => {
    setEditingImage(null)
    setImageUrl('')
    setAltText('')
    setCategory('frames')
    setBrand('')
    setDescription('')
    setError(null)
    setShowModal(true)
  }

  const openEditModal = (image: GalleryImage) => {
    setEditingImage(image)
    setImageUrl(image.image_url)
    setAltText(image.alt_text)
    setCategory(image.category)
    setBrand(image.brand ?? '')
    setDescription(image.description ?? '')
    setError(null)
    setShowModal(true)
  }

  const handleDelete = (id: string) => {
    // Optimistic update
    setImages(images.filter((img) => img.id !== id))

    startTransition(async () => {
      const result = await deleteGalleryImage(id)
      if (!result.success) {
        // Revert on error
        setImages(initialImages)
      }
    })
  }

  const handleReorder = (reorderedImages: GalleryImage[]) => {
    // If filtering, we need to merge the reordered subset back into the full list
    if (filterCategory) {
      const otherImages = images.filter((img) => img.category !== filterCategory)
      // Update sort_order for reordered images
      const updatedReordered = reorderedImages.map((img, index) => ({
        ...img,
        sort_order: index,
      }))
      setImages([...otherImages, ...updatedReordered].sort((a, b) => a.sort_order - b.sort_order))

      startTransition(async () => {
        await reorderGalleryImages(updatedReordered.map((img) => img.id))
      })
    } else {
      // Update sort_order for all images
      const updatedImages = reorderedImages.map((img, index) => ({
        ...img,
        sort_order: index,
      }))
      setImages(updatedImages)

      startTransition(async () => {
        await reorderGalleryImages(updatedImages.map((img) => img.id))
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const formData = new FormData()
    formData.set('image_url', imageUrl)
    formData.set('alt_text', altText)
    formData.set('category', category)
    formData.set('brand', brand)
    formData.set('description', description)
    formData.set('sort_order', String(images.length))

    startTransition(async () => {
      const result = editingImage
        ? await updateGalleryImage(editingImage.id, formData)
        : await createGalleryImage(formData)

      if (result.success && result.data) {
        if (editingImage) {
          setImages(images.map((img) =>
            img.id === editingImage.id ? result.data! : img
          ))
        } else {
          setImages([...images, result.data])
        }
        setShowModal(false)
      } else {
        setError(result.error ?? 'An error occurred')
      }
    })
  }

  const filteredImages = filterCategory
    ? images.filter((img) => img.category === filterCategory)
    : images

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          <select
            className="px-3 py-2 border border-neutral-300 rounded-md text-sm"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 bg-brand-green-600 text-white px-4 py-2 rounded-md hover:bg-brand-green-700 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Image
        </button>
      </div>

      <GalleryGrid
        images={filteredImages}
        onEdit={openEditModal}
        onDelete={handleDelete}
        onReorder={handleReorder}
        isPending={isPending}
      />

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-brand-black mb-4">
                {editingImage ? 'Edit Image' : 'Add Image'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Image
                  </label>
                  <ImageUploader
                    value={imageUrl}
                    onChange={setImageUrl}
                    bucket="gallery"
                  />
                </div>

                <div>
                  <label
                    htmlFor="altText"
                    className="block text-sm font-medium text-neutral-700 mb-1"
                  >
                    Alt Text / Title
                  </label>
                  <input
                    id="altText"
                    type="text"
                    value={altText}
                    onChange={(e) => setAltText(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-brand-green-500 focus:border-brand-green-500"
                    placeholder="e.g., Designer rectangular frames"
                  />
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-neutral-700 mb-1"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) =>
                      setCategory(e.target.value as GalleryImage['category'])
                    }
                    className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-brand-green-500 focus:border-brand-green-500"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="brand"
                    className="block text-sm font-medium text-neutral-700 mb-1"
                  >
                    Brand (optional)
                  </label>
                  <input
                    id="brand"
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-brand-green-500 focus:border-brand-green-500"
                    placeholder="e.g., Ray-Ban, CooperVision"
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-neutral-700 mb-1"
                  >
                    Description (optional)
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={2}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-brand-green-500 focus:border-brand-green-500"
                    placeholder="e.g., MyDay, Biofinity, Avaira Vitality"
                  />
                  <p className="mt-1 text-xs text-neutral-500">
                    Useful for product lines or additional details
                  </p>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-neutral-700 bg-neutral-100 rounded-md hover:bg-neutral-200 transition-colors"
                    disabled={isPending}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isPending || !imageUrl}
                    className="px-4 py-2 bg-brand-green-600 text-white rounded-md hover:bg-brand-green-700 transition-colors disabled:opacity-50"
                  >
                    {isPending ? 'Saving...' : editingImage ? 'Update' : 'Add'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
