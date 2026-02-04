// Re-export database types for use throughout the app
export type {
  BlogPost,
  BlogPostInsert,
  BlogPostUpdate,
  GalleryImage,
  GalleryImageInsert,
  GalleryImageUpdate,
  PromoBanner,
  PromoBannerInsert,
  PromoBannerUpdate,
  Testimonial,
  TestimonialInsert,
  TestimonialUpdate,
  FAQItem,
  FAQItemInsert,
  FAQItemUpdate,
  ContactSubmission,
  ContactSubmissionInsert,
  ContactSubmissionUpdate,
  SiteSetting,
  SiteSettingInsert,
  SiteSettingUpdate,
} from './database.types'

// UI-specific types (not in database)
export interface NavLink {
  href: string
  label: string
}

export interface Service {
  icon: string
  title: string
  description: string
}

// Form submission type (what the contact form sends)
export interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
}

// Layout types
export type PromoBannerLayout = 'full-image' | 'text-overlay' | 'split'
export type GalleryCategory = 'frames' | 'sunglasses' | 'contact-lenses' | 'store'
export type BlogStatus = 'draft' | 'published'

// Admin dashboard stats
export interface DashboardStats {
  totalPosts: number
  publishedPosts: number
  draftPosts: number
  galleryImages: number
  activeBanners: number
  testimonials: number
  faqItems: number
  unreadSubmissions: number
  totalSubmissions: number
}

// Server action response types
export interface ActionResponse<T = void> {
  success: boolean
  data?: T
  error?: string
}

// Pagination - cursor-based for better performance
export interface PaginationParams {
  limit?: number
  cursor?: string
}

export interface PaginatedResponse<T> {
  data: T[] | null
  error: { message: string } | null
  pagination: {
    hasMore: boolean
    nextCursor: string | null
    count: number
  }
}

// Image upload response
export interface UploadResponse {
  url: string
  path: string
}
