import { Suspense } from 'react'
import Link from 'next/link'
import { getDashboardStats, getContactSubmissions, getBlogPosts } from '@/lib/db/queries'
import type { ContactSubmission, BlogPost } from '@/lib/database.types'

export const metadata = {
  title: 'Dashboard | Nirvana Optical Admin',
}

export default async function DashboardPage() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-brand-black">Dashboard</h1>
        <p className="text-sm sm:text-base text-neutral-600 mt-1">
          Overview of your website content and activity
        </p>
      </div>

      <Suspense fallback={<StatsGridSkeleton />}>
        <StatsGrid />
      </Suspense>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Suspense fallback={<CardSkeleton title="Recent Contact Messages" />}>
          <RecentMessages />
        </Suspense>

        <Suspense fallback={<CardSkeleton title="Recent Blog Posts" />}>
          <RecentPosts />
        </Suspense>
      </div>
    </div>
  )
}

async function StatsGrid() {
  const stats = await getDashboardStats()

  const statCards = [
    {
      label: 'Blog Posts',
      value: stats.totalPosts,
      subtext: `${stats.publishedPosts} published, ${stats.draftPosts} drafts`,
      href: '/admin/blog',
      color: 'bg-blue-500',
    },
    {
      label: 'Gallery Images',
      value: stats.galleryImages,
      subtext: 'Manage your photo gallery',
      href: '/admin/gallery',
      color: 'bg-purple-500',
    },
    {
      label: 'Active Promos',
      value: stats.activeBanners,
      subtext: 'Carousel banners',
      href: '/admin/carousel',
      color: 'bg-orange-500',
    },
    {
      label: 'Testimonials',
      value: stats.testimonials,
      subtext: 'Customer reviews',
      href: '/admin/testimonials',
      color: 'bg-green-500',
    },
    {
      label: 'FAQ Items',
      value: stats.faqItems,
      subtext: 'Help articles',
      href: '/admin/faq',
      color: 'bg-teal-500',
    },
    {
      label: 'Unread Messages',
      value: stats.unreadSubmissions,
      subtext: `${stats.totalSubmissions} total submissions`,
      href: '/admin/contact-submissions',
      color: stats.unreadSubmissions > 0 ? 'bg-red-500' : 'bg-neutral-500',
    },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
      {statCards.map((stat) => (
        <Link
          key={stat.label}
          href={stat.href}
          className="bg-white rounded-lg shadow-sm border border-neutral-200 p-3 sm:p-5 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-neutral-600 truncate">{stat.label}</p>
              <p className="text-2xl sm:text-3xl font-bold text-brand-black mt-0.5 sm:mt-1">
                {stat.value}
              </p>
              <p className="text-[10px] sm:text-xs text-neutral-500 mt-0.5 sm:mt-1 truncate">{stat.subtext}</p>
            </div>
            <div className={`${stat.color} w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0`}>
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

async function RecentMessages() {
  const { data } = await getContactSubmissions()
  const messages = (data ?? []) as ContactSubmission[]
  const recentMessages = messages.slice(0, 5)

  return (
    <div className="bg-white rounded-lg shadow-sm border border-neutral-200">
      <div className="p-3 sm:p-4 border-b border-neutral-200 flex items-center justify-between">
        <h2 className="font-semibold text-sm sm:text-base text-brand-black">Recent Contact Messages</h2>
        <Link
          href="/admin/contact-submissions"
          className="text-xs sm:text-sm text-brand-green-600 hover:text-brand-green-700"
        >
          View all
        </Link>
      </div>

      {recentMessages.length === 0 ? (
        <div className="p-6 sm:p-8 text-center text-neutral-500 text-sm">
          No messages yet
        </div>
      ) : (
        <ul className="divide-y divide-neutral-100">
          {recentMessages.map((message) => (
            <li key={message.id} className="p-3 sm:p-4 hover:bg-neutral-50">
              <div className="flex items-start gap-2 sm:gap-3">
                <div
                  className={`w-2 h-2 rounded-full mt-1.5 sm:mt-2 flex-shrink-0 ${
                    message.is_read ? 'bg-neutral-300' : 'bg-blue-500'
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm sm:text-base text-brand-black truncate">
                    {message.name}
                  </p>
                  <p className="text-xs sm:text-sm text-neutral-600 truncate">
                    {message.subject || 'No subject'}
                  </p>
                  <p className="text-[10px] sm:text-xs text-neutral-400 mt-0.5 sm:mt-1">
                    {new Date(message.created_at).toLocaleDateString('en-ZA', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

async function RecentPosts() {
  const { data } = await getBlogPosts()
  const posts = (data ?? []) as BlogPost[]
  const recentPosts = posts.slice(0, 5)

  return (
    <div className="bg-white rounded-lg shadow-sm border border-neutral-200">
      <div className="p-3 sm:p-4 border-b border-neutral-200 flex items-center justify-between">
        <h2 className="font-semibold text-sm sm:text-base text-brand-black">Recent Blog Posts</h2>
        <Link
          href="/admin/blog"
          className="text-xs sm:text-sm text-brand-green-600 hover:text-brand-green-700"
        >
          View all
        </Link>
      </div>

      {recentPosts.length === 0 ? (
        <div className="p-6 sm:p-8 text-center text-neutral-500 text-sm">
          No blog posts yet
        </div>
      ) : (
        <ul className="divide-y divide-neutral-100">
          {recentPosts.map((post) => (
            <li key={post.id} className="p-3 sm:p-4 hover:bg-neutral-50">
              <div className="flex items-start justify-between gap-2 sm:gap-4">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm sm:text-base text-brand-black truncate">
                    {post.title}
                  </p>
                  <p className="text-xs sm:text-sm text-neutral-600 truncate">
                    {post.excerpt}
                  </p>
                  <p className="text-[10px] sm:text-xs text-neutral-400 mt-0.5 sm:mt-1">
                    {new Date(post.created_at).toLocaleDateString('en-ZA', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <span
                  className={`px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs font-medium rounded-full flex-shrink-0 ${
                    post.status === 'published'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {post.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function StatsGridSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-lg shadow-sm border border-neutral-200 p-3 sm:p-5 animate-pulse"
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="h-3 sm:h-4 bg-neutral-200 rounded w-16 sm:w-24 mb-2" />
              <div className="h-6 sm:h-8 bg-neutral-200 rounded w-10 sm:w-16 mb-2" />
              <div className="h-2 sm:h-3 bg-neutral-200 rounded w-20 sm:w-32" />
            </div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-neutral-200 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  )
}

function CardSkeleton({ title }: { title: string }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-neutral-200">
      <div className="p-3 sm:p-4 border-b border-neutral-200">
        <h2 className="font-semibold text-sm sm:text-base text-brand-black">{title}</h2>
      </div>
      <div className="p-3 sm:p-4 space-y-3 sm:space-y-4 animate-pulse">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-start gap-2 sm:gap-3">
            <div className="w-2 h-2 rounded-full bg-neutral-200 mt-2" />
            <div className="flex-1">
              <div className="h-3 sm:h-4 bg-neutral-200 rounded w-3/4 mb-2" />
              <div className="h-2 sm:h-3 bg-neutral-200 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
