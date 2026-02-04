'use client'

/* eslint-disable @next/next/no-img-element */

import { useState, useTransition } from 'react'
import Image from 'next/image'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { ImageUploader } from './ImageUploader'
import {
  createPromoBanner,
  updatePromoBanner,
  deletePromoBanner,
  togglePromoBannerActive,
  reorderPromoBanners,
} from '@/lib/actions/promo'
import type { PromoBanner } from '@/lib/database.types'

interface CarouselManagerProps {
  initialBanners: PromoBanner[]
}

const layoutOptions = [
  {
    value: 'text-overlay',
    label: 'Text Overlay',
    description: 'Text displayed over the image with a gradient overlay',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={1.5} />
        <path strokeLinecap="round" strokeWidth={1.5} d="M6 15h12M6 18h8" />
      </svg>
    ),
  },
  {
    value: 'full-image',
    label: 'Full Image',
    description: 'Image fills the entire banner, text on hover',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={1.5} />
        <circle cx="9" cy="9" r="2" strokeWidth={1.5} />
        <path strokeLinecap="round" strokeWidth={1.5} d="M3 17l6-6 4 4 5-5 3 3" />
      </svg>
    ),
  },
  {
    value: 'split',
    label: 'Split Layout',
    description: 'Text on one side, image on the other',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={1.5} />
        <path strokeWidth={1.5} d="M12 3v18" />
        <path strokeLinecap="round" strokeWidth={1.5} d="M6 9h3M6 12h2M6 15h4" />
      </svg>
    ),
  },
]

