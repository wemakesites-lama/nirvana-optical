-- Instagram Posts Table
-- Stores Instagram posts for display on the website
-- Can be populated manually or via Instagram API

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

-- Indexes
CREATE INDEX IF NOT EXISTS idx_instagram_posts_is_active ON instagram_posts(is_active);
CREATE INDEX IF NOT EXISTS idx_instagram_posts_is_featured ON instagram_posts(is_featured);
CREATE INDEX IF NOT EXISTS idx_instagram_posts_sort_order ON instagram_posts(sort_order);
CREATE INDEX IF NOT EXISTS idx_instagram_posts_timestamp ON instagram_posts(timestamp DESC);

-- Updated_at trigger
CREATE TRIGGER update_instagram_posts_updated_at
  BEFORE UPDATE ON instagram_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE instagram_posts ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Public can read active Instagram posts
CREATE POLICY "Public can read active instagram posts" ON instagram_posts
  FOR SELECT USING (is_active = true);

-- Admins can do everything
CREATE POLICY "Admins can do everything with instagram posts" ON instagram_posts
  FOR ALL USING (auth.role() = 'authenticated');
