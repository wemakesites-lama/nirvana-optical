// First, get all posts and delete them
async function clearAndAdd3Posts() {
  console.log('🗑️  Clearing all Instagram posts...\n');

  // Get all posts
  const response = await fetch('http://localhost:3001/api/admin/instagram');
  const posts = await response.json();

  // Delete each post
  for (const post of posts) {
    await fetch(`http://localhost:3001/api/admin/instagram/${post.id}`, {
      method: 'DELETE',
    });
  }

  console.log('✅ All posts cleared.\n');
  console.log('📸 Adding 3 social media posts...\n');

  // Add only 3 social posts
  const newPosts = [
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

  for (const post of newPosts) {
    const response = await fetch('http://localhost:3001/api/admin/instagram', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });

    if (response.ok) {
      console.log(`✅ Added: ${post.caption.substring(0, 50)}...`);
    }
  }

  console.log('\n✨ Done! Refresh http://localhost:3001 to see only 3 posts.');
}

clearAndAdd3Posts();