export function CarouselManager({ initialBanners }: CarouselManagerProps) {
  const [banners, setBanners] = useState(initialBanners)
  const [showModal, setShowModal] = useState(false)
  const [editingBanner, setEditingBanner] = useState<PromoBanner | null>(null)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'content' | 'appearance'>('content')

  // Form state
  const [headline, setHeadline] = useState('')
  const [subheadline, setSubheadline] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [linkUrl, setLinkUrl] = useState('')
  const [linkText, setLinkText] = useState('')
  const [layout, setLayout] = useState<PromoBanner['layout']>('text-overlay')
  const [isActive, setIsActive] = useState(true)
  const [backgroundColor, setBackgroundColor] = useState('#1a3c34')

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const resetForm = () => {
    setHeadline('')
    setSubheadline('')
    setImageUrl('')
    setLinkUrl('')
    setLinkText('')
    setLayout('text-overlay')
    setIsActive(true)
    setBackgroundColor('#1a3c34')
    setError(null)
    setActiveTab('content')
  }

  const openAddModal = () => {
    setEditingBanner(null)
    resetForm()
    setShowModal(true)
  }

  const openEditModal = (banner: PromoBanner) => {
    setEditingBanner(banner)
    setHeadline(banner.headline)
    setSubheadline(banner.subheadline ?? '')
    setImageUrl(banner.image_url ?? '')
    setLinkUrl(banner.link_url ?? '')
    setLinkText(banner.link_text)
    setLayout(banner.layout)
    setIsActive(banner.is_active)
    setBackgroundColor(banner.background_color ?? '#1a3c34')
    setError(null)
    setActiveTab('content')
    setShowModal(true)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = banners.findIndex((b) => b.id === active.id)
      const newIndex = banners.findIndex((b) => b.id === over.id)
      const newOrder = arrayMove(banners, oldIndex, newIndex)

      setBanners(newOrder)

      startTransition(async () => {
        await reorderPromoBanners(newOrder.map((b) => b.id))
      })
    }
  }

  const handleToggleActive = (id: string, currentActive: boolean) => {
    setBanners(
      banners.map((b) =>
        b.id === id ? { ...b, is_active: !currentActive } : b
      )
    )

    startTransition(async () => {
      await togglePromoBannerActive(id, !currentActive)
    })
  }

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this banner?')) return

    setBanners(banners.filter((b) => b.id !== id))

    startTransition(async () => {
      await deletePromoBanner(id)
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!headline.trim()) {
      setError('Headline is required')
      setActiveTab('content')
      return
    }

    if (!linkText.trim()) {
      setError('Button text is required')
      setActiveTab('content')
      return
    }

    const formData = new FormData()
    formData.set('headline', headline)
    formData.set('subheadline', subheadline)
    formData.set('image_url', imageUrl)
    formData.set('link_url', linkUrl)
    formData.set('link_text', linkText)
    formData.set('layout', layout)
    formData.set('is_active', String(isActive))
    formData.set('sort_order', String(banners.length))
    formData.set('background_color', backgroundColor)

    startTransition(async () => {
      const result = editingBanner
        ? await updatePromoBanner(editingBanner.id, formData)
        : await createPromoBanner(formData)

      if (result.success && result.data) {
        if (editingBanner) {
          setBanners(
            banners.map((b) =>
              b.id === editingBanner.id ? result.data! : b
            )
          )
        } else {
          setBanners([...banners, result.data])
        }
        setShowModal(false)
      } else {
        setError(result.error ?? 'An error occurred')
      }
    })
  }

  return (
    <>
      {/* Header with stats */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="text-sm text-neutral-600">
            <span className="font-medium text-brand-black">{banners.length}</span> total banners
            <span className="mx-2">•</span>
            <span className="font-medium text-green-600">{banners.filter(b => b.is_active).length}</span> active
          </div>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 bg-brand-green-600 text-white px-4 py-2.5 rounded-lg hover:bg-brand-green-700 transition-colors font-medium shadow-sm"
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
          Add Banner
        </button>
      </div>

      {banners.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-16 text-center">
          <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-brand-black mb-2">No banners yet</h3>
          <p className="text-neutral-600 mb-6 max-w-sm mx-auto">
            Create your first promotional banner to showcase offers, announcements, or featured content on your homepage.
          </p>
          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 bg-brand-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-brand-green-700 transition-colors font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Your First Banner
          </button>
        </div>
      ) : (
        <div className={isPending ? 'opacity-50 pointer-events-none' : ''}>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={banners}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-3">
                {banners.map((banner, index) => (
                  <SortableBanner
                    key={banner.id}
                    banner={banner}
                    index={index}
                    onEdit={() => openEditModal(banner)}
                    onDelete={() => handleDelete(banner.id)}
                    onToggleActive={() =>
                      handleToggleActive(banner.id, banner.is_active)
                    }
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
          <p className="text-sm text-neutral-500 mt-4 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Drag banners to reorder. The first active banner will be shown prominently.
          </p>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
              <div>
                <h2 className="text-xl font-semibold text-brand-black">
                  {editingBanner ? 'Edit Banner' : 'Create New Banner'}
                </h2>
                <p className="text-sm text-neutral-600 mt-0.5">
                  {editingBanner ? 'Update your promotional banner' : 'Add a new promotional banner to your carousel'}
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-neutral-200 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 overflow-hidden flex flex-col">
              {/* Tab Navigation */}
              <div className="px-6 pt-4 border-b border-neutral-200">
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => setActiveTab('content')}
                    className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                      activeTab === 'content'
                        ? 'bg-white text-brand-green-600 border border-b-white border-neutral-200 -mb-px'
                        : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    Content
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('appearance')}
                    className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                      activeTab === 'appearance'
                        ? 'bg-white text-brand-green-600 border border-b-white border-neutral-200 -mb-px'
                        : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    Appearance
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                <div className="p-6">
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-6 flex items-center gap-2">
                      <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {error}
                    </div>
                  )}

                  {activeTab === 'content' ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Left Column - Form Fields */}
                      <div className="space-y-5">
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                            Headline <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={headline}
                            onChange={(e) => setHeadline(e.target.value)}
                            placeholder="e.g., Summer Sale - 30% Off"
                            className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-green-500 focus:border-brand-green-500 transition-colors"
                          />
                          <p className="text-xs text-neutral-500 mt-1">Main text that grabs attention</p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                            Subheadline
                          </label>
                          <input
                            type="text"
                            value={subheadline}
                            onChange={(e) => setSubheadline(e.target.value)}
                            placeholder="e.g., Limited time offer on all frames"
                            className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-green-500 focus:border-brand-green-500 transition-colors"
                          />
                          <p className="text-xs text-neutral-500 mt-1">Supporting text with more details</p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                            Banner Image
                          </label>
                          <ImageUploader
                            value={imageUrl}
                            onChange={setImageUrl}
                            bucket="banners"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                              Button Text <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={linkText}
                              onChange={(e) => setLinkText(e.target.value)}
                              placeholder="Learn More"
                              className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-green-500 focus:border-brand-green-500 transition-colors"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                              Button Link
                            </label>
                            <input
                              type="text"
                              value={linkUrl}
                              onChange={(e) => setLinkUrl(e.target.value)}
                              placeholder="/services"
                              className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-green-500 focus:border-brand-green-500 transition-colors"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Right Column - Preview */}
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                          Live Preview
                        </label>
                        <BannerPreview
                          headline={headline}
                          subheadline={subheadline}
                          imageUrl={imageUrl}
                          linkText={linkText}
                          layout={layout}
                          backgroundColor={backgroundColor}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Layout Selection */}
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-3">
                          Layout Style
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                          {layoutOptions.map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => setLayout(option.value as PromoBanner['layout'])}
                              className={`p-4 border-2 rounded-xl text-left transition-all ${
                                layout === option.value
                                  ? 'border-brand-green-500 bg-brand-green-50 ring-1 ring-brand-green-500'
                                  : 'border-neutral-200 hover:border-neutral-300'
                              }`}
                            >
                              <div className={`mb-2 ${layout === option.value ? 'text-brand-green-600' : 'text-neutral-400'}`}>
                                {option.icon}
                              </div>
                              <div className="font-medium text-sm text-brand-black">{option.label}</div>
                              <div className="text-xs text-neutral-500 mt-0.5">{option.description}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Color & Status */}
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                            Background Color
                          </label>
                          <div className="flex items-center gap-3">
                            <input
                              type="color"
                              value={backgroundColor}
                              onChange={(e) => setBackgroundColor(e.target.value)}
                              className="w-12 h-12 border border-neutral-300 rounded-lg cursor-pointer"
                            />
                            <input
                              type="text"
                              value={backgroundColor}
                              onChange={(e) => setBackgroundColor(e.target.value)}
                              className="flex-1 px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-green-500 uppercase font-mono text-sm"
                            />
                          </div>
                          <p className="text-xs text-neutral-500 mt-1">Used when no image is set or as overlay tint</p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                            Visibility
                          </label>
                          <div
                            onClick={() => setIsActive(!isActive)}
                            className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                              isActive
                                ? 'border-green-500 bg-green-50'
                                : 'border-neutral-200 hover:border-neutral-300'
                            }`}
                          >
                            <div className={`w-10 h-6 rounded-full relative transition-colors ${
                              isActive ? 'bg-green-500' : 'bg-neutral-300'
                            }`}>
                              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                                isActive ? 'translate-x-5' : 'translate-x-1'
                              }`} />
                            </div>
                            <div>
                              <div className="font-medium text-sm text-brand-black">
                                {isActive ? 'Active' : 'Inactive'}
                              </div>
                              <div className="text-xs text-neutral-500">
                                {isActive ? 'Visible on your website' : 'Hidden from visitors'}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Appearance Preview */}
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                          Preview with Current Settings
                        </label>
                        <BannerPreview
                          headline={headline || 'Your Headline Here'}
                          subheadline={subheadline || 'Your subheadline text'}
                          imageUrl={imageUrl}
                          linkText={linkText || 'Learn More'}
                          layout={layout}
                          backgroundColor={backgroundColor}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between">
                <div className="text-sm text-neutral-500">
                  {activeTab === 'content' ? (
                    <span>Step 1 of 2: Add your content</span>
                  ) : (
                    <span>Step 2 of 2: Customize appearance</span>
                  )}
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-5 py-2.5 text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 font-medium transition-colors"
                    disabled={isPending}
                  >
                    Cancel
                  </button>
                  {activeTab === 'content' ? (
                    <button
                      type="button"
                      onClick={() => setActiveTab('appearance')}
                      className="px-5 py-2.5 bg-brand-green-600 text-white rounded-lg hover:bg-brand-green-700 font-medium transition-colors"
                    >
                      Next: Appearance
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isPending}
                      className="px-5 py-2.5 bg-brand-green-600 text-white rounded-lg hover:bg-brand-green-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {isPending ? (
                        <>
                          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Saving...
                        </>
                      ) : editingBanner ? (
                        'Update Banner'
                      ) : (
                        'Create Banner'
                      )}
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

