import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const posts = [
  {
    image_url: '/social-post-1.jpg',
    caption: '💳 WE NOW ACCEPT PAYFLEX! See now, pay later with 4 interest-free instalments. Get your dream frames today! 👓✨ #Payflex #AffordableEyewear #NirvanaOptical',
    permalink: 'https://www.instagram.com/nirvana_optical/',
    like_count: 127,
    comment_count: 8,
    is_featured: true,
    is_active: true,
    sort_order: 1,
  },
  {
    image_url: '/social-post-2.jpg',
    caption: '✨ MERAKI Eyewear - Where style meets sophistication. Designed for you. Available now at Nirvana Optical! 🤎 #MerakiEyewear #DesignerFrames #Mahikeng',
    permalink: 'https://www.instagram.com/nirvana_optical/',
    like_count: 95,
    comment_count: 6,
    is_featured: true,
    is_active: true,
    sort_order: 2,
  },
  {
    image_url: '/social-post-3.jpg',
    caption: '🤎 Elegance in every detail. MERAKI frames - crafted with precision, designed for you. Visit us today! #MerakiEyewear #PremiumFrames #NirvanaOptical',
    permalink: 'https://www.instagram.com/nirvana_optical/',
    like_count: 112,
    comment_count: 5,
    is_featured: true,
    is_active: true,
    sort_order: 3,
  },
  {
    image_url: '/social-post-4.jpg',
    caption: '😎 Polo Ralph Lauren sunglasses - Timeless luxury meets modern style. Protect your eyes in style! ☀️🕶️ #PoloRalphLauren #DesignerSunglasses #LuxuryEyewear',
    permalink: 'https://www.instagram.com/nirvana_optical/',
    like_count: 143,
    comment_count: 11,
    is_featured: true,
    is_active: true,
    sort_order: 4,
  },
  {
    image_url: '/social-post-5.jpg',
    caption: '💎 MERAKI - Designed For You. Experience eyewear that\'s uniquely yours. Book your fitting today! #MerakiEyewear #CustomFrames #SeeBetter',
    permalink: 'https://www.instagram.com/nirvana_optical/',
    like_count: 88,
    comment_count: 4,
    is_featured: true,
    is_active: true,
    sort_order: 5,
  },
];

async function addPosts() {
  console.log('📸 Adding Instagram posts from @nirvana_optical...\n');

  for (const post of posts) {
    try {
      const { error } = await supabase
        .from('instagram_posts')
        .insert(post)
        .select()
        .single();

      if (error) {
        console.error(`❌ Failed: ${post.caption.substring(0, 40)}...`);
        console.error(`   Error: ${error.message}\n`);
      } else {
        console.log(`✅ Added: ${post.caption.substring(0, 50)}...`);
      }
    } catch (err) {
      console.error(`❌ Error: ${err}\n`);
    }
  }

  console.log('\n✨ Instagram feed updated! Visit http://localhost:3001 to see your posts.');
}

addPosts();
