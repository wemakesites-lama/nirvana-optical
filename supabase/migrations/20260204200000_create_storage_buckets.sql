-- ============================================
-- STORAGE BUCKETS
-- ============================================

-- Create storage buckets for images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  ('gallery', 'gallery', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']),
  ('blog', 'blog', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']),
  ('banners', 'banners', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- ============================================
-- STORAGE POLICIES - Gallery Bucket
-- ============================================

-- Public can view gallery images
DROP POLICY IF EXISTS "Public can view gallery images" ON storage.objects;
CREATE POLICY "Public can view gallery images"
ON storage.objects FOR SELECT
USING (bucket_id = 'gallery');

-- Authenticated users can upload gallery images
DROP POLICY IF EXISTS "Authenticated users can upload gallery images" ON storage.objects;
CREATE POLICY "Authenticated users can upload gallery images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'gallery' AND auth.role() = 'authenticated');

-- Authenticated users can update gallery images
DROP POLICY IF EXISTS "Authenticated users can update gallery images" ON storage.objects;
CREATE POLICY "Authenticated users can update gallery images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'gallery' AND auth.role() = 'authenticated');

-- Authenticated users can delete gallery images
DROP POLICY IF EXISTS "Authenticated users can delete gallery images" ON storage.objects;
CREATE POLICY "Authenticated users can delete gallery images"
ON storage.objects FOR DELETE
USING (bucket_id = 'gallery' AND auth.role() = 'authenticated');

-- ============================================
-- STORAGE POLICIES - Blog Bucket
-- ============================================

-- Public can view blog images
DROP POLICY IF EXISTS "Public can view blog images" ON storage.objects;
CREATE POLICY "Public can view blog images"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog');

-- Authenticated users can upload blog images
DROP POLICY IF EXISTS "Authenticated users can upload blog images" ON storage.objects;
CREATE POLICY "Authenticated users can upload blog images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'blog' AND auth.role() = 'authenticated');

-- Authenticated users can update blog images
DROP POLICY IF EXISTS "Authenticated users can update blog images" ON storage.objects;
CREATE POLICY "Authenticated users can update blog images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'blog' AND auth.role() = 'authenticated');

-- Authenticated users can delete blog images
DROP POLICY IF EXISTS "Authenticated users can delete blog images" ON storage.objects;
CREATE POLICY "Authenticated users can delete blog images"
ON storage.objects FOR DELETE
USING (bucket_id = 'blog' AND auth.role() = 'authenticated');

-- ============================================
-- STORAGE POLICIES - Banners Bucket
-- ============================================

-- Public can view banner images
DROP POLICY IF EXISTS "Public can view banner images" ON storage.objects;
CREATE POLICY "Public can view banner images"
ON storage.objects FOR SELECT
USING (bucket_id = 'banners');

-- Authenticated users can upload banner images
DROP POLICY IF EXISTS "Authenticated users can upload banner images" ON storage.objects;
CREATE POLICY "Authenticated users can upload banner images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'banners' AND auth.role() = 'authenticated');

-- Authenticated users can update banner images
DROP POLICY IF EXISTS "Authenticated users can update banner images" ON storage.objects;
CREATE POLICY "Authenticated users can update banner images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'banners' AND auth.role() = 'authenticated');

-- Authenticated users can delete banner images
DROP POLICY IF EXISTS "Authenticated users can delete banner images" ON storage.objects;
CREATE POLICY "Authenticated users can delete banner images"
ON storage.objects FOR DELETE
USING (bucket_id = 'banners' AND auth.role() = 'authenticated');
