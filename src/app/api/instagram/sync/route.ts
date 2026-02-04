import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { fetchInstagramPosts } from '@/lib/instagram/sync';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    // Check if Instagram is configured
    if (!process.env.INSTAGRAM_ACCESS_TOKEN) {
      return NextResponse.json(
        { error: 'Instagram API not configured. See INSTAGRAM_API_SETUP.md' },
        { status: 400 }
      );
    }

    console.log('📸 Fetching posts from Instagram...');

    // Fetch latest posts from Instagram
    const instagramPosts = await fetchInstagramPosts(6);

    if (instagramPosts.length === 0) {
      return NextResponse.json(
        { error: 'No posts found on Instagram' },
        { status: 404 }
      );
    }

    console.log(`✅ Found ${instagramPosts.length} posts`);

    const supabase = await createAdminClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const db = supabase as any;

    // Clear existing posts
    await db.from('instagram_posts').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    console.log('🗑️  Cleared old posts');

    // Insert new posts
    const postsToInsert = instagramPosts.map((post, index) => ({
      instagram_id: post.id,
      image_url: post.media_url,
      caption: post.caption || '',
      permalink: post.permalink,
      timestamp: post.timestamp,
      like_count: post.like_count || 0,
      comment_count: post.comments_count || 0,
      is_featured: index < 3, // First 3 are featured
      is_active: true,
      sort_order: index + 1,
    }));

    const { data, error } = await db
      .from('instagram_posts')
      .insert(postsToInsert)
      .select();

    if (error) {
      console.error('❌ Database error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log(`✅ Synced ${data.length} posts to database`);

    return NextResponse.json({
      success: true,
      synced: data.length,
      posts: data,
    });
  } catch (error) {
    console.error('❌ Sync error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Sync failed' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return POST();
}
