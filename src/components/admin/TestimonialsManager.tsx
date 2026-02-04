'use client'

import { useState, useTransition } from 'react'
import {
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  toggleTestimonialFeatured,
} from '@/lib/actions/testimonials'
import type { Testimonial } from '@/lib/database.types'

interface TestimonialsManagerProps {
  initialTestimonials: Testimonial[]
}

export function TestimonialsManager({
  initialTestimonials,
}: TestimonialsManagerProps) {
  const [testimonials, setTestimonials] = useState(initialTestimonials)
  const [showModal, setShowModal] = useState(false)
  const [editingTestimonial, setEditingTestimonial] =
    useState<Testimonial | null>(null)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const [name, setName] = useState('')
  const [rating, setRating] = useState(5)
  const [quote, setQuote] = useState('')
  const [isFeatured, setIsFeatured] = useState(false)

  const resetForm = () => {
    setName('')
    setRating(5)
    setQuote('')
    setIsFeatured(false)
    setError(null)
  }

  const openAddModal = () => {
    setEditingTestimonial(null)
    resetForm()
    setShowModal(true)
  }

  const openEditModal = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial)
    setName(testimonial.name)
    setRating(testimonial.rating)
    setQuote(testimonial.quote)
    setIsFeatured(testimonial.is_featured)
    setError(null)
    setShowModal(true)
  }

  const handleToggleFeatured = (id: string, currentFeatured: boolean) => {
    setTestimonials(
      testimonials.map((t) =>
        t.id === id ? { ...t, is_featured: !currentFeatured } : t
      )
    )

    startTransition(async () => {
      await toggleTestimonialFeatured(id, !currentFeatured)
    })
  }

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return

    setTestimonials(testimonials.filter((t) => t.id !== id))

    startTransition(async () => {
      await deleteTestimonial(id)
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const formData = new FormData()
    formData.set('name', name)
    formData.set('rating', String(rating))
    formData.set('quote', quote)
    formData.set('is_featured', String(isFeatured))
    formData.set('sort_order', String(testimonials.length))

    startTransition(async () => {
      const result = editingTestimonial
        ? await updateTestimonial(editingTestimonial.id, formData)
        : await createTestimonial(formData)

      if (result.success && result.data) {
        if (editingTestimonial) {
          setTestimonials(
            testimonials.map((t) =>
              t.id === editingTestimonial.id ? result.data! : t
            )
          )
        } else {
          setTestimonials([...testimonials, result.data])
        }
        setShowModal(false)
      } else {
        setError(result.error ?? 'An error occurred')
      }
    })
  }

  return (
    <>
      <div className="flex justify-end mb-6">
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
          Add Testimonial
        </button>
      </div>

      {testimonials.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-12 text-center">
          <p className="text-neutral-600 mb-4">No testimonials yet</p>
        </div>
      ) : (
        <div
          className={`space-y-4 ${isPending ? 'opacity-50' : ''}`}
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-brand-green-700 font-semibold text-lg">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-brand-black">
                      {testimonial.name}
                    </h3>
                    <div className="flex text-yellow-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < testimonial.rating
                              ? 'fill-current'
                              : 'fill-neutral-200'
                          }`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-neutral-600">&quot;{testimonial.quote}&quot;</p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() =>
                      handleToggleFeatured(
                        testimonial.id,
                        testimonial.is_featured
                      )
                    }
                    className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                      testimonial.is_featured
                        ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                    }`}
                  >
                    {testimonial.is_featured ? 'Featured' : 'Not Featured'}
                  </button>

                  <button
                    onClick={() => openEditModal(testimonial)}
                    className="p-2 text-neutral-600 hover:text-brand-green-600 hover:bg-neutral-100 rounded"
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
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={() => handleDelete(testimonial.id)}
                    className="p-2 text-neutral-600 hover:text-red-600 hover:bg-red-50 rounded"
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
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-brand-black mb-4">
                {editingTestimonial ? 'Edit Testimonial' : 'Add Testimonial'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-brand-green-500"
                    placeholder="e.g., John D."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Rating
                  </label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1"
                      >
                        <svg
                          className={`w-8 h-8 ${
                            star <= rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'fill-neutral-200 text-neutral-200'
                          }`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Quote
                  </label>
                  <textarea
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-brand-green-500"
                    placeholder="What did the customer say?"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={isFeatured}
                      onChange={(e) => setIsFeatured(e.target.checked)}
                      className="rounded border-neutral-300 text-brand-green-600 focus:ring-brand-green-500"
                    />
                    <span className="text-sm text-neutral-700">
                      Featured (show prominently on homepage)
                    </span>
                  </label>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-neutral-700 bg-neutral-100 rounded-md hover:bg-neutral-200"
                    disabled={isPending}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="px-4 py-2 bg-brand-green-600 text-white rounded-md hover:bg-brand-green-700 disabled:opacity-50"
                  >
                    {isPending
                      ? 'Saving...'
                      : editingTestimonial
                      ? 'Update'
                      : 'Add'}
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
