export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string
          content: string
          featured_image: string | null
          status: 'draft' | 'published'
          published_at: string | null
          author: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          excerpt: string
          content: string
          featured_image?: string | null
          status?: 'draft' | 'published'
          published_at?: string | null
          author: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          excerpt?: string
          content?: string
          featured_image?: string | null
          status?: 'draft' | 'published'
          published_at?: string | null
          author?: string
          created_at?: string
          updated_at?: string
        }
      }
      gallery_images: {
        Row: {
          id: string
          image_url: string
          alt_text: string
          category: 'frames' | 'sunglasses' | 'contact-lenses' | 'store'
          brand: string | null
          description: string | null
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          image_url: string
          alt_text: string
          category: 'frames' | 'sunglasses' | 'contact-lenses' | 'store'
          brand?: string | null
          description?: string | null
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          image_url?: string
          alt_text?: string
          category?: 'frames' | 'sunglasses' | 'contact-lenses' | 'store'
          brand?: string | null
          description?: string | null
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      promo_banners: {
        Row: {
          id: string
          headline: string
          subheadline: string | null
          image_url: string | null
          image_alt: string | null
          layout: 'full-image' | 'text-overlay' | 'split'
          link_url: string | null
          link_text: string
          is_active: boolean
          sort_order: number
          start_date: string | null
          end_date: string | null
          background_color: string | null
          text_color: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          headline: string
          subheadline?: string | null
          image_url?: string | null
          image_alt?: string | null
          layout?: 'full-image' | 'text-overlay' | 'split'
          link_url?: string | null
          link_text: string
          is_active?: boolean
          sort_order?: number
          start_date?: string | null
          end_date?: string | null
          background_color?: string | null
          text_color?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          headline?: string
          subheadline?: string | null
          image_url?: string | null
          image_alt?: string | null
          layout?: 'full-image' | 'text-overlay' | 'split'
          link_url?: string | null
          link_text?: string
          is_active?: boolean
          sort_order?: number
          start_date?: string | null
          end_date?: string | null
          background_color?: string | null
          text_color?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      testimonials: {
        Row: {
          id: string
          name: string
          rating: number
          quote: string
          is_featured: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          rating: number
          quote: string
          is_featured?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          rating?: number
          quote?: string
          is_featured?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      faq_items: {
        Row: {
          id: string
          category: string
          question: string
          answer: string
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          category: string
          question: string
          answer: string
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          category?: string
          question?: string
          answer?: string
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      contact_submissions: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          subject: string | null
          message: string
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          subject?: string | null
          message: string
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          subject?: string | null
          message?: string
          is_read?: boolean
          created_at?: string
        }
      }
      site_settings: {
        Row: {
          id: string
          key: string
          value: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          key: string
          value: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          key?: string
          value?: string
          created_at?: string
          updated_at?: string
        }
      }
      instagram_posts: {
        Row: {
          id: string
          instagram_id: string | null
          image_url: string
          caption: string | null
          permalink: string | null
          timestamp: string | null
          like_count: number
          comment_count: number
          is_featured: boolean
          is_active: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          instagram_id?: string | null
          image_url: string
          caption?: string | null
          permalink?: string | null
          timestamp?: string | null
          like_count?: number
          comment_count?: number
          is_featured?: boolean
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          instagram_id?: string | null
          image_url?: string
          caption?: string | null
          permalink?: string | null
          timestamp?: string | null
          like_count?: number
          comment_count?: number
          is_featured?: boolean
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Helper types for easier use
export type BlogPost = Database['public']['Tables']['blog_posts']['Row']
export type BlogPostInsert = Database['public']['Tables']['blog_posts']['Insert']
export type BlogPostUpdate = Database['public']['Tables']['blog_posts']['Update']

export type GalleryImage = Database['public']['Tables']['gallery_images']['Row']
export type GalleryImageInsert = Database['public']['Tables']['gallery_images']['Insert']
export type GalleryImageUpdate = Database['public']['Tables']['gallery_images']['Update']

export type PromoBanner = Database['public']['Tables']['promo_banners']['Row']
export type PromoBannerInsert = Database['public']['Tables']['promo_banners']['Insert']
export type PromoBannerUpdate = Database['public']['Tables']['promo_banners']['Update']

export type Testimonial = Database['public']['Tables']['testimonials']['Row']
export type TestimonialInsert = Database['public']['Tables']['testimonials']['Insert']
export type TestimonialUpdate = Database['public']['Tables']['testimonials']['Update']

export type FAQItem = Database['public']['Tables']['faq_items']['Row']
export type FAQItemInsert = Database['public']['Tables']['faq_items']['Insert']
export type FAQItemUpdate = Database['public']['Tables']['faq_items']['Update']

export type ContactSubmission = Database['public']['Tables']['contact_submissions']['Row']
export type ContactSubmissionInsert = Database['public']['Tables']['contact_submissions']['Insert']
export type ContactSubmissionUpdate = Database['public']['Tables']['contact_submissions']['Update']

export type SiteSetting = Database['public']['Tables']['site_settings']['Row']
export type SiteSettingInsert = Database['public']['Tables']['site_settings']['Insert']
export type SiteSettingUpdate = Database['public']['Tables']['site_settings']['Update']

export type InstagramPost = Database['public']['Tables']['instagram_posts']['Row']
export type InstagramPostInsert = Database['public']['Tables']['instagram_posts']['Insert']
export type InstagramPostUpdate = Database['public']['Tables']['instagram_posts']['Update']
