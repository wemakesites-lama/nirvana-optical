-- Update all blog posts to have Nirvana Optical Team as the author
UPDATE blog_posts
SET author = 'Nirvana Optical Team'
WHERE author != 'Nirvana Optical Team';
