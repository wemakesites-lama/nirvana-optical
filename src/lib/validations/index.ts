import { z } from 'zod'

// Helper to validate URL or local path
const urlOrPath = z.string().refine(
  (val) => {
    if (!val) return true
    // Allow local paths starting with /
    if (val.startsWith('/')) return true
    // Allow full URLs
    try {
      new URL(val)
      return true
    } catch {
      return false
    }
  },
  { message: 'Must be a valid URL or local path (starting with /)' }
)

// Blog post validation
export const blogPostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .max(200)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase with hyphens'),
  excerpt: z.string().min(1, 'Excerpt is required').max(500),
  content: z.string().min(1, 'Content is required'),
  featured_image: urlOrPath.nullable().optional(),
  status: z.enum(['draft', 'published']),
  author: z.string().min(1, 'Author is required'),
})

export type BlogPostFormData = z.infer<typeof blogPostSchema>

// Gallery image validation
export const galleryImageSchema = z.object({
  image_url: urlOrPath.min(1, 'Image is required'),
  alt_text: z.string().min(1, 'Alt text is required').max(200),
  category: z.enum(['frames', 'sunglasses', 'contact-lenses', 'store']),
  brand: z.string().max(100).nullable().optional(),
  description: z.string().max(500).nullable().optional(),
  sort_order: z.number().int().min(0).default(0),
})

export type GalleryImageFormData = z.infer<typeof galleryImageSchema>

// Promo banner validation
export const promoBannerSchema = z.object({
  headline: z.string().min(1, 'Headline is required').max(200),
  subheadline: z.string().max(300).nullable().optional(),
  image_url: urlOrPath.nullable().optional(),
  image_alt: z.string().max(200).nullable().optional(),
  layout: z.enum(['full-image', 'text-overlay', 'split']),
  link_url: urlOrPath.nullable().optional(),
  link_text: z.string().min(1, 'Link text is required').max(50),
  is_active: z.boolean().default(true),
  sort_order: z.number().int().min(0).default(0),
  start_date: z.string().nullable().optional(),
  end_date: z.string().nullable().optional(),
  background_color: z.string().max(50).nullable().optional(),
  text_color: z.string().max(50).nullable().optional(),
})

export type PromoBannerFormData = z.infer<typeof promoBannerSchema>

// Testimonial validation
export const testimonialSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  rating: z.number().int().min(1).max(5),
  quote: z.string().min(1, 'Quote is required').max(1000),
  is_featured: z.boolean().default(false),
  sort_order: z.number().int().min(0).default(0),
})

export type TestimonialFormData = z.infer<typeof testimonialSchema>

// FAQ item validation
export const faqItemSchema = z.object({
  category: z.string().min(1, 'Category is required').max(100),
  question: z.string().min(1, 'Question is required').max(500),
  answer: z.string().min(1, 'Answer is required').max(2000),
  sort_order: z.number().int().min(0).default(0),
})

export type FAQItemFormData = z.infer<typeof faqItemSchema>

// Contact form validation
export const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().max(20).nullable().optional(),
  subject: z.string().max(200).nullable().optional(),
  message: z.string().min(1, 'Message is required').max(5000),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

// Site settings validation
export const siteSettingSchema = z.object({
  key: z.string().min(1).max(100),
  value: z.string(),
})

export type SiteSettingFormData = z.infer<typeof siteSettingSchema>

// Helper to generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 200)
}
