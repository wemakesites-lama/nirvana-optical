'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { deleteBlogPost, publishBlogPost, unpublishBlogPost } from '@/lib/actions/blog'
import type { BlogPost } from '@/lib/database.types'

interface BlogPostActionsProps {
  post: BlogPost
}

export function BlogPostActions({ post }: BlogPostActionsProps) {
  const [showMenu, setShowMenu] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handlePublish = () => {
    startTransition(async () => {
      await publishBlogPost(post.id)
      setShowMenu(false)
    })
  }

  const handleUnpublish = () => {
    startTransition(async () => {
      await unpublishBlogPost(post.id)
      setShowMenu(false)
    })
  }

  const handleDelete = () => {
    startTransition(async () => {
      await deleteBlogPost(post.id)
      setShowDeleteConfirm(false)
      setShowMenu(false)
    })
  }

  return (
    <div className="relative">
      <div className="flex items-center gap-2 justify-end">
        <Link
          href={`/admin/blog/${post.id}/edit`}
          className="text-neutral-600 hover:text-brand-green-600 p-1"
          title="Edit"
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
        </Link>

        {post.status === 'published' && (
          <Link
            href={`/blog/${post.slug}`}
            target="_blank"
            className="text-neutral-600 hover:text-brand-green-600 p-1"
            title="View"
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
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </Link>
        )}

        <button
          type="button"
          onClick={() => setShowMenu(!showMenu)}
          className="text-neutral-600 hover:text-neutral-900 p-1"
          disabled={isPending}
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
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </button>
      </div>

      {showMenu && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowMenu(false)}
          />
          <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-neutral-200 z-20 py-1">
            {post.status === 'draft' ? (
              <button
                type="button"
                onClick={handlePublish}
                disabled={isPending}
                className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 disabled:opacity-50 flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Publish
              </button>
            ) : (
              <button
                type="button"
                onClick={handleUnpublish}
                disabled={isPending}
                className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 disabled:opacity-50 flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                  />
                </svg>
                Unpublish
              </button>
            )}

            <hr className="my-1 border-neutral-200" />

            <button
              type="button"
              onClick={() => {
                setShowMenu(false)
                setShowDeleteConfirm(true)
              }}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
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
              Delete
            </button>
          </div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold text-brand-black mb-2">
              Delete Post
            </h3>
            <p className="text-neutral-600 mb-4">
              Are you sure you want to delete &quot;{post.title}&quot;? This action
              cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 rounded-md"
                disabled={isPending}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isPending}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
              >
                {isPending ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
