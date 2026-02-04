-- Dashboard statistics function
-- Aggregates all dashboard stats in a single query instead of 9 separate queries

CREATE OR REPLACE FUNCTION get_dashboard_stats()
RETURNS TABLE(
  total_posts BIGINT,
  published_posts BIGINT,
  draft_posts BIGINT,
  gallery_images BIGINT,
  active_banners BIGINT,
  testimonials BIGINT,
  faq_items BIGINT,
  unread_submissions BIGINT,
  total_submissions BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    (SELECT COUNT(*) FROM blog_posts)::BIGINT,
    (SELECT COUNT(*) FROM blog_posts WHERE status = 'published')::BIGINT,
    (SELECT COUNT(*) FROM blog_posts WHERE status = 'draft')::BIGINT,
    (SELECT COUNT(*) FROM gallery_images)::BIGINT,
    (SELECT COUNT(*) FROM promo_banners WHERE is_active = true)::BIGINT,
    (SELECT COUNT(*) FROM testimonials)::BIGINT,
    (SELECT COUNT(*) FROM faq_items)::BIGINT,
    (SELECT COUNT(*) FROM contact_submissions WHERE is_read = false)::BIGINT,
    (SELECT COUNT(*) FROM contact_submissions)::BIGINT;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

COMMENT ON FUNCTION get_dashboard_stats() IS 'Aggregates all dashboard statistics in a single query for performance';
