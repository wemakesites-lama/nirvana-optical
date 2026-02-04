-- ============================================
-- UPDATE GALLERY SCHEMA
-- ============================================

-- Add description column to gallery_images
ALTER TABLE gallery_images
ADD COLUMN IF NOT EXISTS description TEXT;

-- Update category type to use 'contact-lenses' instead of 'lenses'
-- First, update any existing 'lenses' values to 'contact-lenses'
UPDATE gallery_images SET category = 'contact-lenses' WHERE category = 'lenses';

-- Drop and recreate the constraint with new enum values
ALTER TABLE gallery_images DROP CONSTRAINT IF EXISTS gallery_images_category_check;
ALTER TABLE gallery_images ADD CONSTRAINT gallery_images_category_check
  CHECK (category IN ('frames', 'sunglasses', 'contact-lenses', 'store'));

-- ============================================
-- SEED GALLERY WITH INITIAL DATA
-- ============================================

-- Insert initial gallery images (using gen_random_uuid() for IDs)
INSERT INTO gallery_images (id, image_url, alt_text, category, brand, description, sort_order)
VALUES
  -- Frames - Damar Optical brands
  (gen_random_uuid(), '/stock eyewear 1.jpg', 'Designer rectangular frames', 'frames', 'Bolon Eyewear', NULL, 1),
  (gen_random_uuid(), '/stock eyewear 2.jpg', 'Industrial-inspired frames', 'frames', 'CAT Eyewear', NULL, 2),
  (gen_random_uuid(), '/stock tommy hilfiger eyewear.jpg', 'Modern minimalist frames', 'frames', 'Humphreys Eyewear', NULL, 3),
  (gen_random_uuid(), '/Nirvana optical store frames.jpeg', 'Elegant women''s frames', 'frames', 'Julia Backer', NULL, 4),
  (gen_random_uuid(), '/stock eyewear.avif', 'Contemporary fashion frames', 'frames', 'Sissy Boy Eyewear', NULL, 5),
  (gen_random_uuid(), '/stock eyewear 1.jpg', 'Artistic statement frames', 'frames', 'Stoned Cherrie Eyewear', NULL, 6),
  (gen_random_uuid(), '/stock eyewear 2.jpg', 'Versatile everyday frames', 'frames', 'Beyond Eyewear', NULL, 7),
  (gen_random_uuid(), '/stock tommy hilfiger eyewear.jpg', 'Extended fit frames', 'frames', 'Beyond Xtra Eyewear', NULL, 8),
  (gen_random_uuid(), '/stock child glasses.jpg', 'Children''s colourful frames', 'frames', 'Essikids', NULL, 9),
  (gen_random_uuid(), '/Nirvana optical store frames.jpeg', 'Classic heritage frames', 'frames', 'Legend Eyewear', NULL, 10),

  -- Sunglasses - Damar Optical brands
  (gen_random_uuid(), '/stock multi eyewear.avif', 'Premium polarised sunglasses', 'sunglasses', 'Bolon Eyewear', NULL, 11),
  (gen_random_uuid(), '/stock eyewear.avif', 'Rugged outdoor sunglasses', 'sunglasses', 'CAT Eyewear', NULL, 12),
  (gen_random_uuid(), '/stock multi eyewear.avif', 'Stylish fashion sunglasses', 'sunglasses', 'Sissy Boy Eyewear', NULL, 13),
  (gen_random_uuid(), '/stock eyewear.avif', 'Unique designer sunglasses', 'sunglasses', 'Stoned Cherrie Eyewear', NULL, 14),
  (gen_random_uuid(), '/stock multi eyewear.avif', 'Trendy urban sunglasses', 'sunglasses', 'Move Eyewear', NULL, 15),
  (gen_random_uuid(), '/stock eyewear.avif', 'Italian-inspired sunglasses', 'sunglasses', 'Milan Art', NULL, 16),
  (gen_random_uuid(), '/stock multi eyewear.avif', 'Contemporary block sunglasses', 'sunglasses', 'Kubik', NULL, 17),
  (gen_random_uuid(), '/stock eyewear.avif', 'Classic aviator sunglasses', 'sunglasses', 'Bavino Eyewear', NULL, 18),
  (gen_random_uuid(), '/stock multi eyewear.avif', 'Sporty lifestyle sunglasses', 'sunglasses', 'Ripple Eyewear', NULL, 19),
  (gen_random_uuid(), '/stock eyewear.avif', 'Budget-friendly UV sunglasses', 'sunglasses', 'Splash Eyewear', NULL, 20),

  -- Contact Lenses - CooperVision
  (gen_random_uuid(), '/CooperVision-logo-2023-810-x-338.jpg', 'CooperVision Contact Lenses', 'contact-lenses', 'CooperVision', 'MyDay, Biofinity, Avaira Vitality & MiSight 1 day', 21)
ON CONFLICT (id) DO NOTHING;
