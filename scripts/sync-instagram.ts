/**
 * Manual Instagram sync script
 * Run: npx tsx scripts/sync-instagram.ts
 */

async function syncInstagram() {
  console.log('🔄 Starting Instagram sync...\n');

  try {
    const response = await fetch('http://localhost:3001/api/instagram/sync', {
      method: 'POST',
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('❌ Sync failed:', error.error);
      return;
    }

    const result = await response.json();
    console.log(`\n✅ Successfully synced ${result.synced} posts from Instagram!`);
    console.log('\n📱 Posts synced:');
    result.posts.forEach((post: { caption?: string; like_count?: number; comment_count?: number }, i: number) => {
      console.log(`${i + 1}. ${post.caption?.substring(0, 60)}...`);
      console.log(`   👍 ${post.like_count} likes, 💬 ${post.comment_count} comments\n`);
    });

    console.log('🎉 Done! Visit http://localhost:3001 to see updated feed.');
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

syncInstagram();
