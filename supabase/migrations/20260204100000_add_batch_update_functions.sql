-- Batch update functions for sort order operations
-- Reduces N queries to 1 query for reordering operations

-- Gallery images batch reorder
CREATE OR REPLACE FUNCTION batch_update_gallery_sort_order(
  update_data JSONB
) RETURNS void AS $$
BEGIN
  UPDATE gallery_images
  SET sort_order = (elem->>'sort_order')::INTEGER,
      updated_at = NOW()
  FROM jsonb_array_elements(update_data) elem
  WHERE gallery_images.id::TEXT = (elem->>'id')::TEXT;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Promo banners batch reorder
CREATE OR REPLACE FUNCTION batch_update_promo_sort_order(
  update_data JSONB
) RETURNS void AS $$
BEGIN
  UPDATE promo_banners
  SET sort_order = (elem->>'sort_order')::INTEGER,
      updated_at = NOW()
  FROM jsonb_array_elements(update_data) elem
  WHERE promo_banners.id::TEXT = (elem->>'id')::TEXT;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- FAQ items batch reorder
CREATE OR REPLACE FUNCTION batch_update_faq_sort_order(
  update_data JSONB
) RETURNS void AS $$
BEGIN
  UPDATE faq_items
  SET sort_order = (elem->>'sort_order')::INTEGER,
      updated_at = NOW()
  FROM jsonb_array_elements(update_data) elem
  WHERE faq_items.id::TEXT = (elem->>'id')::TEXT;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Testimonials batch reorder (for completeness)
CREATE OR REPLACE FUNCTION batch_update_testimonial_sort_order(
  update_data JSONB
) RETURNS void AS $$
BEGIN
  UPDATE testimonials
  SET sort_order = (elem->>'sort_order')::INTEGER,
      updated_at = NOW()
  FROM jsonb_array_elements(update_data) elem
  WHERE testimonials.id::TEXT = (elem->>'id')::TEXT;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Instagram posts batch reorder (for completeness)
CREATE OR REPLACE FUNCTION batch_update_instagram_sort_order(
  update_data JSONB
) RETURNS void AS $$
BEGIN
  UPDATE instagram_posts
  SET sort_order = (elem->>'sort_order')::INTEGER,
      updated_at = NOW()
  FROM jsonb_array_elements(update_data) elem
  WHERE instagram_posts.id::TEXT = (elem->>'id')::TEXT;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
