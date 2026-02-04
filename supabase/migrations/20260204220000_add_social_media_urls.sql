-- Add social media URLs to site settings
INSERT INTO site_settings (key, value) VALUES
  ('facebook_url', 'https://www.facebook.com/NirvanaOptical'),
  ('instagram_url', 'https://www.instagram.com/nirvana_optical')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