function BannerPreview({
  headline,
  subheadline,
  imageUrl,
  linkText,
  layout,
  backgroundColor,
}: {
  headline: string
  subheadline: string
  imageUrl: string
  linkText: string
  layout: PromoBanner['layout']
  backgroundColor: string
}) {
  const hasImage = imageUrl && (imageUrl.startsWith('/') || imageUrl.startsWith('http'))

  return (
    <div
      className="rounded-xl overflow-hidden border border-neutral-200 shadow-sm"
      style={{ backgroundColor }}
    >
      <div className="relative aspect-[16/7] min-h-[180px]">
        {layout === 'split' ? (
          <div className="absolute inset-0 flex">
            <div className="w-1/2 p-6 flex flex-col justify-center text-white">
              <h3 className="text-xl font-bold mb-2 line-clamp-2">
                {headline || 'Your Headline'}
              </h3>
              {subheadline && (
                <p className="text-sm opacity-90 mb-4 line-clamp-2">{subheadline}</p>
              )}
              <span className="inline-block bg-white text-brand-black px-4 py-2 rounded-lg text-sm font-medium w-fit">
                {linkText || 'Learn More'}
              </span>
            </div>
            <div className="w-1/2 relative bg-neutral-200">
              {hasImage ? (
                <img
                  src={imageUrl}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-neutral-400">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        ) : layout === 'full-image' ? (
          <>
            {hasImage ? (
              <img
                src={imageUrl}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-neutral-400 bg-neutral-200">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
            <div className="absolute inset-0 bg-black/20 flex items-end p-6">
              <div className="text-white">
                <h3 className="text-xl font-bold mb-1 line-clamp-1">
                  {headline || 'Your Headline'}
                </h3>
                {subheadline && (
                  <p className="text-sm opacity-90 line-clamp-1">{subheadline}</p>
                )}
              </div>
            </div>
          </>
        ) : (
          // text-overlay (default)
          <>
            {hasImage && (
              <img
                src={imageUrl}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            <div className={`absolute inset-0 ${hasImage ? 'bg-gradient-to-r from-black/70 via-black/50 to-transparent' : ''}`} />
            <div className="absolute inset-0 p-6 flex flex-col justify-center text-white max-w-[60%]">
              <h3 className="text-xl font-bold mb-2 line-clamp-2">
                {headline || 'Your Headline'}
              </h3>
              {subheadline && (
                <p className="text-sm opacity-90 mb-4 line-clamp-2">{subheadline}</p>
              )}
              <span className="inline-block bg-white text-brand-black px-4 py-2 rounded-lg text-sm font-medium w-fit">
                {linkText || 'Learn More'}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function SortableBanner({
  banner,
  index,
  onEdit,
  onDelete,
  onToggleActive,
}: {
  banner: PromoBanner
  index: number
  onEdit: () => void
  onDelete: () => void
  onToggleActive: () => void
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: banner.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  }

  const hasImage = banner.image_url && (banner.image_url.startsWith('/') || banner.image_url.startsWith('http'))

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden ${
        isDragging ? 'shadow-xl ring-2 ring-brand-green-500' : ''
      }`}
    >
      <div className="flex items-stretch">
        {/* Drag Handle */}
        <div
          {...attributes}
          {...listeners}
          className="w-12 bg-neutral-50 flex items-center justify-center cursor-grab active:cursor-grabbing hover:bg-neutral-100 border-r border-neutral-200"
        >
          <svg
            className="w-5 h-5 text-neutral-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 8h16M4 16h16"
            />
          </svg>
        </div>

        {/* Order Number */}
        <div className="w-10 flex items-center justify-center text-sm font-medium text-neutral-400 border-r border-neutral-100">
          {index + 1}
        </div>

        {/* Image Preview */}
        <div className="w-32 h-20 relative bg-neutral-100 flex-shrink-0">
          {hasImage ? (
            <Image
              src={banner.image_url!}
              alt=""
              fill
              className="object-cover"
              sizes="128px"
            />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ backgroundColor: banner.background_color || '#1a3c34' }}
            >
              <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-4 min-w-0">
          <div className="flex items-start gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-brand-black truncate">
                {banner.headline}
              </h3>
              {banner.subheadline && (
                <p className="text-sm text-neutral-600 truncate mt-0.5">
                  {banner.subheadline}
                </p>
              )}
              <div className="flex items-center gap-2 mt-2 text-xs text-neutral-500">
                <span className="capitalize">{banner.layout.replace('-', ' ')}</span>
                {banner.link_url && (
                  <>
                    <span>•</span>
                    <span className="truncate">{banner.link_url}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 px-3 border-l border-neutral-100">
          <button
            onClick={onToggleActive}
            className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
              banner.is_active
                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            {banner.is_active ? 'Active' : 'Inactive'}
          </button>

          <button
            onClick={onEdit}
            className="p-2 text-neutral-500 hover:text-brand-green-600 hover:bg-brand-green-50 rounded-lg transition-colors"
            title="Edit banner"
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
            onClick={onDelete}
            className="p-2 text-neutral-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete banner"
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
  )
}
