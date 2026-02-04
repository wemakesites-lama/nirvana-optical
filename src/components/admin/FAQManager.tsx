'use client'

import { useState, useTransition } from 'react'
import {
  createFAQItem,
  updateFAQItem,
  deleteFAQItem,
} from '@/lib/actions/faq'
import type { FAQItem } from '@/lib/database.types'

interface FAQManagerProps {
  initialItems: FAQItem[]
  categories: string[]
}

const DEFAULT_CATEGORIES = [
  'Eye Tests',
  'Frames & Lenses',
  'Contact Lenses',
  'Medical Aid',
  'Booking',
]

export function FAQManager({ initialItems, categories }: FAQManagerProps) {
  const [items, setItems] = useState(initialItems)
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState<FAQItem | null>(null)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [filterCategory, setFilterCategory] = useState<string>('')

  const allCategories = [
    ...new Set([...DEFAULT_CATEGORIES, ...categories]),
  ]

  const [category, setCategory] = useState('')
  const [customCategory, setCustomCategory] = useState('')
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')

  const resetForm = () => {
    setCategory('')
    setCustomCategory('')
    setQuestion('')
    setAnswer('')
    setError(null)
  }

  const openAddModal = () => {
    setEditingItem(null)
    resetForm()
    setShowModal(true)
  }

  const openEditModal = (item: FAQItem) => {
    setEditingItem(item)
    setCategory(item.category)
    setCustomCategory('')
    setQuestion(item.question)
    setAnswer(item.answer)
    setError(null)
    setShowModal(true)
  }

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this FAQ item?')) return

    setItems(items.filter((item) => item.id !== id))

    startTransition(async () => {
      await deleteFAQItem(id)
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const finalCategory = category === 'custom' ? customCategory : category

    if (!finalCategory) {
      setError('Please select or enter a category')
      return
    }

    const formData = new FormData()
    formData.set('category', finalCategory)
    formData.set('question', question)
    formData.set('answer', answer)
    formData.set('sort_order', String(items.length))

    startTransition(async () => {
      const result = editingItem
        ? await updateFAQItem(editingItem.id, formData)
        : await createFAQItem(formData)

      if (result.success && result.data) {
        if (editingItem) {
          setItems(
            items.map((item) =>
              item.id === editingItem.id ? result.data! : item
            )
          )
        } else {
          setItems([...items, result.data])
        }
        setShowModal(false)
      } else {
        setError(result.error ?? 'An error occurred')
      }
    })
  }

  const filteredItems = filterCategory
    ? items.filter((item) => item.category === filterCategory)
    : items

  // Group items by category
  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = []
    }
    acc[item.category].push(item)
    return acc
  }, {} as Record<string, FAQItem[]>)

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-3 py-2 border border-neutral-300 rounded-md text-sm"
        >
          <option value="">All Categories</option>
          {allCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

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
          Add FAQ
        </button>
      </div>

      {Object.keys(groupedItems).length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-12 text-center">
          <p className="text-neutral-600 mb-4">No FAQ items yet</p>
        </div>
      ) : (
        <div className={`space-y-6 ${isPending ? 'opacity-50' : ''}`}>
          {Object.entries(groupedItems).map(([categoryName, categoryItems]) => (
            <div key={categoryName}>
              <h3 className="text-lg font-semibold text-brand-black mb-3">
                {categoryName}
              </h3>
              <div className="space-y-3">
                {categoryItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-brand-black mb-2">
                          {item.question}
                        </h4>
                        <p className="text-neutral-600 text-sm whitespace-pre-wrap">
                          {item.answer}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => openEditModal(item)}
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
                          onClick={() => handleDelete(item.id)}
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
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-brand-black mb-4">
                {editingItem ? 'Edit FAQ' : 'Add FAQ'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-brand-green-500"
                  >
                    <option value="">Select a category</option>
                    {allCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                    <option value="custom">+ New Category</option>
                  </select>

                  {category === 'custom' && (
                    <input
                      type="text"
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                      className="w-full mt-2 px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-brand-green-500"
                      placeholder="Enter new category name"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Question
                  </label>
                  <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-brand-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Answer
                  </label>
                  <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-brand-green-500"
                  />
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
                    {isPending ? 'Saving...' : editingItem ? 'Update' : 'Add'}
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
