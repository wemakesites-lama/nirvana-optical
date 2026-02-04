-- FAQ categories function
-- Returns distinct categories using SELECT DISTINCT instead of fetching all FAQs and deduplicating in JavaScript

CREATE OR REPLACE FUNCTION get_faq_categories()
RETURNS TABLE(category TEXT) AS $$
BEGIN
  RETURN QUERY
  SELECT DISTINCT faq_items.category
  FROM faq_items
  ORDER BY category;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

COMMENT ON FUNCTION get_faq_categories() IS 'Returns distinct FAQ categories efficiently using SELECT DISTINCT';
