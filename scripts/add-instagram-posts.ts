/**
 * Helper script to bulk add Instagram posts
 *
 * Usage:
 * 1. Download images from your Instagram posts
 * 2. Upload them to your /public folder
 * 3. Update the posts array below with your data
 * 4. Run: npx tsx scripts/add-instagram-posts.ts
 */

import { createClient } from '@supabase/supabase-js';

// Your Supabase credentials (from .env.local)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; // Use service role key for scripts

const supabase = createClient(supabaseUrl, supabaseKey);

// Add your Instagram posts here
const posts = [
  {
    image_url: '/path-to-your-image-1.jpg', // Upload image to /public first
    caption: 'Your actual Instagram caption here 📸',
    permalink: 'https://www.instagram.com/p/YOUR_POST_ID/', // Get from Instagram
    like_count: 0, // Update with actual count
    comment_count: 0, // Update with actual count
    is_featured: true,
    is_active: true,
    sort_order: 1,
  },
  {
    image_url: '/path-to-your-image-2.jpg',
    caption: 'Another post caption ✨',
    permalink: 'https://www.instagram.com/p/YOUR_POST_ID_2/',
    like_count: 0,
    comment_count: 0,
    is_featured: true,
    is_active: true,
    sort_order: 2,
  },
  // Add more posts here...
];

async function addPosts() {
  console.log('🚀 Starting to add Instagram posts...\n');

  for (const post of posts) {
    try {
      const { error } = await supabase
        .from('instagram_posts')
        .insert(post)
        .select()
        .single();

      if (error) {
        console.error(`❌ Failed to add post: ${post.caption?.substring(0, 30)}...`);
        console.error(`   Error: ${error.message}\n`);
      } else {
        console.log(`✅ Added: ${post.caption?.substring(0, 50)}...`);
      }
    } catch (err) {
      console.error(`❌ Error: ${err}\n`);
    }
  }

  console.log('\n✨ Done!');
}

addPosts();
