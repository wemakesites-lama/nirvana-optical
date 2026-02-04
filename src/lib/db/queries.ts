import { cache } from 'react'
import { createClient } from '@/lib/supabase/server'
import type { DashboardStats, PaginationParams, PaginatedResponse } from '@/lib/types'
import type {
  BlogPost,
  GalleryImage,
  PromoBanner,
  Testimonial,
  FAQItem,
  ContactSubmission,
  SiteSetting,
} from '@/lib/database.types'

// ============================================
// BLOG POSTS
// ============================================

export const getBlogPosts = cache(async (
  status?: 'draft' | 'published',
  pagination?: PaginationParams
): Promise<PaginatedResponse<BlogPost>> => {
  const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any

  const limit = pagination?.limit ?? 50

  let query = db
    .from('blog_posts')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .limit(limit + 1)

  if (status) {
    query = query.eq('status', status)
  }

  if (pagination?.cursor) {
    query = query.lt('created_at', pagination.cursor)
  }

  const { data, error, count } = await query

  if (!data) {
    return {
      data: null,
      error,
      pagination: { hasMore: false, nextCursor: null, count: 0 }
    }
  }

  const hasMore = data.length > limit
  const items = hasMore ? data.slice(0, -1) : data
  const nextCursor = hasMore ? items[items.length - 1].created_at : null

  return {
    data: items as BlogPost[],
    error,
    pagination: { hasMore, nextCursor, count: count ?? 0 }
  }
})

export const getBlogPostBySlug = cache(async (slug: string) => {
  const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any

  const { data, error } = await db
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single()

  return { data: data as BlogPost | null, error }
})

export const getBlogPostById = cache(async (id: string) => {
  const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any

  const { data, error } = await db
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .single()

  return { data: data as BlogPost | null, error }
})

export const getBlogPostCount = cache(async (status?: 'draft' | 'published') => {
  const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any

  let query = db
    .from('blog_posts')
    .select('*', { count: 'exact', head: true })

  if (status) {
    query = query.eq('status', status)
  }

  const { count } = await query
  return count ?? 0
})

// ============================================
// GALLERY IMAGES
// ============================================

export const getGalleryImages = cache(async (
  category?: string,
  pagination?: PaginationParams
): Promise<PaginatedResponse<GalleryImage>> => {
  const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any

  const limit = pagination?.limit ?? 50

  let query = db
    .from('gallery_images')
    .select('*', { count: 'exact' })
    .order('sort_order', { ascending: true })
    .limit(limit + 1)

  if (category) {
    query = query.eq('category', category)
  }

  if (pagination?.cursor) {
    query = query.gt('sort_order', parseInt(pagination.cursor))
  }

  const { data, error, count } = await query

  if (!data) {
    return {
      data: null,
      error,
      pagination: { hasMore: false, nextCursor: null, count: 0 }
    }
  }

  const hasMore = data.length > limit
  const items = hasMore ? data.slice(0, -1) : data
  const nextCursor = hasMore ? String(items[items.length - 1].sort_order) : null

  return {
    data: items as GalleryImage[],
    error,
    pagination: { hasMore, nextCursor, count: count ?? 0 }
  }
})

export const getGalleryImageById = cache(async (id: string) => {
  const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any

  const { data, error } = await db
    .from('gallery_images')
    .select('*')
    .eq('id', id)
    .single()

  return { data: data as GalleryImage | null, error }
})

export const getGalleryImageCount = cache(async () => {
  const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any

  const { count } = await db
    .from('gallery_images')
    .select('*', { count: 'exact', head: true })
  return count ?? 0
})

// ============================================
// PROMO BANNERS
// ============================================

export const getPromoBanners = cache(async (activeOnly: boolean = false) => {
  const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any

  let query = db
    .from('promo_banners')
    .select('*')
    .order('sort_order', { ascending: true })

  if (activeOnly) {
    query = query.eq('is_active', true)
  }

  const { data, error } = await query
  return { data: data as PromoBanner[] | null, error }
})

