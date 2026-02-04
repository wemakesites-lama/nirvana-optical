'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { DynamicBlogEditor } from './DynamicBlogEditor'
import { ImageUploader } from './ImageUploader'
import { createBlogPost, updateBlogPost } from '@/lib/actions/blog'
import { generateSlug } from '@/lib/validations'
import type { BlogPost } from '@/lib/database.types'

interface BlogFormProps {
  post?: BlogPost
}

export function BlogForm({ post }: BlogFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const [title, setTitle] = useState(post?.title ?? '')
  const [slug, setSlug] = useState(post?.slug ?? '')
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? '')
  const [content, setContent] = useState(post?.content ?? '')
  const [featuredImage, setFeaturedImage] = useState(post?.featured_image ?? '')
  const [author, setAuthor] = useState(post?.author ?? 'Nirvana Optical Team')
  const [status, setStatus] = useState<'draft' | 'published'>(
    post?.status ?? 'draft'
  )

  const [slugEdited, setSlugEdited] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  const handleTitleChange = (value: string) => {
    setTitle(value)
    setHasUnsavedChanges(true)
    if (!slugEdited && !post) {
      setSlug(generateSlug(value))
    }
  }

  const handleContentChange = (value: string) => {
    setContent(value)
    setHasUnsavedChanges(true)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSuccessMessage(null)

    const formData = new FormData()
    formData.set('title', title)
    formData.set('slug', slug)
    formData.set('excerpt', excerpt)
    formData.set('content', content)
    formData.set('featured_image', featuredImage)
    formData.set('author', author)
    formData.set('status', status)

    startTransition(async () => {
      const result = post
        ? await updateBlogPost(post.id, formData)
        : await createBlogPost(formData)

      if (result.success) {
        setHasUnsavedChanges(false)
        setSuccessMessage(post ? 'Post updated successfully!' : 'Post created successfully!')
        // Redirect after a short delay to show success message
        setTimeout(() => {
          router.push('/admin/blog')
        }, 1000)
      } else {
        setError(result.error ?? 'An error occurred')
      }
    })
  }

  const handleSaveAndContinue = () => {
    setError(null)
    setSuccessMessage(null)

    const formData = new FormData()
    formData.set('title', title)
    formData.set('slug', slug)
    formData.set('excerpt', excerpt)
    formData.set('content', content)
    formData.set('featured_image', featuredImage)
    formData.set('author', author)
    formData.set('status', status)

    startTransition(async () => {
      const result = post
        ? await updateBlogPost(post.id, formData)
        : await createBlogPost(formData)

      if (result.success) {
        setHasUnsavedChanges(false)
        setSuccessMessage('Changes saved!')
        // If creating new post, redirect to edit page
        if (!post && result.data) {
          router.replace(`/admin/blog/${result.data.id}/edit`)
        }
        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(null), 3000)
      } else {
        setError(result.error ?? 'An error occurred')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Status Messages */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-3">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-3">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{successMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Main Content - Takes 3/4 on xl screens */}
        <div className="xl:col-span-3 space-y-6">
          {/* Title Card */}
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-neutral-700 mb-2"
                >
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  required
                  className="w-full px-4 py-3 text-lg border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-green-500 focus:border-brand-green-500 transition-colors"
                  placeholder="Enter an engaging title for your post"
                />
              </div>

              <div>
                <label
                  htmlFor="slug"
                  className="block text-sm font-medium text-neutral-700 mb-2"
                >
                  URL Slug <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center">
                  <span className="text-neutral-500 text-sm bg-neutral-100 px-3 py-3 rounded-l-lg border border-r-0 border-neutral-300">
                    /blog/
                  </span>
                  <input
                    id="slug"
                    type="text"
                    value={slug}
                    onChange={(e) => {
                      setSlug(e.target.value)
                      setSlugEdited(true)
                      setHasUnsavedChanges(true)
                    }}
                    required
                    className="flex-1 px-4 py-3 border border-neutral-300 rounded-r-lg focus:ring-2 focus:ring-brand-green-500 focus:border-brand-green-500 transition-colors"
                    placeholder="post-url-slug"
                  />
                </div>
                <p className="mt-1 text-xs text-neutral-500">
                  This will be the URL of your blog post. Use lowercase letters, numbers, and hyphens only.
                </p>
              </div>

              <div>
                <label
                  htmlFor="excerpt"
                  className="block text-sm font-medium text-neutral-700 mb-2"
                >
                  Excerpt <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="excerpt"
                  value={excerpt}
                  onChange={(e) => {
                    setExcerpt(e.target.value)
                    setHasUnsavedChanges(true)
                  }}
                  required
                  rows={3}
                  maxLength={300}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-green-500 focus:border-brand-green-500 transition-colors resize-none"
                  placeholder="Write a brief summary that will appear in search results and social shares..."
                />
                <div className="mt-1 flex justify-between text-xs text-neutral-500">
                  <span>Used in search results and social media previews</span>
                  <span>{excerpt.length}/300</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Editor Card */}
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <label className="block text-sm font-medium text-neutral-700 mb-3">
              Content <span className="text-red-500">*</span>
            </label>
            <DynamicBlogEditor content={content} onChange={handleContentChange} />
            <p className="mt-2 text-xs text-neutral-500">
              Use the toolbar to format your content. Click on a heading button (H2, H3) to create sections.
            </p>
          </div>
        </div>

        {/* Sidebar - Takes 1/4 on xl screens */}
        <div className="xl:col-span-1 space-y-6">
          {/* Publish Card */}
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-5">
            <h3 className="font-semibold text-brand-black mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Publish
            </h3>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-neutral-700 mb-2"
                >
                  Status
                </label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value as 'draft' | 'published')
                    setHasUnsavedChanges(true)
                  }}
                  className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-green-500 focus:border-brand-green-500 transition-colors bg-white"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="author"
                  className="block text-sm font-medium text-neutral-700 mb-2"
                >
                  Author
                </label>
                <input
                  id="author"
                  type="text"
                  value={author}
                  onChange={(e) => {
                    setAuthor(e.target.value)
                    setHasUnsavedChanges(true)
                  }}
                  required
                  className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-green-500 focus:border-brand-green-500 transition-colors"
                  placeholder="Author name"
                />
              </div>

              {post && (
                <div className="pt-2 border-t border-neutral-200 text-xs text-neutral-500 space-y-1">
                  <p>
                    Created: {new Date(post.created_at).toLocaleDateString('en-ZA', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                  {post.published_at && (
                    <p>
                      Published: {new Date(post.published_at).toLocaleDateString('en-ZA', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-3 space-y-2">
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full px-4 py-2.5 bg-brand-green-600 text-white rounded-lg hover:bg-brand-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
                >
                  {isPending ? (
                    <>
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Saving...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {post ? 'Update Post' : 'Create Post'}
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleSaveAndContinue}
                  disabled={isPending}
                  className="w-full px-4 py-2.5 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  Save &amp; Continue Editing
                </button>

                <Link
                  href="/admin/blog"
                  className="w-full px-4 py-2.5 text-neutral-600 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors font-medium flex items-center justify-center"
                >
                  Cancel
                </Link>
              </div>

              {hasUnsavedChanges && (
                <p className="text-xs text-amber-600 flex items-center gap-1 pt-2">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  You have unsaved changes
                </p>
              )}
            </div>
          </div>

          {/* Featured Image Card */}
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-5">
            <h3 className="font-semibold text-brand-black mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Featured Image
            </h3>
            <ImageUploader
              value={featuredImage}
              onChange={(url) => {
                setFeaturedImage(url)
                setHasUnsavedChanges(true)
              }}
              bucket="blog"
            />
            <p className="mt-2 text-xs text-neutral-500">
              This image will appear at the top of your post and in social media shares.
            </p>
          </div>

          {/* Preview Link */}
          {post && post.status === 'published' && (
            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-5">
              <h3 className="font-semibold text-brand-black mb-3">Preview</h3>
              <Link
                href={`/blog/${post.slug}`}
                target="_blank"
                className="inline-flex items-center gap-2 text-brand-green-600 hover:text-brand-green-700 text-sm font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View live post
              </Link>
            </div>
          )}
        </div>
      </div>
    </form>
  )
}
