-- Update Setmore URL to include /victor path
-- Run this migration to update existing database records

UPDATE site_settings
SET value = 'https://nirvanaoptical.setmore.com/victor'
WHERE key = 'setmore_url';
