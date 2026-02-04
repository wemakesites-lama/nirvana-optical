import { createClient } from '@supabase/supabase-js';

// Use service role key to bypass RLS
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!serviceKey) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY not found in environment');
  console.log('Please add it to your .env.local file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function reset() {
  console.log('🗑️  Deleting all Instagram posts...\n');

  // Delete all
  const { error: deleteError } = await supabase
    .from('instagram_posts')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000');

  if (deleteError) {
    console.error('Delete error:', deleteError);
    return;
  }

  console.log('✅ All posts deleted\n');
  console.log('📸 Adding 3 social posts...\n');

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
  ];

  const { error: insertError } = await supabase
    .from('instagram_posts')
    .insert(posts);

  if (insertError) {
    console.error('Insert error:', insertError);
    return;
  }

  console.log('✅ 3 posts added successfully!\n');
  console.log('🎉 Done! Hard refresh http://localhost:3001 (Cmd+Shift+R or Ctrl+Shift+R)');
}

reset();
