-- Composite and partial indexes for query optimization
-- Creates multi-column indexes for common query patterns
-- Uses partial indexes for RLS-filtered queries
-- Note: CONCURRENTLY removed for migration compatibility

-- Promo banners: WHERE is_active = true ORDER BY sort_order
CREATE INDEX IF NOT EXISTS idx_promo_banners_active_sort
  ON promo_banners(is_active, sort_order)
  WHERE is_active = true;

-- Drop old separate indexes if they exist
DROP INDEX IF EXISTS idx_promo_banners_is_active;
DROP INDEX IF EXISTS idx_promo_banners_sort_order;

-- Blog posts: WHERE status = 'published' ORDER BY published_at DESC
CREATE INDEX IF NOT EXISTS idx_blog_posts_published
  ON blog_posts(status, published_at DESC)
  WHERE status = 'published';

-- Drop old separate indexes if they exist
DROP INDEX IF EXISTS idx_blog_posts_status;
DROP INDEX IF EXISTS idx_blog_posts_published_at;

-- FAQ items: WHERE category = 'X' ORDER BY sort_order
CREATE INDEX IF NOT EXISTS idx_faq_items_category_sort
  ON faq_items(category, sort_order);

-- Drop old separate index if it exists
DROP INDEX IF EXISTS idx_faq_items_category;

-- Gallery: WHERE category = 'X' ORDER BY sort_order
CREATE INDEX IF NOT EXISTS idx_gallery_images_category_sort
  ON gallery_images(category, sort_order);

-- Drop old separate indexes if they exist
DROP INDEX IF EXISTS idx_gallery_images_category;
DROP INDEX IF EXISTS idx_gallery_images_sort_order;

-- Testimonials: WHERE is_featured = true ORDER BY sort_order
CREATE INDEX IF NOT EXISTS idx_testimonials_featured_sort
  ON testimonials(is_featured, sort_order)
  WHERE is_featured = true;

-- Drop old separate index if it exists
DROP INDEX IF EXISTS idx_testimonials_is_featured;

-- Contact submissions: WHERE is_read = false ORDER BY created_at DESC
CREATE INDEX IF NOT EXISTS idx_contact_submissions_unread
  ON contact_submissions(is_read, created_at DESC)
  WHERE is_read = false;

-- Drop old separate index if it exists
DROP INDEX IF EXISTS idx_contact_submissions_is_read;

-- Instagram posts: WHERE is_active = true ORDER BY sort_order
CREATE INDEX IF NOT EXISTS idx_instagram_posts_active_sort
  ON instagram_posts(is_active, sort_order)
  WHERE is_active = true;

-- Drop old separate indexes if they exist
DROP INDEX IF EXISTS idx_instagram_posts_is_active;
DROP INDEX IF EXISTS idx_instagram_posts_sort_order;

-- Blog posts: slug lookup optimization
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug
  ON blog_posts(slug)
  WHERE status = 'published';
