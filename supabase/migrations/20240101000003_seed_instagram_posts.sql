-- Seed data for Instagram posts
-- Clear existing data and add only social media posts

DELETE FROM instagram_posts;

INSERT INTO instagram_posts (
  image_url,
  caption,
  permalink,
  like_count,
  comment_count,
  is_featured,
  is_active,
  sort_order
) VALUES
  (
    '/social-post-1.jpg',
    '💳 WE NOW ACCEPT PAYFLEX! See now, pay later with 4 interest-free instalments. Get your dream frames today! 👓✨ #Payflex #AffordableEyewear #NirvanaOptical',
    'https://www.instagram.com/nirvana_optical/',
    127,
    8,
    true,
    true,
    1
  ),
  (
    '/social-post-2.jpg',
    '✨ MERAKI Eyewear - Where style meets sophistication. Designed for you. Available now at Nirvana Optical! 🤎 #MerakiEyewear #DesignerFrames #Mahikeng',
    'https://www.instagram.com/nirvana_optical/',
    95,
    6,
    true,
    true,
    2
  ),
  (
    '/social-post-3.jpg',
    '🤎 Elegance in every detail. MERAKI frames - crafted with precision, designed for you. Visit us today! #MerakiEyewear #PremiumFrames #NirvanaOptical',
    'https://www.instagram.com/nirvana_optical/',
    112,
    5,
    true,
    true,
    3
  );