export const getPromoBannerById = cache(async (id: string) => {
  const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any

  const { data, error } = await db
    .from('promo_banners')
    .select('*')
    .eq('id', id)
    .single()

  return { data: data as PromoBanner | null, error }
})

export const getActiveBannerCount = cache(async () => {
  const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any

  const { count } = await db
    .from('promo_banners')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true)
  return count ?? 0
})

// ============================================
// TESTIMONIALS
// ============================================

export const getTestimonials = cache(async (
  featuredOnly: boolean = false,
  pagination?: PaginationParams
): Promise<PaginatedResponse<Testimonial>> => {
  const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any

  const limit = pagination?.limit ?? 50

  let query = db
    .from('testimonials')
    .select('*', { count: 'exact' })
    .order('sort_order', { ascending: true })
    .limit(limit + 1)

  if (featuredOnly) {
    query = query.eq('is_featured', true)
  }

  if (pagination?.cursor) {
    query = query.gt('sort_order', parseInt(pagination.cursor))
  }

  const { data, error, count } = await query

  if (!data) {
    return {
      data: null,
      error,
      pagination: { hasMore: false, nextCursor: null, count: 0 }
    }
  }

  const hasMore = data.length > limit
  const items = hasMore ? data.slice(0, -1) : data
  const nextCursor = hasMore ? String(items[items.length - 1].sort_order) : null

  return {
    data: items as Testimonial[],
    error,
    pagination: { hasMore, nextCursor, count: count ?? 0 }
  }
})

export const getTestimonialById = cache(async (id: string) => {
  const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any

  const { data, error } = await db
    .from('testimonials')
    .select('*')
    .eq('id', id)
    .single()

  return { data: data as Testimonial | null, error }
})

export const getTestimonialCount = cache(async () => {
  const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any

  const { count } = await db
    .from('testimonials')
    .select('*', { count: 'exact', head: true })
  return count ?? 0
})

// ============================================
// FAQ ITEMS
// ============================================

export const getFAQItems = cache(async (
  category?: string,
  pagination?: PaginationParams
): Promise<PaginatedResponse<FAQItem>> => {
  const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any

  const limit = pagination?.limit ?? 50

  let query = db
    .from('faq_items')
    .select('*', { count: 'exact' })
    .order('category', { ascending: true })
    .order('sort_order', { ascending: true })
    .limit(limit + 1)

  if (category) {
    query = query.eq('category', category)
  }

  if (pagination?.cursor) {
    query = query.gt('sort_order', parseInt(pagination.cursor))
  }

  const { data, error, count } = await query

  if (!data) {
    return {
      data: null,
      error,
      pagination: { hasMore: false, nextCursor: null, count: 0 }
    }
  }

  const hasMore = data.length > limit
  const items = hasMore ? data.slice(0, -1) : data
  const nextCursor = hasMore ? String(items[items.length - 1].sort_order) : null

  return {
    data: items as FAQItem[],
    error,
    pagination: { hasMore, nextCursor, count: count ?? 0 }
  }
})

export const getFAQItemById = cache(async (id: string) => {
  const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any

  const { data, error } = await db
    .from('faq_items')
    .select('*')
    .eq('id', id)
    .single()

  return { data: data as FAQItem | null, error }
})

export const getFAQItemCount = cache(async () => {
  const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any

  const { count } = await db
    .from('faq_items')
    .select('*', { count: 'exact', head: true })
  return count ?? 0
})

export const getFAQCategories = cache(async () => {
  const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any

  // Use optimized RPC function with SELECT DISTINCT
  const { data, error } = await db.rpc('get_faq_categories')

  if (error || !data) return []

  return data.map((row: { category: string }) => row.category)
})

// ============================================
// CONTACT SUBMISSIONS
// ============================================

