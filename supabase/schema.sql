-- Nirvana Optical Database Schema
-- Run this in Supabase SQL Editor

-- Use gen_random_uuid() which is built-in to Postgres 13+

-- ============================================
-- TABLES
-- ============================================

-- Blog Posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  featured_image TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at TIMESTAMPTZ,
  author TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Gallery Images
CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  alt_text TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('frames', 'sunglasses', 'lenses', 'store')),
  brand TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Promo Banners (Carousel)
CREATE TABLE IF NOT EXISTS promo_banners (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  headline TEXT NOT NULL,
  subheadline TEXT,
  image_url TEXT,
  image_alt TEXT,
  layout TEXT NOT NULL DEFAULT 'text-overlay' CHECK (layout IN ('full-image', 'text-overlay', 'split')),
  link_url TEXT,
  link_text TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  background_color TEXT,
  text_color TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  quote TEXT NOT NULL,
  is_featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- FAQ Items
CREATE TABLE IF NOT EXISTS faq_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact Submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Site Settings (Key-Value Store)
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Instagram Posts
CREATE TABLE IF NOT EXISTS instagram_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  instagram_id TEXT UNIQUE,
  image_url TEXT NOT NULL,
  caption TEXT,
  permalink TEXT,
  timestamp TIMESTAMPTZ,
  like_count INTEGER DEFAULT 0,
  comment_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_gallery_images_category ON gallery_images(category);
CREATE INDEX IF NOT EXISTS idx_gallery_images_sort_order ON gallery_images(sort_order);
CREATE INDEX IF NOT EXISTS idx_promo_banners_is_active ON promo_banners(is_active);
CREATE INDEX IF NOT EXISTS idx_promo_banners_sort_order ON promo_banners(sort_order);
CREATE INDEX IF NOT EXISTS idx_testimonials_is_featured ON testimonials(is_featured);
CREATE INDEX IF NOT EXISTS idx_faq_items_category ON faq_items(category);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_is_read ON contact_submissions(is_read);
CREATE INDEX IF NOT EXISTS idx_site_settings_key ON site_settings(key);
CREATE INDEX IF NOT EXISTS idx_instagram_posts_is_active ON instagram_posts(is_active);
CREATE INDEX IF NOT EXISTS idx_instagram_posts_is_featured ON instagram_posts(is_featured);
CREATE INDEX IF NOT EXISTS idx_instagram_posts_sort_order ON instagram_posts(sort_order);
CREATE INDEX IF NOT EXISTS idx_instagram_posts_timestamp ON instagram_posts(timestamp DESC);

-- ============================================
-- UPDATED_AT TRIGGER
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables with updated_at column
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_gallery_images_updated_at
  BEFORE UPDATE ON gallery_images
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_promo_banners_updated_at
  BEFORE UPDATE ON promo_banners
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at
  BEFORE UPDATE ON testimonials
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_faq_items_updated_at
  BEFORE UPDATE ON faq_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_instagram_posts_updated_at
  BEFORE UPDATE ON instagram_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE promo_banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE instagram_posts ENABLE ROW LEVEL SECURITY;

-- Blog Posts Policies
-- Public can read published posts
CREATE POLICY "Public can read published blog posts" ON blog_posts
  FOR SELECT USING (status = 'published');

-- Authenticated users (admin) can do everything
CREATE POLICY "Admins can do everything with blog posts" ON blog_posts
  FOR ALL USING (auth.role() = 'authenticated');

-- Gallery Images Policies
-- Public can read all gallery images
CREATE POLICY "Public can read gallery images" ON gallery_images
  FOR SELECT USING (true);

-- Admins can do everything
CREATE POLICY "Admins can do everything with gallery images" ON gallery_images
  FOR ALL USING (auth.role() = 'authenticated');

-- Promo Banners Policies
-- Public can read active banners
CREATE POLICY "Public can read active promo banners" ON promo_banners
  FOR SELECT USING (is_active = true);

-- Admins can do everything
CREATE POLICY "Admins can do everything with promo banners" ON promo_banners
  FOR ALL USING (auth.role() = 'authenticated');

-- Testimonials Policies
-- Public can read all testimonials
CREATE POLICY "Public can read testimonials" ON testimonials
  FOR SELECT USING (true);

-- Admins can do everything
CREATE POLICY "Admins can do everything with testimonials" ON testimonials
  FOR ALL USING (auth.role() = 'authenticated');

-- FAQ Items Policies
-- Public can read all FAQ items
CREATE POLICY "Public can read FAQ items" ON faq_items
  FOR SELECT USING (true);

-- Admins can do everything
CREATE POLICY "Admins can do everything with FAQ items" ON faq_items
  FOR ALL USING (auth.role() = 'authenticated');

-- Contact Submissions Policies
-- Public can insert (submit contact forms)
CREATE POLICY "Public can submit contact forms" ON contact_submissions
  FOR INSERT WITH CHECK (true);

-- Admins can read and update (mark as read)
CREATE POLICY "Admins can manage contact submissions" ON contact_submissions
  FOR ALL USING (auth.role() = 'authenticated');

-- Site Settings Policies
-- Public can read site settings
CREATE POLICY "Public can read site settings" ON site_settings
  FOR SELECT USING (true);

-- Admins can do everything
CREATE POLICY "Admins can manage site settings" ON site_settings
  FOR ALL USING (auth.role() = 'authenticated');

-- Instagram Posts Policies
-- Public can read active Instagram posts
CREATE POLICY "Public can read active instagram posts" ON instagram_posts
  FOR SELECT USING (is_active = true);

-- Admins can do everything
CREATE POLICY "Admins can do everything with instagram posts" ON instagram_posts
  FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- STORAGE BUCKETS
-- ============================================
-- Run these in the Supabase Dashboard under Storage

-- Create buckets (run separately in Storage section):
-- 1. gallery - for gallery images
-- 2. blog - for blog featured images
-- 3. banners - for promo banner images

-- Storage policies (after creating buckets):
-- Allow public read access to all buckets
-- Allow authenticated users to upload/delete

-- Example storage policies (run in SQL Editor after bucket creation):
/*
-- Gallery bucket policies
CREATE POLICY "Public can view gallery images"
ON storage.objects FOR SELECT
USING (bucket_id = 'gallery');

CREATE POLICY "Admins can upload gallery images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'gallery' AND auth.role() = 'authenticated');

CREATE POLICY "Admins can update gallery images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'gallery' AND auth.role() = 'authenticated');

CREATE POLICY "Admins can delete gallery images"
ON storage.objects FOR DELETE
USING (bucket_id = 'gallery' AND auth.role() = 'authenticated');

-- Repeat for 'blog' and 'banners' buckets
*/

-- ============================================
-- SEED DATA (Optional - for initial setup)
-- ============================================

-- Insert default site settings
INSERT INTO site_settings (key, value) VALUES
  ('setmore_url', 'https://nirvanaoptical.setmore.com/victor'),
  ('contact_email', 'admin@nirvanaoptical.com'),
  ('whatsapp_number', '+27123456789'),
  ('facebook_url', 'https://www.facebook.com/NirvanaOptical'),
  ('instagram_url', 'https://www.instagram.com/nirvana_optical')
ON CONFLICT (key) DO NOTHING;
