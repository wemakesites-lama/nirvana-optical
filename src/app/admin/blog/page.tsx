import { Suspense } from 'react'
import Link from 'next/link'
import { getBlogPosts } from '@/lib/db/queries'
import { BlogPostActions } from '@/components/admin/BlogPostActions'
import type { BlogPost } from '@/lib/database.types'

export const metadata = {
  title: 'Blog Posts | Nirvana Optical Admin',
}

export default function BlogPage() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-brand-black">Blog Posts</h1>
          <p className="text-sm sm:text-base text-neutral-600 mt-1">
            Manage your blog articles and news
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center justify-center gap-2 bg-brand-green-600 text-white px-4 py-2 rounded-md hover:bg-brand-green-700 transition-colors text-sm sm:text-base w-full sm:w-auto"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
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
          New Post
        </Link>
      </div>

      <Suspense fallback={<BlogTableSkeleton />}>
        <BlogPostsTable />
      </Suspense>
    </div>
  )
}

async function BlogPostsTable() {
  const { data, error } = await getBlogPosts()
  const posts = (data ?? []) as BlogPost[]

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
        Error loading posts: {error.message}
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-8 sm:p-12 text-center">
        <svg
          className="w-10 h-10 sm:w-12 sm:h-12 text-neutral-400 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
          />
        </svg>
        <p className="text-neutral-600 mb-4 text-sm sm:text-base">No blog posts yet</p>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 text-brand-green-600 hover:text-brand-green-700 text-sm sm:text-base"
        >
          Create your first post
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    )
  }

  return (
    <>
      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4"
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <Link
                href={`/admin/blog/${post.id}/edit`}
                className="text-brand-black font-medium hover:text-brand-green-600 text-sm line-clamp-2"
              >
                {post.title}
              </Link>
              <span
                className={`inline-flex px-2 py-0.5 text-[10px] font-medium rounded-full flex-shrink-0 ${
                  post.status === 'published'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                {post.status}
              </span>
            </div>
            {post.excerpt && (
              <p className="text-xs text-neutral-500 mb-3 line-clamp-2">
                {post.excerpt}
              </p>
            )}
            <div className="flex items-center justify-between text-xs text-neutral-500">
              <div className="flex items-center gap-2">
                <span>{post.author}</span>
                <span>&middot;</span>
                <span>
                  {new Date(post.created_at).toLocaleDateString('en-ZA', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <BlogPostActions post={post} />
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-neutral-50">
                  <td className="px-4 lg:px-6 py-4">
                    <div className="flex items-center">
                      <div className="min-w-0">
                        <Link
                          href={`/admin/blog/${post.id}/edit`}
                          className="text-brand-black font-medium hover:text-brand-green-600 text-sm"
                        >
                          {post.title}
                        </Link>
                        <p className="text-xs text-neutral-500 truncate max-w-xs lg:max-w-md">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        post.status === 'published'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                    {post.author}
                  </td>
                  <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                    {new Date(post.created_at).toLocaleDateString('en-ZA', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-right">
                    <BlogPostActions post={post} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

function BlogTableSkeleton() {
  return (
    <>
      {/* Mobile Skeleton */}
      <div className="md:hidden space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4 animate-pulse"
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="h-4 bg-neutral-200 rounded w-3/4" />
              <div className="h-5 bg-neutral-200 rounded w-16" />
            </div>
            <div className="h-3 bg-neutral-200 rounded w-full mb-3" />
            <div className="flex items-center justify-between">
              <div className="h-3 bg-neutral-200 rounded w-32" />
              <div className="h-6 bg-neutral-200 rounded w-16" />
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Skeleton */}
      <div className="hidden md:block bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="min-w-full divide-y divide-neutral-200">
          <thead className="bg-neutral-50">
            <tr>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Author
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-neutral-200">
            {Array.from({ length: 5 }).map((_, i) => (
              <tr key={i}>
                <td className="px-4 lg:px-6 py-4">
                  <div className="animate-pulse">
                    <div className="h-4 bg-neutral-200 rounded w-48 mb-2" />
                    <div className="h-3 bg-neutral-200 rounded w-64" />
                  </div>
                </td>
                <td className="px-4 lg:px-6 py-4">
                  <div className="h-6 bg-neutral-200 rounded w-20 animate-pulse" />
                </td>
                <td className="px-4 lg:px-6 py-4">
                  <div className="h-4 bg-neutral-200 rounded w-24 animate-pulse" />
                </td>
                <td className="px-4 lg:px-6 py-4">
                  <div className="h-4 bg-neutral-200 rounded w-20 animate-pulse" />
                </td>
                <td className="px-4 lg:px-6 py-4">
                  <div className="h-8 bg-neutral-200 rounded w-24 ml-auto animate-pulse" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