export const getContactSubmissions = cache(async (
  unreadOnly: boolean = false,
  pagination?: PaginationParams
): Promise<PaginatedResponse<ContactSubmission>> => {
  const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any

  const limit = pagination?.limit ?? 50

  let query = db
    .from('contact_submissions')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .limit(limit + 1)

  if (unreadOnly) {
    query = query.eq('is_read', false)
  }

  if (pagination?.cursor) {
    query = query.lt('created_at', pagination.cursor)
  }

  const { data, error, count } = await query

  if (!data) {
    return {
      data: null,
      error,
      pagination: { hasMore: false, nextCursor: null, count: 0 }
    }
  }

  const hasMore = data.length > limit
  const items = hasMore ? data.slice(0, -1) : data
  const nextCursor = hasMore ? items[items.length - 1].created_at : null

  return {
    data: items as ContactSubmission[],
    error,
    pagination: { hasMore, nextCursor, count: count ?? 0 }
  }
})

export const getContactSubmissionById = cache(async (id: string) => {
  const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any

  const { data, error } = await db
    .from('contact_submissions')
    .select('*')
    .eq('id', id)
    .single()

  return { data: data as ContactSubmission | null, error }
})

export const getUnreadSubmissionCount = cache(async () => {
  const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any

  const { count } = await db
    .from('contact_submissions')
    .select('*', { count: 'exact', head: true })
    .eq('is_read', false)
  return count ?? 0
})

export const getTotalSubmissionCount = cache(async () => {
  const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any

  const { count } = await db
    .from('contact_submissions')
    .select('*', { count: 'exact', head: true })
  return count ?? 0
})

// ============================================
// SITE SETTINGS
// ============================================

export const getSiteSettings = cache(async () => {
  const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any

  const { data } = await db
    .from('site_settings')
    .select('*')

  if (!data) return {}

  // Convert to key-value object
  const settings = data as SiteSetting[]
  return settings.reduce((acc, setting) => {
    acc[setting.key] = setting.value
    return acc
  }, {} as Record<string, string>)
})

export const getSiteSetting = cache(async (key: string) => {
  const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any

  const { data } = await db
    .from('site_settings')
    .select('value')
    .eq('key', key)
    .single()

  return data?.value
})

// ============================================
// DASHBOARD STATS
// ============================================

export const getDashboardStats = cache(async (): Promise<DashboardStats> => {
  const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any

  // Use optimized RPC function (1 query instead of 9)
  const { data, error } = await db.rpc('get_dashboard_stats')

  if (error || !data || data.length === 0) {
    console.error('Dashboard stats function failed:', error)
    // Fallback to existing implementation
    return fallbackGetDashboardStats()
  }

  const stats = data[0]
  return {
    totalPosts: Number(stats.total_posts),
    publishedPosts: Number(stats.published_posts),
    draftPosts: Number(stats.draft_posts),
    galleryImages: Number(stats.gallery_images),
    activeBanners: Number(stats.active_banners),
    testimonials: Number(stats.testimonials),
    faqItems: Number(stats.faq_items),
    unreadSubmissions: Number(stats.unread_submissions),
    totalSubmissions: Number(stats.total_submissions),
  }
})

// Fallback implementation using existing functions
async function fallbackGetDashboardStats(): Promise<DashboardStats> {
  const [
    totalPosts,
    publishedPosts,
    draftPosts,
    galleryImages,
    activeBanners,
    testimonials,
    faqItems,
    unreadSubmissions,
    totalSubmissions,
  ] = await Promise.all([
    getBlogPostCount(),
    getBlogPostCount('published'),
    getBlogPostCount('draft'),
    getGalleryImageCount(),
    getActiveBannerCount(),
    getTestimonialCount(),
    getFAQItemCount(),
    getUnreadSubmissionCount(),
    getTotalSubmissionCount(),
  ])

  return {
    totalPosts,
    publishedPosts,
    draftPosts,
    galleryImages,
    activeBanners,
    testimonials,
    faqItems,
    unreadSubmissions,
    totalSubmissions,
  }
}
